import { FooterMobile } from "./header/mobile";
import { HeaderDesktop } from "./header/desktop";
import { HeaderMobile } from "./header/mobile";
import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";
import { useGetWishlist } from "@/controllers/wishlistController";
import { useGetCart } from "@/controllers/cartController";
import { Footer } from "./footer";

interface Props {
  children: React.ReactNode;
  isContainer?: boolean;
  isShowMegaMenu?: boolean;
}

export const BaseLayout = ({
  children,
  isContainer = true,
  isShowMegaMenu = true,
}: Props) => {
  useGetCart();
  useGetWishlist();
  const config = useConfig();
  const isSticky = getConfig(config, "header_stikcy")?.value;

  return (
    <main className="min-h-screen flex flex-col">
      <header className={`${isSticky ? "sticky top-0 z-50" : ""}`}>
        <HeaderDesktop isShowMegaMenu={isShowMegaMenu} />
        <HeaderMobile />
      </header>
      <section
        className={`${
          isContainer ? "container md:mx-auto" : ""
        } flex-1 pt-[50px] md:pt-0`}>
        {children}
      </section>
      <footer>
        <Footer />
        <FooterMobile />
      </footer>
    </main>
  );
};
