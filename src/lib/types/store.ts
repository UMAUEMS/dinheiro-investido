export type ProductType = 'template' | 'pack' | 'invite' | 'license';

export interface Product {
  id: string;
  type: ProductType;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  thumbnail: string;
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  
  // Para templates
  previewUrl?: string;
  pageCount?: number;
  
  // Para packs
  itemCount?: number;
  items?: PackItem[];
  
  // Para convites
  inviteType?: InviteType;
  customizable?: boolean;
  
  // Para licenças
  licenseType?: LicenseType;
  validityDays?: number;
}

export interface PackItem {
  id: string;
  name: string;
  type: 'template' | 'asset' | 'font' | 'icon';
  thumbnail: string;
}

export type InviteType = 
  | 'casamento'
  | 'aniversario'
  | 'formatura'
  | 'batizado'
  | 'cha-de-bebe'
  | 'cha-de-panela'
  | 'corporativo'
  | 'festa-infantil'
  | 'debutante'
  | 'outro';

export const INVITE_TYPE_LABELS: Record<InviteType, string> = {
  casamento: 'Casamento',
  aniversario: 'Aniversário',
  formatura: 'Formatura',
  batizado: 'Batizado',
  'cha-de-bebe': 'Chá de Bebê',
  'cha-de-panela': 'Chá de Panela',
  corporativo: 'Corporativo',
  'festa-infantil': 'Festa Infantil',
  debutante: 'Debutante',
  outro: 'Outro',
};

export type LicenseType = 'personal' | 'commercial' | 'extended' | 'unlimited';

export const LICENSE_TYPE_LABELS: Record<LicenseType, string> = {
  personal: 'Uso Pessoal',
  commercial: 'Uso Comercial',
  extended: 'Licença Estendida',
  unlimited: 'Licença Ilimitada',
};

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productType: ProductType;
  price: number;
  quantity: number;
  licenseKey?: string;
  downloadUrl?: string;
  downloadCount: number;
  maxDownloads: number;
}

export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendente',
  processing: 'Processando',
  completed: 'Concluído',
  failed: 'Falhou',
  refunded: 'Reembolsado',
  cancelled: 'Cancelado',
};

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
}
