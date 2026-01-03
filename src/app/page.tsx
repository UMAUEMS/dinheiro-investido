import Link from 'next/link'
import { Sparkles, Upload, Wand2, Share2, ShoppingBag, Play, Star, ArrowRight, Zap, Palette, Video, Gift, BookOpen, Heart } from 'lucide-react'
import { faqItems } from "@/lib/constants";
import { generateFAQJsonLd } from "@/lib/metadata";

// Produtos em destaque
const featuredProducts = [
  { id: 1, title: 'Pack Convites de Casamento', category: 'Convites', price: 'R$ 47,00', badge: 'Mais Vendido' },
  { id: 2, title: 'Caderno Cristão Interativo', category: 'Cadernos', price: 'R$ 29,00', badge: 'Novo' },
  { id: 3, title: 'Pack Posts Instagram', category: 'Redes Sociais', price: 'R$ 37,00', badge: null },
  { id: 4, title: 'Convites 15 Anos Elegante', category: 'Convites', price: 'R$ 39,00', badge: 'Popular' },
]

// Categorias
const categories = [
  { name: 'Convites', icon: Gift, color: 'from-pink-500 to-rose-500', count: 48 },
  { name: 'Cadernos', icon: BookOpen, color: 'from-purple-500 to-indigo-500', count: 24 },
  { name: 'Posts', icon: Palette, color: 'from-blue-500 to-cyan-500', count: 156 },
  { name: 'E-books', icon: Sparkles, color: 'from-amber-500 to-orange-500', count: 32 },
]

// Depoimentos
const testimonials = [
  { name: 'Maria Silva', role: 'Designer', content: 'Transformei meus PDFs em flipbooks incríveis em minutos. Meus clientes amaram!', rating: 5 },
  { name: 'João Santos', role: 'Empreendedor', content: 'A qualidade dos packs é impressionante. Economizei horas de trabalho.', rating: 5 },
  { name: 'Ana Costa', role: 'Marketing Digital', content: 'Os vídeos cinematográficos ficam profissionais demais. Recomendo!', rating: 5 },
]

export default function HomePage() {
  const faqJsonLd = generateFAQJsonLd(faqItems);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      <main id="main-content" className="mesh-gradient min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10 px-6 py-20">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fadeInUp">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/80">Transforme suas ideias em arte digital</span>
              </div>

              {/* Title */}
              <h1 className="hero-title mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <span className="text-white">Crie </span>
                <span className="gradient-text">Flipbooks</span>
                <br />
                <span className="text-white">& </span>
                <span className="gradient-text-secondary">Vídeos</span>
                <span className="text-white"> Incríveis</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                Transforme seus PDFs em flipbooks interativos e vídeos cinematográficos. 
                Compre packs profissionais de convites, artes e muito mais.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                <Link href="/dashboard/publicacoes/nova" className="btn-gradient text-lg px-8 py-4 w-full sm:w-auto">
                  <span>Criar Flipbook Grátis</span>
                  <Wand2 className="w-5 h-5" />
                </Link>
                <Link href="/galeria" className="btn-glass text-lg px-8 py-4 w-full sm:w-auto">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Ver Produtos</span>
                </Link>
              </div>

              {/* Demo Preview */}
              <div className="relative max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                <div className="glass-card p-4 md:p-8">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center group cursor-pointer">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <p className="text-white/60">Veja a mágica acontecer</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 glass-card flex items-center justify-center float hidden md:flex">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 glass-card items-center justify-center float hidden md:flex" style={{ animationDelay: '500ms' }}>
                  <Zap className="w-8 h-8 text-cyan-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-white/40 rounded-full" />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section relative">
          <div className="container px-6">
            <div className="text-center mb-16">
              <h2 className="section-title text-white mb-4">Como <span className="gradient-text">Funciona</span></h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">Em apenas 3 passos simples, transforme seus arquivos em obras de arte digitais</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Upload, title: 'Envie seu PDF', desc: 'Faça upload do seu arquivo PDF, e-book ou documento', step: '01' },
                { icon: Wand2, title: 'Personalize', desc: 'Escolha efeitos, cores e animações para seu flipbook', step: '02' },
                { icon: Share2, title: 'Compartilhe', desc: 'Baixe como vídeo ou compartilhe o link interativo', step: '03' },
              ].map((item, index) => (
                <div key={index} className="glass-card p-8 text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white/60">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="section relative">
          <div className="container px-6">
            <div className="text-center mb-16">
              <h2 className="section-title text-white mb-4">Explore por <span className="gradient-text-secondary">Categoria</span></h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">Encontre o produto perfeito para seu projeto</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {categories.map((cat, index) => (
                <Link key={index} href={`/categorias/${cat.name.toLowerCase()}`} className="glass-card p-6 text-center group cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-sm text-white/40">{cat.count} produtos</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="section relative">
          <div className="container px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <h2 className="section-title text-white mb-4">Produtos em <span className="gradient-text">Destaque</span></h2>
                <p className="text-xl text-white/60">Os mais vendidos da nossa loja</p>
              </div>
              <Link href="/galeria" className="btn-glass mt-6 md:mt-0">Ver Todos<ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} href={`/galeria`} className="product-card group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20" />
                    {product.badge && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-xs font-semibold text-white">{product.badge}</span>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-white/20" />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-purple-400 font-medium">{product.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2">{product.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold gradient-text">{product.price}</span>
                      <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section relative">
          <div className="container px-6">
            <div className="glass-card p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="section-title text-white mb-6">Por que escolher a <span className="gradient-text">Dinheiro Investido</span>?</h2>
                  <div className="space-y-6">
                    {[
                      { icon: Zap, title: 'Rápido e Fácil', desc: 'Crie flipbooks em segundos, sem conhecimento técnico' },
                      { icon: Video, title: 'Vídeos Cinematográficos', desc: 'Exporte como MP4 com animações profissionais' },
                      { icon: Palette, title: 'Design Premium', desc: 'Packs exclusivos criados por designers profissionais' },
                      { icon: Heart, title: 'Suporte Dedicado', desc: 'Estamos aqui para ajudar você a ter sucesso' },
                    ].map((feature, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/20 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                          <p className="text-white/60">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                    <Sparkles className="w-24 h-24 text-white/20" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 glass-card p-4 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#0a0a0f]" />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">+2.500</p>
                      <p className="text-xs text-white/60">clientes felizes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section relative">
          <div className="container px-6">
            <div className="text-center mb-16">
              <h2 className="section-title text-white mb-4">O que nossos <span className="gradient-text-accent">clientes</span> dizem</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                    <div>
                      <p className="font-bold text-white">{testimonial.name}</p>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section relative">
          <div className="container px-6">
            <div className="relative overflow-hidden rounded-3xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#667eea] to-[#764ba2]" />
              <div className="relative z-10 px-8 py-16 md:py-24 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Pronto para criar algo incrível?</h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">Comece gratuitamente e descubra o poder de transformar seus PDFs em experiências interativas.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/auth/register" className="bg-white text-purple-600 font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all hover:scale-105 inline-flex items-center gap-2">
                    <span>Começar Grátis Agora</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/galeria" className="text-white font-semibold px-8 py-4 rounded-2xl border-2 border-white/30 hover:bg-white/10 transition-all inline-flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>Explorar Loja</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
