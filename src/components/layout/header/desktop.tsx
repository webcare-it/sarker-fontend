import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ActionSearchBar } from "./search";
import { UserProfile } from "./user";
import { useSelector } from "react-redux";
import type { RootStateType } from "@/redux/store";
import { MegaMenu } from "./mega-menu";
import { LanguageSwitcher } from "./language";
import { Logo } from "./logo";

export const HeaderDesktop = ({
  isShowMegaMenu,
}: {
  isShowMegaMenu: boolean;
}) => {
  const cart = useSelector((state: RootStateType) => state.cart);
  const wishlist = useSelector((state: RootStateType) => state.wishlist);

  return (
    <nav className="hidden md:block">
      <div className="h-16 md:flex items-center justify-center w-full px-1 md:px-0 bg-background border-b border-border">
        <div className="container flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 justify-start">
            <Logo type="DESKTOP" />
          </div>

          <div className="hidden md:flex flex-1 justify-center items-center">
            <ActionSearchBar />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <LanguageSwitcher />
            <Link to="/wishlist" title="Wishlist">
              <Button variant="ghost" size="icon-lg" className="relative">
                <div title="Wishlist" className="relative">
                  <Heart className="h-6 w-6" />
                  {wishlist?.items?.length > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 bg-primary text-white rounded-full text-[10px] font-medium w-4 h-4 flex items-center justify-center">
                      {wishlist?.items?.length}
                    </span>
                  )}
                </div>
              </Button>
              <span className="sr-only">Wishlist</span>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon-lg" className="relative">
                <div title="Shopping Cart" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cart?.items?.length > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 bg-primary text-white rounded-full text-[10px] font-medium w-4 h-4 flex items-center justify-center">
                      {cart?.items?.length}
                    </span>
                  )}
                </div>
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>

            <UserProfile />
          </div>
        </div>
      </div>
      {isShowMegaMenu && <MegaMenu />}
    </nav>
  );
};
