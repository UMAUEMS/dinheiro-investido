import {
  BookOpen,
  Video,
  Sparkles,
  Search,
  ShoppingCart,
  Shield,
  Smartphone,
  Accessibility,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const iconMap = {
  BookOpen,
  Video,
  Sparkles,
  Search,
  ShoppingCart,
  Shield,
  Smartphone,
  Accessibility,
};

const features = [
  {
    icon: "BookOpen",
    title: "Flipbooks Interativos",
    description:
      "Transforme PDFs em publicações com efeito realista de virada de página que encanta seus leitores.",
  },
  {
    icon: "Video",
    title: "Vídeos Interativos",
    description:
      "Gere vídeos com personagens animados a partir do seu conteúdo em segundos.",
  },
  {
    icon: "Sparkles",
    title: "IA Integrada",
    description:
      "Assistente inteligente que melhora textos, organiza conteúdo e responde perguntas automaticamente.",
  },
  {
    icon: "Search",
    title: "SEO Automático",
    description:
      "Seu conteúdo otimizado para buscadores sem esforço técnico. Seja encontrado facilmente.",
  },
  {
    icon: "ShoppingCart",
    title: "Venda Online",
    description:
      "Monetize suas publicações com checkout integrado, gestão de vendas e relatórios completos.",
  },
  {
    icon: "Shield",
    title: "Segurança Total",
    description:
      "Proteção por senha, controle de downloads, marcas d'água e conformidade com LGPD.",
  },
  {
    icon: "Smartphone",
    title: "100% Responsivo",
    description:
      "Funciona perfeitamente em computador, tablet e celular. Experiência consistente em qualquer tela.",
  },
  {
    icon: "Accessibility",
    title: "Acessibilidade",
    description:
      "Compatível com WCAG para inclusão de todos os usuários. Conteúdo acessível para todos.",
  },
];

export function Features() {
  return (
    <section
      className="py-20 lg:py-32 bg-[#E5E5E6]"
      aria-labelledby="features-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[#4F3D67] font-semibold mb-4">
            RECURSOS PODEROSOS
          </span>
          <h2
            id="features-title"
            className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-6"
          >
            Tudo que você precisa para criar publicações incríveis
          </h2>
          <p className="text-lg text-[#736F89]">
            Recursos avançados que funcionam de forma simples e intuitiva, 
            sem exigir conhecimento técnico.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <Card
                key={index}
                className="group bg-white border-none hover:bg-gradient-to-br hover:from-[#171A3D] hover:to-[#263A68]"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#171A3D] mb-2 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#736F89] group-hover:text-white/80 transition-colors">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
