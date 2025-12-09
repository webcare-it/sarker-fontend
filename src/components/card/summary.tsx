import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Coupon } from "./coupon";
import { useGetCartSummaryQuery } from "@/api/queries/useGetCart";

interface CartSummaryType {
  sub_total: string;
  tax: string;
  shipping_cost: string;
  discount: string;
  grand_total: string;
  grand_total_value: number;
  coupon_code: string;
  coupon_applied: boolean;
}

export const CartSummary = ({ children }: { children: React.ReactNode }) => {
  const { data } = useGetCartSummaryQuery();

  const cartSummary = (data as unknown as CartSummaryType) || {};

  return (
    <Card className="p-4 md:p-6 sticky top-4 bg-card">
      <h2 className="text-xl font-bold text-foreground">ORDER SUMMERY</h2>

      <Coupon couponCode={cartSummary?.coupon_code} />

      <div className="space-y-1 md:space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Sub Total:</span>
          <span className="font-medium">
            {cartSummary?.sub_total || "00.00"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping Cost:</span>
          <span className="font-medium">
            {cartSummary?.shipping_cost || "00.00"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Discount:</span>
          <span className="text-green-600 font-semibold">
            {cartSummary?.discount || "00.00"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated sales tax:</span>
          <span className="font-medium">{cartSummary?.tax || "00.00"}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-bold">
        <span>Total Amount</span>
        <span>{cartSummary?.grand_total || "00.00"}</span>
      </div>

      {children}
      <div className="text-center text-sm text-muted-foreground">
        Purchase protected by emox Money Back Guarantee
      </div>
    </Card>
  );
};
