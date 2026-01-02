_# 🚀 Configurando o Supabase para a Parte 2_

_Siga estes passos para configurar seu projeto Supabase e conectar com a aplicação Next.js._

_## 1. Crie seu Projeto no Supabase_

_1.  Acesse [supabase.com](https://supabase.com) e crie uma conta ou faça login._
_2.  Clique em **"New Project"** e escolha uma organização._
_3.  Preencha o nome do projeto (ex: `dinheiro-investido`), gere uma senha segura para o banco de dados e escolha a região mais próxima de você (ex: `South America (São Paulo)`)._
_4.  Aguarde a criação do projeto._

_## 2. Obtenha as Chaves de API_

_1.  No painel do seu projeto, vá para **Project Settings** (ícone de engrenagem) > **API**._
_2.  Você precisará de três informações:_
    *   _**Project URL**_ 
    *   _**Project API Keys** > `anon` `public`_ 
    *   _**Project API Keys** > `service_role` `secret`_ 

_## 3. Configure as Variáveis de Ambiente_

_1.  Na raiz do seu projeto Next.js, renomeie o arquivo `.env.example` para `.env.local`._
_2.  Abra o arquivo `.env.local` e cole as chaves obtidas no passo anterior:_

_```bash
# .env.local

NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cole suas chaves do Supabase aqui
NEXT_PUBLIC_SUPABASE_URL=SUA_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=SUA_ANON_PUBLIC_KEY
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
```_

_**Importante**: Mantenha a `SUPABASE_SERVICE_ROLE_KEY` em segredo. Nunca a exponha no lado do cliente._

_## 4. Execute o Script SQL_

_1.  No painel do Supabase, vá para **SQL Editor** (ícone de `</>`)._
_2.  Clique em **"+ New query"**._
_3.  Abra o arquivo `supabase/migrations/001_initial_schema.sql` que está no projeto._
_4.  Copie **todo o conteúdo** do arquivo._
_5.  Cole o conteúdo no SQL Editor do Supabase._
_6.  Clique em **"RUN"**._

_Isso criará todas as tabelas (`profiles`, `subscriptions`, `publications`), ativará o Row Level Security (RLS) e configurará as políticas de acesso e a função `handle_new_user`._

_## 5. Configure os Provedores de Autenticação (OAuth)_

_Para que o login com Google e GitHub funcione, você precisa configurá-los no Supabase._

_1.  No painel do Supabase, vá para **Authentication** > **Providers**._
_2.  Ative e configure os provedores que desejar (Google, GitHub, etc.)._
_3.  Você precisará criar credenciais de OAuth em cada plataforma (Google Cloud Console, GitHub Developer Settings) e colar o `Client ID` e `Client Secret` no Supabase._
_4.  **URL de Callback**: Ao configurar, o Supabase fornecerá uma URL de callback. Use-a na configuração do provedor OAuth. A URL será algo como: `https://<SEU-PROJETO-ID>.supabase.co/auth/v1/callback`._

_## 6. Desabilite a Confirmação de Email (Opcional, para testes)_

_Por padrão, o Supabase exige que os usuários confirmem o email. Para facilitar os testes em ambiente de desenvolvimento, você pode desativar isso temporariamente._

_1.  Vá para **Authentication** > **Providers**._
_2.  Clique em **Email** e desmarque a opção **"Confirm email"**._

_**Lembre-se de reativar esta opção antes de ir para produção!**_

_## ✅ Pronto!_

_Após seguir estes passos, sua aplicação estará totalmente integrada com o Supabase. Inicie o servidor de desenvolvimento (`pnpm dev`) e teste os fluxos de registro, login e criação de perfil._
