import type { ProductDetailsType } from "@/type";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import {
  findVariantByColorAndSize,
  getCurrentStock,
  getUniqueColors,
  getUniqueSizes,
} from "@/helper";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  product: ProductDetailsType;
  selectedColor: string | null;
  selectedSize: string | null;
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: string) => void;
  setQuantity: (quantity: number) => void;
  setDisplayPrice: (price: string) => void;
  onVariantImageChange?: (image: string) => void;
}

export const VariantCard = ({
  product,
  quantity,
  setQuantity,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  setDisplayPrice,
  onVariantImageChange,
}: Props) => {
  const handleQuantityChange = (newQuantity: number): void => {
    const currentStock = getCurrentStock(product, selectedColor, selectedSize);
    if (newQuantity >= 1 && newQuantity <= currentStock?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleColorSelect = (color: string): void => {
    if (!color || color.trim() === "") return;

    setSelectedColor(color);

    if (selectedSize) {
      const variant = findVariantByColorAndSize(product, color, selectedSize);
      if (variant) {
        setDisplayPrice(variant?.variant_price_string);
        onVariantImageChange?.(variant.variant_image);
      }
    } else {
      const colorVariant = product?.variants?.find(
        (v) => v.color_name === color
      );
      if (colorVariant) {
        setDisplayPrice(colorVariant?.variant_price_string);
        onVariantImageChange?.(colorVariant.variant_image);
      }
    }
  };

  const handleSizeSelect = (size: string): void => {
    if (!size || size.trim() === "") return;

    setSelectedSize(size);

    if (selectedColor) {
      const variant = findVariantByColorAndSize(product, selectedColor, size);
      if (variant) {
        setDisplayPrice(variant?.variant_price_string);
        onVariantImageChange?.(variant.variant_image);
      }
    } else {
      const sizeVariant = product?.variants?.find((v) => v.size_name === size);
      if (sizeVariant) {
        setDisplayPrice(sizeVariant?.variant_price_string);
        onVariantImageChange?.(sizeVariant.variant_image);
      }
    }
  };

  useEffect(() => {
    if (product?.variants && product?.variants?.length > 0) {
      const firstVariant = product?.variants[0];
      setSelectedColor(firstVariant?.color_name);
      setSelectedSize(firstVariant?.size_name);
      setDisplayPrice(firstVariant?.variant_price_string);
      onVariantImageChange?.(firstVariant?.variant_image);
    }
  }, [
    product,
    onVariantImageChange,
    setDisplayPrice,
    setSelectedColor,
    setSelectedSize,
  ]);

  useEffect(() => {
    const currentStock = getCurrentStock(product, selectedColor, selectedSize);
    if (quantity > currentStock?.stock && currentStock?.stock > 0) {
      setQuantity(currentStock?.stock);
    } else if (currentStock?.stock === 0) {
      setQuantity(1);
    }
  }, [selectedColor, selectedSize, product, quantity, setQuantity]);

  return (
    <>
      {/* {(selectedColor || selectedSize) && (
        <div className="flex items-center gap-4 p-2 md:p-3 bg-muted/50 rounded">
          <span className="text-sm font-medium">Selected:</span>
          {selectedColor && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Color:</span>
              <div className="flex items-center gap-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: product?.variants?.find(
                      (v) => v?.color_name === selectedColor
                    )?.color_code,
                    borderColor: product?.variants?.find(
                      (v) => v?.color_name === selectedColor
                    )?.color_code,
                    borderWidth: 2,
                  }}
                />
                <span className="text-xs font-medium">{selectedColor}</span>
              </div>
            </div>
          )}
          {selectedSize && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Size:</span>
              <span className="text-xs font-medium">{selectedSize}</span>
            </div>
          )}
        </div>
      )} */}

      {product?.variants &&
        product?.variants?.length > 0 &&
        getUniqueColors(product).length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Colors:</span>
            <div className="flex items-center gap-2">
              {getUniqueColors(product)?.map((color) => {
                const variant = product?.variants?.find(
                  (v) => v?.color_name === color
                );
                return (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={cn(
                      "w-6 h-6 md:w-8 md:h-8 rounded-full cursor-pointer flex items-center justify-center border-2 transition-all duration-200",
                      selectedColor === color && "scale-105 md:scale-110"
                    )}
                    style={{
                      backgroundColor: variant?.color_code,
                      borderColor: variant?.color_code,
                      borderWidth: 2,
                    }}
                    aria-label={`Select ${color} color`}>
                    {selectedColor === color && (
                      <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      {product?.variants &&
        product?.variants?.length > 0 &&
        getUniqueSizes(product)?.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sizes:</span>
            <div className="flex items-center gap-2">
              {getUniqueSizes(product)?.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  size="icon-sm"
                  onClick={() => handleSizeSelect(size)}
                  className={cn(
                    "flex items-center justify-center transition-all",
                    selectedSize === size
                      ? "bg-primary text-primary-foreground"
                      : "hover:border-primary/50"
                  )}
                  aria-label={`Select ${size} size`}>
                  <span className="text-sm">{size}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

      <div className="flex items-center gap-2">
        {(() => {
          const currentStock = getCurrentStock(
            product,
            selectedColor,
            selectedSize
          );
          const isOutOfStock = currentStock?.stock === 0;

          return (
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  isOutOfStock ? "bg-red-500" : "bg-green-500"
                )}
              />
              <span
                className={cn(
                  "text-xs md:text-sm font-medium",
                  isOutOfStock && "text-red-600",
                  !isOutOfStock && "text-green-600"
                )}>
                {isOutOfStock
                  ? "Out of stock"
                  : !isOutOfStock &&
                    `${currentStock?.stock} ${currentStock?.unit} in stock`}
              </span>
            </div>
          );
        })()}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Quantity:</label>
        <div className="flex items-center gap-3 my-1 md:my-0">
          {(() => {
            const currentStock = getCurrentStock(
              product,
              selectedColor,
              selectedSize
            );
            return (
              <>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity">
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-foreground text-center text-xs md:text-sm font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= currentStock.stock}
                  aria-label="Increase quantity">
                  <Plus className="w-4 h-4" />
                </Button>
              </>
            );
          })()}
        </div>
      </div>
    </>
  );
};
