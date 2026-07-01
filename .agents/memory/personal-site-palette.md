---
name: Personal site design palette
description: Color palette and MCM design decisions for Heidi Williams Foy personal site
---

## Active palette
- Primary (teal): `hsl(176 68% 46%)` — all primary text, borders, grid dots
- Accent (amber/gold): `hsl(38 90% 57%)` — marquee bar, starburst decorations, photo frame accent, tagline border-left, Jobsoxo card border, alternating interest badges
- Background: `hsl(222 14% 6%)` — dark charcoal with slight cool warmth (not pure black)
- Radius: `3px` — slight softening from 0px brutalism

## MCM motifs in home.tsx
- `Starburst` SVG component (`✦` 8-point star) — used in `SectionHeader` and reading list bullets, colored `text-accent`
- `AtomicRing` SVG component — dashed spinning ellipses near hero photo corner, `text-accent/25`
- Amber marquee bar at top (bg-accent / text-accent-foreground)
- Dual photo frame: teal offset shadow + amber accent border (-translate-x-1 / -translate-y-1)

**Why:** User requested teal accent + midcentury modern nod while keeping hacker/terminal DNA. Amber + teal is a classic MCM pairing (atomic age).

**How to apply:** Use `<SectionHeader>` component for all new section headers. Alternate new cards between `border-primary/25` and `border-accent/30` for rhythm. Starburst in amber is the signature MCM touch — use sparingly.
