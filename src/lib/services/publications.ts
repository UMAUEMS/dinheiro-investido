import { createClient } from '@/lib/supabase/client';
import type { Publication, CreatePublicationInput, UpdatePublicationInput } from '@/lib/types/publication';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50);
}

export async function createPublication(
  input: CreatePublicationInput
): Promise<{ data: Publication | null; error: string | null }> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: 'Usuário não autenticado' };
  }

  const slug = generateSlug(input.title) + '-' + Date.now().toString(36);

  const { data, error } = await supabase
    .from('publications')
    .insert({
      user_id: user.id,
      title: input.title,
      description: input.description || null,
      slug,
      category: input.category || null,
      tags: input.tags || null,
      visibility: input.visibility || 'private',
      status: 'draft',
      settings: {},
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar publicação:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getPublication(
  id: string
): Promise<{ data: Publication | null; error: string | null }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar publicação:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getPublicationBySlug(
  slug: string
): Promise<{ data: Publication | null; error: string | null }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Erro ao buscar publicação por slug:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function getUserPublications(): Promise<{
  data: Publication[] | null;
  error: string | null;
}> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: 'Usuário não autenticado' };
  }

  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar publicações:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function updatePublication(
  id: string,
  input: UpdatePublicationInput
): Promise<{ data: Publication | null; error: string | null }> {
  const supabase = createClient();

  const updateData: Record<string, unknown> = {
    ...input,
    updated_at: new Date().toISOString(),
  };

  // Se estiver publicando, definir published_at
  if (input.status === 'published') {
    const { data: current } = await supabase
      .from('publications')
      .select('published_at')
      .eq('id', id)
      .single();
    
    if (!current?.published_at) {
      updateData.published_at = new Date().toISOString();
    }
  }

  const { data, error } = await supabase
    .from('publications')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar publicação:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function deletePublication(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  const supabase = createClient();

  const { error } = await supabase
    .from('publications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar publicação:', error);
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function incrementViews(id: string): Promise<void> {
  const supabase = createClient();

  await supabase.rpc('increment_publication_views', { publication_id: id });
}

export async function getPublicPublications(
  category?: string,
  limit = 20
): Promise<{ data: Publication[] | null; error: string | null }> {
  const supabase = createClient();

  let query = supabase
    .from('publications')
    .select('*')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar publicações públicas:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}

export async function searchPublications(
  query: string,
  limit = 20
): Promise<{ data: Publication[] | null; error: string | null }> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('publications')
    .select('*')
    .eq('status', 'published')
    .eq('visibility', 'public')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('views', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erro ao buscar publicações:', error);
    return { data: null, error: error.message };
  }

  return { data, error: null };
}
