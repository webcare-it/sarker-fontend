import { CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Social } from "./social";
import { BottomBar } from "./bottom";
import { Subscribe } from "./subscribe";
import { Contact } from "./contact";
import { CategoriesFooter } from "./categories";
const customerService = [
  { name: "Help Center", href: "#" },
  { name: "Track Order", href: "#" },
  { name: "Returns & Exchanges", href: "#" },
  { name: "Shipping Info", href: "#" },
  { name: "Contact Us", href: "#" },
  { name: "Size Guide", href: "#" },
  { name: "FAQs", href: "#" },
  { name: "Gift Cards", href: "#" },
];

const aboutUs = [
  { name: "About Company", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Press & Media", href: "#" },
  { name: "Sustainability", href: "#" },
  { name: "Investors", href: "#" },
  { name: "Affiliates", href: "#" },
  { name: "Blog", href: "#" },
  { name: "Store Locations", href: "#" },
];

const myAccount = [
  { name: "Sign In", href: "#" },
  { name: "My Orders", href: "#" },
  { name: "Wishlist", href: "#" },
  { name: "Account Settings", href: "#" },
  { name: "Rewards Program", href: "#" },
  { name: "Email Preferences", href: "#" },
];

export const Footer = () => {
  return (
    <div className="bg-gray-800 border-t text-white pt-10 md:pt-16 border-border pb-24 md:pb-0">
      <div className="container mx-auto px-4 md:px-0">
        <Subscribe />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <CategoriesFooter />

          <div>
            <h4 className="font-bold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {customerService.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-primary/70 transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <ul className="space-y-2">
              {aboutUs.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-primary/70 transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">My Account</h4>
            <ul className="space-y-2">
              {myAccount.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-primary/70 transition-colors text-sm">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Contact />
        </div>
        <Social />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm font-semibold text-muted-foreground">
            We Accept:
          </span>
          <div className="flex gap-2">
            <div className="bg-background px-3 py-1.5 rounded flex items-center">
              <CreditCard className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="bg-background px-3 py-1.5 rounded text-xs font-bold text-muted-foreground">
              VISA
            </div>
            <div className="bg-background px-3 py-1.5 rounded text-xs font-bold text-muted-foreground">
              MC
            </div>
            <div className="bg-background px-3 py-1.5 rounded text-xs font-bold text-muted-foreground">
              AMEX
            </div>
            <div className="bg-background px-3 py-1.5 rounded text-xs font-bold text-muted-foreground">
              PayPal
            </div>
          </div>
        </div>
        <Separator className="bg-muted mt-4" />
        <BottomBar />
      </div>
    </div>
  );
};
