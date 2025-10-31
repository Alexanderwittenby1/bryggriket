export interface Category {
  _id?: string;
  id?: string;
  name: string;
  slug: string | { current: string; _type: 'slug' };
  description?: string;
  image?: string | { _ref: string; _type: 'reference' } | any; // Hybrid: string URL eller Sanity image
  parentId?: string; // För sub-kategorier
}

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  slug: string | { current: string; _type: 'slug' };
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
  specifications?: Record<string, string> | Array<{
    _key?: string;
    key: string;
    value: string;
  }>;
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