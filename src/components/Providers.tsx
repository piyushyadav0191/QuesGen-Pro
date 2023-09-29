"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";
import { jokes } from "@/lib/jokes";

const getRandomJoke = () => {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  return jokes[randomIndex];
};

const queryClient = new QueryClient();

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  const { toast } = useToast();
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
      toast({
        title: "Joke of the day",
        description: getRandomJoke(),
        duration: 10000,
      });
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
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
