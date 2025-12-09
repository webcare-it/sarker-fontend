import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import type { ProductDetailsType, ProductType } from "@/type";

interface Props {
  starSize?: string;
  product: ProductDetailsType | ProductType;
}

export const Review = ({ product, starSize = "w-4 h-4" }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.floor(product?.rating)
                ? "fill-yellow-500 text-yellow-500"
                : "text-muted-foreground"
            )}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        ({product?.rating_count || 0} reviews)
      </span>
    </div>
  );
};
