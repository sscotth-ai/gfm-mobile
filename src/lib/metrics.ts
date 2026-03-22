type MetricCategory = "performance" | "engagement" | "conversion" | "navigation" | "error";

interface MetricEvent {
  name: string;
  category: MetricCategory;
  data: Record<string, string | number | boolean>;
  timestamp: number;
}

class MetricsCollector {
  private buffer: MetricEvent[] = [];
  track(
    name: string,
    category: MetricCategory,
    data: Record<string, string | number | boolean> = {},
  ) {
    const event: MetricEvent = {
      name,
      category,
      data,
      timestamp: Date.now(),
    };

    this.buffer.push(event);

    console.log(
      `%c[metrics] %c${category}%c ${name}`,
      "color: #888",
      "color: #4ade80; font-weight: bold",
      "color: inherit",
      data,
    );
  }

  trackWebVitals() {
    if (typeof window === "undefined") return;

    // First Contentful Paint
    const paintObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          this.track("fcp", "performance", { value: Math.round(entry.startTime) });
        }
      }
    });

    try {
      paintObserver.observe({ type: "paint", buffered: true });
    } catch {
      // PerformanceObserver not supported
    }

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        this.track("lcp", "performance", { value: Math.round(last.startTime) });
      }
    });

    try {
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch {
      // Not supported
    }

    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!layoutShift.hadRecentInput) {
          clsValue += layoutShift.value;
          this.track("cls", "performance", {
            value: Math.round(clsValue * 1000) / 1000,
          });
        }
      }
    });

    try {
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch {
      // Not supported
    }

    // Interaction to Next Paint
    const inpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        this.track("inp", "performance", {
          value: Math.round(entry.duration),
          target: (entry as PerformanceEntry & { name: string }).name || "unknown",
        });
      }
    });

    try {
      inpObserver.observe({ type: "event", buffered: true });
    } catch {
      // Not supported
    }

    // Time to First Byte from Navigation Timing
    const navEntry = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (navEntry) {
      this.track("ttfb", "performance", {
        value: Math.round(navEntry.responseStart - navEntry.requestStart),
      });
    }
  }

  /**
   * Wraps a fetch call to track response time.
   */
  async trackedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const start = performance.now();
    try {
      const res = await fetch(input, init);
      const duration = Math.round(performance.now() - start);
      this.track("api_response_time", "performance", {
        url,
        status: res.status,
        duration_ms: duration,
        ok: res.ok,
      });
      if (!res.ok) {
        this.track("api_error", "error", {
          url,
          status: res.status,
        });
      }
      return res;
    } catch (err) {
      const duration = Math.round(performance.now() - start);
      this.track("api_error", "error", {
        url,
        duration_ms: duration,
        error: err instanceof Error ? err.message : "Unknown error",
      });
      throw err;
    }
  }

  getBuffer() {
    return [...this.buffer];
  }

  flush() {
    if (this.buffer.length > 0) {
      console.table(
        this.buffer.map((e) => ({
          name: e.name,
          category: e.category,
          ...e.data,
          time: new Date(e.timestamp).toLocaleTimeString(),
        })),
      );
    }
    this.buffer = [];
  }
}

export const metrics = new MetricsCollector();

// Expose for debugging and e2e verification
(window as unknown as Record<string, unknown>).__metrics = metrics;
