import { useMutation } from "@tanstack/react-query";
import { apiErrorHandler } from "../utils/error";
import { apiClient } from "@/lib/api-client";
import { toast } from "react-hot-toast";
import type { MutationType, WithoutDataMutationType } from "../utils/type";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCartFn } from "@/redux/slice/cartSlice";
import { clearWishlistFn } from "@/redux/slice/wishlistSlice";

export const useSignInMutation = (): MutationType => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["auth_signin"],
    mutationFn: async (data: unknown) => {
      const response = await apiClient.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (res) => {
      if (res?.result && res?.access_token) {
        localStorage.removeItem("guest_user_id");
        toast.success("Sign in successful");
        localStorage.setItem("token", res?.access_token);
        localStorage.setItem("user_id", res?.user?.id);
        navigate("/");
      }
    },
    onError: (error) => {
      return apiErrorHandler(error);
    },
  });

  return { mutate, isPending };
};

export const useSignUpMutation = (): MutationType => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["auth_signup"],
    mutationFn: async (data: unknown) => {
      const response = await apiClient.post("/auth/signup", data);
      return response.data;
    },
    onSuccess: (res) => {
      if (res?.result) {
        toast.success("Sign up successful! Please login to continue");
      }
    },
    onError: (error) => {
      return apiErrorHandler(error);
    },
  });

  return { mutate, isPending };
};

export const useSignOutMutation = (): WithoutDataMutationType => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationKey: ["auth_signout"],
    mutationFn: async () => {
      const response = await apiClient.get("/auth/logout");
      return response.data;
    },
    onSuccess: (res) => {
      if (res?.result) {
        toast.success("Sign out successful");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        dispatch(clearCartFn());
        dispatch(clearWishlistFn());
        navigate("/");
      }
    },
    onError: (error) => {
      return apiErrorHandler(error);
    },
  });

  return { mutate, isPending };
};

export const useSocialSignInMutation = (): MutationType => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["auth_social_signin"],
    mutationFn: async (data: unknown) => {
      const response = await apiClient.post("/auth/social-login", data);
      return response.data;
    },
    onSuccess: (res) => {
      if (res?.result && res?.access_token) {
        localStorage.removeItem("guest_user_id");
        localStorage.setItem("user_id", res?.user?.id);
        toast.success("Social Sign in successful");
        localStorage.setItem("token", res?.access_token);
        navigate("/");
      }
    },
    onError: (error) => {
      return apiErrorHandler(error);
    },
  });

  return { mutate, isPending };
};
