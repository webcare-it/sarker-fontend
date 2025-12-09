import { useState } from "react";
import { ChevronRight, ChevronLeft, Heart, Package, Image } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useConfig } from "@/hooks/useConfig";
import { getConfig, getImageUrl } from "@/helper";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "./language";
import { useMenuData } from "./useMenu";
import type { MenuItemType } from "./useMenu";

// Simple icon mapping for categories
const getCategoryIcon = (categoryName: string): string => {
  const iconMap: { [key: string]: string } = {
    "Women's Clothing & Fashion": "👗",
    "Men's Clothing & Fashion": "👔",
    "Smart Phone & Accessorise": "📱",
    "Computer & Accessorise": "💻",
    "TV & Home Appliance": "📺",
    "DSLR & CCTV Camera": "📷",
    "অটোমোবাইল এবং মোটরসাইকেল": "🚗",
    "Kids & Toy": "🧸",
    "Sports & Outdoor": "⚽",
    "Jewelley & Watch": "💍",
    "Home Decoration": "🏠",
    Grocery: "🛒",
  };

  return iconMap[categoryName] || "📦";
};

export const MobileMenu = ({ children }: { children: React.ReactNode }) => {
  const config = useConfig();
  const logo = getConfig(config, "header_logo")?.value;
  const { menuData, isLoading, error } = useMenuData();
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"main" | string>("main");
  const [activeSubmenu, setActiveSubmenu] = useState<MenuItemType | null>(null);

  const openSubmenu = (item: MenuItemType) => {
    setActiveSubmenu(item);
    setCurrentView(item.name);
  };

  const goBackToMain = () => {
    setCurrentView("main");
    setActiveSubmenu(null);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setCurrentView("main");
    setActiveSubmenu(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center justify-start gap-2">
            <Link to="/">
              <div className="w-20 h-12 relative overflow-hidden">
                {logo ? (
                  <img
                    src={getImageUrl(logo as string)}
                    alt="logo"
                    className="absolute w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute w-full h-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-primary" />
                  </div>
                )}
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-73px)]">
          {currentView === "main" && (
            <div>
              <ul className="flex flex-col gap-2 px-4">
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-auto"
                    asChild>
                    <a href="/lists" onClick={closeMenu}>
                      <Heart className="h-5 w-5" />
                      <span>Lists</span>
                    </a>
                  </Button>
                </li>
                <li>
                  <LanguageSwitcher />
                </li>
                <li>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-auto"
                    asChild>
                    <a href="/orders" onClick={closeMenu}>
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </a>
                  </Button>
                </li>
              </ul>

              <Separator />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-3">Departments</h3>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-pulse text-muted-foreground">
                      Loading categories...
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-red-500">
                      Failed to load categories
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-1">
                    {menuData?.map((item: MenuItemType) => (
                      <li key={item.name}>
                        {item.submenu ? (
                          <Button
                            variant="ghost"
                            className="w-full justify-between h-auto py-3"
                            onClick={() => openSubmenu(item)}>
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">
                                {getCategoryIcon(item?.name)}
                              </span>
                              <span className="font-medium">{item?.name}</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            className="w-full justify-between h-auto py-3"
                            asChild>
                            <Link to={item?.href || "#"} onClick={closeMenu}>
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {getCategoryIcon(item?.name)}
                                </span>
                                <span className="font-medium">
                                  {item?.name}
                                </span>
                              </div>
                            </Link>
                          </Button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Sign in button */}
              <div className="p-4">
                <Button
                  className="w-full bg-primary  hover:bg-primary/90 rounded-full"
                  asChild>
                  <a href="/signin" onClick={closeMenu}>
                    Sign In
                  </a>
                </Button>
              </div>
            </div>
          )}

          {currentView !== "main" && activeSubmenu && (
            <div>
              <Button
                variant="ghost"
                className="gap-2 px-0 hover:bg-transparent"
                onClick={goBackToMain}>
                <ChevronLeft className="h-5 w-5" />
                <span className="underline">Back to Main Menu</span>
              </Button>

              <Separator />

              <div className="flex items-center justify-between px-4 py-2">
                <h2 className="font-bold text-xl line-clamp-1">
                  {activeSubmenu?.name}
                </h2>
                <Link
                  to={"/"}
                  className="text-primary font-semibold text-sm hover:underline"
                  onClick={closeMenu}>
                  See All
                </Link>
              </div>
              <Separator />

              <div className="p-4">
                {activeSubmenu?.submenu?.columns?.map((column, idx: number) => (
                  <div key={idx} className="mb-4">
                    {column?.title && (
                      <h3 className="font-semibold text-sm text-muted-foreground mb-3 mx-4 line-clamp-1">
                        {column?.title}
                      </h3>
                    )}
                    <ul className="space-y-1">
                      {column?.links?.map((link, linkIdx) => (
                        <li key={linkIdx}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-between h-auto ${
                              link?.highlight
                                ? "bg-pink-50 hover:bg-pink-100"
                                : ""
                            }`}
                            asChild>
                            <Link to={link?.href} onClick={closeMenu}>
                              <div className="flex items-center gap-3">
                                {link?.highlight && (
                                  <span className="bg-red-100 text-destructive text-xs font-semibold px-2 py-1 rounded">
                                    Sale
                                  </span>
                                )}
                                <span
                                  className={
                                    link?.highlight
                                      ? "text-primary font-semibold"
                                      : ""
                                  }>
                                  {link?.name}
                                </span>
                              </div>
                            </Link>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {activeSubmenu?.submenu?.promos && (
                  <div className="space-y-4">
                    {activeSubmenu?.submenu?.promos?.map((promo, idx) => (
                      <Link key={idx} to={promo?.link} className="block group">
                        <div className="relative overflow-hidden w-full h-36 rounded-lg">
                          <img
                            src={promo?.image || "/placeholder.svg"}
                            alt={promo?.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            crossOrigin="anonymous"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <p className="text-white font-semibold line-clamp-1">
                              {promo?.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
