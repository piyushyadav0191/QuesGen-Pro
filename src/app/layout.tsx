import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import FlareCursor from "@/components/Flarecursor";
import { Toaster} from 'sonner'

const inter = Poppins({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "QuesGen Pro",
  description:
    "Welcome to QuesGen Pro, where knowledge meets assessment! Seamlessly submit your multiple-choice questions, challenge others with your quizzes, and receive instant, insightful results. Empowering learning and curiosity, our platform makes testing your knowledge a rewarding journey.rated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "bg-white dark:bg-gray-900  min-h-screen pt-6"
        )}
      >
        <Providers>
          <Navbar />
          <FlareCursor />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
