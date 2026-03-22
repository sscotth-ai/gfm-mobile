# Immersive Storyteller

## Product Overview

**The Pitch:** GoFundMe reimagined as a full-bleed, vertical-video storytelling platform. Empathy is driven through immersive, creator-led narratives rather than static text pages.

**For:** Gen-Z and Millennial donors who engage primarily with short-form video content and want to see the immediate, visceral impact of their contributions.

**Device:** mobile

**Design Direction:** Dark-mode native, media-first interface with glassmorphic overlays, vibrant neon accent gradients, and aggressive editorial typography.

**Inspired by:** TikTok, VSCO, Spotify (Canvas feature)

---

## Screens

- **Fundraiser Feed:** Vertical scrolling full-bleed video narratives of causes.
- **Donation Drawer:** Bottom-sheet overlay for frictionless, one-tap giving.
- **Community Map:** 3D interactive globe showing real-time pulses of global donations.
- **Impact Profile:** A cinematic timeline of the user's supported causes and updates.

---

## Key Flows

**Immediate Impact Donation:** User discovers a cause and donates seamlessly.

1. User is on **Fundraiser Feed** -> sees full-bleed video of a creator explaining their cause.
2. User clicks **floating "Give $5" quick-action button** -> triggers biometric authentication (FaceID).
3. Success animation plays; screen transitions to **Community Map** showing their donation as a glowing pulse.

---

<details>
<summary>Design System</summary>

## Color Palette

- **Primary:** `#00FFA3` - Quick donate buttons, success states, vibrant accents
- **Background:** `#050505` - True black for infinite contrast
- **Surface:** `rgba(255, 255, 255, 0.08)` - Glassmorphic cards and floating UI
- **Text:** `#F8F8F8` - Primary reading text
- **Muted:** `#8A8A8E` - Secondary info, timestamps
- **Accent:** `#FF2E93` - Urgent causes, emotional highlights

## Typography

Distinctive, high-impact editorial typography paired with ultra-legible modern sans.

- **Headings:** `Clash Display`, 600, 24-48px
- **Body:** `DM Sans`, 400, 16px
- **Small text:** `DM Sans`, 500, 13px
- **Buttons:** `Clash Display`, 600, 16px, uppercase

**Style notes:** Aggressive use of negative space. UI elements float over media using heavy `backdrop-filter: blur(24px)`. No hard borders—only 1px semi-transparent white borders on glass components. Pill-shaped buttons with 40px radius.

## Design Tokens

```css
:root {
  --color-primary: #00FFA3;
  --color-background: #050505;
  --color-surface: rgba(255, 255, 255, 0.08);
  --color-surface-border: rgba(255, 255, 255, 0.12);
  --color-text: #F8F8F8;
  --color-accent: #FF2E93;
  --font-heading: 'Clash Display', sans-serif;
  --font-body: 'DM Sans', sans-serif;
  --radius-pill: 40px;
  --radius-card: 24px;
  --blur-heavy: blur(24px);
  --spacing-md: 16px;
  --spacing-lg: 24px;
}
```

</details>

---

<details>
<summary>Screen Specifications</summary>

### Fundraiser Feed

**Purpose:** Immersive discovery of causes through vertical video storytelling.

**Layout:** 100% viewport height/width media. Floating UI overlays at bottom 30% of screen. Top gradient mask for system status bar legibility.

**Key Elements:**
- **Media Player:** Full-bleed auto-playing video, loops endlessly.
- **Narrative Block:** `Clash Display` 24px title, `DM Sans` 14px 2-line truncated description. Anchored bottom-left.
- **Progress Bar:** 4px height, runs along the very bottom edge of the screen. `#00FFA3` fill, `rgba(255,255,255,0.2)` track.
- **Action Column:** Floating right-aligned stack (Profile, Like, Share, Comments). 48px circular glass icons.
- **Quick Donate:** Floating bottom-center pill button, 100% width minus 32px margins. 56px height. `Backdrop-blur` with solid `#00FFA3` border.

**States:**
- **Loading:** Skeleton UI with a dark pulse animation (`#111` to `#222`) while video buffers.
- **Error:** Static emotional cover image with a glassmorphic "Tap to retry" badge.

**Interactions:**
- **Swipe Up:** Snaps to next fundraiser video.
- **Tap Narrative Block:** Expands text seamlessly overlaying the video.
- **Hold Screen:** Pauses video, hides UI for unimpeded viewing.

### Donation Drawer

**Purpose:** Frictionless, high-conversion checkout experience.

**Layout:** Bottom sheet taking up 60% of viewport. Heavy glassmorphic background over the paused feed video.

**Key Elements:**
- **Amount Grid:** 2x3 grid of predefined amounts ($10, $25, $50, $100, $250, Custom).
- **Amount Card:** `rgba(255,255,255,0.08)` bg, 16px radius. Selected state gets 2px `#00FFA3` border and 10% opacity green fill.
- **Apple/Google Pay CTA:** 56px tall pill, solid white, black text, sticky at bottom.
- **Impact Label:** 14px text below CTA: "Your $50 provides 3 days of shelter." Dynamically updates based on selection.

**Interactions:**
- **Drag down:** Dismisses drawer, resumes video playback.
- **Tap Custom:** Opens native numeric keyboard, shifts UI up.

### Community Map

**Purpose:** Visualizing the collective impact of the GoFundMe community in real-time.

**Layout:** Full-screen WebGL dark globe. Floating glassmorphic header and sliding bottom carousel of trending regions.

**Key Elements:**
- **Dark Globe:** Pitch black oceans, `#222` landmasses.
- **Donation Pulses:** Real-time glowing dots appearing on the map. Size correlates to donation amount. Colors: `#00FFA3` (recent), `#FF2E93` (milestone reached).
- **Live Feed ticker:** 32px tall glass pill at top of screen scrolling "Sarah just donated $20 to Maui Relief".
- **Local Causes Toggle:** 48px circular button, bottom right. Pans globe to user's location.

**Interactions:**
- **Pinch/Pan:** Standard map controls, smooth inertia.
- **Tap Pulse:** Opens mini glassmorphic tooltip with cause info.

### Impact Profile

**Purpose:** A personal shrine to the user's giving history, reinforcing identity as a donor.

**Layout:** Split layout: Top 40% user stats, Bottom 60% vertical timeline of updates from supported causes.

**Key Elements:**
- **Hero Stats:** Large `Clash Display` 48px text showing total dollars given and causes helped. Centered.
- **Impact Aura:** A dynamic gradient behind the stats that shifts color based on the categories the user supports most (e.g., green for environment, pink for medical).
- **Timeline Cards:** Full-width cards, no margins. Edge-to-edge cover image with bottom linear gradient.
- **Update Badge:** Glowing 8px dot next to causes that have posted new videos/updates.

**Interactions:**
- **Scroll down:** Top stats parallax up, fading opacity to 0. Timeline takes over screen.
- **Tap Update:** Transitions seamlessly back to the Fundraiser Feed format to play the update video.

</details>

---

<details>
<summary>Build Guide</summary>

**Stack:** HTML + Tailwind CSS v3 + Framer Motion (for fluid mobile transitions)

**Build Order:**
1. **Fundraiser Feed** - Establishes the core full-bleed media container, glassmorphic UI tokens, and typography system.
2. **Donation Drawer** - Implements the bottom sheet component, interactive grid states, and primary CTAs.
3. **Impact Profile** - Reuses cards from the feed but introduces the timeline layout and dynamic hero gradients.
4. **Community Map** - Most technically complex (WebGL/Canvas), relies on the design tokens established in steps 1-3.

</details>
