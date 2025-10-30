import ProductCard from "@/components/ui/ProductCard";

type Product = {
    imageSrc?: string;
    title?: string;
    price?: number;
    description?: string;
}

type ProductSectionProps = {
    products: Product[];
}



export default function ProductSection({ products }: ProductSectionProps) {
  return (
    <div className="min-h-screen  mx-auto bg-gray-50/20 ">
      {/* Header Section */}
      <div className="text-left py-12 px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Vår Produktkollektion</h1>
        <p className="text-gray-600 text-lg">Upptäck våra fantastiska produkter</p>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
          {products.map((product, index) => (
            <div 
              key={index}
              
            >
              <ProductCard 
                imageSrc={product.imageSrc}
                title={product.title}
                price={product.price}
                description={product.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
