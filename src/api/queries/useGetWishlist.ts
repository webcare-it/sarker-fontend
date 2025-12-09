import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { QueryType } from "../utils/type";
import { getUserId, isAuthenticated } from "@/helper";

export const useGetWishlistQuery = (): QueryType => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get_wishlist"],
    queryFn: async () => {
      const response = await apiClient.get(`/wishlists/${getUserId()}`);
      return response.data;
    },
    enabled: !!isAuthenticated(),
  });

  return { data, isLoading, error };
};
