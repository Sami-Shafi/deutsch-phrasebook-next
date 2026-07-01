import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#2d6a4f",
};

export const metadata: Metadata = {
  title: "Goethe A1 Phrasebook — Deutsch lernen",
  description: "14 essential topics for the Goethe A1 exam — real phrases, grammar tips, and natural fluency practice.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Deutsch Phrasebook" },
  openGraph: {
    title: "Deutsch Phrasebook — A1",
    description: "Learn German A1 phrases with Bengali translations",
    type: "website",
  },
  icons: [
    { rel: "icon", sizes: "192x192", url: "/icon-192.png" },
    { rel: "apple-touch-icon", url: "/icon-192.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-full">
        {children}
        <script src="/api/register-sw" defer />
      </body>
    </html>
  );
}
