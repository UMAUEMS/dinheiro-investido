import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  ShoppingBag,
  PartyPopper,
  Package,
  Presentation,
  GraduationCap,
  Utensils,
  Image as ImageIcon,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Modelos",
  description:
    "Explore nossa biblioteca de modelos profissionais para flipbooks, revistas, catálogos, apostilas, convites e muito mais. Comece a criar em minutos.",
  path: "/modelos",
});

const categories = [
  { id: "todos", label: "Todos", icon: Filter },
  { id: "revistas", label: "Revistas", icon: BookOpen },
  { id: "catalogos", label: "Catálogos", icon: ShoppingBag },
  { id: "educacao", label: "Educação", icon: GraduationCap },
  { id: "apresentacoes", label: "Apresentações", icon: Presentation },
  { id: "convites", label: "Convites", icon: PartyPopper },
  { id: "cardapios", label: "Cardápios", icon: Utensils },
  { id: "portfolios", label: "Portfólios", icon: ImageIcon },
];

const templates = [
  {
    id: 1,
    title: "Revista Corporativa",
    category: "revistas",
    description: "Ideal para relatórios anuais e comunicação institucional",
    pages: 24,
    color: "#171A3D",
  },
  {
    id: 2,
    title: "Catálogo de Produtos",
    category: "catalogos",
    description: "Apresente seus produtos de forma profissional",
    pages: 16,
    color: "#263A68",
  },
  {
    id: 3,
    title: "Apostila Educacional",
    category: "educacao",
    description: "Perfeito para materiais didáticos e cursos",
    pages: 32,
    color: "#342852",
  },
  {
    id: 4,
    title: "Apresentação Executiva",
    category: "apresentacoes",
    description: "Impressione em reuniões e pitches",
    pages: 12,
    color: "#4F3D67",
  },
  {
    id: 5,
    title: "Convite de Casamento",
    category: "convites",
    description: "Elegante e personalizável para seu grande dia",
    pages: 4,
    color: "#736F89",
  },
  {
    id: 6,
    title: "Cardápio Digital",
    category: "cardapios",
    description: "Moderno e fácil de atualizar",
    pages: 8,
    color: "#171A3D",
  },
  {
    id: 7,
    title: "Portfólio Criativo",
    category: "portfolios",
    description: "Mostre seus melhores trabalhos",
    pages: 20,
    color: "#263A68",
  },
  {
    id: 8,
    title: "Lookbook de Moda",
    category: "catalogos",
    description: "Destaque sua coleção com estilo",
    pages: 24,
    color: "#342852",
  },
  {
    id: 9,
    title: "Manual do Usuário",
    category: "educacao",
    description: "Instruções claras e organizadas",
    pages: 40,
    color: "#4F3D67",
  },
  {
    id: 10,
    title: "Revista de Viagem",
    category: "revistas",
    description: "Compartilhe suas aventuras",
    pages: 28,
    color: "#736F89",
  },
  {
    id: 11,
    title: "Convite de Aniversário",
    category: "convites",
    description: "Divertido e colorido",
    pages: 2,
    color: "#171A3D",
  },
  {
    id: 12,
    title: "Flashcards Educativos",
    category: "educacao",
    description: "Aprenda de forma interativa",
    pages: 50,
    color: "#263A68",
  },
];

export default function ModelosPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Modelos profissionais para começar rápido
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Escolha entre centenas de templates prontos e personalize com seus
              conteúdos em minutos.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-[#E5E5E6] sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  category.id === "todos"
                    ? "bg-[#171A3D] text-white"
                    : "bg-[#E5E5E6] text-[#171A3D] hover:bg-[#171A3D] hover:text-white"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className="group bg-white border-none overflow-hidden"
              >
                {/* Preview */}
                <div
                  className="aspect-[3/4] relative"
                  style={{ backgroundColor: `${template.color}10` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-32 h-40 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: template.color }}
                    >
                      <div className="p-3">
                        <div className="w-full h-2 bg-white/30 rounded mb-2" />
                        <div className="w-3/4 h-2 bg-white/20 rounded mb-4" />
                        <div className="space-y-1">
                          <div className="w-full h-1 bg-white/10 rounded" />
                          <div className="w-full h-1 bg-white/10 rounded" />
                          <div className="w-2/3 h-1 bg-white/10 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button asChild className="bg-white text-[#171A3D]">
                      <Link href="/auth">Usar Modelo</Link>
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#171A3D] mb-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-[#736F89] mb-2">
                    {template.description}
                  </p>
                  <span className="text-xs text-[#736F89]">
                    {template.pages} páginas
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              Carregar mais modelos
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#171A3D] mb-6">
            Não encontrou o que procura?
          </h2>
          <p className="text-xl text-[#736F89] mb-8 max-w-2xl mx-auto">
            Comece do zero ou envie seu próprio arquivo PDF para transformar em
            uma publicação interativa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth">Criar do Zero</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/auth">Enviar PDF</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
