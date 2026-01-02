-- ============================================
-- DINHEIRO INVESTIDO - STORAGE BUCKETS
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- ============================================
-- CRIAR BUCKETS DE STORAGE
-- ============================================

-- Bucket para PDFs das publicações
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'publications',
  'publications',
  false,
  52428800, -- 50MB
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- Bucket para capas das publicações
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'covers',
  'covers',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Bucket para avatares dos usuários
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  2097152, -- 2MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Bucket para páginas renderizadas dos flipbooks
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pages',
  'pages',
  true,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- POLÍTICAS DE STORAGE: publications (privado)
-- ============================================

-- Usuários podem fazer upload de seus próprios PDFs
CREATE POLICY "Usuários podem fazer upload de PDFs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'publications' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Usuários podem ver seus próprios PDFs
CREATE POLICY "Usuários podem ver seus PDFs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'publications' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Usuários podem deletar seus próprios PDFs
CREATE POLICY "Usuários podem deletar seus PDFs"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'publications' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================
-- POLÍTICAS DE STORAGE: covers (público)
-- ============================================

-- Usuários podem fazer upload de capas
CREATE POLICY "Usuários podem fazer upload de capas"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'covers' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Qualquer pessoa pode ver capas
CREATE POLICY "Capas são públicas"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'covers');

-- Usuários podem deletar suas capas
CREATE POLICY "Usuários podem deletar suas capas"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'covers' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================
-- POLÍTICAS DE STORAGE: avatars (público)
-- ============================================

-- Usuários podem fazer upload de avatares
CREATE POLICY "Usuários podem fazer upload de avatares"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Qualquer pessoa pode ver avatares
CREATE POLICY "Avatares são públicos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

-- Usuários podem atualizar seus avatares
CREATE POLICY "Usuários podem atualizar seus avatares"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Usuários podem deletar seus avatares
CREATE POLICY "Usuários podem deletar seus avatares"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================
-- POLÍTICAS DE STORAGE: pages (público)
-- ============================================

-- Usuários podem fazer upload de páginas
CREATE POLICY "Usuários podem fazer upload de páginas"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'pages' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Qualquer pessoa pode ver páginas públicas
CREATE POLICY "Páginas são públicas"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'pages');

-- Usuários podem deletar suas páginas
CREATE POLICY "Usuários podem deletar suas páginas"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'pages' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- ============================================
-- SUCESSO!
-- ============================================
SELECT 'Storage buckets criados com sucesso!' as resultado;
