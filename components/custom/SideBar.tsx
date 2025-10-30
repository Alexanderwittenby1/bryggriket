import { Sun, ChevronDown } from "lucide-react"
import Link from "next/link"
import { getAllCategories } from "@/data/products"
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

export function AppSidebar() {
  const allCategories = getAllCategories();

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
        <SidebarGroup >
          <Collapsible defaultOpen>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-gray-200 px-2 py-1 ">
                Kategorier
                <ChevronDown className="h-4 w-4" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {allCategories.map((category) => (
                    <SidebarMenuItem key={category.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/produkter/${category.slug}`}>
                          <span>{category.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}