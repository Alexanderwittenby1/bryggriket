import { products, categories } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';
import CategoryCard from '@/components/ui/CategoryCard';

export default function ProdukterPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Alla produkter</h1>
          <p className="text-gray-600">Utforska vårt kompletta sortiment för hembrygd</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">{products.length} produkter totalt</p>
          </div>
        </div>
      </div>

      {/* Quick Category Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex gap-4 overflow-x-auto">
            <a 
              href="/produkter"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap"
            >
              Alla produkter
            </a>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/produkter/${category.slug}`}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="transform hover:scale-105 transition-all duration-300"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Handla per kategori
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const categoryProducts = products.filter(p => p.category.slug === category.slug);
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={categoryProducts.length}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
