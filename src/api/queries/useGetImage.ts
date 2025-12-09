import { useQueries } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import { getConfig } from "@/helper";
import { useConfig } from "@/hooks/useConfig";

export const useImageQuery = (ids: number[]) => {
  const queries = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["get_image", id],
      queryFn: async () => {
        const response = await apiClient.get(`/image-path/${id}`);
        return response.data;
      },
      enabled: !!id && ids.length > 0,
    })),
  });

  const data = queries?.map((query) => query?.data?.file_name) || [];
  const isLoading = queries?.some((query) => query?.isLoading) || false;
  const error = queries?.find((query) => query?.error)?.error || null;

  return { data, isLoading, error };
};

export const useGetBannerImages = () => {
  const config = useConfig();
  const images = getConfig(config, "home_slider_images")?.value;
  const links = getConfig(config, "home_slider_links")?.value;

  const banners = JSON.parse(images as string) || [];
  const bannerLinks = JSON.parse(links as string) || [];

  const { data, isLoading, error } = useImageQuery(banners);
  const combinedData =
    data?.map((image: string, index: number) => ({
      image,
      link: bannerLinks[index] || null,
    })) || [];

  return {
    error,
    banners,
    isLoading,
    bannerLinks,
    data: combinedData,
  };
};

export const useGetLogo = () => {
  const config = useConfig();
  const logo = getConfig(config, "header_logo")?.value;
  const id = JSON.parse(logo as string);

  const { data, isLoading } = useImageQuery([id]);

  return { data, isLoading };
};

export const useGetFavicon = () => {
  const config = useConfig();
  const favicon = getConfig(config, "site_icon")?.value;
  const id = JSON.parse(favicon as string);

  const { data, isLoading } = useImageQuery([id]);

  return { data, isLoading };
};
