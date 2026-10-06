import { PageTransition } from "@/components/page-transition";
import { JsonLd } from "@/components/json-ld";
import { Hero } from "@/components/home/hero";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { ServicesBento } from "@/components/home/services-bento";
import { Process } from "@/components/home/process";
import { Showcase } from "@/components/home/showcase";
import { WhyUs } from "@/components/home/why-us";
import { DistrictsSection } from "@/components/home/districts-section";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { faqs } from "@/lib/faqs";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Home() {
  return (
    <PageTransition>
      <JsonLd data={faqSchema} />
      <Hero />
      <MarqueeStrip />
      <ServicesBento />
      <Process />
      <Showcase />
      <WhyUs />
      <DistrictsSection />
      <Faq />
      <FinalCta />
    </PageTransition>
  );
}
