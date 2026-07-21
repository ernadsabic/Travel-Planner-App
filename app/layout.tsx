import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://travel-planner-app-bay.vercel.app/"),

  title: {
    default: "Travel Planner | Plan Your Trips and Itineraries",
    template: "%s | Travel Planner",
  },

  description:
    "Explore new destinations, create detailed itineraries, and organize your next trip all in one place with Travel Planner.",

  keywords: [
    "travel planner",
    "trip planner",
    "travel itinerary",
    "vacation planner",
    "trip organization",
    "destinations",
  ],

  openGraph: {
    title: "Travel Planner | Plan Your Perfect Trip",
    description:
      "Create custom itineraries, manage expenses, and organize your travel destinations stress-free.",
    url: "https://travel-planner-app-bay.vercel.app/",
    siteName: "Travel Planner",
    images: [
      {
        url: "/og-img.png",
        width: 1200,
        height: 630,
        alt: "Travel Planner App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
