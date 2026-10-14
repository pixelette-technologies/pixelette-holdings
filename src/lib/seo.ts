import type { Metadata } from 'next';

import { company } from '@/content/company';
import { SITE } from '@/content/site';

/** Canonical path with trailing slash (matches `trailingSlash: true`). */
export function canonicalPath(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

/** Absolute URL for a site path. */
export function absoluteUrl(path: string): string {
  const canonical = canonicalPath(path);
  return canonical === '/' ? `${SITE.url}/` : `${SITE.url}${canonical}`;
}

/** Generated default card — see `src/app/opengraph-image.tsx`. */
export const DEFAULT_OG_IMAGE = '/opengraph-image';

const OG_IMAGE_ALT = `${company.name}: ${company.tagline}`;

/**
 * Open Graph + Twitter image fields for the shared generated card.
 * Used by root layout defaults; pages should prefer `pageMetadata`.
 */
export function shareImageMetadata(image: string = DEFAULT_OG_IMAGE): {
  openGraphImages: NonNullable<NonNullable<Metadata['openGraph']>['images']>;
  twitterCard: 'summary_large_image';
  twitterImages: string[];
} {
  const openGraphImages =
    image === DEFAULT_OG_IMAGE
      ? [{ url: image, width: 1200, height: 630, alt: OG_IMAGE_ALT }]
      : [{ url: image, alt: OG_IMAGE_ALT }];

  return {
    openGraphImages,
    twitterCard: 'summary_large_image',
    twitterImages: [image],
  };
}

/**
 * Page metadata helper. The KB builder extracts exact string literals from
 * `pageMetadata({ title, description, path })` calls — keep those fields as
 * string literals at the call site.
 *
 * The opengraph-image file convention is NOT inherited by nested routes, so
 * every page names `/opengraph-image` explicitly (unless `ogImage` overrides).
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  /** Defaults to the generated `/opengraph-image` card. */
  ogImage?: string;
  /** Defaults to `website`. Use `article` for insight posts. */
  ogType?: 'website' | 'article';
}): Metadata {
  const canonical = canonicalPath(input.path);
  const url = absoluteUrl(input.path);
  const image = input.ogImage ?? DEFAULT_OG_IMAGE;
  const { openGraphImages, twitterCard, twitterImages } = shareImageMetadata(image);

  // Document title may use the root template; Open Graph does not inherit it.
  const ogTitle = input.absoluteTitle
    ? input.title
    : `${input.title} · ${SITE.name}`;

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: input.ogType ?? 'website',
      images: openGraphImages,
    },
    twitter: {
      card: twitterCard,
      title: ogTitle,
      description: input.description,
      images: twitterImages,
    },
  };
}
