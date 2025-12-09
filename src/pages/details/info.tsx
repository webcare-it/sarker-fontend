import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";
import type { ProductDetailsType, ProductType } from "@/type";
import { CartButton } from "@/components/common/cart-button";
import { VariantCard } from "@/components/card/variant";
import { getImageUrl, getVariant } from "@/helper";
import { Review } from "@/components/card/review";
import { FeatureCards } from "@/pages/details/feature";
import { Discount } from "@/components/common/discount";

interface Props {
  product: ProductDetailsType;
  onVariantImageChange?: (image: string) => void;
}

type StateType = string | null;

export const ProductInfo = ({ product, onVariantImageChange }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<StateType>(null);
  const [selectedColor, setSelectedColor] = useState<StateType>(null);
  const [displayPrice, setDisplayPrice] = useState<string>(
    product?.variants?.[0]?.variant_price_string || "0"
  );

  const handleBuyNow = (): void => {
    console.log("Buy now:");
  };

  const hasBrand = product?.brand?.name || product?.brand?.logo;

  return (
    <div className="space-y-1.5 md:space-y-4 md:col-span-6">
      <div>
        <h1 className="text-xl md:text-2xl line-clamp-2 lg:text-3xl font-bold text-foreground leading-tight">
          {product?.name}
        </h1>
        <Review product={product} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl font-bold text-foreground">
            {displayPrice}
          </span>
          {product?.has_discount && (
            <span className="text-xl md:text-2xl text-muted-foreground line-through">
              {product?.stroked_price}
            </span>
          )}
        </div>
        <Discount product={product} type="INFO" />
      </div>

      {hasBrand && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Brand:</span>
          <div className="flex items-center gap-2">
            {product?.brand?.logo ? (
              <img
                src={getImageUrl(product?.brand?.logo)}
                alt={product?.brand?.name}
                className="w-20 h-10 object-contain"
              />
            ) : (
              <span className="text-sm font-medium">
                {product?.brand?.name}
              </span>
            )}
          </div>
        </div>
      )}

      <VariantCard
        product={product}
        quantity={quantity}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        setSelectedColor={setSelectedColor}
        setSelectedSize={setSelectedSize}
        setQuantity={setQuantity}
        setDisplayPrice={setDisplayPrice}
        onVariantImageChange={onVariantImageChange}
      />

      <div className="space-y-3">
        <div className="flex">
          <CartButton
            product={product as unknown as ProductType}
            quantity={quantity}
            type="DETAILS"
            variant={getVariant(selectedColor, selectedSize)}
          />
        </div>

        <Button
          variant="secondary"
          className="w-full"
          size="lg"
          onClick={handleBuyNow}>
          <ClipboardCheck className="h-4 w-4" />
          Checkout
        </Button>
      </div>

      <FeatureCards />
    </div>
  );
};
