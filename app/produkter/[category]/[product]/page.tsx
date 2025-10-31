
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import { getSlugValue, getProductBySlug, getProductsByCategory, getAllCategories } from "@/data/products";
import { urlFor } from "@/sanity/client";

interface ProductPageProps {
  params: Promise<{
    category: string;
    product: string;  // product slug
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category: categorySlug, product: productSlug } = await params;
  
  const product = await getProductBySlug(productSlug);
  const categories = await getAllCategories();
  
  console.log("kategorislug:", categorySlug);
  console.log("produktslug:", productSlug);
  console.log("produkt:", product);
  console.log("images:", product?.images);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getProductsByCategory(categorySlug);
  const filteredRelatedProducts = relatedProducts
    .filter(p => getSlugValue(p.slug) !== productSlug)
    .slice(0, 4);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Hem</Link>
            <span>/</span>
            <Link href="/produkter" className="hover:text-blue-600">Produkter</Link>
            <span>/</span>
            <Link href={`/produkter/${categorySlug}`} className="hover:text-blue-600">
              {/* {category.name} */}
            </Link>
            <span>/</span>
            <span className="text-gray-900"></span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.images?.[0] ? urlFor(product.images[0])?.width(600).height(600).url() || '/products/default.jpg' : '/products/default.jpg'}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden shadow">
                    <Image
                      src={urlFor(image)?.width(150).height(150).url() || '/products/default.jpg'}
                      alt={`${product.name} ${index + 2}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-600">{product.shortDescription}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 0) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating || 0} ({product.reviewCount || 0} recensioner)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-gray-900">{product.price} kr</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{product.originalPrice} kr</span>
                )}
              </div>
              {product.originalPrice && (
                <div className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  Spara {product.originalPrice - product.price} kr
                </div>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                {product.inStock ? `${product.stockQuantity} i lager` : 'Slut i lager'}
              </span>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button 
                disabled={!product.inStock}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.inStock ? 'Lägg i varukorg' : 'Slut i lager'}</span>
              </button>
              
              <div className="flex space-x-3">
                <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>Favorit</span>
                </button>
                <button className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Dela</span>
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Fri frakt</div>
                <div className="text-xs text-gray-600">över 500 kr</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Garanti</div>
                <div className="text-xs text-gray-600">2 års garanti</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Retur</div>
                <div className="text-xs text-gray-600">30 dagar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Produktbeskrivning</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Tags */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Taggar</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Relaterade produkter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRelatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id || relatedProduct.id}
                  href={`/produkter/${categorySlug}/${getSlugValue(relatedProduct.slug)}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={relatedProduct.images?.[0] ? urlFor(relatedProduct.images[0])?.width(300).height(300).url() || '/products/default.jpg' : '/products/default.jpg'}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">{relatedProduct.shortDescription}</p>
                      <div className="mt-2">
                        <span className="font-bold text-gray-900">{relatedProduct.price} kr</span>
                        {relatedProduct.originalPrice && (
                          <span className="text-gray-500 text-sm line-through ml-2">
                            {relatedProduct.originalPrice} kr
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
