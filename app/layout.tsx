import type { Metadata } from "next";
import "./base.css";
import "./components.css";
import "./slots.css";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  metadataBase: new URL("https://stride-black-tau.vercel.app"),
  title: "Stride — Running Recovery · Hecho en México",
  description:
    "Stride: recuperación para atletas de resistencia. La fórmula 3:2 de carbohidratos y proteína, respaldada por la ciencia. Hecho en México.",
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
