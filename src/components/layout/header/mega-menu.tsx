import { useState, useRef, useEffect } from "react";
import { useMenuData } from "./useMenu";
import { Link, useLocation } from "react-router-dom";
import { Image, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getImageUrl } from "@/helper";
import { Skeleton } from "@/components/common/skeleton";

type Props = React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  highlight?: boolean;
  onClick?: () => void;
};

const MegaMenuListItem = ({
  title,
  href,
  highlight = false,
  onClick,
  ...props
}: Props) => {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          onClick={onClick}
          className={`text-sm hover:underline hover:text-primary block ${
            highlight ? "text-primary font-semibold" : "text-muted-foreground"
          }`}>
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export const MegaMenu = () => {
  const location = useLocation();
  const pathname = location?.pathname;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { menuData, isLoading } = useMenuData();

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const closeMenu = () => {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const handleResize = () => checkScrollPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuData]);

  if (isLoading) {
    return (
      <nav className="relative border border-border">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 justify-center py-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-32 h-7 rounded" />
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    menuData?.length > 0 && (
      <nav className="border-b border-border sticky top-14 md:top-16 z-60 bg-background shadow-sm">
        <div className="container mx-auto relative">
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 cursor-pointer"
                aria-label="Scroll left">
                <ChevronLeft className="w-4 h-4 text-primary" />
              </motion.button>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-full p-2 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 cursor-pointer"
                aria-label="Scroll right">
                <ChevronRight className="w-4 h-4 text-primary" />
              </motion.button>
            )}
          </AnimatePresence>

          <NavigationMenu>
            <div className="relative overflow-hidden">
              <div
                ref={scrollContainerRef}
                onScroll={checkScrollPosition}
                className="scrollbar-hide overflow-x-auto"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <NavigationMenuList className="flex items-center py-0.5">
                  {menuData?.map((item) => (
                    <NavigationMenuItem
                      key={item?.name}
                      className="text-nowrap">
                      {item?.submenu ? (
                        <>
                          <NavigationMenuTrigger className="font-medium hover:text-primary transition-colors hover:underline cursor-pointer">
                            {item?.name}
                          </NavigationMenuTrigger>

                          <NavigationMenuContent>
                            <div className="bg-background rounded md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] mx-auto max-h-[600px] overflow-y-auto overflow-x-auto">
                              <div className="flex gap-6 p-5 w-full overflow-x-auto">
                                {item?.submenu?.columns?.map((column, idx) => (
                                  <div
                                    key={idx}
                                    className="flex-1 min-w-[180px]">
                                    <h3 className="font-bold text-primary mb-4 line-clamp-1">
                                      {column?.title}
                                    </h3>
                                    <ul className="space-y-2">
                                      {column?.links?.map((link, linkIdx) => (
                                        <MegaMenuListItem
                                          key={linkIdx}
                                          title={link?.name}
                                          href={link?.href}
                                          highlight={pathname === link?.href}
                                          onClick={closeMenu}
                                        />
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                                {item?.submenu?.promos && (
                                  <div className="w-80 flex-shrink-0 space-y-4">
                                    {item?.submenu?.promos?.map(
                                      (promo, idx) => (
                                        <Link
                                          key={idx}
                                          to={promo?.link}
                                          onClick={closeMenu}
                                          className="block group">
                                          <div className="w-80 h-48 object-cover relative overflow-hidden rounded-lg">
                                            {promo?.image ? (
                                              <img
                                                src={getImageUrl(promo?.image)}
                                                alt={promo?.title}
                                                className="absolute top-0 left-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                                                loading="lazy"
                                                crossOrigin="anonymous"
                                              />
                                            ) : (
                                              <div className="absolute w-full h-full bg-gray-200 animate-pulse">
                                                <Image className="w-full h-full object-cover" />
                                              </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                              <p className="text-white font-semibold line-clamp-1">
                                                {promo?.title}
                                              </p>
                                            </div>
                                          </div>
                                        </Link>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink
                          asChild
                          className={navigationMenuTriggerStyle()}>
                          <Link
                            to={item?.href as string}
                            onClick={closeMenu}
                            className="font-medium hover:text-primary transition-colors hover:underline cursor-pointer">
                            {item?.name}
                          </Link>
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </div>
            </div>
          </NavigationMenu>
        </div>
      </nav>
    )
  );
};
