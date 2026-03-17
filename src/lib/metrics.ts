type MetricCategory = "performance" | "engagement" | "conversion" | "navigation";

interface MetricEvent {
  name: string;
  category: MetricCategory;
  data: Record<string, string | number | boolean>;
  timestamp: number;
}

class MetricsCollector {
  private buffer: MetricEvent[] = [];
  private isDev = import.meta.env.DEV;

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

    if (this.isDev) {
      console.log(
        `%c[metrics] %c${category}%c ${name}`,
        "color: #888",
        "color: #4ade80; font-weight: bold",
        "color: inherit",
        data,
      );
    }
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

  getBuffer() {
    return [...this.buffer];
  }

  flush() {
    if (this.isDev && this.buffer.length > 0) {
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
