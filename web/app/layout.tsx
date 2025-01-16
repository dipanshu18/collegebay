import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Collegebay",
    template: "%s | Collegebay",
  },
  description:
    "An online marketplace for college students to buy and sell college-related materials. Connect with fellow students, save money, and contribute to a greener campus environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`antialiased ${roboto.className}`}>
      <body className="">
        {children}
        <Toaster visibleToasts={10} richColors position="top-right" />
      </body>
    </html>
  );
}
