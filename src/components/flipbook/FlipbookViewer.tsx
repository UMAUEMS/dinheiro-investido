"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Share2,
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Grid,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PublicationSettings, FlipbookPage } from "@/lib/types/publication";

interface FlipbookViewerProps {
  pages: FlipbookPage[];
  settings?: PublicationSettings;
  title?: string;
  onShare?: () => void;
  onDownload?: () => void;
  onPrint?: () => void;
}

// Componente de página individual
const Page = ({ pageNumber, imageUrl, width, height }: FlipbookPage) => {
  return (
    <div className="page bg-white shadow-lg" style={{ width, height }}>
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={`Página ${pageNumber}`}
          fill
          className="object-contain"
          priority={pageNumber <= 2}
        />
      </div>
    </div>
  );
};

export function FlipbookViewer({
  pages,
  settings = {},
  title,
  onShare,
  onDownload,
  onPrint,
}: FlipbookViewerProps) {
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(pages.length);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [dimensions, setDimensions] = useState({ width: 400, height: 566 });

  const {
    showDownloadButton = false,
    showPrintButton = false,
    showShareButton = true,
    showFullscreenButton = true,
    showPageNumbers = true,
    showThumbnails: enableThumbnails = true,
    enableKeyboardNavigation = true,
    backgroundColor = "#f5f5f5",
    flipDuration = 500,
  } = settings;

  // Calcular dimensões baseadas no container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        
        // Proporção A4 (210x297mm) = 0.707
        const aspectRatio = 0.707;
        
        let width = Math.min(containerWidth * 0.45, 500);
        let height = width / aspectRatio;
        
        if (height > containerHeight * 0.85) {
          height = containerHeight * 0.85;
          width = height * aspectRatio;
        }
        
        setDimensions({ width: Math.floor(width), height: Math.floor(height) });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [isFullscreen]);

  // Navegação por teclado
  useEffect(() => {
    if (!enableKeyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevPage();
      } else if (e.key === "Escape" && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardNavigation, isFullscreen]);

  const goToNextPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, []);

  const goToPrevPage = useCallback(() => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, []);

  const goToPage = useCallback((pageNum: number) => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flip(pageNum);
      setShowThumbnails(false);
    }
  }, []);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  // Se não houver páginas, mostrar placeholder
  if (pages.length === 0) {
    return (
      <div 
        className="flex items-center justify-center min-h-[400px] rounded-lg"
        style={{ backgroundColor }}
      >
        <p className="text-[#736F89]">Nenhuma página disponível</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${isFullscreen ? "fixed inset-0 z-50" : "min-h-[600px]"}`}
      style={{ backgroundColor }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur border-b">
        <div className="flex items-center gap-2">
          {title && <h2 className="font-semibold text-[#171A3D] hidden sm:block">{title}</h2>}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center gap-1 border-r pr-2 mr-2">
            <Button variant="ghost" size="sm" onClick={handleZoomOut} disabled={zoom <= 0.5}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-[#736F89] w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="sm" onClick={handleZoomIn} disabled={zoom >= 2}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </div>

          {/* Thumbnails */}
          {enableThumbnails && (
            <Button
              variant={showThumbnails ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setShowThumbnails(!showThumbnails)}
            >
              <Grid className="w-4 h-4" />
            </Button>
          )}

          {/* Share */}
          {showShareButton && onShare && (
            <Button variant="ghost" size="sm" onClick={onShare}>
              <Share2 className="w-4 h-4" />
            </Button>
          )}

          {/* Download */}
          {showDownloadButton && onDownload && (
            <Button variant="ghost" size="sm" onClick={onDownload}>
              <Download className="w-4 h-4" />
            </Button>
          )}

          {/* Print */}
          {showPrintButton && onPrint && (
            <Button variant="ghost" size="sm" onClick={onPrint}>
              <Printer className="w-4 h-4" />
            </Button>
          )}

          {/* Fullscreen */}
          {showFullscreenButton && (
            <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>

      {/* Flipbook Container */}
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Thumbnails Panel */}
        {showThumbnails && (
          <div className="absolute inset-0 bg-black/80 z-10 overflow-auto p-4">
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="sm" onClick={() => setShowThumbnails(false)}>
                <X className="w-5 h-5 text-white" />
              </Button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {pages.map((page, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`relative aspect-[3/4] rounded overflow-hidden border-2 transition-all ${
                    currentPage === index ? "border-[#263A68]" : "border-transparent hover:border-white/50"
                  }`}
                >
                  <Image
                    src={page.thumbnailUrl || page.imageUrl}
                    alt={`Página ${page.pageNumber}`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                    {page.pageNumber}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className="absolute left-2 sm:left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-6 h-6 text-[#171A3D]" />
        </button>

        {/* Flipbook */}
        <div style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}>
          <HTMLFlipBook
            ref={flipBookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="stretch"
            minWidth={300}
            maxWidth={600}
            minHeight={424}
            maxHeight={849}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={onFlip}
            flippingTime={flipDuration}
            usePortrait={true}
            startPage={0}
            drawShadow={true}
            maxShadowOpacity={0.3}
            className="flipbook-container"
            style={{}}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {pages.map((page, index) => (
              <div key={index} className="page-wrapper">
                <Page {...page} width={dimensions.width} height={dimensions.height} />
              </div>
            ))}
          </HTMLFlipBook>
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages - 1}
          className="absolute right-2 sm:right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Próxima página"
        >
          <ChevronRight className="w-6 h-6 text-[#171A3D]" />
        </button>
      </div>

      {/* Page Counter */}
      {showPageNumbers && (
        <div className="flex items-center justify-center p-4 bg-white/90 backdrop-blur border-t">
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#736F89]">
              Página <span className="font-medium text-[#171A3D]">{currentPage + 1}</span> de{" "}
              <span className="font-medium text-[#171A3D]">{totalPages}</span>
            </span>
            
            {/* Page Slider */}
            <input
              type="range"
              min={0}
              max={totalPages - 1}
              value={currentPage}
              onChange={(e) => goToPage(parseInt(e.target.value))}
              className="w-32 sm:w-48 accent-[#263A68]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
