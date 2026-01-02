import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Eye,
  Heart,
  TrendingUp,
  Plus,
  ArrowRight,
  Clock,
  Crown,
} from "lucide-react";
import { getUserWithProfile } from "@/lib/supabase/get-user";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard | Dinheiro Investido",
  description: "Gerencie suas publicações digitais",
};

export default async function DashboardPage() {
  const { user, profile, subscription } = await getUserWithProfile();
  const supabase = await createClient();

  // Buscar estatísticas do usuário
  const { data: publications, count: publicationsCount } = await supabase
    .from("publications")
    .select("*", { count: "exact" })
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Calcular totais
  const totalViews = publications?.reduce((acc, pub) => acc + (pub.views_count || 0), 0) || 0;
  const totalLikes = publications?.reduce((acc, pub) => acc + (pub.likes_count || 0), 0) || 0;

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "Usuário";
  const isPro = subscription?.plan !== "free";
  const publicationsLimit = isPro ? "∞" : "3";
  const publicationsUsed = publicationsCount || 0;

  const stats = [
    {
      title: "Publicações",
      value: publicationsUsed,
      subtitle: `de ${publicationsLimit} disponíveis`,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Visualizações",
      value: totalViews.toLocaleString("pt-BR"),
      subtitle: "total",
      icon: Eye,
      color: "bg-green-500",
    },
    {
      title: "Curtidas",
      value: totalLikes.toLocaleString("pt-BR"),
      subtitle: "total",
      icon: Heart,
      color: "bg-red-500",
    },
    {
      title: "Crescimento",
      value: "+12%",
      subtitle: "este mês",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#171A3D]">
            Olá, {displayName}! 👋
          </h1>
          <p className="text-[#736F89]">
            Bem-vindo ao seu painel de controle.
          </p>
        </div>
        <Link href="/dashboard/nova-publicacao">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Publicação
          </Button>
        </Link>
      </div>

      {/* Upgrade Banner (para usuários free) */}
      {!isPro && (
        <Card className="bg-gradient-to-r from-[#171A3D] to-[#263A68] border-none">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold">
                  Desbloqueie todo o potencial
                </h3>
                <p className="text-white/70 text-sm">
                  Faça upgrade para publicações ilimitadas e recursos avançados.
                </p>
              </div>
            </div>
            <Link href="/precos">
              <Button className="bg-white text-[#171A3D] hover:bg-white/90">
                Ver Planos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#736F89]">{stat.title}</p>
                  <p className="text-2xl font-bold text-[#171A3D]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#736F89]">{stat.subtitle}</p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Publications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Publicações Recentes</CardTitle>
          <Link
            href="/dashboard/publicacoes"
            className="text-sm text-[#263A68] hover:underline"
          >
            Ver todas
          </Link>
        </CardHeader>
        <CardContent>
          {publications && publications.length > 0 ? (
            <div className="space-y-4">
              {publications.map((pub) => (
                <div
                  key={pub.id}
                  className="flex items-center gap-4 p-4 bg-[#E5E5E6]/30 rounded-lg"
                >
                  <div className="w-16 h-20 bg-[#171A3D] rounded flex items-center justify-center flex-shrink-0">
                    {pub.cover_url ? (
                      <img
                        src={pub.cover_url}
                        alt={pub.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <FileText className="w-6 h-6 text-white/50" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#171A3D] truncate">
                      {pub.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-[#736F89]">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {pub.views_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {pub.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(pub.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        pub.is_published
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {pub.is_published ? "Publicado" : "Rascunho"}
                    </span>
                    <Link href={`/dashboard/publicacoes/${pub.id}`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-[#736F89] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#171A3D] mb-2">
                Nenhuma publicação ainda
              </h3>
              <p className="text-[#736F89] mb-4">
                Crie sua primeira publicação digital interativa.
              </p>
              <Link href="/dashboard/nova-publicacao">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Publicação
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/nova-publicacao">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#263A68]/10 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-[#263A68]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#171A3D]">
                    Nova Publicação
                  </h4>
                  <p className="text-sm text-[#736F89]">
                    Crie um flipbook ou revista
                  </p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/modelos">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#4F3D67]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#4F3D67]" />
                </div>
                <div>
                  <h4 className="font-medium text-[#171A3D]">
                    Explorar Modelos
                  </h4>
                  <p className="text-sm text-[#736F89]">
                    Templates prontos para usar
                  </p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/analytics">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium text-[#171A3D]">
                    Ver Analytics
                  </h4>
                  <p className="text-sm text-[#736F89]">
                    Métricas e relatórios
                  </p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
