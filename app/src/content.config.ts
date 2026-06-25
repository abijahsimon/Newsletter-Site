import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const issues = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/issues" }),
  schema: z.object({
    year: z.number().int(),
    dateLabel: z.string(),
    status: z.enum(["draft", "review", "published", "archived"]),
    title: z.string(),
    seoDescription: z.string(),
    brand: z.object({
      image: z.string(),
      alt: z.string(),
    }),
    navigation: z.array(linkSchema),
    hero: z.object({
      image: z.string(),
      imageAlt: z.string(),
      kicker: z.string(),
      title: z.string(),
      dek: z.string(),
      actions: z.array(linkSchema),
      supportCta: z.object({
        label: z.string(),
        href: z.url(),
      }),
      meta: z.object({
        eyebrow: z.string(),
        title: z.string(),
        body: z.string(),
      }),
    }),
    sections: z.array(z.record(z.string(), z.unknown())),
    footer: z.object({
      organization: z.string(),
      description: z.string(),
      backToTopLabel: z.string(),
    }),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: z.object({
    articleId: z.string(),
    issue: z.number().int(),
    slug: z.string(),
    status: z.enum(["draft", "review", "published", "archived"]),
    category: z.string(),
    title: z.string(),
    variant: z.enum(["feature", "standard"]),
  }),
});

export const collections = { issues, articles };
