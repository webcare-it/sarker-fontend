import { useSelector } from "react-redux";
import type { RootStateType } from "@/redux/store";

export const useTranslation = () => {
  const translateState = useSelector((state: RootStateType) => state.translate);

  const getTranslation = (key: string): string => {
    if (!translateState?.translations) return key;

    return translateState?.translations?.[key] || key;
  };

  const t = new Proxy({} as Record<string, string>, {
    get: (_target, prop: string) => {
      if (typeof prop === "string") {
        return getTranslation(prop);
      }
      return prop;
    },
  });

  return {
    t,
    getTranslation,
    translations: translateState?.translations || {},
  };
};
