import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { getGuestUserId, getUserId } from "@/helper";

type QueryType = {
  data: {
    name: string;
    owner_id: number;
    cart_items: {
      id: number;
      owner_id: number;
      user_id: number;
      product_id: number;
      product_name: string;
      product_thumbnail_image: string;
      variation: string;
      price: number;
      currency_symbol: string;
      tax: number;
      shipping_cost: number;
      quantity: number;
    }[];
  }[];
  error: unknown;
  isLoading: boolean;
  refetch: () => void;
};

export const useGetCartQuery = (): QueryType => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["get_cart"],
    queryFn: async () => {
      const response = await apiClient.post(
        `/carts/${getUserId() || getGuestUserId()}`
      );
      return response.data;
    },
  });

  return { data, isLoading, error, refetch };
};

export const useGetCartSummaryQuery = (): QueryType => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["get_cart_summary"],
    queryFn: async () => {
      const response = await apiClient.get(
        `/cart-summary/${getUserId() || getGuestUserId()}`
      );
      return response.data;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  return { data, isLoading, error, refetch };
};
