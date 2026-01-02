import { createClient } from '@/lib/supabase/client';
import type { InviteType } from '@/lib/types/store';

const supabase = createClient();

export interface Invite {
  id: string;
  user_id: string;
  template_id?: string;
  title: string;
  event_type: InviteType;
  event_date?: string;
  event_location?: string;
  event_address?: string;
  custom_data: Record<string, any>;
  design_data: Record<string, any>;
  slug?: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  rsvp_enabled: boolean;
  rsvp_deadline?: string;
  created_at: string;
  updated_at: string;
}

export interface RSVP {
  id: string;
  invite_id: string;
  name: string;
  email?: string;
  phone?: string;
  guests: number;
  status: 'confirmed' | 'declined' | 'maybe';
  message?: string;
  created_at: string;
}

export interface CreateInviteInput {
  title: string;
  event_type: InviteType;
  template_id?: string;
  event_date?: string;
  event_location?: string;
  event_address?: string;
  custom_data?: Record<string, any>;
  design_data?: Record<string, any>;
  rsvp_enabled?: boolean;
  rsvp_deadline?: string;
}

export interface UpdateInviteInput extends Partial<CreateInviteInput> {
  status?: 'draft' | 'published' | 'archived';
  slug?: string;
}

// ============================================
// CRUD DE CONVITES
// ============================================

export async function getUserInvites(): Promise<{ data: Invite[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('invites')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as Invite[], error: null };
  } catch (error) {
    console.error('Erro ao buscar convites:', error);
    return { data: null, error: 'Erro ao buscar convites' };
  }
}

export async function getInvite(id: string): Promise<{ data: Invite | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('invites')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data: data as Invite, error: null };
  } catch (error) {
    console.error('Erro ao buscar convite:', error);
    return { data: null, error: 'Convite não encontrado' };
  }
}

export async function getInviteBySlug(slug: string): Promise<{ data: Invite | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('invites')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) throw error;

    // Incrementar visualizações
    await supabase
      .from('invites')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', data.id);

    return { data: data as Invite, error: null };
  } catch (error) {
    console.error('Erro ao buscar convite:', error);
    return { data: null, error: 'Convite não encontrado' };
  }
}

export async function createInvite(input: CreateInviteInput): Promise<{ data: Invite | null; error: string | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: 'Usuário não autenticado' };
    }

    const { data, error } = await supabase
      .from('invites')
      .insert({
        user_id: user.id,
        ...input,
        status: 'draft',
        views: 0,
      })
      .select()
      .single();

    if (error) throw error;

    return { data: data as Invite, error: null };
  } catch (error) {
    console.error('Erro ao criar convite:', error);
    return { data: null, error: 'Erro ao criar convite' };
  }
}

export async function updateInvite(id: string, input: UpdateInviteInput): Promise<{ data: Invite | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('invites')
      .update({
        ...input,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data: data as Invite, error: null };
  } catch (error) {
    console.error('Erro ao atualizar convite:', error);
    return { data: null, error: 'Erro ao atualizar convite' };
  }
}

export async function publishInvite(id: string): Promise<{ data: Invite | null; error: string | null }> {
  try {
    // Gerar slug único
    const slug = generateSlug();

    const { data, error } = await supabase
      .from('invites')
      .update({
        status: 'published',
        slug,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return { data: data as Invite, error: null };
  } catch (error) {
    console.error('Erro ao publicar convite:', error);
    return { data: null, error: 'Erro ao publicar convite' };
  }
}

export async function deleteInvite(id: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase
      .from('invites')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    console.error('Erro ao excluir convite:', error);
    return { error: 'Erro ao excluir convite' };
  }
}

// ============================================
// RSVP
// ============================================

export async function getInviteRSVPs(inviteId: string): Promise<{ data: RSVP[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('invite_rsvps')
      .select('*')
      .eq('invite_id', inviteId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as RSVP[], error: null };
  } catch (error) {
    console.error('Erro ao buscar RSVPs:', error);
    return { data: null, error: 'Erro ao buscar confirmações' };
  }
}

export async function submitRSVP(input: {
  invite_id: string;
  name: string;
  email?: string;
  phone?: string;
  guests?: number;
  status: 'confirmed' | 'declined' | 'maybe';
  message?: string;
}): Promise<{ data: RSVP | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('invite_rsvps')
      .insert({
        ...input,
        guests: input.guests || 1,
      })
      .select()
      .single();

    if (error) throw error;

    return { data: data as RSVP, error: null };
  } catch (error) {
    console.error('Erro ao enviar RSVP:', error);
    return { data: null, error: 'Erro ao enviar confirmação' };
  }
}

export async function getRSVPStats(inviteId: string): Promise<{
  confirmed: number;
  declined: number;
  maybe: number;
  totalGuests: number;
}> {
  try {
    const { data } = await supabase
      .from('invite_rsvps')
      .select('status, guests')
      .eq('invite_id', inviteId);

    if (!data) {
      return { confirmed: 0, declined: 0, maybe: 0, totalGuests: 0 };
    }

    const stats = data.reduce(
      (acc, rsvp) => {
        const status = rsvp.status as 'confirmed' | 'declined' | 'maybe';
        if (status === 'confirmed' || status === 'declined' || status === 'maybe') {
          acc[status]++;
        }
        if (status === 'confirmed') {
          acc.totalGuests += rsvp.guests || 1;
        }
        return acc;
      },
      { confirmed: 0, declined: 0, maybe: 0, totalGuests: 0 }
    );

    return stats;
  } catch {
    return { confirmed: 0, declined: 0, maybe: 0, totalGuests: 0 };
  }
}

// ============================================
// HELPERS
// ============================================

function generateSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let slug = '';
  for (let i = 0; i < 8; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}
