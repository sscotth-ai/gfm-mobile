import posthog from "posthog-js";

const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST =
  (import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string) || "https://us.i.posthog.com";

export function initPostHog() {
  if (!POSTHOG_KEY) {
    if (import.meta.env.DEV) {
      console.warn("[posthog] VITE_PUBLIC_POSTHOG_KEY not set — skipping initialization");
    }
    return;
  }

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false, // we handle this manually via router
    capture_pageleave: true,
    persistence: "localStorage+cookie",
  });
}

export { posthog };
