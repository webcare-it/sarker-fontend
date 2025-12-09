import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const useGetPolicy = () => {
  const navigate = useNavigate();
  const { key } = useParams();

  if (!key) navigate("/");

  const { data, isLoading, error } = useQuery({
    queryKey: ["get_policy", key],
    queryFn: async () => {
      const response = await apiClient.get(`/policies/${key}`);
      return response.data;
    },
  });

  return { data, isLoading, error, key };
};
