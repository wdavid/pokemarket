"use client";
import "./globals.css";
import Navbar from "../components/Navbar";
import { metadata } from "./metadata";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import React from "react";
import { usePathname } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/auth");

  return (
    <html lang="es">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="viewport" content={metadata.viewport} />
        <meta name="robots" content={metadata.robots} />
        <link rel="icon" href={metadata.icons.icon} type="image/x-icon" />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta name="theme-color" content={metadata.themeColor} />
      </head>
      <body className="bg-background-primary dark:bg-black font-Nunito-sans">
        <AuthProvider>
          <CartProvider>
            {!hideNavbar && <Navbar />}
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
