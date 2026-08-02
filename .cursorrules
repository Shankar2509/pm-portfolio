# Portfolio Project — working rules

> **Scope override.** This directory and everything below it is a **web development
> project**, not the resume workspace. Ignore the resume-writer instructions in the parent
> folder's CLAUDE.md while working here. The candidate data in `../profile/` is still the
> factual source of truth for anything written about Leela Shankar — but the deliverable
> here is a website, not a document.

## What this is

A single Product/Project Management portfolio for **Leela Shankar Gurram**, aimed at APM
and PM programme reviewers (Google, SAP, Meta) and PM hiring managers.

Read `BUILD-SPEC.md` in this folder before doing anything. It contains the positioning,
the five case studies, the design system, and the phased build sequence. Do not improvise
around it.

## The governing principle

> Every claim on the page must be attached to a specific, checkable artifact.
> Where there is no evidence, cut the claim rather than dress it up with motion.

Specificity is what makes a portfolio look human-made. Animation is not.

---

## Design tokens — never deviate

```
--paper    #FAF9F6    warm off-white, page background
--ink      #14110F    near-black (never pure #000)
--muted    #6B6560    secondary text
--rule     #E3DFD8    hairlines and borders
--accent   #C2410C    burnt orange
```

**The accent has exactly one job: links.** Never a button background, never a section
background, never a gradient stop.

**Type:**
- Display / headings — **Instrument Serif**
- Body / UI — **Geist**
- Numerals, captions, metric caveats — **Geist Mono**

Type scale uses a 1.25 ratio, defined as tokens. No arbitrary font sizes.

---

## Banned — these are the "AI-generated" tells

- Purple or indigo gradients, glassmorphism, neon-on-black
- A centred hero with a name, a tagline and two buttons
- Stat-counter trios (three big numbers in a symmetrical row)
- Skill pill/tag grids
- Icon-card feature grids where every card is identical
- Emoji in headings
- Generic section headings: "About Me", "My Skills", "Get In Touch"
- Fonts: Inter, Poppins, Montserrat, Space Grotesk, Raleway
- The words: *passionate, leverage, cutting-edge, seamless, robust, innovative, journey,
  dive into, elevate, unlock, empower, transform*
- Any metric not present in `content/metrics.md`

---

## Motion rules

Library: **Motion** (`motion/react`). Smooth scroll: **Lenis**. Scroll sequences: **GSAP
ScrollTrigger**.

1. One signature interaction, done well. Everything else restrained.
2. Motion must carry meaning — reveal structure, show relationship, indicate state.
   Delete any animation that is purely decorative.
3. **Never apply one reveal variant globally.** Vary choreography per section type. A
   uniform fade-up-20px on every element is itself a generated-site tell.
4. Timing: 200–300ms for UI response, 600–900ms for narrative reveals. Custom
   cubic-bezier only — never plain `ease-in-out`.
5. `prefers-reduced-motion` must disable the globe and all reveals. Non-negotiable.

---

## Content rules

- All case study prose lives in `site/content/*.mdx` and is **written by hand by Leela**.
- **Do not generate, rewrite, paraphrase or "improve" prose in those files** unless
  explicitly asked in that session. AI-written portfolio copy is the loudest tell there is.
- You may build components, layout, and structure freely. You may not write the voice.
- `content/metrics.md` is the single source of truth for every number on the site.

## Facts that must not drift

- Job title is **iOS Developer**. Never inflate to "Software Development Engineer" or
  "Product Manager".
- The **12% retention figure is a RELEASE-level result** across three features (watchlists,
  EPG, HLS optimizations). Never attribute it to a single feature.
- Google Project Management Certificate is **In Progress**. Never "completed", never with
  a start year.
- 🚫 The figures "80% efficiency gain", "2 days → 2 hours" and "15–20% productivity
  improvement" were never measured and must never appear.
- Never mention the NATS apprenticeship.

---

## Working method

- **Build one section at a time.** Never "build the whole page."
- Use plan mode before each phase; show the approach before writing files.
- For the hero: produce **three structurally different approaches** and let Leela choose.
  Do not default to the first idea.
- Report bundle size after adding any 3D. Hard budget: 250KB gzipped.
