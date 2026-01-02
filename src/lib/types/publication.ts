export interface Publication {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  slug: string | null;
  cover_url: string | null;
  pdf_url: string | null;
  status: 'draft' | 'published' | 'archived';
  visibility: 'private' | 'public' | 'unlisted';
  views: number;
  category: string | null;
  tags: string[] | null;
  settings: PublicationSettings;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface PublicationSettings {
  // Configurações de visualização
  showDownloadButton?: boolean;
  showPrintButton?: boolean;
  showShareButton?: boolean;
  showFullscreenButton?: boolean;
  showPageNumbers?: boolean;
  showThumbnails?: boolean;
  showTableOfContents?: boolean;
  
  // Configurações de navegação
  enableKeyboardNavigation?: boolean;
  enableSwipeNavigation?: boolean;
  enableMouseWheelNavigation?: boolean;
  
  // Configurações de aparência
  backgroundColor?: string;
  flipDuration?: number;
  autoFlipInterval?: number;
  
  // Configurações de proteção
  enablePasswordProtection?: boolean;
  password?: string;
  disableRightClick?: boolean;
  
  // Configurações de SEO
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  
  // Páginas do flipbook
  pages?: FlipbookPage[];
  totalPages?: number;
}

export interface FlipbookPage {
  pageNumber: number;
  imageUrl: string;
  thumbnailUrl?: string;
  width: number;
  height: number;
}

export interface CreatePublicationInput {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  visibility?: 'private' | 'public' | 'unlisted';
}

export interface UpdatePublicationInput {
  title?: string;
  description?: string;
  slug?: string;
  cover_url?: string;
  pdf_url?: string;
  status?: 'draft' | 'published' | 'archived';
  visibility?: 'private' | 'public' | 'unlisted';
  category?: string;
  tags?: string[];
  settings?: Partial<PublicationSettings>;
}

export const PUBLICATION_CATEGORIES = [
  { value: 'educacao', label: 'Educação' },
  { value: 'institucional', label: 'Institucional' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'vendas', label: 'Vendas' },
  { value: 'convites', label: 'Convites' },
  { value: 'packs', label: 'Packs Digitais' },
  { value: 'portfolio', label: 'Portfólio' },
  { value: 'revista', label: 'Revista' },
  { value: 'catalogo', label: 'Catálogo' },
  { value: 'ebook', label: 'E-book' },
  { value: 'apresentacao', label: 'Apresentação' },
  { value: 'outro', label: 'Outro' },
] as const;

export const PUBLICATION_STATUS_LABELS = {
  draft: 'Rascunho',
  published: 'Publicado',
  archived: 'Arquivado',
} as const;

export const PUBLICATION_VISIBILITY_LABELS = {
  private: 'Privado',
  public: 'Público',
  unlisted: 'Não listado',
} as const;
