import { getProductsByCategory, getAllCategories, getSlugValue } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/client';


interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  
  const categories = await getAllCategories();
  const category = categories.find(c => getSlugValue(c.slug) === categorySlug);
  if (!category) {
    notFound();
  }

  const categoryProducts = await getProductsByCategory(categorySlug);

  console.log("products & slug in category:", categoryProducts.map(p => ({ name: p.name, slug: getSlugValue(p.slug) })));

  return (
    <div className="bg-gray-50 overflow-x-hidden">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Hem</Link>
            <span>/</span>
            <Link href="/produkter" className="hover:text-blue-600 transition-colors">Produkter</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium"></span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-6">
            {/* Category Image */}
            <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
              {/* <Image
                src={category.image || '/categories/default.jpg'}
                alt={category.name}
                width={80}
                height={80}
                className="w-16 h-16 object-cover rounded-lg"
              /> */}
            </div>
            
            {/* Category Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2"></h1>
              <p className="text-blue-100 text-lg mb-4"></p>
              <div className="flex items-center space-x-4 text-sm text-blue-200">
                <span>{categoryProducts.length} produkter</span>
                <span>•</span>
                <span>Fri frakt över 500 kr</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <div 
                key={product._id || product.id}
                className="transform hover:scale-[1.02] transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Inga produkter än</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Vi arbetar på att lägga till produkter i denna kategori. Kom tillbaka snart!
            </p>
            <Link 
              href="/produkter"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Utforska alla produkter
            </Link>
          </div>
        )}
      </div>

      {/* Featured Products from Category */}
      {categoryProducts.filter(p => p.featured).length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Utvalda produkter från {category.name}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dessa produkter är särskilt populära och rekommenderade av våra experter
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts
                .filter(p => p.featured)
                .slice(0, 3)
                .map((product) => (
                  <div key={product._id || product.id} className="group">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4">
                        <Image
                          src={product.images?.[0] || '/products/default.jpg'}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{product.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-gray-900">{product.price} kr</span>
                          {product.originalPrice && (
                            <span className="text-gray-500 text-sm line-through ml-2">
                              {product.originalPrice} kr
                            </span>
                          )}
                        </div>
                        <Link 
                          href={`/produkter/${getSlugValue(category.slug)}/${getSlugValue(product.slug)}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Visa mer →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Related Categories */}
      {categoryProducts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Utforska andra kategorier
              </h2>
              <p className="text-gray-600">
                Hitta fler produkter som kan komplettera ditt köp
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .filter(c => getSlugValue(c.slug) !== categorySlug)
                .slice(0, 3)
                .map((relatedCategory) => (
                  <Link
                    key={relatedCategory._id || relatedCategory.id}
                    href={`/produkter/${getSlugValue(relatedCategory.slug)}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-4">
                        <Image
                          src={relatedCategory.image || '/categories/default.jpg'}
                          alt={relatedCategory.name}
                          width={64}
                          height={64}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedCategory.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{relatedCategory.description}</p>
                      <span className="text-blue-600 group-hover:text-blue-700 font-medium text-sm">
                        Utforska {relatedCategory.name.toLowerCase()} →
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Generate static paths for all categories
export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: getSlugValue(category.slug),
  }));
}