import toast from "react-hot-toast";

interface ApiError {
  code?: string;
  message?: string;
  response?: {
    status?: number;

    data?: {
      errors?: string[];
      message?: string;
      userType?: string;
    };
  };
  request?: XMLHttpRequest;
}

export const apiErrorHandler = (error: unknown): void => {
  console.error("API ERROR:", error);

  const axiosError = error as ApiError;

  if (axiosError.code === "ERR_NETWORK" || !axiosError.response) {
    toast.error("Server is unavailable. Please try again later.");

    return;
  }

  if (axiosError.response?.status === 401) {
    if (axiosError.response.data?.userType === "admin") {
      return;
    } else {
      toast.error(
        axiosError.response?.data?.message ||
          "Session expired. Please log in again"
      );

      return;
    }
  }

  const errorMessages = axiosError.response?.data?.errors || [
    axiosError.response?.data?.message || "An error occurred",
  ];

  errorMessages.forEach((msg: string) => toast.error(msg));
};
