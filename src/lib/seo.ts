import type { Metadata } from 'next';
import { OG_IMAGE, SITE } from '@/content/site';

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

const OG_IMAGE_ALT = 'Pixelette Holdings, Hybrid Sweat Equity';

/**
 * Open Graph + Twitter image fields from `OG_IMAGE`.
 * Empty while `OG_IMAGE` is null so no broken image is advertised.
 * Used by root layout and every `pageMetadata` call so one asset covers the site.
 */
export function shareImageMetadata(): {
  openGraphImages?: NonNullable<NonNullable<Metadata['openGraph']>['images']>;
  twitterCard: 'summary' | 'summary_large_image';
  twitterImages?: string[];
} {
  if (!OG_IMAGE) {
    return { twitterCard: 'summary' };
  }
  return {
    openGraphImages: [{ url: OG_IMAGE, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
    twitterCard: 'summary_large_image',
    twitterImages: [OG_IMAGE],
  };
}

/**
 * Page metadata helper. The KB builder extracts exact string literals from
 * `pageMetadata({ title, description, path })` calls — keep those fields as
 * string literals at the call site.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  /** Defaults to `website`. Use `article` for insight posts. */
  ogType?: 'website' | 'article';
}): Metadata {
  const canonical = canonicalPath(input.path);
  const url = absoluteUrl(input.path);
  const titleText = input.absoluteTitle ? input.title : `${input.title} | ${SITE.name}`;
  const { openGraphImages, twitterCard, twitterImages } = shareImageMetadata();

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: titleText,
      description: input.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: input.ogType ?? 'website',
      ...(openGraphImages ? { images: openGraphImages } : {}),
    },
    twitter: {
      card: twitterCard,
      title: titleText,
      description: input.description,
      ...(twitterImages ? { images: twitterImages } : {}),
    },
  };
}
