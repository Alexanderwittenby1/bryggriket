import { categories, getProductsByCategory } from '@/data/products';
import CategoryCard from '@/components/ui/CategoryCard';

export default function KategorierPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Produktkategorier</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Utforska vårt sortiment organiserat i kategorier för att enkelt hitta det du söker
        </p>
      </div>

      {/* Kategorier Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
      </div>

      {/* Information sektion */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Allt för hembrygd</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Från nybörjarkits till professionell utrustning - vi har allt du behöver för att 
            skapa fantastisk öl hemma. Våra kategorier är noggrant utvalda för att täcka 
            alla aspekter av hembrygd.
          </p>
        </div>
      </div>
    </div>
  );
}