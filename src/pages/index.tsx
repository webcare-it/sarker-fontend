import { HomePage } from "./home";
import { Routes, Route } from "react-router";
import { ContactPage } from "./contact";
import { SignInPage } from "./auth/signin";
import { SignUpPage } from "./auth/signup";
import { CategoriesPage } from "./categories";
import { NotFoundPage } from "./notfound";
import { SearchPage } from "./search";
import { ProductsPage } from "./products";
import { ProductDetailsPage } from "./details";
import { WishlistPage } from "./wishlist";
import { CartPage } from "./cart";
import { CategoriesProductPage } from "./categories/product";
import { TranslatePage } from "./TRANSLATE";
import { CheckoutPage } from "./checkout";
import { PolicyPage } from "./policy";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/:id/:name" element={<CategoriesProductPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id/:name" element={<ProductDetailsPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/policy/:key" element={<PolicyPage />} />
      <Route path="/translate" element={<TranslatePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
