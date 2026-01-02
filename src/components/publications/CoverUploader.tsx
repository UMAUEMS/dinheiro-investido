"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Upload, ImageIcon, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CoverUploaderProps {
  onUpload: (file: File) => Promise<string | null>;
  currentCover?: string | null;
  disabled?: boolean;
}

export function CoverUploader({
  onUpload,
  currentCover,
  disabled = false,
}: CoverUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string | null>(currentCover || null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): string | null => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return "Apenas imagens JPG, PNG, WebP ou GIF são permitidas";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "A imagem deve ter no máximo 5MB";
    }
    return null;
  };

  const handleFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      const url = await onUpload(file);
      if (url) {
        setCoverUrl(url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao fazer upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) {
        await handleFile(file);
      }
    },
    [disabled]
  );

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleRemove = () => {
    setCoverUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {coverUrl ? (
        <div className="relative aspect-[3/4] max-w-[200px] rounded-lg overflow-hidden border border-[#E5E5E6]">
          <Image
            src={coverUrl}
            alt="Capa da publicação"
            fill
            className="object-cover"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            aspect-[3/4] max-w-[200px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors
            ${isDragging ? "border-[#263A68] bg-[#263A68]/5" : "border-[#E5E5E6]"}
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[#263A68]/50"}
            ${error ? "border-red-300 bg-red-50" : ""}
          `}
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleInputChange}
            disabled={disabled || isUploading}
            className="hidden"
            id="cover-upload"
          />
          
          <label
            htmlFor="cover-upload"
            className={`flex flex-col items-center gap-2 p-4 text-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-[#263A68] animate-spin" />
            ) : error ? (
              <>
                <X className="w-8 h-8 text-red-500" />
                <p className="text-xs text-red-500">{error}</p>
              </>
            ) : isDragging ? (
              <>
                <Upload className="w-8 h-8 text-[#263A68]" />
                <p className="text-xs text-[#263A68]">Solte aqui</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-[#736F89]" />
                <p className="text-xs text-[#736F89]">Adicionar capa</p>
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );
}
