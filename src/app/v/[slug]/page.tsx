import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FlipbookViewerWrapper } from "./FlipbookViewerWrapper";
import type { Publication } from "@/lib/types/publication";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPublication(slug: string): Promise<Publication | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("publications")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  // Verificar se a publicação está acessível
  if (data.status !== "published" && data.visibility === "private") {
    return null;
  }

  // Incrementar visualizações
  await supabase
    .from("publications")
    .update({ views: (data.views || 0) + 1 })
    .eq("id", data.id);

  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublication(slug);

  if (!publication) {
    return {
      title: "Publicação não encontrada",
    };
  }

  const title = publication.settings?.metaTitle || publication.title;
  const description = publication.settings?.metaDescription || publication.description || `Visualize ${publication.title} - um flipbook interativo`;
  const ogImage = publication.settings?.ogImage || publication.cover_url;

  return {
    title: `${title} | Dinheiro Investido`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function ViewPublicationPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = await getPublication(slug);

  if (!publication) {
    notFound();
  }

  // Gerar páginas de demonstração se não houver páginas reais
  const pages = publication.settings?.pages || generateDemoPages(publication);

  return (
    <div className="min-h-screen bg-[#171A3D]">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-bold text-[#171A3D]">
              Dinheiro<span className="text-[#263A68]">Investido</span>
            </a>
            <span className="hidden sm:block text-[#736F89]">|</span>
            <h1 className="hidden sm:block text-[#171A3D] font-medium truncate max-w-md">
              {publication.title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="text-sm text-[#263A68] hover:underline"
            >
              Criar seu flipbook grátis
            </a>
          </div>
        </div>
      </header>

      {/* Flipbook Viewer */}
      <main className="h-[calc(100vh-57px)]">
        <FlipbookViewerWrapper
          publication={publication}
          pages={pages}
        />
      </main>
    </div>
  );
}

// Gerar páginas de demonstração
function generateDemoPages(publication: Publication) {
  const demoPages = [];
  const totalPages = 6;

  for (let i = 1; i <= totalPages; i++) {
    demoPages.push({
      pageNumber: i,
      imageUrl: `/api/placeholder-page?title=${encodeURIComponent(publication.title)}&page=${i}&total=${totalPages}`,
      width: 400,
      height: 566,
    });
  }

  return demoPages;
}
