import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

export interface MP4Export {
  id: string;
  user_id: string;
  publication_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  quality: '720p' | '1080p' | '4k';
  duration_seconds?: number;
  file_size_mb?: number;
  file_url?: string;
  payment_required: boolean;
  payment_id?: string;
  payment_amount?: number;
  error_message?: string;
  created_at: string;
  completed_at?: string;
}

export interface ExportPricing {
  quality: '720p' | '1080p' | '4k';
  price: number;
  label: string;
  description: string;
}

export const EXPORT_PRICING: ExportPricing[] = [
  {
    quality: '720p',
    price: 9.90,
    label: 'HD (720p)',
    description: 'Ideal para redes sociais e apresentações simples',
  },
  {
    quality: '1080p',
    price: 19.90,
    label: 'Full HD (1080p)',
    description: 'Qualidade profissional para a maioria dos usos',
  },
  {
    quality: '4k',
    price: 39.90,
    label: 'Ultra HD (4K)',
    description: 'Máxima qualidade para apresentações premium',
  },
];

// ============================================
// EXPORTAÇÕES
// ============================================

export async function getUserExports(): Promise<{ data: MP4Export[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('mp4_exports')
      .select(`
        *,
        publication:publications (id, title, slug)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as MP4Export[], error: null };
  } catch (error) {
    console.error('Erro ao buscar exportações:', error);
    return { data: null, error: 'Erro ao buscar exportações' };
  }
}

export async function getExport(id: string): Promise<{ data: MP4Export | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('mp4_exports')
      .select(`
        *,
        publication:publications (id, title, slug)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data: data as MP4Export, error: null };
  } catch (error) {
    console.error('Erro ao buscar exportação:', error);
    return { data: null, error: 'Exportação não encontrada' };
  }
}

export async function getPublicationExports(publicationId: string): Promise<{ data: MP4Export[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('mp4_exports')
      .select('*')
      .eq('publication_id', publicationId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data: data as MP4Export[], error: null };
  } catch (error) {
    console.error('Erro ao buscar exportações:', error);
    return { data: null, error: 'Erro ao buscar exportações' };
  }
}

export async function createFreeExport(
  publicationId: string,
  quality: '720p' | '1080p' | '4k'
): Promise<{ data: MP4Export | null; error: string | null }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: 'Usuário não autenticado' };
    }

    // Verificar se o usuário tem permissão para exportação gratuita
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', user.id)
      .single();

    // Verificar limites do plano
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Contar exportações do mês atual
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count } = await supabase
      .from('mp4_exports')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('payment_required', false)
      .gte('created_at', startOfMonth.toISOString());

    // Limites por plano
    const limits: Record<string, number> = {
      free: 0,
      starter: 0,
      professional: 10,
      enterprise: -1, // ilimitado
    };

    const plan = profile?.plan || 'free';
    const limit = limits[plan] ?? 0;

    if (limit !== -1 && (count || 0) >= limit) {
      return { data: null, error: 'Limite de exportações gratuitas atingido. Faça upgrade ou pague por exportação.' };
    }

    // Criar exportação
    const { data, error } = await supabase
      .from('mp4_exports')
      .insert({
        user_id: user.id,
        publication_id: publicationId,
        status: 'pending',
        quality,
        payment_required: false,
      })
      .select()
      .single();

    if (error) throw error;

    // TODO: Disparar job de processamento de vídeo
    // Em produção, isso seria feito via queue (ex: Bull, AWS SQS)

    return { data: data as MP4Export, error: null };
  } catch (error) {
    console.error('Erro ao criar exportação:', error);
    return { data: null, error: 'Erro ao criar exportação' };
  }
}

export async function checkExportStatus(exportId: string): Promise<MP4Export | null> {
  try {
    const { data } = await supabase
      .from('mp4_exports')
      .select('*')
      .eq('id', exportId)
      .single();

    return data as MP4Export;
  } catch {
    return null;
  }
}

// ============================================
// SIMULAÇÃO DE PROCESSAMENTO (para demo)
// ============================================

export async function simulateExportProcessing(exportId: string): Promise<void> {
  // Em produção, isso seria feito por um worker/job queue
  // Aqui simulamos o processamento

  try {
    // Atualizar para "processing"
    await supabase
      .from('mp4_exports')
      .update({ status: 'processing' })
      .eq('id', exportId);

    // Simular tempo de processamento (em produção seria real)
    // O processamento real usaria FFmpeg ou similar
    
    // Após processamento, atualizar para "completed"
    // await supabase
    //   .from('mp4_exports')
    //   .update({
    //     status: 'completed',
    //     file_url: 'https://storage.example.com/exports/video.mp4',
    //     file_size_mb: 25.5,
    //     duration_seconds: 120,
    //     completed_at: new Date().toISOString(),
    //   })
    //   .eq('id', exportId);

  } catch (error) {
    console.error('Erro ao processar exportação:', error);
    
    await supabase
      .from('mp4_exports')
      .update({
        status: 'failed',
        error_message: 'Erro no processamento do vídeo',
      })
      .eq('id', exportId);
  }
}

// ============================================
// HELPERS
// ============================================

export function getExportStatusLabel(status: MP4Export['status']): string {
  const labels: Record<MP4Export['status'], string> = {
    pending: 'Aguardando',
    processing: 'Processando',
    completed: 'Concluído',
    failed: 'Falhou',
  };
  return labels[status];
}

export function getExportStatusColor(status: MP4Export['status']): string {
  const colors: Record<MP4Export['status'], string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
  };
  return colors[status];
}

export function formatFileSize(mb?: number): string {
  if (!mb) return '-';
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`;
  }
  return `${mb.toFixed(1)} MB`;
}

export function formatDuration(seconds?: number): string {
  if (!seconds) return '-';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
