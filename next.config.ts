import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilitar export estático para hospedagem compartilhada
  output: "export",
  trailingSlash: true,
  
  // Configuração de imagens para export estático
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.in",
      },
    ],
  },
};

export default nextConfig;
