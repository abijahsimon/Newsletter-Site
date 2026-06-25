# EPSS Newsletter Phase 1 Design QA

## Comparison Target

- Source visual truth: unchanged legacy site at `http://127.0.0.1:4320/`
- Source desktop screenshot: `/private/tmp/epss-newsletter-qa/legacy-desktop-1280.jpg`
- Source mobile screenshot: `/private/tmp/epss-newsletter-qa/legacy-mobile-390.jpg`
- Implementation: content-driven Astro build at `http://127.0.0.1:4321/`
- Implementation desktop screenshot: `/private/tmp/epss-newsletter-qa/app-desktop-1280.jpg`
- Implementation mobile screenshot: `/private/tmp/epss-newsletter-qa/app-mobile-390.jpg`
- Desktop comparison: `/private/tmp/epss-newsletter-qa/desktop-comparison.png`
- Mobile comparison: `/private/tmp/epss-newsletter-qa/mobile-top-comparison.jpg`
- Focused feature comparison: `/private/tmp/epss-newsletter-qa/desktop-feature-section-comparison.jpg`

## Viewports and States

- Desktop: 1280 × 720 browser viewport, full page and Features anchor state.
- Mobile: 390 × 844 browser viewport, hero state and mobile navigation open/close behavior.
- Content state: published 2026 issue.

## Full-View Comparison Evidence

- Both versions render 10 top-level newsletter sections.
- Both versions render 12 images.
- Both full-page screenshots are 1280 × 7426.
- The legacy and new builds use byte-identical copies of the current stylesheet and logo.
- Selected computed layout, grid, padding, background, and color values matched for:
  - Header.
  - Hero.
  - Hero content.
  - Donation badge.
  - Planning board.
  - Feature layout.
  - Brief grid.
  - Community grid.
  - Research band.
  - Recognition layout.
  - Article layout.
  - Table of contents.

## Focused Region Comparison Evidence

The Features section was compared at 1280 × 720 after navigating through the visible “Features” link in each version.

- The section aligns at the same viewport position.
- Images, crops, grid widths, backgrounds, type hierarchy, spacing, links, and sticky header treatment match.
- No focused typography, imagery, or spacing mismatch was found.

The mobile hero was compared at 390 × 844.

- Logo, menu button, hero image crop, donation badge, heading wrapping, calls to action, spacing, and overlay match.
- The only text differences are intentional corrections in structured content:
  - “beyonds” became “beyond.”
  - The malformed issue-summary sentence became “Our annual newsletter, rebuilt as a digital issue.”

## Required Fidelity Surfaces

- Fonts and typography: passed. Both builds use the same font stack, weights, scales, line heights, letter spacing, and responsive wrapping.
- Spacing and layout rhythm: passed. Measured desktop and mobile selectors match, including grids, padding, section height, and sticky navigation.
- Colors and visual tokens: passed. The new build uses an exact copy of the existing CSS tokens, gradients, shadows, opacity values, and backgrounds.
- Image quality and asset fidelity: passed. The same logo, photos, image crops, and original donation-badge SVG artwork are used; no substitute imagery or approximation was introduced.
- Copy and content: passed with two intentional typo corrections listed above. Headings, article IDs, section IDs, and table-of-contents entries otherwise match.
- Interactions and accessibility: passed. Mobile navigation toggles `aria-expanded`, displays as a grid when open, closes after selecting a link, and scrolls to the correct section. No browser console errors or warnings were found.

## Findings

No actionable P0, P1, P2, or P3 visual findings.

## Patches Made During QA

- Updated the content schema import to Astro 7’s supported `astro/zod` entry point.
- No visual CSS or layout patches were required.

## Implementation Checklist

- [x] Preserve legacy root files.
- [x] Match desktop layout and content structure.
- [x] Match mobile hero and responsive layout.
- [x] Verify navigation anchors.
- [x] Verify mobile menu open/close behavior.
- [x] Verify content collection build.
- [x] Verify production static build.
- [x] Confirm no browser console errors.

final result: passed

