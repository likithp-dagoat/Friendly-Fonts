import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "FriendlyFonts — Your handwriting, turned into a font",
  description:
    "FriendlyFonts turns your personal handwriting into a polished, installable font. Sign forms, brand your startup, and write more personally.",
  metadataBase: new URL("https://friendlyfonts.example"),
  openGraph: {
    title: "FriendlyFonts — Your handwriting, turned into a font",
    description:
      "Turn your handwriting into a polished font for brand, docs, and more.",
    url: "https://friendlyfonts.example",
    siteName: "FriendlyFonts",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "FriendlyFonts preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FriendlyFonts — Your handwriting, turned into a font",
    description:
      "Turn your handwriting into a polished font for brand, docs, and more.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


