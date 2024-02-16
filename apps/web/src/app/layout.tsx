import { Navbar } from "@repo/ui/navbar";

import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollegeBay",
  description:
    "This is a web app whose main focus is to provide an online marketplace for college students to buy and sell college-related materials. The platform is designed to make it easy for students to find what they need, sell what they don't, and connect with other students in the same college or university.",
};

const user = "null";

const navContent = user
  ? [
      { item: "Requested Items", link: "/requests" },
      { item: "Create Listing", link: "/create-post" },
      { item: "Create Request", link: "/create-request" },
    ]
  : [];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="container mx-auto px-4">
          <Navbar navItems={navContent} user={user} />

          {children}
        </div>
      </body>
    </html>
  );
}
