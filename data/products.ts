import { Category, Product, ProductFilters } from '@/types/product';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Bryggverk',
    slug: 'bryggverk',
    description: 'Allt för hembrygd öl',
    image: '/categories/bottle.jpg'
  },
  {
    id: '2',
    name: 'Utrustning',
    slug: 'utrustning',
    description: 'Bryggkittlar, kärl och verktyg',
    image: '/categories/equipment.jpg'
  },
  {
    id: '3',
    name: 'Ingredienser',
    slug: 'ingredienser',
    description: 'Malt, humle och jäst',
    image: '/categories/malt.jpg'
  },
  {
    id: '4',
    name: 'Tillbehör',
    slug: 'tillbehor',
    description: 'Flaskor, korkar och etiketter',
    image: '/categories/accessories.jpg'
  },
  {
    id: '5',
    name: 'Cider & Ciderutrustning',
    slug: 'cider-ciderutrustning',
    description: 'Allt för hembryggd cider',
    image: '/categories/cider.jpg'
  },
  {
    id: '6',
    name: 'Kits för Hembrygd',
    slug: 'kits-for-hembrygd',
    description: 'Kompletta kit för nybörjare och avancerade bryggare',
    image: '/categories/kits.jpg'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Starterkit för Hembrygd',
    slug: 'starterkit-hembrygd',
    description: 'Komplett kit för nybörjare som vill börja brygga öl hemma. Innehåller allt du behöver för dina första bryggelser.',
    shortDescription: 'Komplett nybörjarkit för hembrygd öl',
    price: 899,
    originalPrice: 1199,
    images: ['/products/minecraft.jpg', '/products/minecraft.jpg'],
    category: categories[5],
    tags: ['nybörjare', 'kit', 'komplett'],
    inStock: true,
    stockQuantity: 15,
    featured: true,
    rating: 4.5,
    reviewCount: 23,
    specifications: {
      'Volym': '25 liter',
      'Material': 'Plast/Rostfritt stål',
      'Inkluderat': 'Bryggkärl, jäskärl, slangar, tappkran'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-10-20')
  },
  {
    id: '2',
    name: 'Premium Bryggkittel 50L',
    slug: 'premium-bryggkittel-50l',
    description: 'Professionell bryggkittel i rostfritt stål med integrerad termometer och tappkran. Perfekt för den seriösa hembryggaren.',
    shortDescription: 'Professionell bryggkittel i rostfritt stål',
    price: 2499,
    images: ['/products/cobra.png', '/products/cobra.png'],
    category: categories[0],
    tags: ['professionell', 'rostfritt stål', 'termometer'],
    inStock: true,
    stockQuantity: 8,
    featured: true,
    rating: 4.8,
    reviewCount: 12,
    specifications: {
      'Volym': '50 liter',
      'Material': 'Rostfritt stål 304',
      'Värmekälla': 'Induktion, gas, el',
      'Termometer': 'Inbyggd analog'
    },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-10-15')
  },
  {
    id: '3',
    name: 'Cascade Humle 100g',
    slug: 'cascade-humle-100g',
    description: 'Amerikanskt aromahumle med citrusaktiga toner. Perfekt för IPA och andra hoppiga ölstilar.',
    shortDescription: 'Aromahumle med citruskaraktär',
    price: 89,
    images: ['/products/cascade-hops.jpg'],
    category: categories[2],
    tags: ['humle', 'aroma', 'citrus', 'IPA'],
    inStock: true,
    stockQuantity: 45,
    featured: false,
    rating: 4.3,
    reviewCount: 8,
    specifications: {
      'Vikt': '100g',
      'Alfasyra': '4.5-7%',
      'Ursprung': 'USA',
      'Lagring': 'Fryst'
    },
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-10-10')
  },
  {
    id: '4',
    name: 'Pilsner Malt 25kg',
    slug: 'pilsner-malt-25kg',
    description: 'Högkvalitativ pilsnermalt från Weyermann. Bas för ljusa lager och många andra ölstilar.',
    shortDescription: 'Bas-malt för ljusa ölstilar',
    price: 445,
    images: ['/products/pilsner-malt.jpg'],
    category: categories[2],
    tags: ['malt', 'bas', 'ljus', 'lager'],
    inStock: true,
    stockQuantity: 12,
    featured: false,
    rating: 4.6,
    reviewCount: 15,
    specifications: {
      'Vikt': '25kg',
      'EBC': '3-4',
      'Extrakt': 'Min 81%',
      'Producent': 'Weyermann'
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-10-05')
  },
  {
    id: '5',
    name: 'Cobra Bryggverk 30L',
    slug: 'cobra-bryggverk-30l',
    description: 'Allt-i-ett bryggverk med inbyggd pump och värmeelement. Perfekt för både nybörjare och erfarna bryggare.',
    shortDescription: 'Allt-i-ett bryggverk med pump',
    price: 3999,
    originalPrice: 4599,
    images: ['/products/cobra.png', '/products/cobra.png'],
    category: categories[0],
    tags: ['bryggverk', 'allt-i-ett', 'pump'],
    inStock: false,
    stockQuantity: 5,
    featured: true,
    rating: 4.7,
    reviewCount: 10,
    specifications: {
      'Volym': '30 liter',
      'Material': 'Rostfritt stål 304',
      'Värmekälla': 'Elektrisk med inbyggd pump',
      'Termometer': 'Digital display'
    },
    createdAt: new Date('2024-04-15'),
    updatedAt: new Date('2024-10-18')
  }
];

// Hjälpfunktioner för produkthantering
export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => product.category.slug === categorySlug);
};

export const getAllCategories = (): Category[] => {
  return categories;
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const filterProducts = (filters: ProductFilters): Product[] => {
  return products.filter(product => {
    // Implementera filtrering baserat på filters-objektet
    if (filters.category && product.category.slug !== filters.category) {
      return false;
    }
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false;
    }
    if (filters.featured !== undefined && product.featured !== filters.featured) {
      return false;
    }
    if (filters.priceRange) {
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }
    }
    return true;
  });
};