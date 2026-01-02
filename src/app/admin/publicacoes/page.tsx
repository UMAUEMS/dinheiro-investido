"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  MoreVertical,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  FileText,
  Loader2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

interface Publication {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  status: string;
  visibility: string;
  views: number;
  created_at: string;
  user?: {
    email: string;
    full_name: string | null;
  };
}

export default function PublicacoesAdminPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 10;

  const supabase = createClient();

  useEffect(() => {
    loadPublications();
  }, [page, statusFilter]);

  const loadPublications = async () => {
    setIsLoading(true);

    let query = supabase
      .from("publications")
      .select(`
        *,
        user:profiles!user_id (email, full_name)
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range((page - 1) * perPage, page * perPage - 1);

    if (statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, count, error } = await query;

    if (!error && data) {
      setPublications(data as Publication[]);
      setTotalCount(count || 0);
    }

    setIsLoading(false);
  };

  const filteredPublications = publications.filter((pub) =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updatePublicationStatus = async (pubId: string, newStatus: string) => {
    const { error } = await supabase
      .from("publications")
      .update({ status: newStatus })
      .eq("id", pubId);

    if (!error) {
      setPublications((prev) =>
        prev.map((p) => (p.id === pubId ? { ...p, status: newStatus } : p))
      );
    }
    setOpenMenu(null);
  };

  const deletePublication = async (pubId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta publicação?")) return;

    const { error } = await supabase
      .from("publications")
      .delete()
      .eq("id", pubId);

    if (!error) {
      setPublications((prev) => prev.filter((p) => p.id !== pubId));
      setTotalCount((prev) => prev - 1);
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

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      draft: { label: "Rascunho", color: "bg-yellow-100 text-yellow-700" },
      published: { label: "Publicado", color: "bg-green-100 text-green-700" },
      archived: { label: "Arquivado", color: "bg-gray-100 text-gray-700" },
      flagged: { label: "Sinalizado", color: "bg-red-100 text-red-700" },
    };
    return badges[status] || badges.draft;
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#171A3D]">Gerenciar Publicações</h1>
        <p className="text-[#736F89]">
          {totalCount} publicações na plataforma
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
                placeholder="Buscar por título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
            >
              <option value="all">Todos os status</option>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
              <option value="flagged">Sinalizado</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Publications Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#263A68]" />
            </div>
          ) : filteredPublications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-[#736F89] mx-auto mb-4" />
              <p className="text-[#736F89]">Nenhuma publicação encontrada</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8f9fa] border-b">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Publicação
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Autor
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Status
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Views
                    </th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-[#736F89]">
                      Data
                    </th>
                    <th className="text-right px-6 py-3 text-sm font-medium text-[#736F89]">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPublications.map((pub) => {
                    const statusBadge = getStatusBadge(pub.status);
                    
                    return (
                      <tr key={pub.id} className="hover:bg-[#f8f9fa]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#E5E5E6] rounded flex items-center justify-center flex-shrink-0">
                              <FileText className="w-6 h-6 text-[#736F89]" />
                            </div>
                            <div>
                              <p className="font-medium text-[#171A3D]">
                                {pub.title}
                              </p>
                              <p className="text-sm text-[#736F89]">
                                /{pub.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-[#171A3D]">
                            {pub.user?.full_name || "Sem nome"}
                          </p>
                          <p className="text-xs text-[#736F89]">
                            {pub.user?.email}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-[#736F89]">
                            <Eye className="w-4 h-4" />
                            {pub.views}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#736F89]">
                          {formatDate(pub.created_at)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === pub.id ? null : pub.id)}
                              className="p-2 rounded-lg hover:bg-[#E5E5E6]"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {openMenu === pub.id && (
                              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#E5E5E6] py-1 z-10">
                                {pub.status === "published" && (
                                  <Link
                                    href={`/v/${pub.slug}`}
                                    target="_blank"
                                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    Ver publicação
                                  </Link>
                                )}
                                <hr className="my-1" />
                                <div className="px-3 py-2 text-xs font-medium text-[#736F89] uppercase">
                                  Alterar Status
                                </div>
                                <button
                                  onClick={() => updatePublicationStatus(pub.id, "published")}
                                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50 w-full text-left text-green-600"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  Aprovar
                                </button>
                                <button
                                  onClick={() => updatePublicationStatus(pub.id, "flagged")}
                                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50 w-full text-left text-orange-600"
                                >
                                  <AlertTriangle className="w-4 h-4" />
                                  Sinalizar
                                </button>
                                <button
                                  onClick={() => updatePublicationStatus(pub.id, "archived")}
                                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50 w-full text-left"
                                >
                                  <EyeOff className="w-4 h-4" />
                                  Arquivar
                                </button>
                                <hr className="my-1" />
                                <button
                                  onClick={() => deletePublication(pub.id)}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Excluir
                                </button>
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
                {Math.min(page * perPage, totalCount)} de {totalCount} publicações
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
