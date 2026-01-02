"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Mail,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Users,
  Calendar,
  MapPin,
  Loader2,
  MoreVertical,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserInvites, deleteInvite, getRSVPStats } from "@/lib/services/invites";
import { INVITE_TYPE_LABELS } from "@/lib/types/store";
import type { Invite } from "@/lib/services/invites";

export default function ConvitesPage() {
  const [invites, setInvites] = useState<(Invite & { stats?: any })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    loadInvites();
  }, []);

  const loadInvites = async () => {
    setIsLoading(true);
    const { data } = await getUserInvites();
    if (data) {
      // Carregar estatísticas de RSVP para cada convite
      const invitesWithStats = await Promise.all(
        data.map(async (invite) => {
          const stats = await getRSVPStats(invite.id);
          return { ...invite, stats };
        })
      );
      setInvites(invitesWithStats);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este convite?")) return;
    
    await deleteInvite(id);
    setInvites((prev) => prev.filter((i) => i.id !== id));
    setOpenMenu(null);
  };

  const copyLink = (slug: string, id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/convite/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    setOpenMenu(null);
  };

  const filteredInvites = invites.filter((invite) =>
    invite.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#171A3D]">Meus Convites</h1>
          <p className="text-[#736F89]">Crie e gerencie convites virtuais para seus eventos</p>
        </div>
        <Link href="/dashboard/convites/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Convite
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
        <input
          type="text"
          placeholder="Buscar convites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#263A68]" />
        </div>
      ) : filteredInvites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="w-12 h-12 text-[#736F89] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#171A3D] mb-2">
              {searchQuery ? "Nenhum convite encontrado" : "Você ainda não tem convites"}
            </h3>
            <p className="text-[#736F89] mb-6">
              {searchQuery
                ? "Tente ajustar sua busca"
                : "Crie seu primeiro convite virtual para um evento especial"}
            </p>
            {!searchQuery && (
              <Link href="/dashboard/convites/novo">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Convite
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvites.map((invite) => (
            <Card key={invite.id} className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-[#263A68] to-[#4F3D67] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mail className="w-12 h-12 text-white/30" />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    invite.status === "published"
                      ? "bg-green-100 text-green-700"
                      : invite.status === "archived"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {invite.status === "published" ? "Publicado" : invite.status === "archived" ? "Arquivado" : "Rascunho"}
                  </span>
                </div>

                {/* Menu */}
                <div className="absolute top-3 right-3">
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenu(openMenu === invite.id ? null : invite.id)}
                      className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenu === invite.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#E5E5E6] py-1 z-10">
                        <Link
                          href={`/dashboard/convites/${invite.id}/editar`}
                          className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Link>
                        {invite.slug && (
                          <>
                            <Link
                              href={`/convite/${invite.slug}`}
                              target="_blank"
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visualizar
                            </Link>
                            <button
                              onClick={() => copyLink(invite.slug!, invite.id)}
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#E5E5E6]/50 w-full text-left"
                            >
                              {copiedId === invite.id ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                              Copiar link
                            </button>
                          </>
                        )}
                        <hr className="my-1" />
                        <button
                          onClick={() => handleDelete(invite.id)}
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
                <div className="mb-2">
                  <span className="text-xs text-[#736F89] uppercase tracking-wide">
                    {INVITE_TYPE_LABELS[invite.event_type as keyof typeof INVITE_TYPE_LABELS] || invite.event_type}
                  </span>
                </div>
                <h3 className="font-semibold text-[#171A3D] mb-3">{invite.title}</h3>
                
                <div className="space-y-2 text-sm text-[#736F89]">
                  {invite.event_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(invite.event_date)}</span>
                    </div>
                  )}
                  {invite.event_location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{invite.event_location}</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E5E5E6]">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-[#736F89]">
                      <Eye className="w-4 h-4" />
                      <span>{invite.views}</span>
                    </div>
                    {invite.rsvp_enabled && invite.stats && (
                      <div className="flex items-center gap-1 text-green-600">
                        <Users className="w-4 h-4" />
                        <span>{invite.stats.confirmed} confirmados</span>
                      </div>
                    )}
                  </div>
                  <Link href={`/dashboard/convites/${invite.id}/editar`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
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
