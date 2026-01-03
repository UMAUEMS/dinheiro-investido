import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Video, 
  ShoppingBag, 
  Star,
  Check,
  Play,
  Zap,
  Heart,
  Gift,
  Crown,
  ChevronRight,
  Users,
  TrendingUp,
  Award
} from "lucide-react";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-[#fffbf8]">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background with soft gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#fff5f0] via-[#fffbf8] to-[#fdf2f8]" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#fce4ec]/40 via-[#f8bbd9]/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#ffe5d9]/40 via-[#fdf2f8]/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-[#f8bbd9]/10 to-[#e8e0f0]/10 rounded-full blur-3xl" />
          {/* Decorative dots pattern */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(#b76e79 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container relative z-10 mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#b76e79]/20 shadow-sm mb-8">
                <span className="w-2 h-2 bg-[#b76e79] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#b76e79]">Plataforma #1 em Flipbooks no Brasil</span>
                <ChevronRight className="w-4 h-4 text-[#b76e79]" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6">
                <span className="text-[#4a3f3f]">Transforme PDFs em </span>
                <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">Flipbooks</span>
                <span className="text-[#4a3f3f]"> & </span>
                <span className="bg-gradient-to-r from-[#d4a5a5] to-[#f8bbd9] bg-clip-text text-transparent">Vídeos</span>
                <span className="text-[#4a3f3f]"> Incríveis</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-[#7a6b6b] mb-8 max-w-xl mx-auto lg:mx-0">
                Crie flipbooks interativos, exporte vídeos cinematográficos e venda produtos digitais como packs de Canva, convites e cadernos. Tudo em uma única plataforma.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link
                  href="/auth/register"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-2xl shadow-lg shadow-[#b76e79]/25 hover:shadow-xl hover:shadow-[#b76e79]/30 hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Começar Grátis</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#demo"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-[#b76e79] bg-white/80 backdrop-blur-sm border-2 border-[#b76e79]/20 rounded-2xl hover:bg-white hover:border-[#b76e79]/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  <span>Ver Demonstração</span>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {['MS', 'JS', 'AC', 'PL', 'RB'].map((initials, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-md"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                    <span className="ml-1 font-bold text-[#4a3f3f]">4.9/5</span>
                  </div>
                  <span className="text-sm text-[#7a6b6b]">de mais de 2.000 avaliações</span>
                </div>
              </div>
            </div>

            {/* Right Content - Flipbook Preview */}
            <div className="relative">
              {/* Main Preview Card */}
              <div className="relative mx-auto max-w-md lg:max-w-lg">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#f8bbd9]/30 via-[#b76e79]/20 to-[#ffe5d9]/30 rounded-3xl blur-2xl" />
                
                {/* Browser Window */}
                <div className="relative bg-white rounded-2xl shadow-2xl shadow-[#b76e79]/10 border border-[#b76e79]/10 overflow-hidden">
                  {/* Browser Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#fdf2f8] to-[#fff5f0] border-b border-[#b76e79]/10">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#fca5a5]" />
                      <div className="w-3 h-3 rounded-full bg-[#fcd34d]" />
                      <div className="w-3 h-3 rounded-full bg-[#86efac]" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg text-xs text-[#7a6b6b] border border-[#b76e79]/10">
                        <span className="w-3 h-3 rounded-full bg-[#86efac]" />
                        dinheiroinvestido.com.br/flipbook
                      </div>
                    </div>
                  </div>
                  
                  {/* Flipbook Preview */}
                  <div className="p-6 bg-gradient-to-br from-[#fdf2f8] to-[#fff5f0]">
                    <div className="relative aspect-[4/3] bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] rounded-xl shadow-lg overflow-hidden">
                      {/* Flipbook pages effect */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <BookOpen className="w-16 h-16 mx-auto mb-3 opacity-80" />
                          <p className="text-lg font-semibold">Seu Flipbook</p>
                          <p className="text-sm opacity-80">Interativo</p>
                        </div>
                      </div>
                      {/* Page flip effect */}
                      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/20 to-transparent" />
                    </div>
                    
                    {/* Status badge */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-sm">
                        <span className="w-2 h-2 bg-[#86efac] rounded-full" />
                        <span className="text-[#4a3f3f] font-medium">Publicado</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <Video className="w-4 h-4 text-[#b76e79]" />
                        </button>
                        <button className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <ShoppingBag className="w-4 h-4 text-[#b76e79]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 p-4 bg-white rounded-2xl shadow-xl shadow-[#b76e79]/10 border border-[#b76e79]/10 animate-bounce" style={{ animationDuration: '3s' }}>
                  <Video className="w-8 h-8 text-[#b76e79]" />
                </div>
                <div className="absolute -bottom-4 -left-4 p-4 bg-white rounded-2xl shadow-xl shadow-[#b76e79]/10 border border-[#b76e79]/10 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}>
                  <ShoppingBag className="w-8 h-8 text-[#d4a5a5]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#b76e79]/60">
          <div className="w-6 h-10 rounded-full border-2 border-[#b76e79]/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#b76e79]/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="py-16 bg-gradient-to-r from-[#fdf2f8] via-[#fff5f0] to-[#fdf2f8]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Flipbooks Criados", icon: BookOpen },
              { value: "12K+", label: "Usuários Ativos", icon: Users },
              { value: "99.9%", label: "Uptime", icon: TrendingUp },
              { value: "4.9★", label: "Avaliação", icon: Award },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-2xl bg-white shadow-md shadow-[#b76e79]/10 group-hover:shadow-lg group-hover:shadow-[#b76e79]/20 transition-all">
                  <stat.icon className="w-6 h-6 text-[#b76e79]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#7a6b6b]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURES SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-[#fffbf8]">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fce4ec] text-[#b76e79] text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Recursos Poderosos
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-[#4a3f3f]">Tudo que você precisa para </span>
              <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">criar e vender</span>
            </h2>
            <p className="text-lg text-[#7a6b6b] max-w-2xl mx-auto">
              Uma plataforma completa para transformar seus PDFs em experiências digitais incríveis e monetizar seu conteúdo.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BookOpen,
                title: "PDF para Flipbook",
                description: "Transforme qualquer PDF em um flipbook interativo com efeito realista de virada de página em segundos.",
                color: "from-[#b76e79] to-[#d4a5a5]"
              },
              {
                icon: Video,
                title: "Vídeos Cinematográficos",
                description: "Exporte seus flipbooks como vídeos MP4 com animações suaves, perfeitos para redes sociais.",
                color: "from-[#d4a5a5] to-[#f8bbd9]"
              },
              {
                icon: ShoppingBag,
                title: "Loja de Produtos Digitais",
                description: "Venda packs de Canva, convites virtuais, cadernos cristãos e muito mais na sua própria loja.",
                color: "from-[#f8bbd9] to-[#fce4ec]"
              },
              {
                icon: Gift,
                title: "Convites Interativos",
                description: "Crie convites virtuais animados para casamentos, aniversários e eventos especiais.",
                color: "from-[#ffe5d9] to-[#fdf2f8]"
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group p-6 bg-white rounded-2xl border border-[#b76e79]/10 shadow-sm hover:shadow-xl hover:shadow-[#b76e79]/10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#4a3f3f] mb-3">{feature.title}</h3>
                <p className="text-[#7a6b6b] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-gradient-to-br from-[#fdf2f8] via-[#fff5f0] to-[#fdf2f8]">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#b76e79] text-sm font-medium mb-6 shadow-sm">
              <Zap className="w-4 h-4" />
              Simples e Rápido
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-[#4a3f3f]">Como </span>
              <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">funciona</span>
            </h2>
            <p className="text-lg text-[#7a6b6b] max-w-2xl mx-auto">
              Em apenas 3 passos simples, transforme seus arquivos em obras de arte digitais
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Envie seu PDF",
                description: "Faça upload do seu arquivo PDF, e-book ou documento de qualquer tamanho.",
                icon: "📤"
              },
              {
                step: "02",
                title: "Personalize",
                description: "Escolha efeitos, cores, animações e adicione sua marca ao flipbook.",
                icon: "🎨"
              },
              {
                step: "03",
                title: "Publique e Venda",
                description: "Compartilhe o link, exporte como vídeo ou venda na sua loja digital.",
                icon: "🚀"
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#b76e79]/30 to-[#d4a5a5]/30" />
                )}
                
                {/* Step card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg shadow-[#b76e79]/5 border border-[#b76e79]/10 group-hover:shadow-xl group-hover:shadow-[#b76e79]/10 transition-all">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-full text-white text-sm font-bold">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-5xl mb-6 mt-4">{item.icon}</div>
                  
                  <h3 className="text-xl font-bold text-[#4a3f3f] mb-3">{item.title}</h3>
                  <p className="text-[#7a6b6b]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRODUCTS SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-[#fffbf8]">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fce4ec] text-[#b76e79] text-sm font-medium mb-4">
                <ShoppingBag className="w-4 h-4" />
                Loja Digital
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-[#4a3f3f]">Produtos em </span>
                <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">Destaque</span>
              </h2>
              <p className="text-[#7a6b6b] mt-2">Os mais vendidos da nossa loja de produtos digitais</p>
            </div>
            <Link 
              href="/loja" 
              className="inline-flex items-center gap-2 text-[#b76e79] font-semibold hover:gap-3 transition-all"
            >
              Ver Todos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Pack Convites de Casamento", category: "Convites", price: "R$ 47,00", badge: "Mais Vendido", badgeColor: "bg-[#b76e79]" },
              { name: "Caderno Cristão Interativo", category: "Cadernos", price: "R$ 29,00", badge: "Novo", badgeColor: "bg-[#86efac] text-[#166534]" },
              { name: "Pack Posts Instagram", category: "Redes Sociais", price: "R$ 37,00", badge: null, badgeColor: null },
              { name: "Convites 15 Anos Elegante", category: "Convites", price: "R$ 39,00", badge: "Popular", badgeColor: "bg-[#f8bbd9] text-[#9d174d]" },
            ].map((product, i) => (
              <Link key={i} href={`/produto/${i}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-[#b76e79]/10 shadow-sm hover:shadow-xl hover:shadow-[#b76e79]/10 hover:-translate-y-2 transition-all duration-300">
                  {/* Image placeholder */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#fce4ec] to-[#fdf2f8] overflow-hidden">
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-3 py-1 ${product.badgeColor} text-white text-xs font-semibold rounded-full`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-[#b76e79]/30" />
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#b76e79]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                      <span className="text-white font-semibold flex items-center gap-2">
                        Ver Produto <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <span className="text-xs text-[#b76e79] font-medium">{product.category}</span>
                    <h3 className="font-bold text-[#4a3f3f] mt-1 mb-2 group-hover:text-[#b76e79] transition-colors">{product.name}</h3>
                    <p className="text-lg font-bold bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-gradient-to-br from-[#fdf2f8] via-[#fff5f0] to-[#fdf2f8]">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#b76e79] text-sm font-medium mb-6 shadow-sm">
              <Heart className="w-4 h-4" />
              Depoimentos
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-[#4a3f3f]">O que nossos </span>
              <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">clientes dizem</span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "Transformei meus PDFs em flipbooks incríveis em minutos. Meus clientes ficaram impressionados com a qualidade!",
                name: "Maria Silva",
                role: "Designer Gráfica",
                initials: "MS"
              },
              {
                quote: "A loja de produtos digitais me ajudou a monetizar meus packs de Canva. Já faturei mais de R$ 5.000!",
                name: "João Santos",
                role: "Empreendedor Digital",
                initials: "JS"
              },
              {
                quote: "Os vídeos cinematográficos são perfeitos para minhas campanhas. Qualidade profissional sem complicação.",
                name: "Ana Costa",
                role: "Marketing Digital",
                initials: "AC"
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg shadow-[#b76e79]/5 border border-[#b76e79]/10 hover:shadow-xl hover:shadow-[#b76e79]/10 transition-all">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-[#4a3f3f] mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] flex items-center justify-center text-white font-bold">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-bold text-[#4a3f3f]">{testimonial.name}</p>
                    <p className="text-sm text-[#7a6b6b]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-[#fffbf8]">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fce4ec] text-[#b76e79] text-sm font-medium mb-6">
              <Crown className="w-4 h-4" />
              Planos
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-[#4a3f3f]">Escolha o plano </span>
              <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">ideal para você</span>
            </h2>
            <p className="text-lg text-[#7a6b6b] max-w-2xl mx-auto">
              Comece grátis e faça upgrade quando precisar de mais recursos
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border border-[#b76e79]/10 shadow-sm hover:shadow-xl hover:shadow-[#b76e79]/10 transition-all">
              <h3 className="text-xl font-bold text-[#4a3f3f] mb-2">Grátis</h3>
              <p className="text-[#7a6b6b] text-sm mb-6">Perfeito para começar</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#4a3f3f]">R$ 0</span>
                <span className="text-[#7a6b6b]">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["3 flipbooks", "Visualizações ilimitadas", "Modelos básicos", "Marca d'água"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#4a3f3f]">
                    <Check className="w-5 h-5 text-[#86efac]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register"
                className="block w-full py-3 text-center font-semibold text-[#b76e79] border-2 border-[#b76e79]/20 rounded-xl hover:bg-[#fce4ec] transition-colors"
              >
                Começar Grátis
              </Link>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative bg-gradient-to-br from-[#b76e79] to-[#d4a5a5] rounded-2xl p-8 text-white shadow-xl shadow-[#b76e79]/20 scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-[#b76e79] text-sm font-bold rounded-full shadow-md">
                Mais Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-white/80 text-sm mb-6">Para criadores sérios</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">R$ 49</span>
                <span className="text-white/80">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Flipbooks ilimitados", "Sem marca d'água", "Todos os modelos", "Exportação MP4", "Analytics", "Suporte prioritário"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-white" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register?plan=pro"
                className="block w-full py-3 text-center font-semibold bg-white text-[#b76e79] rounded-xl hover:bg-white/90 transition-colors"
              >
                Assinar Pro
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-2xl p-8 border border-[#b76e79]/10 shadow-sm hover:shadow-xl hover:shadow-[#b76e79]/10 transition-all">
              <h3 className="text-xl font-bold text-[#4a3f3f] mb-2">Business</h3>
              <p className="text-[#7a6b6b] text-sm mb-6">Para empresas</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#4a3f3f]">R$ 149</span>
                <span className="text-[#7a6b6b]">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {["Tudo do Pro", "Loja de produtos", "Convites ilimitados", "API de integração", "Múltiplos usuários", "Gerente dedicado"].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#4a3f3f]">
                    <Check className="w-5 h-5 text-[#86efac]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contato"
                className="block w-full py-3 text-center font-semibold text-[#b76e79] border-2 border-[#b76e79]/20 rounded-xl hover:bg-[#fce4ec] transition-colors"
              >
                Falar com Vendas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA SECTION */}
      {/* ============================================ */}
      <section className="py-24 bg-gradient-to-br from-[#fce4ec] via-[#fdf2f8] to-[#fff5f0]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-[#4a3f3f]">Pronto para transformar seus PDFs em </span>
              <span className="bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] bg-clip-text text-transparent">arte</span>
              <span className="text-[#4a3f3f]">?</span>
            </h2>
            <p className="text-lg text-[#7a6b6b] mb-10">
              Junte-se a milhares de criadores que já estão usando o Dinheiro Investido para criar flipbooks incríveis e vender produtos digitais.
            </p>
            <Link
              href="/auth/register"
              className="group inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-[#b76e79] to-[#d4a5a5] rounded-2xl shadow-lg shadow-[#b76e79]/25 hover:shadow-xl hover:shadow-[#b76e79]/30 hover:-translate-y-1 transition-all duration-300"
            >
              <span>Começar Grátis Agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-[#7a6b6b] mt-6">
              Sem cartão de crédito • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
