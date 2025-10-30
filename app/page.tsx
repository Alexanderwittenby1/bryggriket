import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import { getFeaturedProducts, categories, getProductsByCategory } from "@/data/products";
import Link from "next/link";

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-linear-to-r from-green-700 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Välkommen till Bryggriket</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Din kompletta destination för hembrygd. Från nybörjarkits till professionell utrustning.
          </p>
          <Link 
            href="/kategorier"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Utforska kategorier
          </Link>
        </div>
      </section>

      {/* Kategorier */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Våra kategorier</h2>
            <p className="text-gray-600 text-lg">Allt du behöver för hembrygd, organiserat för dig</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {categories.map((category) => {
              const productCount = getProductsByCategory(category.slug).length;
              return (
                <CategoryCard
                  key={category.id}
                  category={category}
                  productCount={productCount}
                />
              );
            })}
          </div>

          <div className="text-center">
            <Link 
              href="/kategorier"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Se alla kategorier →
            </Link>
          </div>
        </div>
      </section>

      {/* Populära produkter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Populära produkter</h2>
            <p className="text-gray-600 text-lg">Våra mest älskade produkter av våra kunder</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/produkter"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Se alla produkter
            </Link>
          </div>
        </div>
      </section>

      {/* Info sektion */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Varför välja Bryggriket?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kvalitet</h3>
              <p className="text-gray-600">Endast de bästa produkterna för din hembrygd</p>
            </div>
            <div>
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Snabb leverans</h3>
              <p className="text-gray-600">Få dina produkter snabbt och säkert</p>
            </div>
            <div>
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Experthjälp</h3>
              <p className="text-gray-600">Våra experter hjälper dig med alla frågor</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
