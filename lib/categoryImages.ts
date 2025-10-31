// Statiska kategori-bilder
export const categoryImages: Record<string, string> = {
  'bryggverk': '/categories/bottle.jpg',
  'utrustning': '/categories/equipment.jpg', 
  'ingredienser': '/categories/malt.jpg',
  'tillbehor': '/categories/accessories.jpg',
  'cider-ciderutrustning': '/categories/cider.jpg',
  'kits-for-hembrygd': '/categories/kits.jpg'
};

export const getCategoryImage = (slug: string): string => {
  return categoryImages[slug] || '/placeholder-category.jpg';
};