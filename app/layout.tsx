import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const siteDescription =
  "Frontend and full-stack JavaScript developer in the Netherlands building clean, responsive, high-performance web applications.";

export const metadata: Metadata = {
  title: {
    default: "Serhii Kharyponchuk — Frontend & Full Stack JavaScript Developer",
    template: "%s — Serhii Kharyponchuk",
  },
  description: siteDescription,
  keywords: [
    "Serhii Kharyponchuk",
    "Frontend Developer Netherlands",
    "Full Stack JavaScript Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
  ],
  authors: [{ name: "Serhii Kharyponchuk" }],
  creator: "Serhii Kharyponchuk",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Serhii Kharyponchuk — Frontend & Full Stack JavaScript Developer",
    description: siteDescription,
    siteName: "Serhii Kharyponchuk",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serhii Kharyponchuk — JavaScript Developer",
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080b" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Serhii Kharyponchuk",
    url: origin,
    jobTitle: "Frontend & Full Stack JavaScript Developer",
    address: { "@type": "PostalAddress", addressCountry: "NL" },
    knowsLanguage: ["English", "Ukrainian", "Russian", "Dutch"],
    knowsAbout: ["React", "TypeScript", "JavaScript", "Node.js", "Express.js", "PostgreSQL"],
    description: siteDescription,
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={origin} />
        <meta property="og:image" content={`${origin}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Serhii Kharyponchuk, frontend and full-stack JavaScript developer" />
        <meta name="twitter:image" content={`${origin}/og.png`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
