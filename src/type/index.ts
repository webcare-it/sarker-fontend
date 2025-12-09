export interface UserType {
  id: number;
  referred_by: null;
  provider_id: null;
  user_type: string;
  name: string;
  email: null;
  email_verified_at: null;
  verification_code: string;
  new_email_verificiation_code: null;
  device_token: null;
  avatar: null;
  avatar_original: null;
  address: null;
  country: null;
  state: null;
  city: null;
  postal_code: null;
  phone: string;
  balance: number | null;
  banned: number | null;
  referral_code: null;
  customer_package_id: null;
  remaining_uploads: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProductType {
  id: number;
  name: string;
  productId?: string | number;
  thumbnail_image: string;
  has_discount: boolean;
  stroked_price: string;
  discount_price: number | string | null;
  calculable_price: number;
  main_price: string;
  rating: number;
  rating_count: number;
  variant_product: number;
  variant?: string | null;
  quantity?: number | null;
  links: {
    details: string;
  };
}

export interface CategoryProductType extends ProductType {
  category_name: string;
}

export interface VariantType {
  variant_name: string;
  color_name: string;
  color_code: string;
  size_name: string;
  variant_price: number;
  variant_price_string: string;
  variant_stock: number;
  variant_image: string;
}

export interface ProductDetailsType {
  id: number;
  name: string;
  added_by: string;
  seller_id: number;
  shop_id: number;
  review: number;
  shop_name: string;
  shop_logo: string;
  photos: {
    variant: string;
    path: string;
  }[];
  thumbnail_image: string;
  tags: string[];
  price_high_low: string;
  choice_options: {
    name: string;
    title: string;
    options: string[];
  }[];
  colors: string[];
  has_discount: boolean;
  stroked_price: string;
  main_price: string;
  discount_price: number | string | null;
  calculable_price: number;
  currency_symbol: string;
  current_stock: number;
  unit: string;
  rating: number;
  rating_count: number;
  earn_point: number;
  description: string;
  video_provider: string;
  video_link: string;
  brand: {
    id: number;
    name: string;
    logo: string;
  };
  link: string;
  variants: VariantType[];
}

export interface StateSyncType {
  id: string | number;
  productId: string | number;
  name: string;
  image: string;
  mainPrice: number;
  showPrice: number | string;
  variant?: string | null;
  quantity: number;
}

export interface CategoryType {
  id: number;
  name: string;
  banner: string;
  icon: string;
  number_of_children: number;
  links: {
    products: string;
    sub_categories: string;
  };
}
