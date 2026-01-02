export const siteConfig = {
  name: "Dinheiro Investido",
  description: "Plataforma completa para criar flipbooks, revistas digitais, catálogos interativos e materiais educacionais. Transforme seus PDFs em experiências digitais incríveis.",
  url: "https://dinheiroinvestidoweb.com.br",
  ogImage: "https://dinheiroinvestidoweb.com.br/og-image.jpg",
  links: {
    twitter: "https://twitter.com/dinheiroinvestido",
    instagram: "https://instagram.com/dinheiroinvestido",
    facebook: "https://facebook.com/dinheiroinvestido",
  },
  creator: "Dinheiro Investido",
  keywords: [
    "flipbook",
    "revista digital",
    "catálogo interativo",
    "material educacional",
    "ebook interativo",
    "publicação digital",
    "PDF interativo",
    "apostila digital",
    "convites virtuais",
    "packs digitais",
  ],
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/recursos", label: "Recursos" },
  { href: "/modelos", label: "Modelos" },
  { href: "/precos", label: "Preços" },
  { href: "/galeria", label: "Galeria" },
  { href: "/sobre", label: "Sobre" },
  { href: "/ajuda", label: "Ajuda" },
];

export const footerLinks = {
  produto: [
    { href: "/recursos", label: "Recursos" },
    { href: "/modelos", label: "Modelos" },
    { href: "/precos", label: "Preços" },
    { href: "/galeria", label: "Galeria" },
  ],
  categorias: [
    { href: "/categorias/educacao", label: "Educação" },
    { href: "/categorias/institucional", label: "Institucional" },
    { href: "/categorias/marketing", label: "Marketing" },
    { href: "/categorias/vendas", label: "Vendas" },
    { href: "/categorias/convites", label: "Convites" },
    { href: "/categorias/packs", label: "Packs Digitais" },
  ],
  empresa: [
    { href: "/sobre", label: "Sobre Nós" },
    { href: "/blog", label: "Blog" },
    { href: "/ajuda", label: "Central de Ajuda" },
  ],
  legal: [
    { href: "/termos", label: "Termos de Uso" },
    { href: "/privacidade", label: "Política de Privacidade" },
  ],
};

export const features = [
  {
    icon: "BookOpen",
    title: "Flipbooks Interativos",
    description: "Transforme PDFs em publicações com efeito realista de virada de página.",
  },
  {
    icon: "Video",
    title: "Vídeos Interativos",
    description: "Gere vídeos com personagens animados a partir do seu conteúdo.",
  },
  {
    icon: "Sparkles",
    title: "IA Integrada",
    description: "Assistente inteligente que melhora textos e organiza conteúdo automaticamente.",
  },
  {
    icon: "Search",
    title: "SEO Automático",
    description: "Seu conteúdo otimizado para buscadores sem esforço técnico.",
  },
  {
    icon: "ShoppingCart",
    title: "Venda Online",
    description: "Monetize suas publicações com checkout integrado e gestão de vendas.",
  },
  {
    icon: "Shield",
    title: "Segurança Total",
    description: "Proteção por senha, controle de downloads e conformidade com LGPD.",
  },
  {
    icon: "Smartphone",
    title: "100% Responsivo",
    description: "Funciona perfeitamente em computador, tablet e celular.",
  },
  {
    icon: "Accessibility",
    title: "Acessibilidade",
    description: "Compatível com WCAG para inclusão de todos os usuários.",
  },
];

export const useCases = [
  {
    category: "Educação",
    icon: "GraduationCap",
    items: ["Apostilas interativas", "Livros didáticos", "Materiais de curso", "Flashcards"],
    color: "#263A68",
  },
  {
    category: "Institucional",
    icon: "Building",
    items: ["Relatórios anuais", "Documentos oficiais", "Manuais internos", "Comunicados"],
    color: "#342852",
  },
  {
    category: "Marketing",
    icon: "Megaphone",
    items: ["Catálogos de produtos", "Portfólios", "Apresentações", "Brochuras"],
    color: "#4F3D67",
  },
  {
    category: "Vendas",
    icon: "TrendingUp",
    items: ["Catálogos de vendas", "Lookbooks", "Cardápios digitais", "Listas de preços"],
    color: "#171A3D",
  },
];

export const plans = [
  {
    name: "Grátis",
    price: "R$ 0",
    period: "/mês",
    description: "Ideal para começar e experimentar a plataforma",
    features: [
      "3 publicações",
      "Visualizações ilimitadas",
      "Modelos básicos",
      "Marca d'água Dinheiro Investido",
      "Suporte por email",
    ],
    cta: "Começar Grátis",
    highlighted: false,
  },
  {
    name: "Profissional",
    price: "R$ 49",
    period: "/mês",
    description: "Para criadores e pequenas empresas",
    features: [
      "Publicações ilimitadas",
      "Sem marca d'água",
      "Todos os modelos",
      "Domínio personalizado",
      "Analytics avançado",
      "Exportação MP4 (5/mês)",
      "Suporte prioritário",
    ],
    cta: "Assinar Agora",
    highlighted: true,
  },
  {
    name: "Empresarial",
    price: "R$ 149",
    period: "/mês",
    description: "Para empresas e instituições",
    features: [
      "Tudo do Profissional",
      "Exportação MP4 ilimitada",
      "Loja de packs digitais",
      "Convites virtuais",
      "API de integração",
      "Múltiplos usuários",
      "Gerente de conta dedicado",
    ],
    cta: "Falar com Vendas",
    highlighted: false,
  },
];

export const testimonials = [
  {
    name: "Maria Silva",
    role: "Professora de História",
    content: "Transformei minhas apostilas em materiais interativos incríveis. Meus alunos adoram!",
    avatar: "/avatars/maria.jpg",
  },
  {
    name: "Carlos Santos",
    role: "Diretor de Marketing",
    content: "Nossos catálogos digitais aumentaram as conversões em 40%. Ferramenta essencial!",
    avatar: "/avatars/carlos.jpg",
  },
  {
    name: "Ana Oliveira",
    role: "Designer Gráfica",
    content: "Interface intuitiva e resultados profissionais. Recomendo para todos os designers.",
    avatar: "/avatars/ana.jpg",
  },
];

export const stats = [
  { value: "50.000+", label: "Publicações Criadas" },
  { value: "10.000+", label: "Usuários Ativos" },
  { value: "99.9%", label: "Uptime Garantido" },
  { value: "4.9/5", label: "Avaliação Média" },
];

export const faqItems = [
  {
    question: "Como funciona o Dinheiro Investido?",
    answer: "Você envia um PDF ou escolhe um modelo, edita com nosso editor visual intuitivo, e publica. Seu conteúdo vira uma publicação interativa com efeito de virada de página, pronta para compartilhar ou vender.",
  },
  {
    question: "Preciso saber programar ou design?",
    answer: "Não! Nossa plataforma foi criada para ser usada por qualquer pessoa, mesmo sem conhecimento técnico. Tudo funciona com cliques e arrastar-e-soltar.",
  },
  {
    question: "Posso vender minhas publicações?",
    answer: "Sim! Você pode definir preços, criar produtos e vender diretamente na plataforma. Oferecemos checkout integrado, gestão de vendas e relatórios completos.",
  },
  {
    question: "O que é a exportação em MP4?",
    answer: "Você pode transformar seu conteúdo em vídeos interativos com personagens animados. Dependendo do seu plano, pode ter franquia mensal ou pagar por download.",
  },
  {
    question: "Meu conteúdo fica seguro?",
    answer: "Absolutamente! Oferecemos proteção por senha, controle de downloads, marcas d'água opcionais e total conformidade com a LGPD.",
  },
  {
    question: "Funciona em celular?",
    answer: "Sim! Todas as publicações são 100% responsivas e funcionam perfeitamente em computador, tablet e celular.",
  },
];

export const categories = [
  {
    slug: "educacao",
    name: "Educação",
    description: "Materiais didáticos, apostilas, livros e recursos educacionais interativos",
    icon: "GraduationCap",
    color: "#263A68",
    examples: ["Apostilas", "Livros didáticos", "Flashcards", "Materiais de curso"],
  },
  {
    slug: "institucional",
    name: "Institucional e Governo",
    description: "Relatórios, documentos oficiais e comunicação institucional",
    icon: "Building",
    color: "#342852",
    examples: ["Relatórios anuais", "Documentos oficiais", "Manuais", "Comunicados"],
  },
  {
    slug: "marketing",
    name: "Marketing e Branding",
    description: "Catálogos, portfólios e materiais de marketing digital",
    icon: "Megaphone",
    color: "#4F3D67",
    examples: ["Catálogos", "Portfólios", "Brochuras", "Apresentações"],
  },
  {
    slug: "vendas",
    name: "Vendas e Catálogos",
    description: "Catálogos de produtos, lookbooks e materiais de vendas",
    icon: "ShoppingBag",
    color: "#171A3D",
    examples: ["Catálogos de produtos", "Lookbooks", "Cardápios", "Listas de preços"],
  },
  {
    slug: "convites",
    name: "Convites Virtuais",
    description: "Convites interativos para eventos, casamentos e celebrações",
    icon: "PartyPopper",
    color: "#736F89",
    examples: ["Casamentos", "Aniversários", "Formaturas", "Eventos corporativos"],
  },
  {
    slug: "packs",
    name: "Packs Digitais",
    description: "Artes digitais, templates e recursos para impressão",
    icon: "Package",
    color: "#263A68",
    examples: ["Capas para encadernação", "Artes temáticas", "Templates", "Coleções"],
  },
];

export const blogPosts = [
  {
    slug: "como-criar-flipbook-interativo",
    title: "Como Criar um Flipbook Interativo em 5 Minutos",
    excerpt: "Aprenda passo a passo como transformar seu PDF em uma publicação digital interativa com efeito de virada de página.",
    date: "2025-01-02",
    author: "Equipe Dinheiro Investido",
    category: "Tutorial",
    image: "/blog/flipbook-tutorial.jpg",
  },
  {
    slug: "materiais-educacionais-digitais",
    title: "O Futuro dos Materiais Educacionais Digitais",
    excerpt: "Descubra como a tecnologia está transformando a educação e como você pode criar materiais mais engajadores.",
    date: "2025-01-01",
    author: "Equipe Dinheiro Investido",
    category: "Educação",
    image: "/blog/educacao-digital.jpg",
  },
  {
    slug: "aumentar-vendas-catalogo-digital",
    title: "Como Aumentar Vendas com Catálogos Digitais",
    excerpt: "Estratégias comprovadas para usar catálogos interativos e aumentar suas conversões de vendas.",
    date: "2024-12-28",
    author: "Equipe Dinheiro Investido",
    category: "Marketing",
    image: "/blog/catalogo-vendas.jpg",
  },
];
