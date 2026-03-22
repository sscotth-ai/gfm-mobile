# GFM

## Instrumentation

The app includes a custom metrics system (`src/lib/metrics.ts`) that tracks events across five categories. All events are logged to the browser console as `[metrics]` lines.

### Performance

| Metric | What it measures | Why it matters |
|--------|-----------------|----------------|
| `fcp` | First Contentful Paint | Time until users see something on screen |
| `lcp` | Largest Contentful Paint | Time until the main content (hero image) is visible |
| `ttfb` | Time to First Byte | Server/CDN responsiveness |
| `cls` | Cumulative Layout Shift | Visual stability — do elements jump around? |
| `inp` | Interaction to Next Paint | Tap responsiveness on mobile |
| `api_response_time` | Per-endpoint fetch duration | Detects slow API calls (includes url, status, duration_ms) |

### Conversion (donation funnel)

| Metric | What it measures | Why it matters |
|--------|-----------------|----------------|
| `donate_cta_click` | Donate button taps (hero vs floating FAB) | Which CTA drives more conversions |
| `donate_drawer_open` | Drawer opens | Top of the donation funnel |
| `donate_amount_select` | Preset amount selected ($10–$250) | Which amounts users prefer |
| `donate_custom_toggle` | Custom amount field opened | How often presets are insufficient |
| `donate_submitted` | Donation completed (amount, type, duration) | Conversion rate and time-to-donate |
| `donate_drawer_abandoned` | Drawer closed without donating | Funnel drop-off and friction |

### Engagement

| Metric | What it measures | Why it matters |
|--------|-----------------|----------------|
| `scroll_depth` | 25/50/75/100% scroll thresholds | How far users read on each page |
| `section_visible` | Key sections entering viewport | Which content sections users actually see |
| `like_toggle` | Like/unlike on fundraiser page | Campaign appeal and emotional resonance |
| `follow_toggle` | Follow/unfollow (community + profile) | Social connection building |
| `share` | Share button with method (native/clipboard) | Organic growth driver |
| `share_cancelled` | User cancelled the share dialog | Share friction measurement |
| `comments_drawer_open` | Comments drawer opened | Social proof engagement |
| `comment_posted` | Comment submitted (with length) | Active participation rate |
| `read_more_toggle` | Description expand/collapse | Content interest signal |
| `tab_switch` | Tab changes on community page | What visitors care about (Fundraisers vs About) |
| `show_more_campaigns` | "Show more" clicked on campaign list | Content demand signal |
| `discover_people_toggle` | Discover section expand/collapse | Social feature interest |
| `discover_follow_toggle` | Follow from discover section | Social graph growth |
| `activity_like_toggle` | Like on profile activity items | Activity feed engagement |
| `activity_comment` | Comment on activity items (with length) | Activity feed participation |
| `activity_comment_input_open` | Comment input expanded | Intent to engage |

### Navigation

| Metric | What it measures | Why it matters |
|--------|-----------------|----------------|
| `page_view` | Every route change (with path) | Traffic distribution and entry points |
| `campaign_card_click` | Campaign card taps (with slug) | Cross-page navigation patterns |

### Errors

| Metric | What it measures | Why it matters |
|--------|-----------------|----------------|
| `api_error` | Failed API requests (status + url) | Backend reliability |
| `image_load_error` | Broken images (with component context) | Asset delivery issues |

### PostHog

All metrics are forwarded to [PostHog](https://posthog.com) as structured wide events via `posthog.capture()` inside `MetricsCollector.track()`. Pageviews are tracked automatically on route changes.

| Variable | Description |
|---|---|
| `VITE_PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `VITE_PUBLIC_POSTHOG_HOST` | PostHog ingest endpoint (reverse proxy to avoid ad blockers) |

Set `VITE_PUBLIC_POSTHOG_KEY` in `.env.local` for local dev. `VITE_PUBLIC_POSTHOG_HOST` is optional and defaults to `https://us.i.posthog.com`, but can be set to a reverse proxy to avoid ad blockers. They are configured as GitHub Actions secrets for CI/deploy. If `VITE_PUBLIC_POSTHOG_KEY` is not set, PostHog is silently skipped.

### Architecture

- **`MetricsCollector`** (`src/lib/metrics.ts`) — Singleton that buffers events, forwards them to PostHog, and logs them to the console
- **`trackedFetch`** — Wraps `fetch()` to automatically measure API response times
- **Hooks** (`src/hooks/useMetrics.ts`):
  - `usePageView()` — Tracks route changes via React Router
  - `useScrollDepth()` — Fires at 25% scroll increments
  - `useTrackVisibility(section)` — IntersectionObserver for section visibility
  - `useTrackClick(event, data)` — Click event wrapper
- **Web vitals** are initialized once in `App.tsx`
- **Direct `metrics.track()` calls** are used inline for interaction events in components
