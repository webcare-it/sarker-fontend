import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import type { QueryType } from "../utils/type";

export const useGetUserQuery = (): QueryType => {
  const token = localStorage.getItem("token") || null;
  const { data, isLoading, error } = useQuery({
    queryKey: ["get_user"],
    queryFn: async () => {
      const response = await apiClient.get("/auth/user");
      if (response?.data?.id) {
        localStorage.setItem("user_id", response?.data?.id);
      }
      return response.data;
    },
    enabled: !!token,
  });

  return { data, isLoading, error };
};
