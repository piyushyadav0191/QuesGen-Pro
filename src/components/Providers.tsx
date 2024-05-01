"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { jokes } from "@/lib/jokes";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


const getRandomJoke = () => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
};

const queryClient = new QueryClient();

const Providers = ({ children, ...props }: ThemeProviderProps) => {

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 4 * 60 * 1000); // 4 minutes in milliseconds  4 * 60 * 1000

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (showToast) {
      toast.info(`Did you know? ${getRandomJoke()}`);
    }
  }, [showToast]);

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        {...props}
      >
        <SessionProvider>{children}
        <ProgressBar
        height="6px"
        color="#5BBCFF"
        options={{ showSpinner: false }}
        shallowRouting
      />
        
        </SessionProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
