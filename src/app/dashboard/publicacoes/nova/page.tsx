"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFUploader } from "@/components/publications/PDFUploader";
import { CoverUploader } from "@/components/publications/CoverUploader";
import { createPublication, updatePublication } from "@/lib/services/publications";
import { uploadPDF, uploadCover } from "@/lib/services/storage";
import { PUBLICATION_CATEGORIES } from "@/lib/types/publication";
import { createClient } from "@/lib/supabase/client";

export default function NovaPublicacaoPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [publicationId, setPublicationId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: "private" as "private" | "public" | "unlisted",
    tags: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePublication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const tags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const { data, error: createError } = await createPublication({
        title: formData.title,
        description: formData.description || undefined,
        category: formData.category || undefined,
        visibility: formData.visibility,
        tags: tags.length > 0 ? tags : undefined,
      });

      if (createError || !data) {
        throw new Error(createError || "Erro ao criar publicação");
      }

      setPublicationId(data.id);
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePDFUpload = async (file: File) => {
    if (!publicationId) return;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não autenticado");

    const result = await uploadPDF(file, user.id, publicationId);
    if (!result.success) {
      throw new Error(result.error || "Erro ao fazer upload");
    }

    // Atualizar publicação com URL do PDF
    await updatePublication(publicationId, {
      pdf_url: result.url,
    });
  };

  const handleCoverUpload = async (file: File): Promise<string | null> => {
    if (!publicationId) return null;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Usuário não autenticado");

    const result = await uploadCover(file, user.id, publicationId);
    if (!result.success) {
      throw new Error(result.error || "Erro ao fazer upload");
    }

    // Atualizar publicação com URL da capa
    await updatePublication(publicationId, {
      cover_url: result.url,
    });

    return result.url || null;
  };

  const handleFinish = () => {
    router.push(`/dashboard/publicacoes/${publicationId}/editar`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/publicacoes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#171A3D]">Nova Publicação</h1>
          <p className="text-[#736F89]">Crie um novo flipbook interativo</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#263A68]" : "text-[#736F89]"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 1 ? "bg-[#263A68] text-white" : "bg-[#E5E5E6]"}`}>
            1
          </div>
          <span className="font-medium">Informações</span>
        </div>
        <div className="flex-1 h-px bg-[#E5E5E6]" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#263A68]" : "text-[#736F89]"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step >= 2 ? "bg-[#263A68] text-white" : "bg-[#E5E5E6]"}`}>
            2
          </div>
          <span className="font-medium">Arquivos</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {/* Step 1: Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Informações da Publicação</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreatePublication} className="space-y-6">
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
                  placeholder="Ex: Catálogo de Produtos 2026"
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
                  rows={3}
                  placeholder="Descreva sua publicação..."
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
                    <option value="">Selecione uma categoria</option>
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
                    <option value="private">Privado (só você pode ver)</option>
                    <option value="unlisted">Não listado (quem tem o link pode ver)</option>
                    <option value="public">Público (visível na galeria)</option>
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
                  placeholder="Ex: marketing, produtos, 2026 (separadas por vírgula)"
                  className="w-full px-4 py-3 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading || !formData.title}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Continuar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Files */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload do PDF
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PDFUploader onUpload={handlePDFUpload} />
                <p className="text-sm text-[#736F89] mt-4">
                  O PDF será convertido em um flipbook interativo. Você poderá personalizar
                  as configurações de visualização após o upload.
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Capa</CardTitle>
              </CardHeader>
              <CardContent>
                <CoverUploader onUpload={handleCoverUpload} />
                <p className="text-sm text-[#736F89] mt-4">
                  Opcional. Se não enviar, usaremos a primeira página do PDF.
                </p>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Button onClick={handleFinish} className="w-full">
                Continuar para Edição
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
