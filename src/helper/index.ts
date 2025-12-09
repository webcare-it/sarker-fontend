import { IMAGE_URL } from "@/constant";
import type { ConfigType } from "@/hooks/useConfig";
import type {
  ProductDetailsType,
  ProductType,
  StateSyncType,
  VariantType,
} from "@/type";
import { v4 as uuidv4 } from "uuid";

export const getImageUrl = (url: string) => {
  return `${IMAGE_URL}${url}`;
};

export const isExistingItem = (
  items: StateSyncType[],
  product: ProductType
) => {
  const result = items?.find(
    (f: StateSyncType) =>
      (f?.productId === product?.productId || f?.productId === product?.id) &&
      (f?.variant === product?.variant || (!f?.variant && !product?.variant))
  );
  return result;
};

export const getUUID = () => {
  return uuidv4();
};

export const slugify = (text: string): string => {
  if (!text || text === null || text === undefined) {
    return "";
  }

  const isBangla = (text: string): boolean => {
    const banglaRegex = /[\u0980-\u09FF]/;
    return banglaRegex.test(text);
  };

  const cleanText = text.replace(/['".,!?;:()[\]{}]/g, "").trim();
  const extraClean = cleanText.replace(/\//g, "");

  const words = extraClean.split(/\s+/).filter((word) => word.length > 0);

  if (isBangla(cleanText)) return words.join("-");

  return words.map((word) => word.toLowerCase()).join("-");
};

export const slugifyToTitle = (slug: string): string => {
  const isBangla = (text: string): boolean => {
    const banglaRegex = /[\u0980-\u09FF]/;
    return banglaRegex.test(text);
  };

  const words = slug.split("-").filter((word) => word.length > 0);

  if (words.length === 0) return "";

  if (isBangla(slug)) {
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const getConfig = (config: ConfigType[] = [], key: string) => {
  if (!config || !key) return null;

  const result = config?.find((item) => item.type === key);
  return result;
};

export const htmlToPlainText = (html: string | null | undefined): string => {
  if (!html || html === null || html === undefined) {
    return "";
  }

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  return tempDiv.textContent || tempDiv.innerText || "";
};

export const truncateText = (text: string, maxLength: number = 30): string => {
  if (!text || text === null || text === undefined) {
    return "";
  }

  if (text?.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + "...";
};

export const getUserId = () => {
  if (typeof window !== "undefined") {
    const userId = localStorage.getItem("user_id");
    return userId;
  }
  return null;
};

export const getLangCode = () => {
  if (typeof window !== "undefined") {
    const code = localStorage.getItem("code");
    return code;
  }
  return null;
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token;
  }
  return null;
};

export const getGuestUserId = () => {
  if (typeof window !== "undefined") {
    const guestUserId = localStorage.getItem("guest_user_id");
    return guestUserId;
  }
  return null;
};

export const extractNumericValue = (str: string): number => {
  if (!str || str === null || str === undefined) {
    return 0;
  }

  const numericString = str.replace(/[^\d.-]/g, "");

  if (!numericString || numericString === "" || numericString === "-") {
    return 0;
  }
  const numericValue = parseFloat(numericString);
  return isNaN(numericValue) ? 0 : numericValue;
};

const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;

  url = url.trim();

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

export const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
};

export const getUniqueColors = (product: ProductDetailsType): string[] => {
  if (!product?.variants || product?.variants?.length === 0) return [];
  const colors = product.variants
    .map((variant) => variant?.color_name)
    .filter((color) => color && color.trim() !== "");
  return [...new Set(colors)];
};

export const getUniqueSizes = (product: ProductDetailsType): string[] => {
  if (!product?.variants || product?.variants?.length === 0) return [];
  const sizes = product.variants
    .map((variant) => variant?.size_name)
    .filter((size) => size && size.trim() !== "");
  return [...new Set(sizes)];
};

export const findVariantByColorAndSize = (
  product: ProductDetailsType,
  color: string,
  size: string
): VariantType | null => {
  if (!product?.variants || product?.variants?.length === 0) return null;
  if (!color || !size) return null;

  return (
    product?.variants?.find(
      (variant) => variant?.color_name === color && variant?.size_name === size
    ) || null
  );
};

export const getCurrentStock = (
  product: ProductDetailsType,
  selectedColor: string | null,
  selectedSize: string | null
): { stock: number; unit: string } => {
  if (!product) {
    return { stock: 0, unit: "pieces" };
  }

  if (!product?.variants || product?.variants?.length === 0) {
    return {
      stock: product?.current_stock || 0,
      unit: product?.unit || "pieces",
    };
  }

  const cleanColor = selectedColor?.trim() || null;
  const cleanSize = selectedSize?.trim() || null;

  if (cleanColor && cleanSize) {
    const variant = findVariantByColorAndSize(product, cleanColor, cleanSize);
    if (
      variant &&
      variant.variant_stock !== null &&
      variant.variant_stock !== undefined
    ) {
      return {
        stock: Math.max(0, variant?.variant_stock || 0),
        unit: product?.unit || "pieces",
      };
    }
  }

  if (cleanColor && !cleanSize) {
    const colorVariant = product?.variants?.find(
      (v) =>
        v.color_name === cleanColor &&
        v.variant_stock !== null &&
        v.variant_stock !== undefined
    );
    if (colorVariant) {
      return {
        stock: Math.max(0, colorVariant?.variant_stock || 0),
        unit: product?.unit || "pieces",
      };
    }
  }

  if (cleanSize && !cleanColor) {
    const sizeVariant = product?.variants?.find(
      (v) =>
        v.size_name === cleanSize &&
        v.variant_stock !== null &&
        v.variant_stock !== undefined
    );
    if (sizeVariant) {
      return {
        stock: Math.max(0, sizeVariant?.variant_stock || 0),
        unit: product?.unit || "pieces",
      };
    }
  }

  return {
    stock: Math.max(0, product?.current_stock || 0),
    unit: product?.unit || "pieces",
  };
};

export const removeCurrencySymbol = (price: string): number => {
  if (!price || price === null || price === undefined) {
    return 0;
  }
  const cleanedPrice = price.replace(/[^\d.-]/g, "");
  return parseFloat(cleanedPrice) || 0;
};

export const hasDiscount = (
  mainPrice: string,
  strokedPrice: string
): number => {
  if (removeCurrencySymbol(strokedPrice) > removeCurrencySymbol(mainPrice)) {
    return removeCurrencySymbol(strokedPrice) - removeCurrencySymbol(mainPrice);
  }
  return 0;
};

type MergedType = string | null;
export const getVariant = (color: MergedType, size: MergedType): MergedType => {
  if (color && size) {
    return `${color}-${size}`;
  } else if (color && !size) {
    return color;
  } else if (!color && size) {
    return size;
  } else {
    return null;
  }
};
