import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Munich Bike Watch | Stolen Bike Registry",
  description: "Police software for tracking and managing stolen bike cases in the Munich area. Powered by BikeIndex API.",
  keywords: ["stolen bikes", "Munich", "bike theft", "police", "bike registry"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
