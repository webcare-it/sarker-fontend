import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SeoProvider } from "./seo";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/query-client";
import { persistor, store } from "../redux/store";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { ConfigProvider } from "./config";
import { AuthProvider } from "./auth";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <ConfigProvider>
                <AuthProvider>
                  <SeoProvider>
                    <Toaster />
                    <div id="modal" />
                    {children}
                  </SeoProvider>
                </AuthProvider>
              </ConfigProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
};
