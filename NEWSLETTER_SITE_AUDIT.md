# EPSS Newsletter Site Audit

## Scope

This audit describes the current static site and a recommended path toward a reusable annual newsletter application. It does not implement or modify the site.

The current site is a single-page editorial prototype. It combines:

- A reusable visual system and set of newsletter layout patterns.
- Placeholder and proposed content for the 2025–2026 issue.
- An internal story-planning board and template notes.
- A small amount of client-side behavior for mobile navigation.

The main architectural task will be separating those four concerns without losing the current design.

## 1. What Each File and Folder Appears to Do

### `assets/`

Stores all local visual assets used by, or available to, the newsletter.

#### `assets/brand/`

- Contains one department logo: `epss-department-logo.svg`.
- The SVG is the official-looking UCLA Earth, Planetary & Space Sciences lockup used in the sticky header.
- Its primary embedded blue is `#2774ae`, matching the `--ucla-blue` CSS token.
- This folder should eventually hold shared, issue-independent brand assets.

#### `assets/images/`

- Contains 89 JPG files named by apparent source page and image sequence, such as `p01_01.jpg` and `p14_07.jpg`.
- These appear to be images extracted from an earlier newsletter, most likely the 2025 print/PDF issue.
- Nine of these files are currently referenced by `index.html`; the rest form a source archive or placeholder pool.
- The filenames do not describe subjects, credits, rights, captions, or intended use. A future media model should add that metadata instead of relying on filenames alone.

#### `assets/people/`

- Contains three specifically named portraits:
  - `edwin-schauble.jpg`
  - `megan-li.jpg`
  - `allen-glazner.webp`
- All three are used by profile cards in the Community section.
- This separation from general images suggests the beginning of a reusable people/profile asset category.

### `sheet-imports/`

Contains spreadsheet exports used to reconcile the planned newsletter content with the site.

- `content-coverage-audit.csv` and `content-coverage-audit.tsv` are duplicate-format exports of the same content coverage table.
- `layout-decisions.csv` and `layout-decisions.tsv` are duplicate-format exports of the same unresolved layout decision table.
- These files appear to be source/reference material rather than runtime site data.
- Some entries predate the current HTML and are now stale. For example, the imports say several items are only vaguely represented even though dedicated cards were later added.
- In a future app, this planning information should be represented once in a structured editorial workflow rather than maintained across Markdown, CSV, TSV, and HTML.

### `content-audit.md`

- A human-readable coverage tracker for the proposed 2026 content.
- Maps each planned item to its current site location and assigns a coverage status.
- Includes a meeting-notes cross-check and a list of likely layout decisions.
- It is editorial/project documentation, not part of the rendered site.
- Its current findings are summarized in section 6 below.

### `index.html`

- The entire public-facing newsletter prototype.
- Defines the page metadata, navigation, issue hero, editorial planning board, story modules, research updates, recognition content, long-form placeholders, table of contents, and footer.
- Contains nearly all newsletter data directly in markup: issue year, headlines, names, summaries, image choices, section order, links, and planning notes.
- Also contains the complex inline SVG for the circular “Give to EPSS” badge.
- It currently acts as both template and database, which is the primary barrier to annual reuse.

### `styles.css`

- Defines the complete visual presentation and responsive layout.
- Contains brand/design tokens, typography, color treatments, grids, cards, hero behavior, navigation states, calls to action, long-form placeholders, and mobile breakpoints.
- It is organized by page section rather than as a formal component/design system, but the selectors already reveal a useful component vocabulary.

### `script.js`

- Provides only the mobile menu interaction.
- It does not load content, manage routing, filter stories, search donors, control accordions, or perform any other app behavior.

## 2. Which Parts of `index.html` Are Layout and Design

The reusable layout/design layer consists of the semantic page shell, module hierarchy, class names, accessibility hooks, and visual SVG markup.

### Global shell

- Document setup, viewport metadata, stylesheet reference, and script reference.
- Sticky site header with brand area, desktop navigation, mobile menu button, and mobile navigation.
- Main content wrapper and site footer.
- Anchor-based navigation structure.

### Issue hero pattern

- Full-viewport image hero.
- Overlay and content layers.
- Kicker, issue title, description, and action area.
- Floating issue-summary panel.
- Floating donation callout.
- The inline “Give to EPSS” SVG is design artwork embedded in the page rather than newsletter content alone. Its link destination and accessible label are content/configuration.

### Reusable editorial modules

- Section heading pattern: kicker, heading, and optional introduction.
- Four-column planning lanes.
- Two-column feature-story layout with image and copy regions.
- Brief-card grid.
- Community/profile card grid.
- Research update accordion using native `<details>` and `<summary>`.
- Recognition layout with standard, image-led, and donor variants.
- Long-form article placeholder layout.
- Template-notes block.
- Table-of-contents grid.
- Footer.

### Accessibility and interaction structure

- Landmark elements such as `header`, `nav`, `main`, `section`, `article`, `aside`, and `footer`.
- `aria-label`, `aria-labelledby`, `aria-controls`, and `aria-expanded` attributes.
- Image `alt` attributes.
- Stable section IDs used as anchor targets.

### Important coupling to address later

The HTML structure is reusable, but many anchors and IDs are tied to specific stories, such as `#rimfax`, `#student-profile`, and `#suburban-full`. In a future app, IDs, routes, navigation, and the table of contents should be generated from content records rather than maintained separately.

## 3. Which Parts of `index.html` Are Hard-Coded Newsletter Content

Nearly all visible text and media selections are hard-coded. This includes:

### Issue-level content

- Page title: “EPSS Newsletter 2026.”
- Meta description.
- Hero image and alt text.
- “Welcome to the New” kicker.
- “EPSS Annual Newsletter” title.
- The 2025–2026 issue description.
- Hero action labels and destinations.
- Donation URL.
- Issue-summary text.

There are also visible copy errors that demonstrate why content should be managed separately:

- “from Earth and beyonds”
- “Our newsletter is now , rebuilt as a digital issue.”
- Extra whitespace in some hero text.

### Navigation and table of contents

- Every navigation label, destination, and order.
- Every table-of-contents item.
- Desktop and mobile navigation are duplicated manually.
- The table of contents is a third manually maintained representation of the issue structure.

### Editorial planning content

The entire “Current Story Plan” section is hard-coded internal planning data:

- Editorial lanes.
- Proposed story names.
- Named subjects.
- Page-length estimates.
- Production status such as “not started.”
- Grouping and priority decisions.

This information is useful to editors but should not normally be part of the public issue page.

### Story and section content

All of the following are embedded directly in HTML:

- Section kickers, titles, and introductions.
- Story categories, titles, summaries, and links.
- Faculty, alumni, student, retiree, and memorial names.
- Awards and fellowship names.
- Research project names and descriptions.
- Commencement and giving copy.
- Optional-section instructions.
- Long-form article placeholder instructions.
- Template notes.

### Media choices

- Every image path.
- Every alt description.
- The implied association between an image and a story.
- No captions, credits, rights information, or focal-point data are present.

### External links

- The EPSS giving URL is hard-coded in two places.

### Prototype/editorial instructions exposed as public copy

Several blocks describe how editors should use the template rather than presenting finished reader-facing content. Examples include:

- “These cards are editorial placeholders...”
- “Use this module...”
- “Feature slot...”
- “Replace this block...”
- “Suggested fields...”
- The complete “Template Notes” section.

These should eventually live in an editor interface, schema documentation, or preview-only mode.

## 4. Which Parts of `styles.css` Define the Visual Identity

### Brand and palette

The `:root` custom properties are the core visual identity:

- `--ucla-blue: #2774ae`
- `--ucla-gold: #ffd100`
- Dark editorial navy/black through `--deep`
- Warm paper background through `--paper`
- Supporting clay, moss, ice, mist, ink, muted text, and line colors

These tokens create a UCLA base with earth/science-oriented secondary colors.

### Typography

- System-first sans-serif stack beginning with Inter.
- Very large, compressed-feeling hero and section scales.
- Heavy font weights for navigation, labels, links, and headings.
- Uppercase, tracked kickers and categories.
- Tight heading line heights create the strongest editorial/magazine quality.

No font files or external font imports are present, so Inter will only appear where already installed; otherwise the system fallback is used.

### Editorial layout language

- Large full-bleed hero.
- Strong dark/light color blocking.
- Multi-column magazine grids.
- Image-led cards.
- Thin borders and square corners.
- Minimal decorative framing.
- Large content spacing.
- Alternating paper, white, blue-tinted, moss, and deep backgrounds.

### Signature treatments

- Layered dark hero gradients over photography.
- UCLA-gold primary buttons and accent lines.
- Floating translucent issue-summary card.
- Circular donation badge with shadow and hover lift.
- Moss-green research/Q&A band.
- Dark donor and long-form feature panels.
- Blue hover states in navigation and the table of contents.

### Motion and interaction styling

- Smooth anchor scrolling.
- Hero metadata entrance animation.
- Donation-badge hover and focus effects.
- Native accordion interaction styled as translucent panels.

### Responsive identity

- At 980px, major multi-column layouts collapse or reduce columns.
- At 700px, desktop navigation becomes a menu button, grids become single-column, spacing tightens, and the mobile menu state becomes visible.
- The same color and type system is retained across breakpoints.

### Future design-system candidates

The following should become named reusable tokens or component variants:

- Colors and opacity values.
- Type scale and font weights.
- Page/section spacing.
- Grid gaps and breakpoints.
- Border and shadow styles.
- Button variants.
- Section color themes.
- Card variants.
- Image aspect ratios.
- Motion timing.

The donation badge’s visual identity is split between `index.html` and `styles.css`; it should eventually become its own reusable component or asset.

## 5. What `script.js` Currently Controls

`script.js` controls only the mobile navigation:

1. Selects the mobile menu button and mobile navigation element.
2. Toggles the `is-open` class when the button is clicked.
3. Updates the button’s `aria-expanded` value.
4. Closes the mobile navigation when a mobile navigation link is clicked.
5. Uses optional chaining so missing elements do not cause an error.

The native research accordions do not require JavaScript because they use `<details>` elements.

The script does not currently provide:

- Content loading or rendering.
- Issue switching.
- Client-side routing.
- Search, filtering, or sorting.
- Donor lookup.
- Gallery/lightbox behavior.
- Analytics.
- Form handling.
- Editorial/admin controls.

## 6. What `content-audit.md` Already Says

The existing audit was last checked against a planning sheet on April 30, 2026. Its purpose is to ensure that every proposed article has a visible home in the layout.

### Main conclusion

It marks nearly every planned item as “Represented clearly,” including:

- Student and faculty features.
- Retirements and farewells.
- Awards and fellowships.
- Memorials and obituaries.
- Research updates.
- EPSSSO.
- Alumni profile.
- Art/science interview.
- Journal covers.
- Field program and Suburban retrospective.
- RIMFAX.
- Giving and commencement.

### Decisions it still identifies

- Choose the final student feature subject.
- Confirm whether the Chair’s Note needs a full article.
- Publish “Welcome New Faculty and Staff” only if names and photos are confirmed.
- Decide whether cover artwork is only the hero treatment or a separate visible module.
- Confirm source details such as the spelling/name associated with Candace Hansen.

### Meeting-notes cross-check

It states that all meeting-note categories have a visible representation and treats “Welcome New Faculty and Staff” as an optional annual slot.

### Current inconsistencies

The audit should not be treated as automatically synchronized with the HTML:

- It says the David Southwood lecture has an Issue Briefs card, but no David Southwood brief appears in the current `index.html`.
- The older spreadsheet imports still call EPSSSO, Jewitt/Hilke, Geophysics 136C, journal covers, and summer fellowships vague or missing even though most now have visible cards.
- The spreadsheet imports say “Welcome New Faculty and Staff” is not visible, while the current HTML includes an optional brief card.

This confirms the need for one source of truth that can generate both the public site and an editorial coverage report.

## 7. Content That Should Eventually Become Database or Content Fields

A headless CMS or structured content store is a better fit than using HTML as the database. The model should separate public content from internal planning metadata.

### Issue

- `title`
- `slug`
- `year`
- `dateLabel` or academic-year range
- `status` (`draft`, `review`, `published`, `archived`)
- `kicker`
- `dek`
- `heroMedia`
- `heroFocalPoint`
- `theme`
- `seoTitle`
- `seoDescription`
- `socialImage`
- `publishedAt`
- `donationCta`
- `issueSummary`

### Section

- `issueId`
- `type` or component variant
- `slug`
- `kicker`
- `title`
- `introduction`
- `displayOrder`
- `theme`
- `enabled`
- `showInNavigation`
- `showInTableOfContents`

### Story/article

- `issueId`
- `sectionId`
- `contentType`
- `slug`
- `category`
- `title`
- `subtitle`
- `summary`
- `body` as structured rich text or Markdown
- `authors`
- `people`
- `primaryMedia`
- `gallery`
- `captions`
- `pullQuotes`
- `relatedLinks`
- `relatedStories`
- `featured`
- `displayOrder`
- `publicationStatus`
- `publishedAt`

### Person

- `name`
- `slug`
- `preferredName`
- `role`
- `EPSSAffiliation`
- `classYear`
- `profileImage`
- `imageAlt`
- `shortBio`
- `externalLinks`

People should be related to stories rather than copied into each article.

### Media asset

- `file`
- `title`
- `altText`
- `caption`
- `credit`
- `copyrightHolder`
- `rightsOrPermissionStatus`
- `source`
- `width`
- `height`
- `focalPoint`
- `issueAssociations`
- `peopleAssociations`

### Recognition and awards

- `awardName`
- `recipient`
- `recipientType`
- `year`
- `description`
- `link`
- `displayGroup`
- `displayOrder`

### Memorials, retirements, and welcomes

These can share a person-centered story model with a subtype, but may need:

- `eventType`
- `person`
- `dates`
- `roleOrService`
- `tributeText`
- `careerHighlights`

### Donor recognition

- `issueId`
- `displayName`
- `fundOrEndowment`
- `givingLevel`
- `displayOrder`
- `anonymous`
- `consentToPublish`

Donor data requires a defined privacy and approval process before publication.

### Commencement

- `academicYear`
- `ceremonyDate`
- `intro`
- `graduates`
- `speakers`
- `awardees`
- `gallery`

### Navigation and calls to action

- Labels, destinations, order, visibility, and external-link behavior.
- Navigation should usually be generated from enabled sections and stories rather than entered independently.

### Internal editorial planning

These fields should not render publicly:

- `owner`
- `sourceMaterial`
- `coverageStatus`
- `productionStatus`
- `priority`
- `targetLength`
- `deadline`
- `editorNotes`
- `factCheckStatus`
- `imageStatus`
- `approvalStatus`
- `decisionNeeded`

## 8. Components the Future App Will Need

### Global components

- App/page shell.
- Shared metadata/SEO component.
- Header and desktop navigation.
- Mobile menu.
- Footer.
- Skip link and accessibility utilities.
- Button/link variants.
- Responsive image/media component.

### Issue components

- Issue hero.
- Issue summary card.
- Donation callout/badge.
- Dynamic table of contents.
- Section heading.
- Section renderer that maps content types to visual variants.
- Previous/next issue navigation.
- Annual issue archive/index.

### Story components

- Lead feature card.
- Standard feature card.
- Brief card.
- Person/profile card.
- Image-led story card.
- Research update accordion.
- Long-form article renderer.
- Rich-text elements for headings, figures, captions, pull quotes, links, lists, and embeds.
- Related-story links.
- Author/person attribution.

### Specialized editorial components

- Planning board for authenticated/editor preview use only.
- Awards and recognition list.
- Fellowship/recipient list.
- Memorial and retirement cards.
- Journal-cover gallery.
- Field/photo essay gallery.
- Commencement gallery and graduate list.
- Donor/endowment honor roll with optional grouping and search.
- Optional annual “Welcome New Faculty and Staff” module.

### Content-management support

- Draft and preview states.
- Required-field validation.
- Missing-alt-text and missing-credit warnings.
- Section ordering.
- Story status and coverage dashboard.
- Media library.
- Publish/unpublish controls.
- Issue duplication or “create next year from template.”

## 9. Recommended Implementation Path

### 1. Preserve the current page as the visual reference

- Treat the existing static site as the baseline for appearance and behavior.
- Do not edit it during the initial migration.
- Capture desktop and mobile reference screenshots before later implementation work.
- Preserve the current source files as a legacy/reference version.

### 2. Define the content model before choosing database tables

- Convert the field groups in section 7 into a formal schema.
- Separate public content from internal editorial workflow fields.
- Decide which section types are permanent annual slots and which are optional.
- Resolve duplicate sources of truth across HTML, Markdown, CSV, and TSV.

### 3. Extract the current issue into structured content

- Represent the 2025–2026 issue in JSON/YAML and Markdown, or directly in a CMS.
- Keep story bodies separate from layout configuration.
- Create media metadata for every image actually used.
- Generate navigation and contents links from the same structured records.

### 4. Rebuild the existing page as reusable components

Recommended frontend: **Astro with TypeScript and schema-validated content collections**.

Why it fits:

- The newsletter is content-heavy and mostly static.
- Astro can produce fast, accessible pages with very little client JavaScript.
- Annual issues and article routes can be generated at build time.
- Content collections provide typed schemas before a full CMS is introduced.
- The existing HTML and CSS can be migrated incrementally with minimal visual change.

The first componentized version should reproduce the current page before adding new features.

### 5. Introduce annual issue routing

Use durable URLs such as:

- `/newsletter/2026/`
- `/newsletter/2026/rimfax/`
- `/newsletter/2026/allen-glazner/`
- `/newsletter/` for the issue archive or latest issue

Store issue relationships explicitly so a new year can reuse component types without copying markup.

### 6. Move editorial content into a CMS when editor workflow is ready

A schema-based headless CMS is preferable to exposing raw database tables to editors. It should support:

- Rich text.
- Image metadata and focal points.
- Draft previews.
- Reordering.
- References between people, stories, awards, and issues.
- Validation and publishing roles.

The Astro content schema can serve as the prototype for the eventual CMS schema. If the team initially prefers files and Git-based review, the CMS can be deferred without changing the component model.

### 7. Keep interactivity selective

Add client-side behavior only where it improves the reader experience:

- Mobile navigation.
- Donor or award search for long lists.
- Gallery/lightbox behavior.
- Optional filtering.
- Analytics and share controls.

Long-form articles, cards, navigation, and most issue pages should remain server-rendered or statically generated.

### 8. Add validation and migration checks

- Confirm every enabled story appears in navigation or a section as intended.
- Detect broken anchors and links.
- Require alt text and media credits.
- Flag draft/editorial notes that accidentally reach production.
- Compare the componentized page against the preserved visual reference.
- Test keyboard navigation, color contrast, reduced motion, mobile layouts, and screen-reader landmarks.

### 9. Create the next annual issue by data, not duplication

The successful end state is:

- One shared design system.
- One reusable component library.
- One content schema.
- Multiple annual issue records.
- Optional sections controlled by content/configuration.
- No need to copy and manually edit a full `index.html` for each year.

