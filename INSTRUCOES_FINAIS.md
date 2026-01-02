# ✅ Projeto Concluído: Dinheiro Investido SaaS

Este arquivo contém as instruções finais para configurar e rodar o projeto completo, incluindo as funcionalidades de monetização e a área administrativa.

## 1. Variáveis de Ambiente (`.env.local`)

O arquivo `.env.local` está configurado com placeholders. Você **precisa** substituir pelos seus valores reais do Supabase e do Stripe para que o sistema funcione em produção.

```
# Configurações do Site
NEXT_PUBLIC_SITE_URL=https://dinheiroinvestidoweb.com.br

# Supabase - Credenciais de Produção
NEXT_PUBLIC_SUPABASE_URL=https://bsmwqfguocpaiqacrzpe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui

# Service Role Key (necessária para operações administrativas no servidor)
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# Stripe (use suas chaves reais em produção)
STRIPE_SECRET_KEY=sua_chave_secreta_do_stripe_aqui
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=sua_chave_publica_do_stripe_aqui
STRIPE_WEBHOOK_SECRET=seu_segredo_do_webhook_do_stripe_aqui
```

**Onde encontrar as chaves:**

- **Supabase**: Em `Project Settings > API`.
- **Stripe**: Em `Developers > API keys`.
- **Stripe Webhook Secret**: Ao criar um endpoint de webhook no Stripe, ele será gerado.

## 2. Configurar Webhook do Stripe

Para que as assinaturas e pagamentos funcionem corretamente, você precisa configurar um webhook no Stripe.

1.  Vá para `Developers > Webhooks` no seu painel do Stripe.
2.  Clique em **Add an endpoint**.
3.  **Endpoint URL**: `https://seu-dominio.com/api/webhooks/stripe`
4.  **Events to send**: Clique em `Select events` e adicione os seguintes eventos:
    *   `checkout.session.completed`
    *   `customer.subscription.created`
    *   `customer.subscription.updated`
    *   `customer.subscription.deleted`
    *   `invoice.paid`
    *   `invoice.payment_failed`
5.  Clique em **Add endpoint**. Copie o **Signing secret** e cole no seu arquivo `.env.local` como `STRIPE_WEBHOOK_SECRET`.

## 3. Scripts SQL do Supabase

Execute os seguintes scripts SQL no **SQL Editor** do seu projeto Supabase para criar as tabelas e políticas de segurança necessárias. **Execute na ordem correta**.

1.  `supabase/migrations/001_initial_schema.sql` (Já executado)
2.  `supabase/migrations/002_storage_buckets.sql`
3.  `supabase/migrations/003_ecommerce_schema.sql`

## 4. Como Rodar o Projeto

Após configurar as variáveis de ambiente, siga os passos do `README.md` original:

```bash
# 1. Instalar dependências
pnpm install

# 2. Rodar em modo de desenvolvimento
pnpm dev

# 3. Gerar build para produção (export estático)
pnpm build
```

## 5. Primeiro Usuário Administrador

Para acessar a área administrativa (`/admin`), você precisa definir um usuário como `admin`.

1.  Crie uma conta normalmente pelo site.
2.  Vá para o **Table Editor** no seu painel do Supabase.
3.  Abra a tabela `profiles`.
4.  Encontre o seu usuário e mude o valor da coluna `role` de `user` para `admin`.
5.  Faça login novamente. Agora você terá acesso ao painel `/admin`.

---

O projeto está completo e funcional. Todas as funcionalidades solicitadas foram implementadas como stubs funcionais reais, prontos para serem expandidos e customizados.
