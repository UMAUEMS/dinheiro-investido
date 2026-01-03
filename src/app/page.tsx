"use client";

import Link from 'next/link'
import { Sparkles, Upload, Wand2, Share2, ShoppingBag, Play, Star, ArrowRight, Zap, Palette, Video, Gift, BookOpen, Heart, Check, ChevronRight, MousePointer, FileText, Download, Users, Globe, Shield, Smartphone, TrendingUp, Award, Clock, Layers } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

// Logos de "parceiros" para credibilidade
const partnerLogos = [
  { name: 'Canva', opacity: 0.6 },
  { name: 'Adobe', opacity: 0.5 },
  { name: 'Figma', opacity: 0.6 },
  { name: 'Notion', opacity: 0.5 },
  { name: 'Stripe', opacity: 0.6 },
  { name: 'Vercel', opacity: 0.5 },
]

// Estatísticas impressionantes
const stats = [
  { value: '50K+', label: 'Flipbooks Criados', icon: BookOpen },
  { value: '12K+', label: 'Usuários Ativos', icon: Users },
  { value: '99.9%', label: 'Uptime', icon: Shield },
  { value: '4.9★', label: 'Avaliação', icon: Star },
]

// Features principais
const mainFeatures = [
  {
    icon: FileText,
    title: 'PDF para Flipbook',
    description: 'Transforme qualquer PDF em um flipbook interativo com efeito realista de virada de página em segundos.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Video,
    title: 'Vídeos Cinematográficos',
    description: 'Exporte seus flipbooks como vídeos MP4 com animações suaves, perfeitos para redes sociais.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: ShoppingBag,
    title: 'Loja de Produtos Digitais',
    description: 'Venda packs de Canva, convites virtuais, cadernos cristãos e muito mais na sua própria loja.',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Gift,
    title: 'Convites Interativos',
    description: 'Crie convites virtuais animados para casamentos, aniversários e eventos especiais.',
    gradient: 'from-amber-500 to-orange-600',
  },
]

// Produtos em destaque
const featuredProducts = [
  { id: 1, title: 'Pack Convites de Casamento', category: 'Convites', price: 'R$ 47,00', badge: 'Mais Vendido', color: 'from-pink-500/20 to-rose-500/20' },
  { id: 2, title: 'Caderno Cristão Interativo', category: 'Cadernos', price: 'R$ 29,00', badge: 'Novo', color: 'from-purple-500/20 to-indigo-500/20' },
  { id: 3, title: 'Pack Posts Instagram', category: 'Redes Sociais', price: 'R$ 37,00', badge: null, color: 'from-blue-500/20 to-cyan-500/20' },
  { id: 4, title: 'Convites 15 Anos Elegante', category: 'Convites', price: 'R$ 39,00', badge: 'Popular', color: 'from-amber-500/20 to-orange-500/20' },
]

// Depoimentos
const testimonials = [
  { 
    name: 'Maria Silva', 
    role: 'Designer Gráfica', 
    content: 'Transformei meus PDFs em flipbooks incríveis em minutos. Meus clientes ficaram impressionados com a qualidade!', 
    rating: 5,
    avatar: 'MS'
  },
  { 
    name: 'João Santos', 
    role: 'Empreendedor Digital', 
    content: 'A loja de produtos digitais me ajudou a monetizar meus packs de Canva. Já faturei mais de R$ 5.000!', 
    rating: 5,
    avatar: 'JS'
  },
  { 
    name: 'Ana Costa', 
    role: 'Marketing Digital', 
    content: 'Os vídeos cinematográficos são perfeitos para minhas campanhas. Qualidade profissional sem complicação.', 
    rating: 5,
    avatar: 'AC'
  },
]

// Planos
const plans = [
  {
    name: 'Grátis',
    price: 'R$ 0',
    period: '/mês',
    description: 'Perfeito para começar',
    features: ['3 flipbooks', 'Visualizações ilimitadas', 'Modelos básicos', 'Marca d\'água'],
    cta: 'Começar Grátis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R$ 49',
    period: '/mês',
    description: 'Para criadores sérios',
    features: ['Flipbooks ilimitados', 'Sem marca d\'água', 'Todos os modelos', 'Exportação MP4', 'Analytics', 'Suporte prioritário'],
    cta: 'Assinar Pro',
    highlighted: true,
  },
  {
    name: 'Business',
    price: 'R$ 149',
    period: '/mês',
    description: 'Para empresas',
    features: ['Tudo do Pro', 'Loja de produtos', 'Convites ilimitados', 'API de integração', 'Múltiplos usuários', 'Gerente dedicado'],
    cta: 'Falar com Vendas',
    highlighted: false,
  },
]

// Componente de Flipbook 3D animado
function FlipbookDemo() {
  const [isFlipping, setIsFlipping] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto perspective-1000">
      {/* Livro 3D */}
      <div className="relative aspect-[4/3] transform-style-preserve-3d">
        {/* Capa */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl shadow-2xl transition-transform duration-1000 ease-in-out origin-left ${isFlipping ? 'rotate-y-[-160deg]' : 'rotate-y-0'}`}
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center">Seu Flipbook</h3>
            <p className="text-white/70 text-sm mt-2">Clique para virar</p>
          </div>
          {/* Brilho */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 rounded-2xl" />
        </div>
        
        {/* Página interna */}
        <div className="absolute inset-0 bg-white rounded-2xl shadow-xl flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-full h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
              <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sombra */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/30 blur-xl rounded-full" />
    </div>
  );
}

// Componente de contador animado
function AnimatedCounter({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <div className="text-center group">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 mb-4 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
        <Icon className="w-6 h-6 text-purple-400" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-white/50">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main id="main-content" className="relative overflow-hidden">
      {/* Background Global */}
      <div className="fixed inset-0 bg-[#030014] -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Spotlight effect following mouse */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
          }}
        />
      </div>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="container px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-8 animate-fadeInUp">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-sm text-purple-300 font-medium">Plataforma #1 em Flipbooks no Brasil</span>
                <ChevronRight className="w-4 h-4 text-purple-400" />
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                <span className="text-white">Transforme PDFs em </span>
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Flipbooks</span>
                <span className="text-white"> & </span>
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">Vídeos</span>
                <span className="text-white"> Incríveis</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 mb-8 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                Crie flipbooks interativos, exporte vídeos cinematográficos e venda produtos digitais como packs de Canva, convites e cadernos. Tudo em uma única plataforma.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
                <Link 
                  href="/auth/register" 
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105 w-full sm:w-auto"
                >
                  <span className="relative z-10">Começar Grátis</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link 
                  href="#demo" 
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-full sm:w-auto"
                >
                  <Play className="w-5 h-5 text-purple-400" />
                  <span>Ver Demonstração</span>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                <div className="flex -space-x-3">
                  {['MS', 'JS', 'AC', 'PL', 'RB'].map((initials, i) => (
                    <div 
                      key={i} 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-[#030014] flex items-center justify-center text-xs font-bold text-white"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-white/50">
                    <span className="text-white font-semibold">4.9/5</span> de mais de 2.000 avaliações
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Demo */}
            <div className="relative animate-fadeInUp" style={{ animationDelay: '500ms' }}>
              {/* Main Demo Card */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl" />
                
                {/* Demo container */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">
                  {/* Browser mockup header */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <div className="flex-1 ml-4 h-6 bg-white/5 rounded-full flex items-center px-3">
                      <span className="text-xs text-white/40">dinheiroinvestido.com.br/flipbook</span>
                    </div>
                  </div>
                  
                  {/* Flipbook Preview */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-violet-900/50 to-purple-900/50 rounded-2xl overflow-hidden group cursor-pointer">
                    {/* Animated flipbook pages */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-48 h-64">
                        {/* Back page */}
                        <div className="absolute inset-0 bg-white rounded-lg shadow-xl transform rotate-3">
                          <div className="p-4 space-y-2">
                            <div className="h-2 bg-gray-200 rounded w-3/4" />
                            <div className="h-2 bg-gray-200 rounded w-1/2" />
                            <div className="h-16 bg-gray-100 rounded mt-4" />
                          </div>
                        </div>
                        {/* Front page */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <BookOpen className="w-12 h-12 mb-4 opacity-80" />
                            <span className="text-lg font-bold">Seu Flipbook</span>
                            <span className="text-xs opacity-60 mt-1">Interativo</span>
                          </div>
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-lg" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-sm">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                        <Play className="w-6 h-6 text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Publicado
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <Share2 className="w-4 h-4 text-white/60" />
                      </button>
                      <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <Download className="w-4 h-4 text-white/60" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/30 animate-float">
                <Video className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/30 animate-float" style={{ animationDelay: '1s' }}>
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="relative py-20 border-y border-white/5">
        <div className="container px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <AnimatedCounter key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURES SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="container px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300 font-medium">Recursos Poderosos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Tudo que você precisa para{' '}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">criar e vender</span>
            </h2>
            <p className="text-lg text-white/60">
              Uma plataforma completa para transformar seus PDFs em experiências digitais incríveis e monetizar seu conteúdo.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {mainFeatures.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_60px_rgba(139,92,246,0.15)]"
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
                
                {/* Hover arrow */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="container px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <Zap className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-pink-300 font-medium">Simples e Rápido</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Como{' '}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">funciona</span>
            </h2>
            <p className="text-lg text-white/60">
              Em apenas 3 passos simples, transforme seus arquivos em obras de arte digitais
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                step: '01', 
                icon: Upload, 
                title: 'Envie seu PDF', 
                desc: 'Faça upload do seu arquivo PDF, e-book ou documento de qualquer tamanho.',
                color: 'from-violet-500 to-purple-600'
              },
              { 
                step: '02', 
                icon: Wand2, 
                title: 'Personalize', 
                desc: 'Escolha efeitos, cores, animações e adicione sua marca ao flipbook.',
                color: 'from-pink-500 to-rose-600'
              },
              { 
                step: '03', 
                icon: Share2, 
                title: 'Publique e Venda', 
                desc: 'Compartilhe o link, exporte como vídeo ou venda na sua loja digital.',
                color: 'from-cyan-500 to-blue-600'
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                {/* Connection line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
                )}
                
                <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-500 z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#030014] border border-white/10 rounded-full">
                    <span className="text-sm font-bold text-white/40">{item.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRODUCTS SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="container px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-amber-300 font-medium">Loja Digital</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Produtos em{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Destaque</span>
              </h2>
              <p className="text-lg text-white/60">Os mais vendidos da nossa loja de produtos digitais</p>
            </div>
            <Link 
              href="/galeria" 
              className="group inline-flex items-center gap-2 px-6 py-3 mt-6 md:mt-0 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
            >
              <span className="text-white font-medium">Ver Todos</span>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link 
                key={product.id} 
                href="/galeria"
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]"
              >
                {/* Image placeholder */}
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${product.color}`}>
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-xs font-semibold text-white">
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <span className="text-xs text-purple-400 font-medium">{product.category}</span>
                  <h3 className="text-lg font-bold text-white mt-1 mb-3 group-hover:text-purple-300 transition-colors">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{product.price}</span>
                    <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-purple-500 transition-colors group/btn">
                      <ShoppingBag className="w-5 h-5 text-white/60 group-hover/btn:text-white" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="container px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
              <Heart className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-medium">Depoimentos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              O que nossos{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">clientes dizem</span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-white/80 leading-relaxed mb-6">"{testimonial.content}"</p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/50">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="container px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-medium">Planos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Escolha o plano{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ideal para você</span>
            </h2>
            <p className="text-lg text-white/60">
              Comece grátis e faça upgrade quando precisar de mais recursos
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500 ${
                  plan.highlighted 
                    ? 'border-purple-500/50 shadow-[0_0_60px_rgba(139,92,246,0.2)]' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Popular badge */}
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-sm font-semibold text-white">
                    Mais Popular
                  </div>
                )}
                
                {/* Plan name */}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm mb-6">{plan.description}</p>
                
                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-white/50">{plan.period}</span>
                </div>
                
                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/70">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA */}
                <Link
                  href="/auth/register"
                  className={`block w-full py-4 rounded-xl font-semibold text-center transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32">
        <div className="container px-6">
          <div className="relative max-w-4xl mx-auto">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 via-purple-600/30 to-pink-600/30 rounded-[40px] blur-2xl" />
            
            {/* Card */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-12 md:p-16 text-center overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Pronto para transformar seus{' '}
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">PDFs em arte</span>?
                </h2>
                <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
                  Junte-se a milhares de criadores que já estão usando o Dinheiro Investido para criar flipbooks incríveis e vender produtos digitais.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link 
                    href="/auth/register" 
                    className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:scale-105"
                  >
                    <span className="relative z-10">Começar Grátis Agora</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
                <p className="text-sm text-white/40 mt-6">
                  Sem cartão de crédito • Cancele quando quiser
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-\\[-160deg\\] {
          transform: rotateY(-160deg);
        }
      `}</style>
    </main>
  )
}
