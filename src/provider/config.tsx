import { useEffect } from "react";
import { useGetConfig } from "@/api/queries/useGetConfig";
import { useGetTranslations } from "@/api/queries/useLanguage";
import { AnimationLoading } from "@/components/common/animation-loading";
import { ConfigContext, type ConfigType } from "@/hooks/useConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTranslations } from "@/redux/slice/translateSlice";
import { getConfig } from "@/helper";
import { updatePrimaryColor } from "@/lib/chroma";

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetConfig();
  const {
    data: transData,
    error: translationsError,
    isLoading: isTranslationsLoading,
  } = useGetTranslations();

  useEffect(() => {
    if (!isTranslationsLoading && transData) {
      const translations = transData?.translations || transData?.fallback || {};
      dispatch(setTranslations(translations));
    }
  }, [transData, dispatch, isTranslationsLoading]);

  const config = data?.data as ConfigType[];
  const primaryColor = getConfig(config, "base_color")?.value;

  useEffect(() => {
    if (primaryColor && typeof primaryColor === "string") {
      updatePrimaryColor(primaryColor);
    }
  }, [primaryColor]);

  if (error || translationsError) navigate("/error");

  if (isLoading || isTranslationsLoading) {
    return (
      <main className="flex items-center justify-center h-screen w-full">
        <AnimationLoading />
      </main>
    );
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};
