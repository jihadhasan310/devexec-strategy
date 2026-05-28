import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devexec-strategy.vercel.app"),
  title: "Devexec Strategy — Engineering the Future. Executing at Scale.",
  description:
    "Devexec Strategy builds AI systems, cloud architectures, blockchain protocols, and SaaS platforms engineered for scale. Partner with us to build what's next.",
  keywords: [
    "AI development",
    "cloud infrastructure",
    "blockchain",
    "SaaS development",
    "automation",
    "machine learning",
    "DevOps",
    "Web3",
  ],
  authors: [{ name: "Devexec Strategy" }],
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    title: "Devexec Strategy — Engineering the Future. Executing at Scale.",
    description:
      "AI systems, cloud architectures, blockchain protocols, and SaaS platforms — engineered for scale.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devexec Strategy",
    description: "Engineering the Future. Executing at Scale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
