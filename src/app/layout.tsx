import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#2d6a4f" },
		{ media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
	],
};

export const metadata: Metadata = {
	title: "Goethe A1 Phrasebook — Deutsch lernen",
	description:
		"14 essential topics for the Goethe A1 exam — real phrases, grammar tips, and natural fluency practice.",
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Deutsch Phrasebook",
	},
	openGraph: {
		title: "Deutsch Phrasebook — A1",
		description: "Learn German A1 phrases with Bengali translations",
		type: "website",
	},
	icons: [
		{ rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
		{ rel: "apple-touch-icon", url: "/icon-192.svg" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
				/>
				<link rel="manifest" href="/manifest.json" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
					}}
				/>
			</head>
			<body className="min-h-full flex flex-col">
				<main className="flex-1">{children}</main>
				<Footer />
				<script src="/api/register-sw" defer />
			</body>
		</html>
	);
}
