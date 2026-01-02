import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, siteConfig } from "@/lib/constants";
import { generateMetadata as genMeta, generateArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

// Conteúdo completo dos posts (simulado)
const postContent: { [key: string]: string } = {
  "como-criar-flipbook-interativo": `
## Introdução

Criar um flipbook interativo nunca foi tão fácil. Com o Dinheiro Investido, você pode transformar qualquer PDF em uma publicação digital impressionante em apenas 5 minutos.

## Passo 1: Faça o Upload do seu PDF

O primeiro passo é fazer o upload do seu arquivo PDF. Nossa plataforma aceita arquivos de até 100MB e processa automaticamente cada página.

### Formatos aceitos:
- PDF (recomendado)
- Word (.docx)
- PowerPoint (.pptx)

## Passo 2: Escolha o Estilo

Após o upload, você pode escolher entre diversos estilos de apresentação:

- **Clássico**: Efeito de virada de página tradicional
- **Moderno**: Transições suaves e minimalistas
- **Dinâmico**: Com animações e efeitos especiais

## Passo 3: Adicione Interatividade

Agora vem a parte divertida! Você pode adicionar:

1. **Vídeos**: Incorpore vídeos do YouTube ou faça upload dos seus
2. **Links**: Adicione links clicáveis em qualquer elemento
3. **Áudios**: Inclua narrações ou músicas de fundo
4. **Botões**: Crie chamadas para ação interativas

## Passo 4: Personalize o Design

Use nosso editor visual para personalizar:

- Cores e fontes
- Logo e marca d'água
- Navegação e controles
- Fundo e bordas

## Passo 5: Publique e Compartilhe

Quando estiver satisfeito, clique em "Publicar" e pronto! Você receberá:

- Link de compartilhamento
- Código de incorporação
- QR Code para acesso mobile

## Conclusão

Com esses 5 passos simples, você criou um flipbook interativo profissional. Experimente agora mesmo gratuitamente!
  `,
  "materiais-educacionais-digitais": `
## O Futuro da Educação é Digital

A transformação digital está revolucionando a forma como ensinamos e aprendemos. Materiais educacionais interativos não são mais um diferencial, mas uma necessidade.

## Por que Materiais Digitais?

### Engajamento Aumentado

Estudos mostram que materiais interativos aumentam o engajamento dos alunos em até 60%. Quando o conteúdo é dinâmico, a atenção é mantida por mais tempo.

### Acessibilidade

Materiais digitais podem ser acessados de qualquer lugar, a qualquer momento. Isso democratiza o acesso à educação de qualidade.

### Personalização

Cada aluno aprende de forma diferente. Materiais digitais permitem personalizar o ritmo e o formato do aprendizado.

## Tipos de Materiais que Você Pode Criar

1. **Apostilas Interativas**: Com vídeos explicativos incorporados
2. **Flashcards Digitais**: Para memorização eficiente
3. **Livros Didáticos**: Com exercícios interativos
4. **Apresentações**: Com animações e transições

## Como Começar

O Dinheiro Investido oferece modelos específicos para educação. Você pode:

- Usar modelos prontos
- Converter seus materiais existentes
- Criar do zero com nosso editor

## Conclusão

O futuro da educação é interativo, acessível e engajador. Comece a criar seus materiais digitais hoje mesmo!
  `,
  "aumentar-vendas-catalogo-digital": `
## Catálogos Digitais: A Nova Fronteira das Vendas

Se você ainda usa apenas catálogos impressos, está perdendo oportunidades de venda. Catálogos digitais interativos podem aumentar suas conversões em até 40%.

## Vantagens dos Catálogos Digitais

### Atualização Instantânea

Mudou o preço? Novo produto? Atualize seu catálogo em segundos, sem custos de reimpressão.

### Links Diretos para Compra

Cada produto pode ter um botão de compra direto, reduzindo a fricção no processo de venda.

### Analytics Completo

Saiba exatamente quais produtos são mais visualizados, quanto tempo os clientes passam em cada página e onde clicam.

## Estratégias para Aumentar Vendas

### 1. Vídeos de Produto

Adicione vídeos demonstrativos em seus produtos principais. Vídeos aumentam a confiança do comprador.

### 2. Depoimentos Integrados

Inclua avaliações de clientes diretamente nas páginas dos produtos.

### 3. Ofertas Especiais

Crie seções de destaque para promoções e lançamentos.

### 4. Call-to-Action Claros

Use botões grandes e chamativos para direcionar à compra.

## Métricas para Acompanhar

- Taxa de visualização por página
- Tempo médio de leitura
- Cliques em botões de compra
- Taxa de conversão

## Conclusão

Catálogos digitais são uma ferramenta poderosa para aumentar vendas. Comece a criar o seu hoje mesmo!
  `,
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return genMeta({
      title: "Artigo não encontrado",
      noIndex: true,
    });
  }

  return genMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const content = postContent[slug] || "";

  const articleJsonLd = generateArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.date,
    url: `${siteConfig.url}/blog/${slug}`,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
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
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white truncate max-w-[200px]">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Category & Date */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                {post.category}
              </span>
              <span className="text-white/70 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-white/80 mb-8">{post.excerpt}</p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-white/60 text-sm">Autor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#171A3D] hover:text-[#263A68] mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o Blog
            </Link>

            {/* Article Content */}
            <article className="prose prose-lg prose-slate max-w-none">
              {content.split("\n").map((paragraph, index) => {
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2
                      key={index}
                      className="text-2xl font-bold text-[#171A3D] mt-12 mb-4"
                    >
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3
                      key={index}
                      className="text-xl font-bold text-[#171A3D] mt-8 mb-3"
                    >
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={index} className="text-[#736F89] ml-4">
                      {paragraph.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                    </li>
                  );
                }
                if (paragraph.match(/^\d+\. /)) {
                  return (
                    <li key={index} className="text-[#736F89] ml-4 list-decimal">
                      {paragraph.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                    </li>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-[#736F89] mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-[#E5E5E6]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="font-semibold text-[#171A3D]">
                  Compartilhe este artigo:
                </span>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${siteConfig.url}/blog/${slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#E5E5E6] flex items-center justify-center hover:bg-[#171A3D] hover:text-white transition-colors"
                    aria-label="Compartilhar no Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${siteConfig.url}/blog/${slug}&text=${post.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#E5E5E6] flex items-center justify-center hover:bg-[#171A3D] hover:text-white transition-colors"
                    aria-label="Compartilhar no Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteConfig.url}/blog/${slug}&title=${post.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#E5E5E6] flex items-center justify-center hover:bg-[#171A3D] hover:text-white transition-colors"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-[#E5E5E6]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#171A3D] mb-8">
              Artigos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 2)
                .map((relatedPost, index) => (
                  <Link
                    key={index}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <span className="text-xs text-[#4F3D67] font-medium">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-bold text-[#171A3D] mt-2 mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-[#736F89] line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#171A3D] via-[#263A68] to-[#342852] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para criar seu conteúdo?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Comece a criar flipbooks, revistas e materiais interativos
            gratuitamente.
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
