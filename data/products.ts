import { Category, Product } from '@/types/product';

import { client } from "@/sanity/client";

// Helper function to normalize slug values
export const getSlugValue = (slug: string | { current: string } | null | undefined): string => {
  if (!slug) return '';
  return typeof slug === 'string' ? slug : slug.current || '';
};

// Sanity data functions
export const getAllCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"]`;
  return await client.fetch<Category[]>(query);
};

export const getCategoriesWithProductCount = async (): Promise<(Category & { productCount: number })[]> => {
  const query = `*[_type == "category"]{
    ...,
    "productCount": count(*[_type == "product" && category._ref == ^._id])
  }`;
  return await client.fetch<(Category & { productCount: number })[]>(query);
};

// export const getFeaturedProducts = (): Product[] => {
//   return products.filter(product => product.featured);
// };

// export const getProductBySlug = (slug: string): Product | undefined => {
//   return products.find(product => product.slug === slug);
// };

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const params = { slug };
  return await client.fetch<Product>(query, params);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product" && featured == true]`;
  return await client.fetch<Product[]>(query);
}

export const getAllProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"]`;
  return await client.fetch<Product[]>(query);
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  console.log("Fetching products for category:", category);
  const query = `*[_type == "product" && category->slug.current == $category]`;
  const params = { category };
  return await client.fetch<Product[]>(query, params);
}

export const getCategoryByProductSlug = async (slug: string): Promise<Category | undefined> =>{
  const query = `*[_type == "product" && slug.current == $slug][0]{ category->{name} }`;
  const params = { slug };
  const result = await client.fetch<{ category: Category }>(query, params);
  return result?.category;
}


