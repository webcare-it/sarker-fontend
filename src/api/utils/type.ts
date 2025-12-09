export interface MutationType {
  mutate: (
    data: unknown,
    options?: {
      onSuccess?: (res: { result: boolean; message: string }) => void;
      onError?: (error: unknown) => void;
    }
  ) => void;
  isPending: boolean;
}

export interface QueryType {
  data: {
    data?: unknown;
  };
  error: unknown;
  isLoading: boolean;
}

export interface WithoutDataMutationType {
  mutate: () => void;
  isPending: boolean;
}
