"use client";

import * as React from "react";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { Toaster } from "react-hot-toast";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      <Toaster position="top-center" reverseOrder={false} />
      <Provider store={store}>{children}</Provider>
    </NextThemesProvider>
  );
}
