import { createClient } from '@/lib/supabase/client';
import type { Product, ProductType, Order, Review } from '@/lib/types/store';

const supabase = createClient();

// ============================================
// PRODUTOS
// ============================================

export async function getProducts(options?: {
  type?: ProductType;
  category?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<{ data: Product[] | null; error: string | null; count: number }> {
  try {
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .eq('status', 'active');

    if (options?.type) {
      query = query.eq('type', options.type);
    }

    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.featured) {
      query = query.eq('featured', true);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    query = query.order('created_at', { ascending: false });

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data as Product[], error: null, count: count || 0 };
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return { data: null, error: 'Erro ao buscar produtos', count: 0 };
  }
}

export async function getProduct(id: string): Promise<{ data: Product | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data: data as Product, error: null };
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return { data: null, error: 'Produto não encontrado' };
  }
}

export async function getFeaturedProducts(limit = 8): Promise<{ data: Product[] | null; error: string | null }> {
  return getProducts({ featured: true, limit });
}

export async function getProductsByType(type: ProductType, limit = 12): Promise<{ data: Product[] | null; error: string | null }> {
  return getProducts({ type, limit });
}

// ============================================
// REVIEWS
// ============================================

export async function getProductReviews(productId: string): Promise<{ data: Review[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as Review[], error: null };
  } catch (error) {
    console.error('Erro ao buscar reviews:', error);
    return { data: null, error: 'Erro ao buscar avaliações' };
  }
}

export async function createReview(review: {
  productId: string;
  rating: number;
  title?: string;
  content?: string;
}): Promise<{ data: Review | null; error: string | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: 'Usuário não autenticado' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .single();

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id: review.productId,
        user_id: user.id,
        user_name: profile?.full_name || 'Usuário',
        user_avatar: profile?.avatar_url,
        rating: review.rating,
        title: review.title,
        content: review.content,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    return { data: data as Review, error: null };
  } catch (error) {
    console.error('Erro ao criar review:', error);
    return { data: null, error: 'Erro ao enviar avaliação' };
  }
}

// ============================================
// PEDIDOS
// ============================================

export async function getUserOrders(): Promise<{ data: Order[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as Order[], error: null };
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return { data: null, error: 'Erro ao buscar pedidos' };
  }
}

export async function getOrder(id: string): Promise<{ data: Order | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data: data as Order, error: null };
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return { data: null, error: 'Pedido não encontrado' };
  }
}

// ============================================
// COMPRAS DO USUÁRIO
// ============================================

export async function getUserPurchases(): Promise<{ data: any[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('user_purchases')
      .select(`
        *,
        product:products (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Erro ao buscar compras:', error);
    return { data: null, error: 'Erro ao buscar compras' };
  }
}

export async function hasUserPurchased(productId: string): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('user_purchases')
      .select('id')
      .eq('product_id', productId)
      .single();

    return !!data;
  } catch {
    return false;
  }
}

// ============================================
// CUPONS
// ============================================

export async function validateCoupon(code: string): Promise<{ 
  valid: boolean; 
  discount?: { type: 'percentage' | 'fixed'; value: number };
  error?: string;
}> {
  try {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single();

    if (error || !data) {
      return { valid: false, error: 'Cupom inválido' };
    }

    // Verificar validade
    if (data.valid_until && new Date(data.valid_until) < new Date()) {
      return { valid: false, error: 'Cupom expirado' };
    }

    // Verificar limite de uso
    if (data.max_uses && data.uses_count >= data.max_uses) {
      return { valid: false, error: 'Cupom esgotado' };
    }

    return {
      valid: true,
      discount: {
        type: data.discount_type,
        value: data.discount_value,
      },
    };
  } catch (error) {
    console.error('Erro ao validar cupom:', error);
    return { valid: false, error: 'Erro ao validar cupom' };
  }
}
