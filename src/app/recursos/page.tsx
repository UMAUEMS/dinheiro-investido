import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Video,
  Sparkles,
  Search,
  ShoppingCart,
  Shield,
  Smartphone,
  Accessibility,
  Palette,
  Layers,
  Zap,
  Globe,
  Lock,
  BarChart3,
  Download,
  Users,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Recursos",
  description:
    "Conheça todos os recursos da plataforma Dinheiro Investido: flipbooks interativos, vídeos com IA, SEO automático, vendas online e muito mais.",
  path: "/recursos",
});

const mainFeatures = [
  {
    icon: BookOpen,
    title: "Flipbooks Interativos",
    description:
      "Transforme PDFs em publicações digitais com efeito realista de virada de página. Adicione vídeos, áudios, links e elementos interativos.",
    highlights: [
      "Efeito de virada de página realista",
      "Suporte a vídeo, áudio e links",
      "Zoom e navegação por miniaturas",
      "Pesquisa no texto",
    ],
  },
  {
    icon: Video,
    title: "Vídeos Interativos com IA",
    description:
      "Gere vídeos com personagens animados a partir do seu conteúdo. Escolha estilos e durações, sem conhecimento técnico.",
    highlights: [
      "Personagens animados",
      "Múltiplos estilos visuais",
      "Duração de 30s a 5 minutos",
      "Botões interativos no vídeo",
    ],
  },
  {
    icon: Sparkles,
    title: "IA Integrada",
    description:
      "Assistente inteligente que melhora textos, organiza conteúdo, sugere layouts e responde perguntas sobre suas publicações.",
    highlights: [
      "Melhoria automática de textos",
      "Sugestão de layouts",
      "Chatbot do conteúdo",
      "Geração de resumos",
    ],
  },
  {
    icon: Search,
    title: "SEO Automático",
    description:
      "Seu conteúdo otimizado para buscadores automaticamente. URLs amigáveis, metadados, sitemap e schema sem esforço.",
    highlights: [
      "URLs amigáveis automáticas",
      "Metadados otimizados",
      "Sitemap automático",
      "Schema.org integrado",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Integrado",
    description:
      "Venda suas publicações diretamente na plataforma. Checkout integrado, gestão de produtos e relatórios de vendas.",
    highlights: [
      "Checkout integrado",
      "Paywall por publicação",
      "Assinaturas e bundles",
      "Relatórios de vendas",
    ],
  },
  {
    icon: Shield,
    title: "Segurança e LGPD",
    description:
      "Proteção completa para seu conteúdo e dados. Conformidade total com a LGPD e recursos avançados de segurança.",
    highlights: [
      "Proteção por senha",
      "Controle de downloads",
      "Marcas d'água opcionais",
      "Conformidade LGPD",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Palette,
    title: "Editor Visual Intuitivo",
    description: "Edite com cliques e arrastar-e-soltar, sem código.",
  },
  {
    icon: Layers,
    title: "Modelos Profissionais",
    description: "Centenas de templates prontos para usar.",
  },
  {
    icon: Zap,
    title: "Performance Otimizada",
    description: "Carregamento rápido e Core Web Vitals.",
  },
  {
    icon: Globe,
    title: "Domínio Personalizado",
    description: "Use seu próprio domínio nas publicações.",
  },
  {
    icon: Lock,
    title: "Publicação Privada",
    description: "Controle quem pode ver seu conteúdo.",
  },
  {
    icon: BarChart3,
    title: "Analytics Completo",
    description: "Métricas de visualização e engajamento.",
  },
  {
    icon: Download,
    title: "Exportação MP4",
    description: "Baixe seus vídeos para usar em qualquer lugar.",
  },
  {
    icon: Users,
    title: "Colaboração",
    description: "Trabalhe em equipe nas suas publicações.",
  },
  {
    icon: Smartphone,
    title: "100% Responsivo",
    description: "Funciona em qualquer dispositivo.",
  },
  {
    icon: Accessibility,
    title: "Acessibilidade WCAG",
    description: "Conteúdo acessível para todos.",
  },
];

export default function RecursosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Recursos poderosos, uso simples
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Tudo que você precisa para criar publicações digitais incríveis,
              sem precisar de conhecimento técnico.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-white text-[#171A3D] hover:bg-white/90"
            >
              <Link href="/auth">Começar Grátis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-[#4F3D67] font-semibold mb-4">
              RECURSOS PRINCIPAIS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171A3D]">
              O que torna nossa plataforma única
            </h2>
          </div>

          <div className="space-y-16">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#171A3D]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-lg text-[#736F89] mb-6">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-[#171A3D]">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className="aspect-video bg-gradient-to-br from-[#E5E5E6] to-white rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-24 h-24 text-[#171A3D]/20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-[#4F3D67] font-semibold mb-4">
              E MUITO MAIS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#171A3D]">
              Recursos adicionais
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="bg-white border-none">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#171A3D] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#736F89]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Crie sua primeira publicação gratuitamente e descubra todo o
            potencial da plataforma.
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
              <Link href="/precos">Ver Planos</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
