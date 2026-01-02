-- ============================================
-- DINHEIRO INVESTIDO - SCHEMA INICIAL
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- ============================================
-- 1. TIPOS ENUMERADOS
-- ============================================

-- Roles de usuário
CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');

-- Planos de assinatura
CREATE TYPE subscription_plan AS ENUM ('free', 'professional', 'enterprise');

-- Status da assinatura
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing');

-- ============================================
-- 2. TABELA DE PERFIS
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Índices
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. TABELA DE ASSINATURAS
-- ============================================

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan subscription_plan DEFAULT 'free' NOT NULL,
  status subscription_status DEFAULT 'active' NOT NULL,
  current_period_start TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  current_period_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '1 month') NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  CONSTRAINT unique_user_subscription UNIQUE (user_id)
);

-- Índices
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. TABELA DE PUBLICAÇÕES
-- ============================================

CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  category TEXT,
  cover_url TEXT,
  file_url TEXT,
  is_public BOOLEAN DEFAULT FALSE NOT NULL,
  is_published BOOLEAN DEFAULT FALSE NOT NULL,
  views_count INTEGER DEFAULT 0 NOT NULL,
  likes_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  CONSTRAINT unique_publication_slug UNIQUE (user_id, slug)
);

-- Índices
CREATE INDEX idx_publications_user_id ON publications(user_id);
CREATE INDEX idx_publications_slug ON publications(slug);
CREATE INDEX idx_publications_category ON publications(category);
CREATE INDEX idx_publications_is_public ON publications(is_public);
CREATE INDEX idx_publications_is_published ON publications(is_published);
CREATE INDEX idx_publications_created_at ON publications(created_at DESC);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_publications_updated_at
  BEFORE UPDATE ON publications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5.1 POLÍTICAS PARA PROFILES
-- ============================================

-- Usuários podem ver seu próprio perfil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Usuários podem atualizar seu próprio perfil
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins podem ver todos os perfis
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Moderadores podem ver todos os perfis
CREATE POLICY "Moderators can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'moderator'
    )
  );

-- ============================================
-- 5.2 POLÍTICAS PARA SUBSCRIPTIONS
-- ============================================

-- Usuários podem ver sua própria assinatura
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Apenas sistema pode inserir/atualizar assinaturas (via service_role)
-- Usuários não podem modificar diretamente

-- Admins podem ver todas as assinaturas
CREATE POLICY "Admins can view all subscriptions"
  ON subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- 5.3 POLÍTICAS PARA PUBLICATIONS
-- ============================================

-- Usuários podem ver suas próprias publicações
CREATE POLICY "Users can view own publications"
  ON publications FOR SELECT
  USING (auth.uid() = user_id);

-- Qualquer pessoa pode ver publicações públicas e publicadas
CREATE POLICY "Anyone can view public published publications"
  ON publications FOR SELECT
  USING (is_public = TRUE AND is_published = TRUE);

-- Usuários podem criar suas próprias publicações
CREATE POLICY "Users can create own publications"
  ON publications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Usuários podem atualizar suas próprias publicações
CREATE POLICY "Users can update own publications"
  ON publications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Usuários podem deletar suas próprias publicações
CREATE POLICY "Users can delete own publications"
  ON publications FOR DELETE
  USING (auth.uid() = user_id);

-- Admins podem ver todas as publicações
CREATE POLICY "Admins can view all publications"
  ON publications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Moderadores podem ver todas as publicações
CREATE POLICY "Moderators can view all publications"
  ON publications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'moderator'
    )
  );

-- ============================================
-- 6. FUNÇÕES AUXILIARES
-- ============================================

-- Função para criar perfil automaticamente após signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Criar assinatura gratuita automaticamente
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil após signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Função para obter o plano atual do usuário
CREATE OR REPLACE FUNCTION get_user_plan(user_uuid UUID)
RETURNS subscription_plan AS $$
DECLARE
  user_plan subscription_plan;
BEGIN
  SELECT plan INTO user_plan
  FROM subscriptions
  WHERE user_id = user_uuid AND status = 'active'
  LIMIT 1;
  
  RETURN COALESCE(user_plan, 'free');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para verificar se usuário é admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_uuid AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para verificar se usuário é moderador
CREATE OR REPLACE FUNCTION is_moderator(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_uuid AND role IN ('moderator', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 7. STORAGE BUCKETS (execute separadamente)
-- ============================================

-- Nota: Os buckets de storage devem ser criados via Dashboard do Supabase
-- ou via API. Aqui está a configuração recomendada:

-- Bucket: avatars (para fotos de perfil)
-- Bucket: publications (para arquivos de publicações)
-- Bucket: covers (para capas de publicações)

-- As políticas de storage devem ser configuradas no Dashboard:
-- - avatars: usuários podem fazer upload/download de seus próprios avatares
-- - publications: usuários podem fazer upload/download de suas próprias publicações
-- - covers: usuários podem fazer upload/download de suas próprias capas
