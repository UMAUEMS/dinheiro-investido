import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhatYouCanCreate } from "@/components/sections/WhatYouCanCreate";
import { UseCases } from "@/components/sections/UseCases";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { faqItems } from "@/lib/constants";
import { generateFAQJsonLd } from "@/lib/metadata";

export default function HomePage() {
  const faqJsonLd = generateFAQJsonLd(faqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <WhatYouCanCreate />
      <UseCases />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
