import { Sun, ChevronDown } from "lucide-react"
import Link from "next/link"
import { getAllCategories, getProductsByCategory, getSlugValue } from "@/data/products"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export async function AppSidebar() {
  const allCategories = await getAllCategories();
  
  // Pre-fetch all products for each category
  const categoriesWithProducts = await Promise.all(
    allCategories.map(async (category) => {
      const categorySlug = getSlugValue(category.slug);
      const categoryProducts = await getProductsByCategory(categorySlug);
      return {
        ...category,
        products: categoryProducts
      };
    })
  );

  console.log("All Categories in Sidebar:", allCategories.map(cat => ({ name: cat.name })));
  
  return (
    <Sidebar >
      <SidebarContent>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 bg-white text-black ">
            <Link href="/">
                <h1 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                Bryggriket
                </h1>
            </Link>
            <button className="p-2 rounded-md hover:bg-gray-50 transition-colors hover:cursor-pointer">
                <span className="sr-only">Toggle dark mode</span>
                <Sun className="h-5 w-5 text-gray-600" />
            </button>
        </div>

        {/* Navigation Menu */}
        

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Kategorier</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoriesWithProducts.map((category) => {
                return (
                  <SidebarMenuItem key={category._id || category.id}>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex items-center justify-between w-full">
                          <span>{category.name}</span>
                          <ChevronDown className="h-4 w-4" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="ml-4 space-y-1">
                          <Link 
                            href={`/produkter/${getSlugValue(category.slug)}`}
                            className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                          >
                            Visa alla {category.name.toLowerCase()}
                          </Link>
                          {category.products.map((product) => (
                            <Link
                              key={product._id || product.id}
                              href={`/produkter/${getSlugValue(category.slug)}/${getSlugValue(product.slug)}`}
                              className="block px-2 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                            >
                              {product.name}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}