/**
 * Company facts for the site assistant — Holdings only.
 *
 * Mirrors verified fields from `src/content/site.ts`. Do not reuse
 * Technologies’ sales inbox, Clutch figures, or ISO claims here.
 */

import { CONTACT, SITE } from '@/content/site';

export const SITE_URL = SITE.url;

/**
 * Homepage H1, split for the default social card.
 *
 * The joined `h1` must stay byte-identical to the homepage `<h1>`. The three
 * lines are the same words, broken for a 1200×630 thumbnail — change them
 * together or the share card drifts from the page it advertises.
 */
export const HOMEPAGE_POSITIONING = {
  lines: [
    'Build your venture',
    'with the people',
    'who deliver it',
  ],
  h1: 'Build your venture with the people who deliver it',
} as const;

export const company = {
  legalName: SITE.legalName,
  name: SITE.name,
  shortName: 'Pixelette',
  crn: SITE.companyNumber,
  registeredIn: SITE.jurisdiction,
  /** Companies House incorporation year for CRN 14921782. */
  incorporated: 2018,
  addressLine: SITE.registeredOffice,
  /** Same string as the homepage H1 / social-card alt. */
  tagline: HOMEPAGE_POSITIONING.h1,
  description:
    'Pixelette Holdings partners with selected founders through Hybrid Sweat Equity: agreed professional services in exchange for a combination of cash fees and equity participation.',
} as const;

/** Holdings does not publish a Clutch aggregate on this site. */
export const clutch = {
  ratingValue: 0,
  reviewCount: 0,
  profileUrl: '',
  lastVerified: '',
  published: false,
} as const;

export const contactEmail = CONTACT.email;
export const pressEmail = contactEmail;
