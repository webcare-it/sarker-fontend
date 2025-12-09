import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { QueryType } from "../utils/type";

export const useGetBanners = (): QueryType => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get_banners"],
    queryFn: async () => {
      const response = await apiClient.get("/banners");
      return response.data;
    },
  });

  return { data, isLoading, error };
};
