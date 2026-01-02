-- ============================================
-- DINHEIRO INVESTIDO - E-COMMERCE SCHEMA
-- Execute este script no SQL Editor do Supabase
-- ============================================

-- ============================================
-- TABELA: products (Produtos da loja)
-- ============================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('template', 'pack', 'invite', 'license')),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  compare_at_price DECIMAL(10,2),
  currency TEXT DEFAULT 'BRL',
  images TEXT[] DEFAULT '{}',
  thumbnail TEXT,
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
  
  -- Campos específicos por tipo
  preview_url TEXT,
  page_count INTEGER,
  item_count INTEGER,
  items JSONB DEFAULT '[]',
  invite_type TEXT,
  customizable BOOLEAN DEFAULT false,
  license_type TEXT,
  validity_days INTEGER,
  
  -- Arquivos para download
  download_files JSONB DEFAULT '[]',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: orders (Pedidos)
-- ============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_number TEXT UNIQUE NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'BRL',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled')),
  payment_method TEXT,
  payment_id TEXT,
  payment_data JSONB DEFAULT '{}',
  customer_email TEXT,
  customer_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: order_items (Itens do pedido)
-- ============================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  license_key TEXT,
  download_url TEXT,
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: reviews (Avaliações)
-- ============================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT,
  helpful INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: coupons (Cupons de desconto)
-- ============================================
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL(10,2) NOT NULL,
  min_purchase DECIMAL(10,2) DEFAULT 0,
  max_uses INTEGER,
  uses_count INTEGER DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  active BOOLEAN DEFAULT true,
  applies_to TEXT[] DEFAULT '{}', -- product types ou IDs específicos
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: user_purchases (Compras do usuário)
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_purchases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  license_key TEXT,
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: mp4_exports (Exportações de vídeo)
-- ============================================
CREATE TABLE IF NOT EXISTS public.mp4_exports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  publication_id UUID REFERENCES public.publications(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  quality TEXT DEFAULT '1080p' CHECK (quality IN ('720p', '1080p', '4k')),
  duration_seconds INTEGER,
  file_size_mb DECIMAL(10,2),
  file_url TEXT,
  payment_required BOOLEAN DEFAULT false,
  payment_id TEXT,
  payment_amount DECIMAL(10,2),
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- TABELA: invites (Convites virtuais)
-- ============================================
CREATE TABLE IF NOT EXISTS public.invites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  template_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date TIMESTAMPTZ,
  event_location TEXT,
  event_address TEXT,
  custom_data JSONB DEFAULT '{}',
  design_data JSONB DEFAULT '{}',
  slug TEXT UNIQUE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  views INTEGER DEFAULT 0,
  rsvp_enabled BOOLEAN DEFAULT false,
  rsvp_deadline TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TABELA: invite_rsvps (Confirmações de presença)
-- ============================================
CREATE TABLE IF NOT EXISTS public.invite_rsvps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  invite_id UUID REFERENCES public.invites(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  guests INTEGER DEFAULT 1,
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'declined', 'maybe')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- HABILITAR ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mp4_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite_rsvps ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS RLS: products (público para leitura)
-- ============================================
CREATE POLICY "Produtos ativos são públicos"
  ON public.products FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins podem gerenciar produtos"
  ON public.products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- ============================================
-- POLÍTICAS RLS: orders
-- ============================================
CREATE POLICY "Usuários podem ver seus pedidos"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar pedidos"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins podem gerenciar pedidos"
  ON public.orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- ============================================
-- POLÍTICAS RLS: order_items
-- ============================================
CREATE POLICY "Usuários podem ver itens de seus pedidos"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE id = order_id AND user_id = auth.uid()
    )
  );

-- ============================================
-- POLÍTICAS RLS: reviews
-- ============================================
CREATE POLICY "Reviews aprovadas são públicas"
  ON public.reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Usuários podem criar reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar suas reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS RLS: coupons
-- ============================================
CREATE POLICY "Cupons ativos podem ser verificados"
  ON public.coupons FOR SELECT
  USING (active = true AND (valid_until IS NULL OR valid_until > NOW()));

-- ============================================
-- POLÍTICAS RLS: user_purchases
-- ============================================
CREATE POLICY "Usuários podem ver suas compras"
  ON public.user_purchases FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS RLS: mp4_exports
-- ============================================
CREATE POLICY "Usuários podem ver suas exportações"
  ON public.mp4_exports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar exportações"
  ON public.mp4_exports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS RLS: invites
-- ============================================
CREATE POLICY "Usuários podem ver seus convites"
  ON public.invites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Convites publicados são públicos"
  ON public.invites FOR SELECT
  USING (status = 'published');

CREATE POLICY "Usuários podem criar convites"
  ON public.invites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem editar seus convites"
  ON public.invites FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus convites"
  ON public.invites FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- POLÍTICAS RLS: invite_rsvps
-- ============================================
CREATE POLICY "Donos do convite podem ver RSVPs"
  ON public.invite_rsvps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.invites
      WHERE id = invite_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Qualquer pessoa pode confirmar presença"
  ON public.invite_rsvps FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.invites
      WHERE id = invite_id AND status = 'published' AND rsvp_enabled = true
    )
  );

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_products_type ON public.products(type);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON public.user_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_mp4_exports_user_id ON public.mp4_exports(user_id);
CREATE INDEX IF NOT EXISTS idx_invites_user_id ON public.invites(user_id);
CREATE INDEX IF NOT EXISTS idx_invites_slug ON public.invites(slug);
CREATE INDEX IF NOT EXISTS idx_invite_rsvps_invite_id ON public.invite_rsvps(invite_id);

-- ============================================
-- FUNÇÃO: Gerar número do pedido
-- ============================================
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
BEGIN
  new_number := 'DI-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER: Auto-gerar número do pedido
-- ============================================
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_order_number ON public.orders;
CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION set_order_number();

-- ============================================
-- FUNÇÃO: Atualizar rating do produto
-- ============================================
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.products
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM public.reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) AND status = 'approved'
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) AND status = 'approved'
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_product_rating ON public.reviews;
CREATE TRIGGER trigger_update_product_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- ============================================
-- SUCESSO!
-- ============================================
SELECT 'E-commerce schema criado com sucesso!' as resultado;
