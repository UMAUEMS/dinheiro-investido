import { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Video,
  MessageCircle,
  Mail,
  Phone,
  FileQuestion,
  Rocket,
  Settings,
  CreditCard,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMetadata } from "@/lib/metadata";
import { faqItems } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = generateMetadata({
  title: "Central de Ajuda",
  description:
    "Encontre respostas para suas dúvidas, tutoriais em vídeo, guias completos e entre em contato com nosso suporte.",
  path: "/ajuda",
});

const helpCategories = [
  {
    icon: Rocket,
    title: "Primeiros Passos",
    description: "Como criar sua primeira publicação",
    articles: 12,
  },
  {
    icon: BookOpen,
    title: "Editor e Modelos",
    description: "Aprenda a usar o editor visual",
    articles: 18,
  },
  {
    icon: Video,
    title: "Vídeos Interativos",
    description: "Gere vídeos com IA",
    articles: 8,
  },
  {
    icon: Settings,
    title: "Configurações",
    description: "Personalize sua conta",
    articles: 15,
  },
  {
    icon: CreditCard,
    title: "Pagamentos e Planos",
    description: "Assinaturas e faturamento",
    articles: 10,
  },
  {
    icon: Shield,
    title: "Segurança e Privacidade",
    description: "Proteja seu conteúdo",
    articles: 7,
  },
];

const popularArticles = [
  "Como criar um flipbook a partir de um PDF",
  "Como adicionar vídeos à sua publicação",
  "Como configurar domínio personalizado",
  "Como vender suas publicações",
  "Como exportar em MP4",
  "Como criar convites virtuais",
];

export default function AjudaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Como podemos ajudar?
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Encontre respostas, tutoriais e guias para aproveitar ao máximo a
              plataforma.
            </p>

            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
              <input
                type="text"
                placeholder="Buscar artigos, tutoriais..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-[#171A3D] placeholder:text-[#736F89] focus:outline-none focus:ring-2 focus:ring-[#4F3D67]"
                aria-label="Buscar na central de ajuda"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#171A3D] mb-4">
              Categorias de Ajuda
            </h2>
            <p className="text-lg text-[#736F89]">
              Explore nossos guias organizados por tema
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {helpCategories.map((category, index) => (
              <Card
                key={index}
                className="group bg-white border border-[#E5E5E6] hover:border-[#171A3D] cursor-pointer transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center shrink-0">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#171A3D] mb-1 group-hover:text-[#263A68]">
                        {category.title}
                      </h3>
                      <p className="text-sm text-[#736F89] mb-2">
                        {category.description}
                      </p>
                      <span className="text-xs text-[#4F3D67]">
                        {category.articles} artigos
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#171A3D] mb-4">
                Artigos Populares
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularArticles.map((article, index) => (
                <Link
                  key={index}
                  href="#"
                  className="flex items-center gap-3 bg-white p-4 rounded-xl hover:shadow-md transition-shadow"
                >
                  <FileQuestion className="w-5 h-5 text-[#4F3D67] shrink-0" />
                  <span className="text-[#171A3D] hover:text-[#263A68]">
                    {article}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#171A3D] mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-[#E5E5E6] rounded-xl px-6 border-none"
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

      {/* Contact Section */}
      <section className="py-20 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#171A3D] mb-4">
              Ainda precisa de ajuda?
            </h2>
            <p className="text-lg text-[#736F89]">
              Nossa equipe está pronta para ajudar você
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Chat */}
            <Card className="bg-white border-none text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center mb-4">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#171A3D] mb-2">Chat ao Vivo</h3>
                <p className="text-sm text-[#736F89] mb-4">
                  Converse com nossa equipe em tempo real
                </p>
                <Button variant="secondary" className="w-full">
                  Iniciar Chat
                </Button>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="bg-white border-none text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#342852] to-[#4F3D67] flex items-center justify-center mb-4">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#171A3D] mb-2">Email</h3>
                <p className="text-sm text-[#736F89] mb-4">
                  Resposta em até 24 horas úteis
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a href="mailto:suporte@dinheiroinvestidoweb.com.br">
                    Enviar Email
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="bg-white border-none text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#736F89] to-[#4F3D67] flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#171A3D] mb-2">Telefone</h3>
                <p className="text-sm text-[#736F89] mb-4">
                  Segunda a sexta, 9h às 18h
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a href="tel:+5511999999999">Ligar Agora</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
