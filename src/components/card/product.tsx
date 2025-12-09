import { ClipboardCheck, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProductType } from "@/type";
import { Skeleton } from "../common/skeleton";
import { getImageUrl, slugify } from "@/helper";
import { Link } from "react-router";
import { CartButton } from "../common/cart-button";
import { WishlistButton } from "../common/wishlist-button";
import { DetailsModal } from "./details-modal";
import { useModal } from "@/hooks/useModal";
import { ModalWrapper } from "../common/modal-wrapper";
import { Review } from "./review";
import { Discount } from "../common/discount";

interface Props {
  product: ProductType;
}

export const ProductCard = ({ product }: Props) => {
  const { modalRef, modalConfig, onHideModal, onShowModal } = useModal();

  return (
    <>
      <div className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:scale-105 cursor-pointer duration-300">
        <WishlistButton product={product} size="DEFAULT" />

        <Discount product={product} type="CARD" />

        <Link to={`/products/${product?.id}/${slugify(product?.name)}`}>
          <div className="relative aspect-[16/12] overflow-hidden bg-muted">
            {product?.thumbnail_image ? (
              <img
                src={getImageUrl(product?.thumbnail_image)}
                alt={product?.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full absolute h-full bg-muted flex items-center justify-center">
                <Image className="w-20 h-20 text-muted-foreground" />
              </div>
            )}
          </div>
        </Link>

        <div className="p-3">
          <Link to={`/products/${product?.id}/${slugify(product?.name)}`}>
            <Review product={product} starSize="w-3 h-3" />
            <h3 className="line-clamp-1 mt-0.5 text-sm font-medium leading-tight text-foreground duration-300">
              {product?.name}
            </h3>

            <div className="mb-2 flex items-center gap-2 duration-300">
              <span className="text-lg font-bold text-foreground">
                {product?.main_price}
              </span>
              {product?.has_discount && (
                <span className="text-sm text-muted-foreground line-through">
                  {product?.stroked_price}
                </span>
              )}
            </div>
          </Link>

          <div className="flex gap-2 duration-300">
            <CartButton
              product={product}
              type="CARD"
              onShowModal={onShowModal}
            />
            <Button className="flex-1 border" size="xs" variant="secondary">
              <ClipboardCheck className="h-2 w-2" />
              Checkout
            </Button>
          </div>
        </div>
      </div>

      <ModalWrapper
        ref={modalRef}
        title={modalConfig.title}
        width={modalConfig.size}
        onHide={onHideModal}>
        {modalConfig.type === "DETAILS" && (
          <DetailsModal
            id={product?.id as unknown as string}
            onHideModal={onHideModal}
          />
        )}
      </ModalWrapper>
    </>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:scale-105 cursor-pointer duration-300">
      <div className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div className="absolute left-2 top-2 z-10">
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>

      <div className="relative aspect-[16/12] overflow-hidden bg-muted">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="p-3">
        <div className="mb-2 flex items-center gap-1">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
          </div>
          <Skeleton className="h-3 w-8" />
        </div>

        <Skeleton className="h-4 w-full mb-2" />

        <div className="mb-2 flex items-center gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="flex-1 h-8" />
          <Skeleton className="flex-1 h-8" />
        </div>
      </div>
    </div>
  );
};
