import { TailwindIndicator } from "@/components/util/TailwindIndicator";

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Elevate",
  description: "Elevate your business with our services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={`${outfit.variable} font-sans`}>
        <TailwindIndicator />
        {children}
      </body>
    </html>
  );
}
