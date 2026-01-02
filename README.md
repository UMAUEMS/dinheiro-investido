# Dinheiro Investido - Website Público (Parte 1)

## 🚀 Visão Geral

Este é o repositório da **Parte 1** do projeto Dinheiro Investido, uma plataforma SaaS para criação de publicações digitais interativas. Esta parte consiste no **website público e institucional**, construído para ser rápido, responsivo, acessível e otimizado para SEO.

O projeto foi desenvolvido seguindo estritamente os requisitos, com foco em entregar uma base sólida e funcional para as próximas fases.

## ✨ Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Gerenciador de Pacotes**: pnpm

## 📋 Funcionalidades Entregues

### Páginas

- **`/` (Home)**: Apresentação completa da plataforma, seus recursos e benefícios.
- **`/recursos`**: Detalhamento de todas as funcionalidades.
- **`/modelos`**: Galeria de modelos de publicações (stub funcional).
- **`/precos`**: Tabela de planos e preços com comparativo.
- **`/sobre`**: Página sobre a empresa e sua missão.
- **`/ajuda`**: Central de ajuda com FAQ.
- **`/galeria`**: Galeria de publicações criadas por usuários (stub funcional).
- **`/categorias/[slug]`**: Páginas de categoria indexáveis (ex: `/categorias/educacao`).
- **`/blog`**: Página principal do blog com 3 artigos de exemplo.
- **`/blog/[slug]`**: Página de artigo individual.
- **`/termos`**: Termos de Uso.
- **`/privacidade`**: Política de Privacidade.
- **`/auth`**: Página de login/cadastro (stub funcional, sem lógica de autenticação).
- **`/404`**: Página de erro 404 personalizada.

### SEO e Performance

- **Metadados Dinâmicos**: Títulos, descrições e `og:image` gerados dinamicamente para cada página.
- **Sitemap.xml**: Gerado automaticamente com todas as rotas públicas.
- **Robots.txt**: Configurado para permitir a indexação correta.
- **Schema.org**: Estrutura básica implementada no `layout.tsx`.
- **Imagens Otimizadas**: Favicons e `og:image` gerados e otimizados.

### Acessibilidade (WCAG)

- Estrutura semântica de HTML5.
- Navegação completa via teclado.
- Foco visível em todos os elementos interativos.
- Contraste de cores verificado.
- Link "Pular para o conteúdo principal".

## ⚙️ Como Rodar o Projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/installation)

### 2. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto, baseado no `.env.example`.

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Importante**: Para produção, altere `NEXT_PUBLIC_SITE_URL` para o seu domínio final (ex: `https://dinheiroinvestidoweb.com.br`).

### 3. Instalação

Clone o repositório e instale as dependências:

```bash
pnpm install
```

### 4. Rodando em Modo de Desenvolvimento

```bash
pnpm dev
```

O site estará disponível em [http://localhost:3000](http://localhost:3000).

### 5. Gerando o Build para Produção

O projeto está configurado para gerar um site estático, ideal para hospedagens como Hostinger, Vercel, Netlify, etc.

```bash
pnpm build
```

O comando irá gerar uma pasta `out` com todos os arquivos HTML, CSS e JS estáticos. Basta fazer o upload do conteúdo desta pasta para o seu servidor de hospedagem.

## 📂 Estrutura de Pastas

```
/src
├── app/                # Rotas do Next.js (uma pasta por rota)
│   ├── (site)/         # Grupo de rotas do site público
│   ├── api/            # Rotas de API (para o futuro)
│   ├── auth/           # Rota de autenticação
│   ├── layout.tsx      # Layout principal
│   ├── page.tsx        # Página Home
│   └── sitemap.ts      # Geração do sitemap
├── components/         # Componentes React reutilizáveis
│   ├── layout/         # Componentes de layout (Header, Footer)
│   ├── sections/       # Seções da Home Page
│   └── ui/             # Componentes base (Button, Card - shadcn/ui)
├── lib/                # Funções utilitárias, constantes e metadados
└── styles/             # Estilos globais
```
