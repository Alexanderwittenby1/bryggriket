export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string; // För sub-kategorier
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number; // För rea-priser
  images: string[];
  category: Category;
  tags?: string[];
  inStock: boolean;
  stockQuantity: number;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  specifications?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  featured?: boolean;
  tags?: string[];
  rating?: number;
}

export interface ProductSortOptions {
  field: 'name' | 'price' | 'rating' | 'createdAt';
  direction: 'asc' | 'desc';
}