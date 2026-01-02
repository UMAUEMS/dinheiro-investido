"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/constants";

export function FAQ() {
  return (
    <section
      className="py-20 lg:py-32 bg-[#E5E5E6]"
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#4F3D67] font-semibold mb-4">
            DÚVIDAS FREQUENTES
          </span>
          <h2
            id="faq-title"
            className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-6"
          >
            Perguntas frequentes
          </h2>
          <p className="text-lg text-[#736F89]">
            Encontre respostas para as dúvidas mais comuns sobre nossa plataforma.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl px-6 border-none shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
