import { Metadata } from "next";
import Link from "next/link";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { generateMetadata } from "@/lib/metadata";
import { blogPosts } from "@/lib/constants";

export const metadata: Metadata = generateMetadata({
  title: "Blog",
  description:
    "Dicas, tutoriais e novidades sobre criação de conteúdo digital, flipbooks, marketing e muito mais no blog do Dinheiro Investido.",
  path: "/blog",
});

const categories = [
  "Todos",
  "Tutorial",
  "Educação",
  "Marketing",
  "Novidades",
  "Dicas",
];

export default function BlogPage() {
  // Primeiro post em destaque
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-white/80">
              Dicas, tutoriais e novidades para criar conteúdo digital incrível.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-[#171A3D] text-white"
                    : "bg-[#E5E5E6] text-[#171A3D] hover:bg-[#171A3D] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Link href={`/blog/${featuredPost.slug}`} className="block group">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-[#171A3D] to-[#263A68] rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/30 text-6xl font-bold">DI</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#171A3D] text-white text-sm rounded-full">
                    {featuredPost.category}
                  </span>
                  <span className="text-[#736F89] text-sm flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-[#171A3D] mb-4 group-hover:text-[#263A68] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-[#736F89] mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#171A3D] to-[#263A68] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#171A3D] font-medium">
                      {featuredPost.author}
                    </span>
                  </div>
                  <span className="text-[#263A68] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Ler artigo
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Other Posts */}
      <section className="py-16 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#171A3D] mb-8">
            Artigos Recentes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <Card
                key={index}
                className="group bg-white border-none overflow-hidden"
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Image */}
                  <div className="aspect-video bg-gradient-to-br from-[#342852] to-[#4F3D67]">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/30 text-4xl font-bold">
                        DI
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2 py-1 bg-[#E5E5E6] text-[#171A3D] text-xs rounded-full">
                        {post.category}
                      </span>
                      <span className="text-[#736F89] text-xs">
                        {new Date(post.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-[#171A3D] mb-2 group-hover:text-[#263A68] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[#736F89] text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              Carregar mais artigos
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Receba novidades por email
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Inscreva-se para receber dicas, tutoriais e novidades sobre criação
            de conteúdo digital.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              className="flex-1 px-4 py-3 rounded-lg text-[#171A3D] placeholder:text-[#736F89] focus:outline-none focus:ring-2 focus:ring-[#4F3D67]"
              aria-label="Email para newsletter"
            />
            <Button className="bg-white text-[#171A3D] hover:bg-white/90">
              Inscrever
            </Button>
          </form>
          <p className="text-white/60 text-sm mt-4">
            Sem spam. Cancele quando quiser.
          </p>
        </div>
      </section>
    </>
  );
}
