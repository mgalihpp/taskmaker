import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextSessionProvider from "@/providers/NextAuthProvider";
import { config } from "@/config/title";

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
    <html lang="en">
      <body className={inter.className}>
        <NextSessionProvider>{children}</NextSessionProvider>
      </body>
    </html>
  );
}
