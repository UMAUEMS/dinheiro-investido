"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFUploaderProps {
  onUpload: (file: File) => Promise<void>;
  currentFile?: string | null;
  maxSize?: number; // em MB
  disabled?: boolean;
}

export function PDFUploader({
  onUpload,
  currentFile,
  maxSize = 50,
  disabled = false,
}: PDFUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(currentFile || null);
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
    if (file.type !== "application/pdf") {
      return "Apenas arquivos PDF são permitidos";
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `O arquivo deve ter no máximo ${maxSize}MB`;
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
      await onUpload(file);
      setUploadedFile(file.name);
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
    setUploadedFile(null);
    setError(null);
  };

  if (uploadedFile) {
    return (
      <div className="border-2 border-dashed border-green-300 bg-green-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-green-800">{uploadedFile}</p>
              <p className="text-sm text-green-600">Upload concluído</p>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            disabled={disabled}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-8 text-center transition-colors
        ${isDragging ? "border-[#263A68] bg-[#263A68]/5" : "border-[#E5E5E6]"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-[#263A68]/50"}
        ${error ? "border-red-300 bg-red-50" : ""}
      `}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleInputChange}
        disabled={disabled || isUploading}
        className="hidden"
        id="pdf-upload"
      />
      
      <label
        htmlFor="pdf-upload"
        className={`flex flex-col items-center gap-4 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        {isUploading ? (
          <>
            <div className="w-16 h-16 bg-[#263A68]/10 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-[#263A68] animate-spin" />
            </div>
            <div>
              <p className="font-medium text-[#171A3D]">Enviando arquivo...</p>
              <p className="text-sm text-[#736F89]">Aguarde o processamento</p>
            </div>
          </>
        ) : (
          <>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${error ? "bg-red-100" : "bg-[#263A68]/10"}`}>
              {error ? (
                <X className="w-8 h-8 text-red-500" />
              ) : isDragging ? (
                <Upload className="w-8 h-8 text-[#263A68]" />
              ) : (
                <FileText className="w-8 h-8 text-[#263A68]" />
              )}
            </div>
            <div>
              {error ? (
                <>
                  <p className="font-medium text-red-600">{error}</p>
                  <p className="text-sm text-red-500">Tente novamente com outro arquivo</p>
                </>
              ) : isDragging ? (
                <p className="font-medium text-[#263A68]">Solte o arquivo aqui</p>
              ) : (
                <>
                  <p className="font-medium text-[#171A3D]">
                    Arraste um PDF ou clique para selecionar
                  </p>
                  <p className="text-sm text-[#736F89]">
                    Tamanho máximo: {maxSize}MB
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </label>
    </div>
  );
}
