# EPSS Annual Newsletter Implementation Plan

## Goal

Create a reusable EPSS Annual Newsletter system with:

1. A polished public annual newsletter.
2. A private editor/admin portal.
3. Multiple yearly issues.
4. Reusable categories and sections.
5. Short-form and long-form articles.
6. Reusable people profiles.
7. Managed images and other assets.
8. Draft, preview, publish, and archive workflows.

The migration must preserve the current visual design and keep the existing static site available as a working backup.

## Primary Recommendation

Build the first application version with **Astro, TypeScript, local JSON records, and Markdown article files**.

Do **not** begin with a database or authentication.

Use:

- Markdown with validated frontmatter for article bodies.
- JSON for issues, sections, people, and asset metadata.
- Astro content collections and schemas to validate all local content.
- Static generation for public newsletter pages.
- A development-only editorial preview before creating a truly private portal.

This is the safest first step because it:

- Separates content from layout without introducing infrastructure risk.
- Supports yearly issues and article routes immediately.
- Keeps content portable for a future CMS or database migration.
- Allows the public site and content model to be proven before admin workflow decisions become expensive.
- Fits a newsletter whose public content changes primarily during annual production rather than every minute.

The eventual admin portal should write to a CMS or database through a defined content service. Local JSON and Markdown should be treated as the first content repository and migration specification, not as a permanent multi-user editing system.

## Non-Negotiable Constraints

- Do not move, rename, delete, or overwrite the current `index.html`, `styles.css`, `script.js`, or existing assets during the migration.
- Keep the existing static site runnable throughout development.
- Preserve the current UCLA/EPSS visual identity, layout language, responsive behavior, and donation treatment.
- Reproduce the current design before introducing substantial redesigns.
- Build the new application in a separate directory.
- Do not expose an unauthenticated editor route on a public deployment.
- Do not make local browser storage the canonical content source.
- Do not add a database or authentication in the first build.
- Do not publish draft content in public builds.
- Do not import donor data until privacy, consent, and publishing rules are established.

## Proposed Project Boundary

Keep the current static site at the repository root as the legacy backup. Build the new system alongside it:

```text
Newsletter Site/
  assets/                       Existing static assets; unchanged
  sheet-imports/                Existing planning exports; unchanged
  index.html                    Existing backup site; unchanged
  styles.css                    Existing backup styles; unchanged
  script.js                     Existing backup behavior; unchanged
  content-audit.md
  NEWSLETTER_SITE_AUDIT.md
  IMPLEMENTATION_PLAN.md

  app/                          New Astro application
    public/
      assets/                   Copies of approved runtime assets
    src/
      components/
      content/
        issues/
        sections/
        articles/
        people/
        media/
      layouts/
      pages/
      styles/
      utilities/
    tests/
```

Copy assets into the application only when needed; never move the originals. Maintain asset metadata so duplicated files are traceable to their source.

## Proposed Content Model

### Issue

An annual publication record:

- ID and slug.
- Year and academic-year label.
- Title, kicker, description, and summary.
- Hero image and social image.
- Theme/configuration.
- Ordered section references.
- Status.
- Publish and archive dates.
- SEO fields.
- Donation call to action.

### Section

A configurable group within an issue:

- Issue reference.
- Section type.
- Slug, kicker, title, and introduction.
- Display order.
- Visual theme.
- Enabled/disabled state.
- Navigation and table-of-contents visibility.
- Ordered article references or selection rules.

### Article

A story or editorial item:

- Issue and section references.
- Slug and content type.
- Category, title, subtitle, and summary.
- Markdown body.
- People, author, and media references.
- Related links and stories.
- Featured state and display order.
- Editorial and publication status.
- Publication date.

### Person

A reusable profile:

- Name and slug.
- EPSS role or affiliation.
- Class year where relevant.
- Portrait.
- Short biography.
- Links.
- Related article references.

### Media

Metadata around a local or future remotely hosted asset:

- Stable ID.
- File path.
- Title and alt text.
- Caption and credit.
- Rights/permission status.
- Source.
- Dimensions and focal point.
- Related issues, stories, and people.

### Editorial Metadata

Private workflow fields:

- Owner.
- Production status.
- Deadline.
- Source material.
- Editor notes.
- Fact-check status.
- Image status.
- Approval status.
- Decision needed.

These fields must never render on public pages.

## Recommended Local Content Format

Use Markdown for prose and JSON for structured records.

Example:

```text
app/src/content/
  issues/
    2026.json
  sections/
    2026-lead-features.json
    2026-community.json
  articles/
    2026/
      rimfax.md
      allen-glazner.md
  people/
    allen-glazner.json
    edwin-schauble.json
  media/
    p01-01.json
    allen-glazner-portrait.json
```

Why this split:

- Markdown is comfortable for long article copy and source control review.
- JSON is explicit and predictable for ordered relationships and metadata.
- Schema validation catches missing fields, invalid statuses, duplicate slugs, and broken references before deployment.
- The records can later be imported into a CMS or database with minimal reshaping.

Avoid MDX in the first build unless a demonstrated story requirement needs executable components inside article prose. Plain Markdown is safer for editors and easier to migrate.

## Publication Lifecycle

Recommended issue and article statuses:

```text
draft → review → published → archived
```

- **Draft:** Editable and excluded from public builds.
- **Review:** Complete enough for editorial preview, but still excluded from public builds.
- **Published:** Included in the public site.
- **Archived:** Read-only historical content that remains publicly accessible unless policy requires removal.

“Preview” should be a viewing mode, not a content status.

Before authentication exists:

- Draft and review content may appear only in local development or protected internal build artifacts.
- Public static builds include only published content.
- Preview URLs must not be deployed publicly without access controls.

After authentication exists:

- Authorized editors can preview saved drafts.
- Publishing records who approved and published the change.
- Archiving removes an issue from “latest issue” promotion but preserves its durable URLs.

## Public URL Model

Use stable annual routes:

```text
/newsletter/
/newsletter/2026/
/newsletter/2026/rimfax/
/newsletter/2026/allen-glazner/
```

Rules:

- `/newsletter/` shows the latest published issue and an issue archive.
- Each issue keeps a permanent year-based URL.
- Each article slug is unique within its issue.
- Navigation and table-of-contents links are generated from structured content.
- Archived issues keep their URLs.
- A new year is created from content records, not by copying a complete HTML page.

## Phased Implementation

Each phase must remain reviewable and reversible. Do not begin the next phase until the current phase passes its exit criteria.

### Phase 0 — Preserve and Baseline the Static Site

#### Objective

Establish the current site as the protected visual and functional reference.

#### Work

- Document how to open and serve the static site.
- Record the current Git state before migration work.
- Capture reference screenshots at representative desktop, tablet, and mobile sizes.
- Record the current anchor navigation and mobile-menu behavior.
- Identify which images are actually used.
- Create a visual parity checklist from `index.html` and `styles.css`.
- Confirm that the static files will not be part of automated formatting or migration scripts.

#### Exit criteria

- The existing static site still opens and functions.
- Reference screenshots and behavior notes exist.
- No current files have been moved, renamed, or overwritten.
- A rollback consists simply of serving the existing root files.

### Phase 1 — Scaffold an Isolated Application

#### Objective

Create a minimal Astro application without changing the existing site.

#### Work

- Create the new application under `app/`.
- Configure TypeScript and static output.
- Add development, validation, test, and production-build commands.
- Establish application-level CSS entry points.
- Add a placeholder route that proves the new app builds independently.
- Document how to run the legacy site and the new app separately.

#### Not included

- No migrated newsletter page.
- No database.
- No authentication.
- No admin portal.

#### Exit criteria

- The application starts and builds independently.
- The root static site remains usable.
- No legacy asset paths or files are changed.

### Phase 2 — Define and Validate Local Content

#### Objective

Turn the audit’s proposed fields into a working, database-independent content contract.

#### Work

- Define schemas for issues, sections, articles, people, and media.
- Define valid content types and section variants.
- Define the publication-status rules.
- Add validation for slugs, years, required alt text, credits, references, and display order.
- Create a small fixture issue with one section, one article, one person, and one media record.
- Add a validation report that clearly identifies bad records.
- Document how a future CMS/database maps to each schema.

#### Not included

- Do not migrate all 2026 content yet.
- Do not build editing forms.
- Do not choose database tables.

#### Exit criteria

- Valid fixtures build successfully.
- Intentionally invalid fixtures fail with useful messages.
- Public and private/editorial fields are visibly separated.
- Schema decisions are documented before component work expands.

### Phase 3 — Reproduce the Existing Visual System

#### Objective

Convert the current page design into reusable components with visual parity.

#### Work

- Copy the required CSS into the application as a starting point while leaving `styles.css` unchanged.
- Preserve the current color tokens, typography, spacing, breakpoints, grids, and interaction states.
- Build shared components for:
  - Header and navigation.
  - Mobile navigation.
  - Issue hero.
  - Donation badge/callout.
  - Section headings.
  - Buttons and text links.
  - Footer.
- Extract the inline donation SVG into a reusable application component without changing its appearance.
- Preserve the native `<details>` pattern for research accordions.
- Add keyboard, focus, and reduced-motion checks.

#### Guardrail

Do not “clean up” the design in ways that alter its visible identity during parity work. Technical reorganization and visual changes must be reviewed separately.

#### Exit criteria

- Shared components reproduce the static header, hero, footer, and global styles.
- Desktop and mobile comparisons pass the parity checklist.
- The legacy site remains unchanged.

### Phase 4 — Build the Data-Driven Annual Issue Page

#### Objective

Render the public newsletter page from local content instead of hard-coded markup.

#### Work

- Build the issue page and section renderer.
- Implement the current visual module types:
  - Lead feature layout.
  - Brief-card grid.
  - Profile/community card grid.
  - Research update accordion.
  - Recognition layout.
  - Long-form feature panels.
  - Dynamic table of contents.
- Generate desktop navigation, mobile navigation, and contents links from the same records.
- Generate anchors from validated slugs.
- Move internal planning notes and template instructions out of the public render.
- Add explicit optional-section behavior.

#### Exit criteria

- A fixture issue renders entirely from local content.
- One content record drives all navigation references to its section or article.
- Disabled sections disappear cleanly.
- No editorial notes appear in public output.

### Phase 5 — Migrate the Current 2025–2026 Issue

#### Objective

Recreate the present issue using local JSON and Markdown while preserving visual appearance.

#### Work

- Convert current issue metadata into an issue record.
- Convert visible sections and cards into structured records.
- Convert long-form placeholders or completed stories into Markdown.
- Create person records for existing named profiles.
- Create media metadata for every asset used in the public issue.
- Correct visible copy errors only through reviewed content records.
- Reconcile discrepancies among `index.html`, `content-audit.md`, and spreadsheet imports.
- Mark unresolved stories or decisions as private editorial metadata.

#### Exit criteria

- The generated issue matches the current static page’s approved design.
- All visible content has a single structured source.
- All used images have alt text, credit/rights placeholders, and stable IDs.
- Every published section is represented in generated navigation as intended.
- The original static page remains available for side-by-side comparison.

### Phase 6 — Add Yearly Issues and Article Pages

#### Objective

Prove that the application is an annual system rather than a one-page conversion.

#### Work

- Add the issue archive route.
- Add year-based issue routes.
- Add article routes scoped by issue.
- Add previous/next issue navigation.
- Add article-to-person and article-to-media relationships.
- Add reusable people profile displays.
- Add related-story links.
- Test a second small fixture year to prove reuse.

#### Exit criteria

- Two years can render from the same schemas and components.
- Adding a new issue does not require copying page markup.
- Archived issues keep permanent URLs.
- Article and person relationships validate correctly.

### Phase 7 — Implement File-Based Draft, Preview, Publish, and Archive Rules

#### Objective

Prove the editorial lifecycle before adding infrastructure.

#### Work

- Filter public builds to published content.
- Allow draft and review content in local development.
- Add a clear preview banner and status indicator.
- Prevent search indexing in non-public preview output.
- Add build failures for invalid public content.
- Add a command or documented field change for publishing and archiving.
- Add checks that archived issues cannot accidentally become the latest issue.
- Record publication dates in content.

#### Safety limitation

This phase does not create a genuinely private web portal. Without authentication, preview remains local or available only through separately protected infrastructure.

#### Exit criteria

- Draft content is absent from the public build.
- Review content can be inspected locally.
- Published content appears publicly.
- Archived issues remain reachable but are no longer promoted as current.

### Phase 8 — Prototype the Editor/Admin Experience Without Persistence

#### Objective

Validate editor needs and screen flows before building a database and authentication layer.

#### Work

- Build a development-only editor prototype using fixture data.
- Include screens for:
  - Issue list and status.
  - Issue overview.
  - Section ordering.
  - Article list and status.
  - Article editing fields.
  - People profiles.
  - Media metadata.
  - Validation warnings.
  - Preview.
  - Publish/archive confirmation flow.
- Keep edits in memory or export a proposed JSON/Markdown change set.
- Clearly label the prototype as non-production and non-persistent.
- Test the workflow with actual newsletter editors.

#### Do not do

- Do not deploy this route publicly.
- Do not imply that it is private without authentication.
- Do not make browser storage the source of truth.
- Do not build a custom rich-text editor before validating that one is needed.

#### Exit criteria

- Editors can evaluate the complete workflow using realistic content.
- Required permissions and roles are documented.
- The future persistence interface is understood.
- Database and CMS requirements come from tested workflows rather than assumptions.

### Phase 9 — Public-Site Quality and Parallel Release

#### Objective

Prepare the generated site for production while maintaining an immediate fallback.

#### Work

- Complete accessibility testing.
- Test desktop, tablet, and mobile layouts.
- Check color contrast, focus states, headings, landmarks, and image text alternatives.
- Check links, anchors, sitemap, canonical URLs, and metadata.
- Optimize image delivery and page performance.
- Add visual regression tests for core components.
- Add content-validation and build checks to continuous integration.
- Deploy the new application to a staging URL.
- Keep the legacy static site unchanged and deployable.
- Switch the production route only after stakeholder signoff.

#### Rollback

Restore the hosting target to the existing root static site. No content conversion should destroy or invalidate that fallback.

#### Exit criteria

- Staging is approved against the visual reference.
- Public pages contain only published content.
- Performance and accessibility checks pass agreed thresholds.
- A tested rollback procedure exists.

### Phase 10 — Select the Persistent Content Platform

#### Objective

Choose a CMS/database only after the content model and editor workflow have been proven.

#### Evaluation criteria

- Editorial usability.
- Structured references among issues, sections, articles, people, and media.
- Draft previews.
- Roles and permissions.
- Approval and publication history.
- Image metadata and asset handling.
- Backup and export capability.
- UCLA hosting, privacy, security, and procurement requirements.
- Migration portability.
- Ongoing maintenance burden.

#### Work

- Compare a schema-based headless CMS with a custom database/admin application.
- Map local records to the selected platform.
- Add a content-repository interface so page components do not depend directly on one backend.
- Migrate a copy of the fixture content first.
- Compare CMS-rendered output with local-content output.

#### Exit criteria

- The selected platform supports the validated workflow.
- Content can be exported in a portable format.
- The public renderer does not require a visual rewrite.
- The local content repository remains usable for tests and emergency recovery.

### Phase 11 — Add Authentication and the Private Admin Portal

#### Objective

Turn the tested editor prototype into the real private editorial system.

#### Work

- Integrate institution-approved authentication.
- Define roles such as administrator, editor, contributor, and reviewer.
- Enforce server-side authorization for every read and write operation.
- Add persistent create/update operations.
- Add audit history.
- Add protected draft preview.
- Add publish and archive permissions.
- Add conflict handling for concurrent edits.
- Add asset upload and metadata workflows.
- Add backup, restore, and export procedures.

#### Exit criteria

- Unauthenticated users cannot access editor data or draft previews.
- Each role can perform only approved actions.
- Publishing and archiving are recorded and reversible where policy permits.
- Production content can be exported and restored.

## Component Delivery Order

Build components in this order to minimize rework:

1. Design tokens and global page shell.
2. Header, navigation, buttons, and footer.
3. Issue hero and donation callout.
4. Section heading and section renderer.
5. Feature, brief, profile, and image cards.
6. Research accordion and recognition panels.
7. Long-form article renderer.
8. Dynamic table of contents.
9. Issue archive and year navigation.
10. Editorial/admin components.

## Testing Strategy

### Content validation

- Required fields.
- Valid statuses and years.
- Unique slugs.
- Valid cross-record references.
- Valid section/article order.
- Alt text and media credits.
- No private editorial fields in public output.

### Visual regression

- Header and navigation.
- Hero at desktop and mobile widths.
- Feature grids.
- Community cards.
- Research band.
- Recognition layout.
- Donation badge.
- Table of contents.

### Functional testing

- Mobile menu state and accessibility attributes.
- Anchor navigation.
- Issue and article routes.
- Draft/public filtering.
- Archive behavior.
- Broken-link detection.

### Accessibility

- Keyboard-only navigation.
- Focus visibility.
- Heading structure.
- Landmarks and labels.
- Color contrast.
- Reduced-motion behavior.
- Image alternatives.

### Editorial workflow

- Create a draft issue.
- Add and reorder sections.
- Add an article and person.
- Assign an image with metadata.
- Preview the issue.
- Publish it.
- Archive it without breaking its URLs.

## Decisions to Make Before Database/Auth Work

- Which EPSS staff roles can create, review, publish, and archive?
- Is one approval enough to publish?
- Will article authors edit directly, or submit copy to an editor?
- Does the portal need rich-text editing, Markdown editing, or both?
- Where will production images be stored?
- What rights and credit fields are mandatory?
- What is the donor-data publication policy?
- Should archived issues remain fully public?
- Does UCLA require a specific authentication provider?
- Does the system require scheduled publication?
- Is version history required for all edits or only publication events?

## Definition of the First Successful Build

The first build is complete when:

- The legacy static site is untouched and still usable.
- The new application builds independently.
- The current 2025–2026 issue renders from validated local JSON and Markdown.
- The new page preserves the approved visual design.
- Navigation and the table of contents are generated from content.
- Articles, people, sections, and media are reusable structured records.
- Draft content is excluded from public builds.
- A second fixture year proves annual reuse.
- No database or authentication has been introduced.

## Final Architecture Direction

```text
First build
Local JSON + Markdown
        ↓
Validated content collections
        ↓
Astro reusable components
        ↓
Static public annual issues
        ↓
Development-only editor prototype
        ↓
CMS/database content adapter
        ↓
Authenticated private editor portal
```

This sequence protects the existing site, validates the content model early, preserves visual continuity, and postpones the most consequential infrastructure decisions until real editorial workflows have been tested.

## Technical References

- [Astro content collections](https://docs.astro.build/en/guides/content-collections/) support local Markdown and JSON, schemas, relationships, content queries, and later remote data sources.
- [Astro routing](https://docs.astro.build/en/guides/routing/) supports generated year and article routes for static output.

