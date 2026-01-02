"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  User,
  Crown,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  plan: string;
  created_at: string;
  updated_at: string;
}

const ROLES = [
  { value: "user", label: "Usuário", icon: User, color: "bg-gray-100 text-gray-600" },
  { value: "moderator", label: "Moderador", icon: Shield, color: "bg-blue-100 text-blue-600" },
  { value: "admin", label: "Admin", icon: Crown, color: "bg-red-100 text-red-600" },
];

const PLANS = [
  { value: "free", label: "Gratuito", color: "bg-gray-100 text-gray-600" },
  { value: "starter", label: "Starter", color: "bg-blue-100 text-blue-600" },
  { value: "professional", label: "Professional", color: "bg-purple-100 text-purple-600" },
  { value: "enterprise", label: "Enterprise", color: "bg-orange-100 text-orange-600" },
];

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 10;

  const supabase = createClient();

  useEffect(() => {
    loadUsers();
  }, [page, roleFilter, planFilter]);

  const loadUsers = async () => {
    setIsLoading(true);

    let query = supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * perPage, page * perPage - 1);

    if (roleFilter !== "all") {
      query = query.eq("role", roleFilter);
    }

    if (planFilter !== "all") {
      query = query.eq("plan", planFilter);
    }

    const { data, count, error } = await query;

    if (!error && data) {
      setUsers(data);
      setTotalCount(count || 0);
    }

    setIsLoading(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateUserRole = async (userId: string, newRole: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    }
    setOpenMenu(null);
  };

  const updateUserPlan = async (userId: string, newPlan: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ plan: newPlan })
      .eq("id", userId);

    if (!error) {
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, plan: newPlan } : u))
      );
    }
    setOpenMenu(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#171A3D]">Gerenciar Usuários</h1>
        <p className="text-[#736F89]">
          {totalCount} usuários cadastrados na plataforma
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
            >
              <option value="all">Todos os papéis</option>
              {ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <select
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
            >
              <option value="all">Todos os planos</option>
              {PLANS.map((plan) => (
                <option key={plan.value} value={plan.value}>
                  {plan.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#263A68]" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-[#736F89] mx-auto mb-4" />
              <p className="text-[#736F89]">Nenhum usuário encontrado</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Usuário
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Papel
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Plano
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Cadastro
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-[#736F89]">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user) => {
                    const roleInfo = ROLES.find((r) => r.value === user.role) || ROLES[0];
                    const planInfo = PLANS.find((p) => p.value === user.plan) || PLANS[0];
                    
                    return (
                      <tr key={user.id} className="hover:bg-[#f8f9fa]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#263A68] rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-medium">
                                {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-[#171A3D]">
                                {user.full_name || "Sem nome"}
                              </p>
                              <p className="text-sm text-[#736F89]">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${roleInfo.color}`}>
                            <roleInfo.icon className="w-3 h-3" />
                            {roleInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${planInfo.color}`}>
                            {planInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#736F89]">
                          {formatDate(user.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                              className="p-2 rounded-lg hover:bg-[#E5E5E6]"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {openMenu === user.id && (
                              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#E5E5E6] py-1 z-10">
                                <div className="px-3 py-2 text-xs font-medium text-[#736F89] uppercase">
                                  Alterar Papel
                                </div>
                                {ROLES.map((role) => (
                                  <button
                                    key={role.value}
                                    onClick={() => updateUserRole(user.id, role.value)}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50 w-full text-left ${
                                      user.role === role.value ? "bg-[#E5E5E6]/30" : ""
                                    }`}
                                  >
                                    <role.icon className="w-4 h-4" />
                                    {role.label}
                                  </button>
                                ))}
                                <hr className="my-1" />
                                <div className="px-3 py-2 text-xs font-medium text-[#736F89] uppercase">
                                  Alterar Plano
                                </div>
                                {PLANS.map((plan) => (
                                  <button
                                    key={plan.value}
                                    onClick={() => updateUserPlan(user.id, plan.value)}
                                    className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50 w-full text-left ${
                                      user.plan === plan.value ? "bg-[#E5E5E6]/30" : ""
                                    }`}
                                  >
                                    {plan.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <p className="text-sm text-[#736F89]">
                Mostrando {(page - 1) * perPage + 1} a{" "}
                {Math.min(page * perPage, totalCount)} de {totalCount} usuários
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-[#736F89]">
                  Página {page} de {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Click outside to close menu */}
      {openMenu && (
        <div className="fixed inset-0 z-0" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
}
