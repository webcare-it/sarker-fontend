import { BaseLayout } from "@/components/layout/base-layout";
import { useSelector } from "react-redux";
import type { RootStateType } from "@/redux/store";
import { CartSummary } from "@/components/card/summary";
import {
  CreditCard,
  ShoppingBag,
  User,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { SectionTitle } from "@/components/common/section-title";
import { Link } from "react-router-dom";
import { SeoWrapper } from "@/components/common/seo-wrapper";

export const CheckoutPage = () => {
  const cart = useSelector((state: RootStateType) => state.cart);

  return (
    <>
      <SeoWrapper title="Your Checkout" />
      <BaseLayout>
        <section className="mb-10 md:mb-20 mt-10">
          <SectionTitle title="Checkout" />
          {cart?.items?.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 mx-4 md:mx-0 lg:grid-cols-3 gap-4 lg:gap-8">
              <div className="lg:col-span-2">
                <div className="p-3 md:p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold mb-6">
                    Checkout Information
                  </h3>
                  <form className="space-y-3 md:space-y-4">
                    <div className="space-y-1 md:space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <InputGroup className="h-9 md:h-10">
                        <InputGroupAddon>
                          <User />
                        </InputGroupAddon>
                        <InputGroupInput
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Enter your full name"
                        />
                      </InputGroup>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <Label htmlFor="contact">Phone *</Label>
                      <InputGroup className="h-9 md:h-10">
                        <InputGroupAddon>
                          <Phone />
                        </InputGroupAddon>
                        <InputGroupInput
                          type="text"
                          id="contact"
                          name="contact"
                          required
                          placeholder="Enter your phone number"
                        />
                      </InputGroup>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <InputGroup className="h-9 md:h-10">
                        <InputGroupAddon>
                          <MapPin />
                        </InputGroupAddon>
                        <InputGroupInput
                          type="text"
                          id="address"
                          name="address"
                          required
                          placeholder="Enter your full address"
                        />
                      </InputGroup>
                    </div>
                    <div className="space-y-1 md:space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <InputGroup className="h-9 md:h-10">
                        <InputGroupAddon>
                          <MessageSquare />
                        </InputGroupAddon>
                        <InputGroupInput
                          type="text"
                          id="notes"
                          name="notes"
                          placeholder="Enter any additional notes or comments"
                        />
                      </InputGroup>
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1">
                <CartSummary>
                  <Button className="w-full mb-4" size="lg">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Place Order
                  </Button>
                </CartSummary>
              </div>
            </div>
          )}
        </section>
      </BaseLayout>
    </>
  );
};
