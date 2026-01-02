import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  GraduationCap,
  Building,
  Megaphone,
  ShoppingBag,
  PartyPopper,
  Package,
  Eye,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/constants";
import { generateMetadata as genMeta, generateBreadcrumbJsonLd } from "@/lib/metadata";
import { siteConfig } from "@/lib/constants";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  GraduationCap,
  Building,
  Megaphone,
  ShoppingBag,
  PartyPopper,
  Package,
};

// Exemplos por categoria
const examplesByCategory: { [key: string]: Array<{
  id: number;
  title: string;
  author: string;
  views: number;
  likes: number;
}> } = {
  educacao: [
    { id: 1, title: "Apostila de Matemática", author: "Prof. Maria", views: 1250, likes: 89 },
    { id: 2, title: "Livro de Ciências", author: "Prof. João", views: 980, likes: 67 },
    { id: 3, title: "Flashcards de Inglês", author: "Teacher Ana", views: 2340, likes: 156 },
    { id: 4, title: "Material de História", author: "Prof. Carlos", views: 1560, likes: 98 },
    { id: 5, title: "Apostila de Português", author: "Profa. Lucia", views: 1890, likes: 123 },
    { id: 6, title: "Guia de Estudos ENEM", author: "Equipe Edu", views: 4560, likes: 345 },
  ],
  institucional: [
    { id: 1, title: "Relatório Anual 2024", author: "Empresa ABC", views: 3420, likes: 156 },
    { id: 2, title: "Manual do Colaborador", author: "Tech Corp", views: 1230, likes: 45 },
    { id: 3, title: "Comunicado Oficial", author: "Prefeitura", views: 5670, likes: 234 },
    { id: 4, title: "Balanço Social", author: "ONG Vida", views: 890, likes: 67 },
    { id: 5, title: "Plano Estratégico", author: "Grupo XYZ", views: 2340, likes: 123 },
    { id: 6, title: "Revista Institucional", author: "Universidade", views: 3450, likes: 189 },
  ],
  marketing: [
    { id: 1, title: "Catálogo Primavera", author: "Loja Fashion", views: 5670, likes: 234 },
    { id: 2, title: "Lookbook Verão", author: "Marca XYZ", views: 6780, likes: 389 },
    { id: 3, title: "Portfólio Criativo", author: "Studio Design", views: 4560, likes: 267 },
    { id: 4, title: "Brochura Corporativa", author: "Agência ABC", views: 2340, likes: 145 },
    { id: 5, title: "Apresentação de Vendas", author: "Sales Team", views: 1890, likes: 98 },
    { id: 6, title: "Media Kit", author: "Influencer", views: 3450, likes: 234 },
  ],
  vendas: [
    { id: 1, title: "Cardápio Digital", author: "Restaurante Sabor", views: 2890, likes: 178 },
    { id: 2, title: "Lista de Produtos", author: "Distribuidora", views: 2340, likes: 123 },
    { id: 3, title: "Catálogo de Joias", author: "Joalheria Luxo", views: 4560, likes: 267 },
    { id: 4, title: "Tabela de Preços", author: "Fornecedor", views: 1560, likes: 78 },
    { id: 5, title: "Catálogo Automotivo", author: "Concessionária", views: 3450, likes: 189 },
    { id: 6, title: "Menu de Bebidas", author: "Bar & Lounge", views: 1890, likes: 112 },
  ],
  convites: [
    { id: 1, title: "Convite de Casamento", author: "Ana & Pedro", views: 890, likes: 67 },
    { id: 2, title: "Convite Aniversário 15", author: "Maria", views: 560, likes: 34 },
    { id: 3, title: "Convite Formatura", author: "Turma 2024", views: 1230, likes: 89 },
    { id: 4, title: "Convite Batizado", author: "Família Santos", views: 450, likes: 28 },
    { id: 5, title: "Convite Corporativo", author: "Empresa XYZ", views: 780, likes: 45 },
    { id: 6, title: "Convite Chá de Bebê", author: "Mamãe Feliz", views: 670, likes: 52 },
  ],
  packs: [
    { id: 1, title: "Pack Capas Religiosas", author: "Arte Cristã", views: 4560, likes: 312 },
    { id: 2, title: "Pack Infantil", author: "Artes Fofas", views: 3450, likes: 267 },
    { id: 3, title: "Pack Masculino", author: "Design Pro", views: 2340, likes: 178 },
    { id: 4, title: "Pack Feminino", author: "Studio Rosa", views: 2890, likes: 198 },
    { id: 5, title: "Pack Batizado", author: "Artes Sacras", views: 1560, likes: 123 },
    { id: 6, title: "Pack Casamento", author: "Wedding Arts", views: 3780, likes: 289 },
  ],
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  
  if (!category) {
    return genMeta({
      title: "Categoria não encontrada",
      noIndex: true,
    });
  }

  return genMeta({
    title: category.name,
    description: category.description,
    path: `/categorias/${slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const Icon = iconMap[category.icon] || Package;
  const examples = examplesByCategory[slug] || [];

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Categorias", url: `${siteConfig.url}/galeria` },
    { name: category.name, url: `${siteConfig.url}/categorias/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Hero Section */}
      <section
        className="pt-32 pb-16 text-white"
        style={{
          background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}CC 100%)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-white/70">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/galeria" className="hover:text-white">
                    Galeria
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white">{category.name}</li>
              </ol>
            </nav>

            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                <Icon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {category.name}
                </h1>
                <p className="text-xl text-white/80">{category.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-16 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 text-[#171A3D] hover:text-[#263A68] mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Galeria
          </Link>

          {/* What you can create */}
          <div className="bg-white rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#171A3D] mb-4">
              O que você pode criar em {category.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {category.examples.map((example, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${category.color}15`,
                    color: category.color,
                  }}
                >
                  {example}
                </span>
              ))}
            </div>
          </div>

          {/* Examples Grid */}
          <h2 className="text-2xl font-bold text-[#171A3D] mb-6">
            Exemplos de {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example) => (
              <Card
                key={example.id}
                className="group bg-white border-none overflow-hidden"
              >
                {/* Preview */}
                <div
                  className="aspect-[3/4] relative"
                  style={{ backgroundColor: `${category.color}10` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-32 h-40 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: category.color }}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Crie sua publicação de {category.name}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Comece agora mesmo com nossos modelos prontos ou envie seu próprio
            arquivo.
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
              <Link href="/modelos">Ver Modelos</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
