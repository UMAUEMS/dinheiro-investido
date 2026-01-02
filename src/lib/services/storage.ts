import { createClient } from '@/lib/supabase/client';

export interface UploadResult {
  success: boolean;
  path?: string;
  url?: string;
  error?: string;
}

export async function uploadPDF(
  file: File,
  userId: string,
  publicationId: string
): Promise<UploadResult> {
  const supabase = createClient();
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${publicationId}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('publications')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error('Erro ao fazer upload do PDF:', error);
    return { success: false, error: error.message };
  }

  return {
    success: true,
    path: data.path,
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/publications/${data.path}`,
  };
}

export async function uploadCover(
  file: File,
  userId: string,
  publicationId: string
): Promise<UploadResult> {
  const supabase = createClient();
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${publicationId}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('covers')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error('Erro ao fazer upload da capa:', error);
    return { success: false, error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from('covers')
    .getPublicUrl(data.path);

  return {
    success: true,
    path: data.path,
    url: urlData.publicUrl,
  };
}

export async function uploadAvatar(
  file: File,
  userId: string
): Promise<UploadResult> {
  const supabase = createClient();
  
  const fileExt = file.name.split('.').pop();
  const fileName = `avatar.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error('Erro ao fazer upload do avatar:', error);
    return { success: false, error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from('avatars')
    .getPublicUrl(data.path);

  return {
    success: true,
    path: data.path,
    url: urlData.publicUrl,
  };
}

export async function uploadFlipbookPage(
  file: File | Blob,
  userId: string,
  publicationId: string,
  pageNumber: number
): Promise<UploadResult> {
  const supabase = createClient();
  
  const fileName = `page-${String(pageNumber).padStart(4, '0')}.webp`;
  const filePath = `${userId}/${publicationId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('pages')
    .upload(filePath, file, {
      cacheControl: '31536000', // 1 ano
      upsert: true,
      contentType: 'image/webp',
    });

  if (error) {
    console.error('Erro ao fazer upload da página:', error);
    return { success: false, error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from('pages')
    .getPublicUrl(data.path);

  return {
    success: true,
    path: data.path,
    url: urlData.publicUrl,
  };
}

export async function deleteFile(
  bucket: 'publications' | 'covers' | 'avatars' | 'pages',
  path: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error('Erro ao deletar arquivo:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deletePublicationFiles(
  userId: string,
  publicationId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();

  // Deletar PDF
  await supabase.storage
    .from('publications')
    .remove([`${userId}/${publicationId}.pdf`]);

  // Deletar capa
  await supabase.storage
    .from('covers')
    .remove([`${userId}/${publicationId}.jpg`, `${userId}/${publicationId}.png`, `${userId}/${publicationId}.webp`]);

  // Listar e deletar todas as páginas
  const { data: pages } = await supabase.storage
    .from('pages')
    .list(`${userId}/${publicationId}`);

  if (pages && pages.length > 0) {
    const pagePaths = pages.map(p => `${userId}/${publicationId}/${p.name}`);
    await supabase.storage
      .from('pages')
      .remove(pagePaths);
  }

  return { success: true };
}

export function getPublicUrl(bucket: string, path: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}
