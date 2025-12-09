import { useMutation } from "@tanstack/react-query";
import { apiErrorHandler } from "../utils/error";
import { apiClient } from "@/lib/api-client";
import type { MutationType } from "../utils/type";
import { toast } from "react-hot-toast";
import { revalidateQueryFn } from "@/lib/query-client";

export const useCouponApplyMutation = (): MutationType => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["coupon_apply"],
    mutationFn: async (data: unknown) => {
      const response = await apiClient.post("/coupon-apply", data);
      return response.data;
    },
    onSuccess: (res) => {
      if (res) {
        toast.success("Coupon applied successfully");
        revalidateQueryFn("get_cart_summary");
      }
    },
    onError: (error) => {
      return apiErrorHandler(error);
    },
  });

  return { mutate, isPending };
};

export const useCouponRemoveMutation = (): MutationType => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["coupon_remove"],
    mutationFn: async (data: unknown) => {
      const response = await apiClient.post("/coupon-remove", data);
      return response.data;
    },
    onSuccess: (res) => {
      if (res) {
        toast.success("Coupon removed successfully");
        revalidateQueryFn("get_cart_summary");
      }
    },
    onError: (error) => {
      return apiErrorHandler(error);
    },
  });

  return { mutate, isPending };
};
