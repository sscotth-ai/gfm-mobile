import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { posthog } from "@/lib/posthog";

/**
 * Captures a $pageview event on every route change.
 * Renders nothing — just a side-effect component.
 */
export function PostHogPageviewTracker() {
  const location = useLocation();

  useEffect(() => {
    posthog.capture("$pageview", {
      $current_url: window.location.href,
      path: location.pathname,
    });
  }, [location.pathname]);

  return null;
}
