import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { metrics } from "@/lib/metrics";

/**
 * Track when a section becomes visible in the viewport.
 */
export function useTrackVisibility(sectionName: string) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          metrics.track(`section_visible`, "engagement", {
            section: sectionName,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
}

/**
 * Returns a click handler that tracks the event.
 */
export function useTrackClick(
  eventName: string,
  data: Record<string, string | number | boolean> = {},
) {
  return useCallback(() => {
    metrics.track(eventName, "conversion", data);
  }, [eventName, data]);
}

/**
 * Track page views on navigation.
 */
export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    metrics.track("page_view", "navigation", {
      path: location.pathname,
    });
  }, [location.pathname]);
}

/**
 * Track scroll depth at 25/50/75/100% thresholds.
 */
export function useScrollDepth() {
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percent = Math.round((window.scrollY / scrollHeight) * 100);

      for (const t of thresholds) {
        if (percent >= t && !firedRef.current.has(t)) {
          firedRef.current.add(t);
          metrics.track("scroll_depth", "engagement", { depth: t });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
