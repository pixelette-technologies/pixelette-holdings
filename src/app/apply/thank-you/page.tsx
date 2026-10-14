import { Section, SectionHead, PageHero, Buttons, Btn } from '@/components/ui';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Enquiry',
  description:
    'This page is not a receipt. A backup may be stored when you submit, but Pixelette receives the enquiry when you send the email that opens.',
  path: '/apply/thank-you',
  noIndex: true,
});

export default function ApplyThankYouPage() {
  return (
    <>
      <PageHero
        eyebrow="Explore a partnership"
        title="This page is not a receipt"
        lead="Submitting stores a backup copy when configured, then opens an email for you to send. Pixelette receives the enquiry when that message is sent. This page is not a receipt."
      />

      <Section>
        <SectionHead eyebrow="What this does not mean" title="No partnership has been created" />
        <ul className="list">
          <li>A page view is not a submission.</li>
          <li>A reply, if one is sent, does not create a partnership or a meeting.</li>
          <li>There is no promised response time.</li>
          <li>Nothing is agreed until scope and documentation are signed separately.</li>
        </ul>
        <Buttons>
          <Btn href="/apply">Return to the enquiry</Btn>
          <Btn href="/hse-model" variant="secondary">Hybrid Sweat Equity</Btn>
        </Buttons>
      </Section>
    </>
  );
}
