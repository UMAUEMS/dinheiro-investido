import { createClient } from "@/lib/supabase/server";
import {
  Users,
  FileText,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function getAdminStats() {
  const supabase = await createClient();

  // Contar usuários
  const { count: usersCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  // Contar publicações
  const { count: publicationsCount } = await supabase
    .from("publications")
    .select("*", { count: "exact", head: true });

  // Contar pedidos
  const { count: ordersCount } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // Calcular receita total
  const { data: orders } = await supabase
    .from("orders")
    .select("total")
    .eq("status", "completed");

  const totalRevenue = orders?.reduce((acc, order) => acc + (order.total || 0), 0) || 0;

  // Usuários recentes
  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("id, email, full_name, created_at, plan")
    .order("created_at", { ascending: false })
    .limit(5);

  // Publicações recentes
  const { data: recentPublications } = await supabase
    .from("publications")
    .select("id, title, status, views, created_at, user_id")
    .order("created_at", { ascending: false })
    .limit(5);

  // Pedidos recentes
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, order_number, total, status, created_at, customer_email")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    usersCount: usersCount || 0,
    publicationsCount: publicationsCount || 0,
    ordersCount: ordersCount || 0,
    totalRevenue,
    recentUsers: recentUsers || [],
    recentPublications: recentPublications || [],
    recentOrders: recentOrders || [],
  };
}

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#171A3D]">Dashboard Administrativo</h1>
        <p className="text-[#736F89]">Visão geral da plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#736F89]">Total de Usuários</p>
                <p className="text-3xl font-bold text-[#171A3D]">{stats.usersCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">+12%</span>
              <span className="text-[#736F89]">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#736F89]">Publicações</p>
                <p className="text-3xl font-bold text-[#171A3D]">{stats.publicationsCount}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">+8%</span>
              <span className="text-[#736F89]">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#736F89]">Pedidos</p>
                <p className="text-3xl font-bold text-[#171A3D]">{stats.ordersCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">+24%</span>
              <span className="text-[#736F89]">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#736F89]">Receita Total</p>
                <p className="text-3xl font-bold text-[#171A3D]">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-green-500">+18%</span>
              <span className="text-[#736F89]">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usuários Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentUsers.length === 0 ? (
                <p className="text-[#736F89] text-sm">Nenhum usuário ainda</p>
              ) : (
                stats.recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#263A68] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-medium">
                        {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#171A3D] truncate">
                        {user.full_name || user.email}
                      </p>
                      <p className="text-xs text-[#736F89]">
                        {formatDate(user.created_at)}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user.plan === "free" 
                        ? "bg-gray-100 text-gray-600" 
                        : "bg-green-100 text-green-600"
                    }`}>
                      {user.plan || "free"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Publications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Publicações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentPublications.length === 0 ? (
                <p className="text-[#736F89] text-sm">Nenhuma publicação ainda</p>
              ) : (
                stats.recentPublications.map((pub) => (
                  <div key={pub.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E5E5E6] rounded flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#736F89]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#171A3D] truncate">
                        {pub.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[#736F89]">
                        <Eye className="w-3 h-3" />
                        {pub.views} views
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      pub.status === "published"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {pub.status === "published" ? "Publicado" : "Rascunho"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.length === 0 ? (
                <p className="text-[#736F89] text-sm">Nenhum pedido ainda</p>
              ) : (
                stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E5E5E6] rounded flex items-center justify-center flex-shrink-0">
                      <ShoppingCart className="w-5 h-5 text-[#736F89]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#171A3D]">
                        {order.order_number}
                      </p>
                      <p className="text-xs text-[#736F89] truncate">
                        {order.customer_email}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-[#171A3D]">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
