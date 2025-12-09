import { apiClient } from "@/lib/api-client";
import { useQuery, useQueries } from "@tanstack/react-query";
import type { QueryType } from "../utils/type";
import { useNavigate, useParams } from "react-router-dom";
import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";

export const useGetProductsForHome = (
  type: string,
  params: Record<string, unknown> = {}
): QueryType => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get_products_for_home", type, params],
    queryFn: async () => {
      const response = await apiClient.get(`/products/${type}`, { params });
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetProductsByCategory = (): QueryType => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) navigate("/");

  const { data, isLoading, error } = useQuery({
    queryKey: ["get_products_by_category", id],
    queryFn: async () => {
      const response = await apiClient.get(`/products/category/${id}`);
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useProductsByCategoryHome = () => {
  const config = useConfig();
  const configValue = getConfig(config, "home_categories")?.value as string;
  const categories = configValue ? JSON.parse(configValue as string) : [];

  const categoryQueries = useQueries({
    queries:
      categories?.map((id: unknown) => ({
        queryKey: ["get_products_by_category", id],
        queryFn: async () => {
          const response = await apiClient.get(`/products/category/${id}`);
          return response.data;
        },
        enabled: !!id && categories.length > 0,
      })) || [],
  });

  if (!categories || !Array.isArray(categories) || categories.length === 0)
    return { data: [], isLoading: false, error: null };

  const isLoading = categoryQueries?.some((query) => query?.isLoading);
  const error = categoryQueries?.find((query) => query?.error)?.error;
  const data = categoryQueries?.map((query, index) => ({
    categoryId: categories[index],
    data: query?.data,
    isLoading: query?.isLoading,
    error: query?.error,
  }));

  return { data, isLoading, error } as {
    data: Array<{
      categoryId: unknown;
      data: unknown;
      isLoading: boolean;
      error: unknown;
    }>;
    isLoading: boolean;
    error: unknown;
  };
};

export const useGetAllProducts = (
  filters: Record<string, unknown>
): QueryType => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get_all_products", JSON.stringify(filters)],
    queryFn: async () => {
      const response = await apiClient.get("/products/home", {
        params: filters,
      });
      return response.data;
    },
  });

  return { data, isLoading, error };
};

export const useGetProductDetails = (id: string): QueryType => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["get_product_details", id],
    queryFn: async () => {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    },
  });

  if (!id) navigate("/");
  return { data, isLoading, error };
};

export const useGetRelatedProducts = (): QueryType => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) navigate("/");

  const { data, isLoading, error } = useQuery({
    queryKey: ["get_related_products", id],
    queryFn: async () => {
      const response = await apiClient.get(`/products/related/${id}`);
      return response.data;
    },
  });

  return { data, isLoading, error };
};
