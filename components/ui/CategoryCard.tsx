import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/types/product';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <Link href={`/produkter/${category.slug}`}>
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        {/* Kategori bild */}
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <Image
            src={category.image || '/placeholder-category.jpg'}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Overlay med gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Kategori info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold mb-1">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {category.description}
            </p>
          )}
          {productCount !== undefined && (
            <p className="text-xs text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {productCount} produkter
            </p>
          )}
        </div>

        {/* Hover effekt - pil */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}