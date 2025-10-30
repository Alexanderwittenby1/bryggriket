"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';
import { Product } from '@/types/product';

type ProductCardProps = {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(handleBuy, 1000);
    }
    const handleBuy = () => {
        setLoading(false);
        
    }

    const discountPercentage = product.originalPrice 
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;
 
  return (
    <div className='flex flex-col w-full max-w-sm mx-auto border border-gray-200 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden'>
      
      {/* Produktbild */}
      <Link href={`/produkter/${product.category.slug}/${product.slug}`} className="relative">
        <div className='w-full aspect-square relative overflow-hidden'>
          <Image 
              className='object-cover group-hover:scale-105 transition-transform duration-300'
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Populär
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                -{discountPercentage}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Slut i lager
              </span>
            )}
          </div>

          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <span className="bg-white/80 backdrop-blur-sm text-gray-700 text-xs px-2 py-1 rounded-full">
              {product.category.name}
            </span>
          </div>
        </div>
      </Link>

      {/* Produktinfo */}
      <div className='flex flex-col flex-1 p-4'>
        <Link href={`/produkter/${product.category.slug}/${product.slug}`}>
          <h2 className='text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors mb-2 line-clamp-2'>
            {product.name}
          </h2>
        </Link>
        
        <p className='text-gray-600 text-sm mb-3 line-clamp-3 flex-1'>
          {product.shortDescription || product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
        )}
        
        {/* Pris och köp-knapp */}
        <div className='flex items-center justify-between mt-auto'>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className='text-xl font-bold text-gray-800'>{product.price} kr</span>
              {product.originalPrice && (
                <span className='text-sm text-gray-500 line-through'>{product.originalPrice} kr</span>
              )}
            </div>
            {!product.inStock && (
              <span className="text-xs text-red-500 mt-1">Slut i lager</span>
            )}
          </div>
          
          <button 
            onClick={handleClick} 
            disabled={!product.inStock || loading}
            className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300 ease-in-out text-sm font-medium'>  
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Lägger till...
              </span>
            ) : product.inStock ? 'Lägg i kundvagn' : 'Slut i lager'}
          </button>
        </div>
      </div>
    </div>
  )
}
