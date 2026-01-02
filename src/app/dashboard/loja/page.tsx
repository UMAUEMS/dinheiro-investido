"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Download,
  Eye,
  Loader2,
  Package,
  FileText,
  Mail,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProducts } from "@/lib/services/store";
import type { Product, ProductType } from "@/lib/types/store";

const PRODUCT_TYPES: { value: ProductType | 'all'; label: string; icon: React.ElementType }[] = [
  { value: 'all', label: 'Todos', icon: Package },
  { value: 'template', label: 'Templates', icon: FileText },
  { value: 'pack', label: 'Packs', icon: Package },
  { value: 'invite', label: 'Convites', icon: Mail },
  { value: 'license', label: 'Licenças', icon: Key },
];

export default function LojaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([]);

  useEffect(() => {
    loadProducts();
  }, [selectedType]);

  const loadProducts = async () => {
    setIsLoading(true);
    const options: any = { limit: 24 };
    if (selectedType !== 'all') {
      options.type = selectedType;
    }
    const { data } = await getProducts(options);
    if (data) {
      setProducts(data);
    }
    setIsLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#171A3D]">Loja</h1>
          <p className="text-[#736F89]">Templates, packs e recursos para suas publicações</p>
        </div>
        {cart.length > 0 && (
          <Link href="/dashboard/carrinho">
            <Button>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Carrinho ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#736F89]" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E5E5E6] focus:outline-none focus:ring-2 focus:ring-[#263A68] focus:border-transparent"
          />
        </div>
      </div>

      {/* Type Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {PRODUCT_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedType === type.value
                ? "bg-[#263A68] text-white"
                : "bg-white text-[#736F89] hover:bg-[#E5E5E6]"
            }`}
          >
            <type.icon className="w-4 h-4" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#263A68]" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="w-12 h-12 text-[#736F89] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#171A3D] mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-[#736F89]">
              {searchQuery
                ? "Tente ajustar sua busca"
                : "Em breve teremos novos produtos disponíveis"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <div className="relative aspect-[4/3] bg-[#E5E5E6]">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-12 h-12 text-[#736F89]" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Link href={`/dashboard/loja/${product.id}`}>
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button size="sm" onClick={() => addToCart(product.id)}>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                {product.featured && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-700">
                      Destaque
                    </span>
                  </div>
                )}
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs rounded-full font-medium bg-red-100 text-red-700">
                      -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-[#E5E5E6]"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-[#736F89] ml-1">
                    ({product.reviewCount})
                  </span>
                </div>
                <h3 className="font-medium text-[#171A3D] truncate">{product.name}</h3>
                <p className="text-sm text-[#736F89] truncate mt-1">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-lg font-bold text-[#171A3D]">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="text-sm text-[#736F89] line-through ml-2">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#736F89]">
                    <Download className="w-3 h-3" />
                    {product.downloads}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Demo Products (para quando não houver produtos reais) */}
      {!isLoading && products.length === 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-[#171A3D] mb-4">Produtos em Destaque (Demo)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {DEMO_PRODUCTS.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#263A68] to-[#4F3D67]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-white/50" />
                  </div>
                  {product.featured && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 text-xs rounded-full font-medium bg-yellow-100 text-yellow-700">
                        Destaque
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < 4 ? "text-yellow-400 fill-yellow-400" : "text-[#E5E5E6]"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-[#736F89] ml-1">(12)</span>
                  </div>
                  <h3 className="font-medium text-[#171A3D]">{product.name}</h3>
                  <p className="text-sm text-[#736F89] truncate mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-[#171A3D]">
                      {formatPrice(product.price)}
                    </span>
                    <Button size="sm" onClick={() => addToCart(product.id)}>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const DEMO_PRODUCTS = [
  {
    id: 'demo-1',
    name: 'Template Catálogo Moderno',
    description: 'Template profissional para catálogos de produtos',
    price: 49.90,
    featured: true,
  },
  {
    id: 'demo-2',
    name: 'Pack Educacional Completo',
    description: '10 templates para materiais educacionais',
    price: 99.90,
    featured: false,
  },
  {
    id: 'demo-3',
    name: 'Convite Casamento Elegante',
    description: 'Convite virtual personalizável para casamentos',
    price: 29.90,
    featured: true,
  },
  {
    id: 'demo-4',
    name: 'Template Revista Digital',
    description: 'Layout profissional para revistas digitais',
    price: 59.90,
    featured: false,
  },
];
