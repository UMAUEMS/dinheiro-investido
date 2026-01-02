"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  FileText,
  Loader2,
  Grid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserPublications, deletePublication } from "@/lib/services/publications";
import { PUBLICATION_STATUS_LABELS, PUBLICATION_VISIBILITY_LABELS, PUBLICATION_CATEGORIES } from "@/lib/types/publication";
import type { Publication } from "@/lib/types/publication";

export default function PublicacoesPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    setIsLoading(true);
    const { data } = await getUserPublications();
    if (data) {
      setPublications(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta publicação?")) return;
    
    await deletePublication(id);
    setPublications((prev) => prev.filter((p) => p.id !== id));
    setOpenMenu(null);
  };

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/v/${slug}`);
    setOpenMenu(null);
  };

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || pub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCategoryLabel = (value: string | null) => {
    if (!value) return null;
    return PUBLICATION_CATEGORIES.find((c) => c.value === value)?.label || value;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#171A3D]">Minhas Publicações</h1>
          <p className="text-[#736F89]">Gerencie seus flipbooks e publicações</p>
        </div>
        <Link href="/dashboard/publicacoes/nova">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Publicação
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
          <input
            type="text"
            placeholder="Buscar publicações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
          >
            <option value="all">Todos os status</option>
            <option value="draft">Rascunho</option>
            <option value="published">Publicado</option>
            <option value="archived">Arquivado</option>
          </select>
          <div className="flex border border-[#E5E5E6] rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-[#263A68] text-white" : "bg-white text-[#736F89]"}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-[#263A68] text-white" : "bg-white text-[#736F89]"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#263A68]" />
        </div>
      ) : filteredPublications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 text-[#736F89] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#171A3D] mb-2">
              {searchQuery || statusFilter !== "all"
                ? "Nenhuma publicação encontrada"
                : "Você ainda não tem publicações"}
            </h3>
            <p className="text-[#736F89] mb-6">
              {searchQuery || statusFilter !== "all"
                ? "Tente ajustar os filtros de busca"
                : "Crie sua primeira publicação para começar"}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Link href="/dashboard/publicacoes/nova">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Publicação
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPublications.map((pub) => (
            <Card key={pub.id} className="overflow-hidden group">
              <div className="relative aspect-[3/4] bg-[#E5E5E6]">
                {pub.cover_url ? (
                  <Image
                    src={pub.cover_url}
                    alt={pub.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-[#736F89]" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/publicacoes/${pub.id}/editar`}>
                      <Button size="sm" variant="secondary">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    {pub.slug && pub.status === "published" && (
                      <Link href={`/v/${pub.slug}`} target="_blank">
                        <Button size="sm" variant="secondary">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    pub.status === "published"
                      ? "bg-green-100 text-green-700"
                      : pub.status === "archived"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {PUBLICATION_STATUS_LABELS[pub.status]}
                  </span>
                </div>

                {/* Menu */}
                <div className="absolute top-2 right-2">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === pub.id ? null : pub.id)}
                      className="p-1 rounded-full bg-white/80 hover:bg-white"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenu === pub.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#E5E5E6] py-1 z-10">
                        <Link
                          href={`/dashboard/publicacoes/${pub.id}/editar`}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Link>
                        {pub.slug && (
                          <>
                            <Link
                              href={`/v/${pub.slug}`}
                              target="_blank"
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visualizar
                            </Link>
                            <button
                              onClick={() => copyLink(pub.slug!)}
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50 w-full text-left"
                            >
                              <Copy className="w-4 h-4" />
                              Copiar link
                            </button>
                          </>
                        )}
                        <hr className="my-1" />
                        <button
                          onClick={() => handleDelete(pub.id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-[#171A3D] truncate">{pub.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-[#736F89]">
                  {getCategoryLabel(pub.category) && (
                    <span>{getCategoryLabel(pub.category)}</span>
                  )}
                  <span>•</span>
                  <span>{pub.views} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredPublications.map((pub) => (
            <Card key={pub.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-[#E5E5E6] rounded overflow-hidden relative flex-shrink-0">
                    {pub.cover_url ? (
                      <Image
                        src={pub.cover_url}
                        alt={pub.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-[#736F89]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-[#171A3D] truncate">{pub.title}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        pub.status === "published"
                          ? "bg-green-100 text-green-700"
                          : pub.status === "archived"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {PUBLICATION_STATUS_LABELS[pub.status]}
                      </span>
                    </div>
                    <p className="text-sm text-[#736F89] truncate mt-1">
                      {pub.description || "Sem descrição"}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#736F89]">
                      <span>{PUBLICATION_VISIBILITY_LABELS[pub.visibility]}</span>
                      <span>{pub.views} visualizações</span>
                      <span>Atualizado em {new Date(pub.updated_at).toLocaleDateString("pt-BR")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/publicacoes/${pub.id}/editar`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    {pub.slug && pub.status === "published" && (
                      <Link href={`/v/${pub.slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(pub.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Click outside to close menu */}
      {openMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setOpenMenu(null)}
        />
      )}
    </div>
  );
}
