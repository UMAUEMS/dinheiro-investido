"use client";

import { useState } from "react";
import { FlipbookViewer } from "@/components/flipbook/FlipbookViewer";
import type { Publication, FlipbookPage } from "@/lib/types/publication";

interface FlipbookViewerWrapperProps {
  publication: Publication;
  pages: FlipbookPage[];
}

export function FlipbookViewerWrapper({ publication, pages }: FlipbookViewerWrapperProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = publication.title;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        // User cancelled or error
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(url);
      alert("Link copiado para a área de transferência!");
    }
  };

  const handleDownload = () => {
    if (publication.pdf_url) {
      window.open(publication.pdf_url, "_blank");
    } else {
      alert("Download não disponível para esta publicação");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <FlipbookViewer
        pages={pages}
        settings={publication.settings}
        title={publication.title}
        onShare={handleShare}
        onDownload={publication.settings?.showDownloadButton ? handleDownload : undefined}
        onPrint={publication.settings?.showPrintButton ? handlePrint : undefined}
      />
    </>
  );
}
