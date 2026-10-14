import { PageHero, Buttons, Btn } from '@/components/ui';
import { SITE } from '@/content/site';
import { StartupsBody } from './StartupsBody';
import { pageMetadata } from '@/lib/seo';

const TITLE = 'Startups and venture programmes';
const DESCRIPTION =
  'Whether you are building a technology venture or supporting a programme of emerging businesses, Pixelette Holdings brings specialist delivery and flexible partnership structures to help selected ventures progress.';

export const metadata = {
  ...pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: '/startups',
  }),
  keywords: [
    'technology startup development',
    'startup development partner',
    'startup equity partnership',
    'startup incubator support',
    'accelerator technology partner',
    'services for equity',
  ],
};

const faqs = [
  {
    q: 'Does Pixelette Holdings work with startups and venture programmes?',
    a: 'Whether you are building a technology venture or supporting a programme of emerging businesses, Pixelette Holdings brings specialist delivery and flexible partnership structures to help selected ventures progress.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: TITLE,
  description: DESCRIPTION,
  url: `${SITE.url}/startups/`,
  inLanguage: 'en-GB',
  isPartOf: {
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
  },
};

export default function StartupsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: TITLE }]}
        eyebrow="Startups and venture programmes"
        title="Build your startup with the right execution partner"
        lead="Whether you are building a new technology venture or supporting a programme of emerging businesses, Pixelette Holdings brings together specialist delivery capability and flexible commercial partnership structures to help selected ventures progress from concept towards launch and growth."
      >
        <Buttons>
          <Btn href="#pathways">Explore partnership options</Btn>
          <Btn href="/hse-model" variant="secondary">How Hybrid Sweat Equity works</Btn>
        </Buttons>
      </PageHero>
      <StartupsBody />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
