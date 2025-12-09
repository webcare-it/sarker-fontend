import {
  Home,
  LayoutGrid,
  Handbag,
  type LucideIcon,
  Heart,
  UserRound,
  Search,
  ArrowLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootStateType } from "@/redux/store";
import { cn } from "@/lib/utils";
import { UserProfile } from "./user";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language";
import { ActionSearchBar } from "./search";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const HeaderMobile = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleBackClick = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  }, [isSearchOpen]);

  return (
    <nav className="md:hidden py-1 bg-background/95 backdrop-blur-3xl fixed top-0 left-0 right-0 z-50 border-b border-border">
      <AnimatePresence mode="wait">
        {!isSearchOpen ? (
          <motion.div
            key="logo-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-between px-4">
            <div>
              <Logo type="MOBILE" />
            </div>
            <div className="flex justify-end items-center gap-2">
              <button
                onClick={handleSearchClick}
                className="p-1 hover:bg-accent rounded-md transition-colors">
                <Search className="h-5 w-5 text-muted-foreground" />
              </button>
              <LanguageSwitcher />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="search-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-between px-4 gap-2">
            <ArrowLeft
              onClick={handleBackClick}
              className="h-6 w-6 text-muted-foreground"
            />
            <div className="flex-1">
              <ActionSearchBar ref={searchInputRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const FooterMobile = () => {
  const location = useLocation();
  const cart = useSelector((state: RootStateType) => state.cart.items);
  const wishlist = useSelector((state: RootStateType) => state.wishlist.items);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full">
      <nav className="bg-white border-t border-border">
        <div className="flex justify-around items-center py-1.5">
          <MenuItem activePath={location.pathname} href="/" icon={Home}>
            Home
          </MenuItem>
          <MenuItem
            activePath={location.pathname}
            href="/categories"
            icon={LayoutGrid}>
            Categories
          </MenuItem>
          <Link
            to="/cart"
            className="flex flex-col items-center justify-center min-w-0 flex-1 relative">
            <div className="bg-primary border-2 border-white rounded-full p-2 -mt-8 mb-1">
              <Handbag className="h-8 w-8 text-white" />
            </div>
            <span className="text-[10px] text-foreground font-medium">
              Cart ({cart?.length})
            </span>
          </Link>

          <Link
            to={"/wishlist"}
            className="relative flex flex-col items-center justify-center min-w-0 flex-1">
            {wishlist?.length > 0 && (
              <div className="absolute -top-2 right-3 bg-primary text-white rounded-full text-[10px] font-medium w-4 h-4 flex items-center justify-center">
                <span> {wishlist?.length}</span>
              </div>
            )}
            <Heart
              className={cn(
                "h-5 w-5 mb-1",
                location.pathname === "/wishlist"
                  ? "text-primary"
                  : "text-foreground"
              )}
            />
            <span
              className={`text-[10px] text-foreground font-medium ${
                location.pathname === "/wishlist"
                  ? "text-primary"
                  : "text-foreground"
              }`}>
              Wishlist
            </span>
          </Link>

          <div className="flex flex-col items-center justify-center min-w-0 flex-1">
            <UserProfile variant="mobile">
              <div className="flex flex-col items-center justify-center min-w-0 flex-1">
                <UserRound className={cn("h-5 w-5 mb-1 text-foreground")} />
                <span className={cn("text-[10px] font-medium text-foreground")}>
                  Account
                </span>
              </div>
            </UserProfile>
          </div>
        </div>
      </nav>
    </div>
  );
};

interface MenuItemProps {
  children: React.ReactNode;
  href: string;
  activePath: string;
  icon: LucideIcon;
}

const MenuItem = ({
  children,
  href,
  icon: Icon,
  activePath,
}: MenuItemProps) => {
  const isActive = activePath === href;
  return (
    <Link
      to={href}
      className="flex flex-col items-center justify-center min-w-0 flex-1">
      {Icon && (
        <Icon
          className={cn(
            "h-5 w-5 mb-1",
            isActive ? "text-primary" : "text-foreground"
          )}
        />
      )}
      <span
        className={cn(
          "text-[10px] font-medium",
          isActive ? "text-primary" : "text-foreground"
        )}>
        {children}
      </span>
    </Link>
  );
};
