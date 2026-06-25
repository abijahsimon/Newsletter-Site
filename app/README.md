# EPSS Newsletter App

This is the isolated, content-driven version of the EPSS annual newsletter.

The original static site remains at the repository root as the working backup. This app does not require changes to the root `index.html`, `styles.css`, `script.js`, or `assets/`.

## Requirements

- Node.js 22.12 or newer.
- pnpm 11.7.

Confirm the installed versions:

```sh
node --version
pnpm --version
```

## Run the App

From the repository root:

```sh
cd app
pnpm install
pnpm dev
```

Astro will print the local preview address, normally `http://localhost:4321/`.

Stop the development server with `Control-C`.

## Validate and Build

Run these commands from `app/`:

```sh
pnpm check
pnpm build
pnpm preview
```

- `pnpm check` validates Astro, TypeScript, and content schemas.
- `pnpm build` creates the production-ready static site in `app/dist/`.
- `pnpm preview` serves the latest production build locally.

Run `pnpm check` and `pnpm build` before committing content or application changes.

## Where Content Lives

```text
src/content/
  issues/
    2026.json
  articles/
    rimfax.md
    suburban-retrospective.md
```

### Issue and section content

Edit `src/content/issues/2026.json` for:

- Newsletter year, title, SEO description, and publication status.
- Header navigation.
- Hero image, hero copy, calls to action, and issue summary.
- Section order.
- Planning lanes.
- Feature and brief cards.
- Community/profile cards.
- Research updates.
- Awards, commencement, and giving panels.
- Table-of-contents links.
- Footer copy.

The order of objects in the `sections` array controls the order of sections on the public page. The order of cards, stories, panels, links, or items inside a section controls their display order.

Keep IDs unique. Anchor links such as `#features` must match the corresponding section or article `id`.

### Long-form articles

Edit files in `src/content/articles/` for long-form article text.

Each Markdown file starts with frontmatter:

```md
---
articleId: rimfax-full
issue: 2026
slug: rimfax
status: published
category: Long-form Template
title: RIMFAX Feature Full Article
variant: feature
---

Article text begins here.
```

Important relationships:

- `articleId` must be unique.
- `issue` must match the issue year.
- An issue’s `articles` section lists the desired `articleId` values in `articleIds`.
- The Markdown body renders beneath the article title.
- `variant: feature` uses the dark feature treatment.
- `variant: standard` uses the light article treatment.

### Publication status

Allowed statuses are:

- `draft`
- `review`
- `published`
- `archived`

The public page selects the newest issue with `status: published`. It also renders only articles with `status: published`.

Do not mark unfinished content as published merely to preview it. Phase 1 does not include a private draft-preview system.

## Safe Content Editing Workflow

1. Start the app with `pnpm dev`.
2. Edit one JSON or Markdown content file at a time.
3. Save and review the page in the browser.
4. Confirm navigation links still reach the correct sections.
5. Run `pnpm check`.
6. Run `pnpm build`.

If JSON syntax is invalid or a required field is missing, the development server or type check should report the affected content file.

## Images and Assets

The app uses its own asset copies under:

```text
public/assets/
  brand/
  images/
  people/
```

The original source assets remain in the repository-root `assets/` folder. Do not move, rename, or overwrite those originals when editing the Astro app.

### Add or replace an image

Recommended method:

1. Add the new image to the appropriate folder under `app/public/assets/`.
2. Give it a descriptive, stable filename.
3. Update the matching content field in `src/content/issues/2026.json`.
4. Update the associated alt-text field.
5. Review the image crop at desktop and mobile widths.
6. Run `pnpm check` and `pnpm build`.

Example:

```json
{
  "image": "/assets/people/new-faculty-name.jpg",
  "imageAlt": "New faculty member in an EPSS laboratory."
}
```

Paths beginning with `/assets/` resolve from `app/public/assets/`.

### Image guidance

- Prefer adding a new filename instead of replacing an unrelated existing file.
- Use JPG or WebP for photographs and SVG for approved vector brand artwork.
- Keep source images large enough for full-width display.
- Expect hero and card images to be cropped with CSS `object-fit: cover`.
- Check that the subject remains visible at both desktop and mobile sizes.
- Write useful alt text that describes the image’s relevant content.
- Preserve image credit, rights, and permission information outside the filename until dedicated media metadata is added in a later phase.

## Visual Design

`src/styles/newsletter.css` is the Phase 1 copy of the legacy `styles.css`. It preserves the current visual reference.

Content-only updates should not require editing this stylesheet. Any future visual change should be compared against the root static backup and the checks documented in `../design-qa.md`.

## Phase 1 Boundaries

This version intentionally does not include:

- A database.
- Authentication.
- An editor/admin portal.
- Private draft previews.
- Deployment configuration.
