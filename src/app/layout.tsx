import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Roseg Seguridad Industrial | Ropa Corporativa, EPP y Bordado Industrial",
  description:
    "Soluciones integrales en seguridad industrial: ropa corporativa, elementos de protección personal, bordado y estampado industrial. La Calera, Chile.",
  keywords: [
    "seguridad industrial",
    "ropa corporativa",
    "EPP",
    "bordado industrial",
    "estampado",
    "calzado de seguridad",
    "Roseg",
    "La Calera",
    "Chile",
  ],
  authors: [{ name: "Roseg Seguridad Industrial" }],
  icons: {
    icon: "/images/logo-optimized.png",
    apple: "/images/logo-optimized.png",
  },
  openGraph: {
    title: "Roseg Seguridad Industrial",
    description:
      "Ropa corporativa, EPP y bordado industrial. Cotiza por WhatsApp.",
    url: "https://rosegseguridad.cl",
    siteName: "Roseg Seguridad Industrial",
    type: "website",
    locale: "es_CL",
    images: [
      {
        url: "/images/logo-optimized.png",
        width: 300,
        height: 300,
        alt: "Roseg Seguridad Industrial",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Roseg Seguridad Industrial",
    description: "Ropa corporativa, EPP y bordado industrial.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}