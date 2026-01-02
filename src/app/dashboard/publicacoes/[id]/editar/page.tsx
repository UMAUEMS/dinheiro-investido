"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Loader2,
  Save,
  Eye,
  Settings,
  FileText,
  Trash2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublication, updatePublication, deletePublication } from "@/lib/services/publications";
import { PUBLICATION_CATEGORIES, PUBLICATION_STATUS_LABELS, PUBLICATION_VISIBILITY_LABELS } from "@/lib/types/publication";
import type { Publication, PublicationSettings } from "@/lib/types/publication";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditarPublicacaoPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "settings" | "seo">("info");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: "private" as "private" | "public" | "unlisted",
    status: "draft" as "draft" | "published" | "archived",
    tags: "",
  });

  const [settings, setSettings] = useState<PublicationSettings>({
    showDownloadButton: false,
    showPrintButton: false,
    showShareButton: true,
    showFullscreenButton: true,
    showPageNumbers: true,
    showThumbnails: true,
    enableKeyboardNavigation: true,
    enableSwipeNavigation: true,
    backgroundColor: "#ffffff",
    flipDuration: 500,
  });

  useEffect(() => {
    loadPublication();
  }, [id]);

  const loadPublication = async () => {
    setIsLoading(true);
    const { data, error: loadError } = await getPublication(id);
    
    if (loadError || !data) {
      setError(loadError || "Publicação não encontrada");
      setIsLoading(false);
      return;
    }

    setPublication(data);
    setFormData({
      title: data.title,
      description: data.description || "",
      category: data.category || "",
      visibility: data.visibility,
      status: data.status,
      tags: data.tags?.join(", ") || "",
    });
    setSettings({
      ...settings,
      ...data.settings,
    });
    setIsLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSettingChange = (key: keyof PublicationSettings, value: boolean | string | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const tags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const { error: updateError } = await updatePublication(id, {
        title: formData.title,
        description: formData.description || undefined,
        category: formData.category || undefined,
        visibility: formData.visibility,
        status: formData.status,
        tags: tags.length > 0 ? tags : undefined,
        settings,
      });

      if (updateError) {
        throw new Error(updateError);
      }

      setSuccessMessage("Publicação salva com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      await updatePublication(id, { status: "published" });
      setFormData((prev) => ({ ...prev, status: "published" }));
      setSuccessMessage("Publicação publicada com sucesso!");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao publicar");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta publicação? Esta ação não pode ser desfeita.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePublication(id);
      router.push("/dashboard/publicacoes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir");
      setIsDeleting(false);
    }
  };

  const copyLink = () => {
    if (publication?.slug) {
      navigator.clipboard.writeText(`${window.location.origin}/v/${publication.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#263A68]" />
      </div>
    );
  }

  if (error && !publication) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/dashboard/publicacoes">
          <Button>Voltar para Publicações</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/publicacoes">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#171A3D]">Editar Publicação</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                formData.status === "published" 
                  ? "bg-green-100 text-green-700" 
                  : formData.status === "archived"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {PUBLICATION_STATUS_LABELS[formData.status]}
              </span>
              <span className="text-sm text-[#736F89]">
                {PUBLICATION_VISIBILITY_LABELS[formData.visibility]}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {publication?.slug && (
            <Link href={`/v/${publication.slug}`} target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </Button>
            </Link>
          )}
          {formData.status === "draft" && (
            <Button onClick={handlePublish} disabled={isSaving}>
              Publicar
            </Button>
          )}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Salvar
          </Button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-600">
          {successMessage}
        </div>
      )}

      {/* Share Link */}
      {publication?.slug && formData.status === "published" && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <ExternalLink className="w-5 h-5 text-[#263A68]" />
              <div className="flex-1">
                <p className="text-sm text-[#736F89]">Link público:</p>
                <p className="font-mono text-sm">{`${typeof window !== 'undefined' ? window.location.origin : ''}/v/${publication.slug}`}</p>
              </div>
              <Button variant="outline" size="sm" onClick={copyLink}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="border-b border-[#E5E5E6]">
        <nav className="flex gap-8">
          <button
            onClick={() => setActiveTab("info")}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "info"
                ? "border-[#263A68] text-[#263A68]"
                : "border-transparent text-[#736F89] hover:text-[#171A3D]"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Informações
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "settings"
                ? "border-[#263A68] text-[#263A68]"
                : "border-transparent text-[#736F89] hover:text-[#171A3D]"
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Configurações
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "info" && (
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-[#171A3D] mb-1">
                    Título *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[#171A3D] mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-[#171A3D] mb-1">
                      Categoria
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
                    >
                      <option value="">Selecione</option>
                      {PUBLICATION_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="visibility" className="block text-sm font-medium text-[#171A3D] mb-1">
                      Visibilidade
                    </label>
                    <select
                      id="visibility"
                      name="visibility"
                      value={formData.visibility}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
                    >
                      <option value="private">Privado</option>
                      <option value="unlisted">Não listado</option>
                      <option value="public">Público</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-[#171A3D] mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Separadas por vírgula"
                    className="w-full px-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Flipbook</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-[#171A3D] mb-4">Botões de Ação</h4>
                  <div className="space-y-3">
                    {[
                      { key: "showDownloadButton", label: "Mostrar botão de download" },
                      { key: "showPrintButton", label: "Mostrar botão de imprimir" },
                      { key: "showShareButton", label: "Mostrar botão de compartilhar" },
                      { key: "showFullscreenButton", label: "Mostrar botão de tela cheia" },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof PublicationSettings] as boolean}
                          onChange={(e) => handleSettingChange(item.key as keyof PublicationSettings, e.target.checked)}
                          className="w-5 h-5 rounded border-[#E5E5E6] text-[#263A68] focus:ring-[#263A68]"
                        />
                        <span className="text-[#171A3D]">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-[#171A3D] mb-4">Navegação</h4>
                  <div className="space-y-3">
                    {[
                      { key: "showPageNumbers", label: "Mostrar números das páginas" },
                      { key: "showThumbnails", label: "Mostrar miniaturas" },
                      { key: "enableKeyboardNavigation", label: "Navegação por teclado" },
                      { key: "enableSwipeNavigation", label: "Navegação por swipe (mobile)" },
                    ].map((item) => (
                      <label key={item.key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings[item.key as keyof PublicationSettings] as boolean}
                          onChange={(e) => handleSettingChange(item.key as keyof PublicationSettings, e.target.checked)}
                          className="w-5 h-5 rounded border-[#E5E5E6] text-[#263A68] focus:ring-[#263A68]"
                        />
                        <span className="text-[#171A3D]">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-[#171A3D] mb-4">Aparência</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#736F89] mb-1">Cor de fundo</label>
                      <input
                        type="color"
                        value={settings.backgroundColor || "#ffffff"}
                        onChange={(e) => handleSettingChange("backgroundColor", e.target.value)}
                        className="w-full h-10 rounded border border-[#E5E5E6] cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#736F89] mb-1">Velocidade da animação (ms)</label>
                      <input
                        type="number"
                        value={settings.flipDuration || 500}
                        onChange={(e) => handleSettingChange("flipDuration", parseInt(e.target.value))}
                        min={100}
                        max={2000}
                        step={100}
                        className="w-full px-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[3/4] bg-[#E5E5E6] rounded-lg overflow-hidden relative">
                {publication?.cover_url ? (
                  <Image
                    src={publication.cover_url}
                    alt={publication.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-[#736F89]" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#736F89]">Visualizações</span>
                  <span className="font-medium">{publication?.views || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#736F89]">Criado em</span>
                  <span className="font-medium">
                    {publication?.created_at
                      ? new Date(publication.created_at).toLocaleDateString("pt-BR")
                      : "-"}
                  </span>
                </div>
                {publication?.published_at && (
                  <div className="flex justify-between">
                    <span className="text-[#736F89]">Publicado em</span>
                    <span className="font-medium">
                      {new Date(publication.published_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Excluir Publicação
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
