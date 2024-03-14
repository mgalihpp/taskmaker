import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextSessionProvider from "@/providers/NextAuthProvider";
import { config } from "@/config/title";
import { ThemeProvider } from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: `%s | ${config.title}`,
  },
  description: config.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="light" enableSystem attribute="class">
          <NextSessionProvider>{children}</NextSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
