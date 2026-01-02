import { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Building,
  Megaphone,
  ShoppingBag,
  PartyPopper,
  Package,
  Eye,
  Heart,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Galeria de Exemplos",
  description:
    "Explore nossa galeria de publicações criadas com o Dinheiro Investido. Flipbooks, revistas, catálogos, convites e muito mais.",
  path: "/galeria",
});

const categories = [
  { id: "todos", label: "Todos", icon: Filter },
  { id: "educacao", label: "Educação", icon: GraduationCap },
  { id: "institucional", label: "Institucional", icon: Building },
  { id: "marketing", label: "Marketing", icon: Megaphone },
  { id: "vendas", label: "Vendas", icon: ShoppingBag },
  { id: "convites", label: "Convites", icon: PartyPopper },
  { id: "packs", label: "Packs", icon: Package },
];

const examples = [
  {
    id: 1,
    title: "Apostila de Matemática",
    category: "educacao",
    author: "Prof. Maria Silva",
    views: 1250,
    likes: 89,
    color: "#263A68",
  },
  {
    id: 2,
    title: "Relatório Anual 2024",
    category: "institucional",
    author: "Empresa ABC",
    views: 3420,
    likes: 156,
    color: "#342852",
  },
  {
    id: 3,
    title: "Catálogo Primavera",
    category: "marketing",
    author: "Loja Fashion",
    views: 5670,
    likes: 234,
    color: "#4F3D67",
  },
  {
    id: 4,
    title: "Cardápio Digital",
    category: "vendas",
    author: "Restaurante Sabor",
    views: 2890,
    likes: 178,
    color: "#171A3D",
  },
  {
    id: 5,
    title: "Convite de Casamento",
    category: "convites",
    author: "Ana & Pedro",
    views: 890,
    likes: 67,
    color: "#736F89",
  },
  {
    id: 6,
    title: "Pack Capas Religiosas",
    category: "packs",
    author: "Arte Cristã",
    views: 4560,
    likes: 312,
    color: "#263A68",
  },
  {
    id: 7,
    title: "Livro de Receitas",
    category: "educacao",
    author: "Chef Carlos",
    views: 7890,
    likes: 456,
    color: "#342852",
  },
  {
    id: 8,
    title: "Manual do Colaborador",
    category: "institucional",
    author: "Tech Corp",
    views: 1230,
    likes: 45,
    color: "#4F3D67",
  },
  {
    id: 9,
    title: "Lookbook Verão",
    category: "marketing",
    author: "Marca XYZ",
    views: 6780,
    likes: 389,
    color: "#171A3D",
  },
  {
    id: 10,
    title: "Lista de Produtos",
    category: "vendas",
    author: "Distribuidora",
    views: 2340,
    likes: 123,
    color: "#736F89",
  },
  {
    id: 11,
    title: "Convite Aniversário",
    category: "convites",
    author: "Festa Kids",
    views: 560,
    likes: 34,
    color: "#263A68",
  },
  {
    id: 12,
    title: "Pack Infantil",
    category: "packs",
    author: "Artes Fofas",
    views: 3450,
    likes: 267,
    color: "#342852",
  },
];

export default function GaleriaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Galeria de Exemplos
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Inspire-se com publicações criadas por nossa comunidade de
              criadores.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-[#E5E5E6] sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={
                  category.id === "todos"
                    ? "/galeria"
                    : `/categorias/${category.id}`
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  category.id === "todos"
                    ? "bg-[#171A3D] text-white"
                    : "bg-[#E5E5E6] text-[#171A3D] hover:bg-[#171A3D] hover:text-white"
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {examples.map((example) => (
              <Card
                key={example.id}
                className="group bg-white border-none overflow-hidden"
              >
                {/* Preview */}
                <div
                  className="aspect-[3/4] relative"
                  style={{ backgroundColor: `${example.color}10` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-32 h-40 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: example.color }}
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
                      <Link href="#">Ver Publicação</Link>
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#171A3D] mb-1">
                    {example.title}
                  </h3>
                  <p className="text-sm text-[#736F89] mb-3">
                    por {example.author}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-[#736F89]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {example.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {example.likes}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              Carregar mais exemplos
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Crie sua própria publicação
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Junte-se à nossa comunidade e comece a criar publicações incríveis
            como essas.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-[#171A3D] hover:bg-white/90"
          >
            <Link href="/auth">Começar Grátis</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
