import { Metadata } from "next";
import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateMetadata, generateProductJsonLd } from "@/lib/metadata";
import { plans, faqItems } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = generateMetadata({
  title: "Preços",
  description:
    "Conheça os planos do Dinheiro Investido. Comece grátis e escale conforme sua necessidade. Planos para criadores, empresas e instituições.",
  path: "/precos",
});

const pricingFaqs = [
  {
    question: "Posso testar antes de assinar?",
    answer:
      "Sim! O plano Grátis permite criar até 3 publicações sem custo. Você pode experimentar todos os recursos básicos antes de decidir assinar.",
  },
  {
    question: "Como funciona a exportação em MP4?",
    answer:
      "No plano Grátis, a exportação MP4 é paga por download. No plano Profissional, você tem 5 exportações por mês incluídas. No Empresarial, as exportações são ilimitadas.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim, você pode cancelar sua assinatura a qualquer momento. Você continuará tendo acesso até o final do período pago.",
  },
  {
    question: "Existe desconto para pagamento anual?",
    answer:
      "Sim! Ao optar pelo pagamento anual, você economiza até 20% em comparação com o pagamento mensal.",
  },
  {
    question: "O que acontece com minhas publicações se eu cancelar?",
    answer:
      "Suas publicações continuam disponíveis para visualização, mas você não poderá criar novas ou editar as existentes até reativar um plano.",
  },
];

export default function PrecosPage() {
  const productJsonLd = plans.map((plan) =>
    generateProductJsonLd({
      name: `${plan.name} - Dinheiro Investido`,
      description: plan.description,
      price: plan.price.replace("R$ ", "").replace("/mês", ""),
    })
  );

  return (
    <>
      {productJsonLd.map((jsonLd, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Planos para cada necessidade
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Comece grátis e escale conforme seu crescimento. Sem surpresas,
              sem taxas ocultas.
            </p>
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white/10 rounded-full p-1">
              <button className="px-6 py-2 rounded-full bg-white text-[#171A3D] font-medium">
                Mensal
              </button>
              <button className="px-6 py-2 rounded-full text-white/80 hover:text-white">
                Anual (-20%)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-white border-none ${
                  plan.highlighted
                    ? "ring-2 ring-[#171A3D] scale-105 shadow-xl"
                    : ""
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#171A3D] to-[#263A68] text-white text-sm font-medium px-4 py-1 rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-0">
                  <CardTitle className="text-2xl text-[#171A3D]">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#171A3D]">
                      {plan.price}
                    </span>
                    <span className="text-[#736F89]">{plan.period}</span>
                  </div>
                  <p className="text-[#736F89] mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-[#171A3D]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "secondary"}
                    asChild
                  >
                    <Link href="/auth">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-4">
              Comparação detalhada
            </h2>
            <p className="text-lg text-[#736F89]">
              Veja todas as diferenças entre os planos
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E5E6]">
                  <th className="text-left py-4 px-4 font-semibold text-[#171A3D]">
                    Recurso
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[#171A3D]">
                    Grátis
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[#171A3D]">
                    Profissional
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-[#171A3D]">
                    Empresarial
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Publicações", "3", "Ilimitadas", "Ilimitadas"],
                  ["Visualizações", "Ilimitadas", "Ilimitadas", "Ilimitadas"],
                  ["Modelos", "Básicos", "Todos", "Todos + Exclusivos"],
                  ["Marca d'água", "Sim", "Não", "Não"],
                  ["Domínio personalizado", "Não", "Sim", "Sim"],
                  ["Exportação MP4", "Paga", "5/mês", "Ilimitada"],
                  ["Analytics", "Básico", "Avançado", "Completo"],
                  ["Loja de packs", "Não", "Não", "Sim"],
                  ["Convites virtuais", "Não", "Não", "Sim"],
                  ["API", "Não", "Não", "Sim"],
                  ["Usuários", "1", "1", "Ilimitados"],
                  ["Suporte", "Email", "Prioritário", "Dedicado"],
                ].map((row, index) => (
                  <tr key={index} className="border-b border-[#E5E5E6]">
                    <td className="py-4 px-4 text-[#171A3D]">{row[0]}</td>
                    <td className="py-4 px-4 text-center text-[#736F89]">
                      {row[1]}
                    </td>
                    <td className="py-4 px-4 text-center text-[#736F89]">
                      {row[2]}
                    </td>
                    <td className="py-4 px-4 text-center text-[#736F89]">
                      {row[3]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-4">
              Perguntas sobre preços
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {pricingFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl px-6 border-none shadow-sm"
                >
                  <AccordionTrigger className="text-left text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ainda tem dúvidas?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano
            para suas necessidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-white text-[#171A3D] hover:bg-white/90"
            >
              <Link href="/auth">Começar Grátis</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link href="/ajuda">Falar com Suporte</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
