import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RaoofTech | IT & Cybersecurity Solutions",
    template: "%s | RaoofTech",
  },

  description:
    "RaoofTech provides modern IT, cybersecurity, web development and digital technology solutions for businesses.",

  keywords: [
    "RaoofTech",
    "IT Solutions",
    "Cybersecurity",
    "Web Development",
    "Technology",
    "IT Support",
    "Cyber Security",
  ],

  authors: [
    {
      name: "RaoofTech",
    },
  ],

  creator: "RaoofTech",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "RaoofTech | IT & Cybersecurity Solutions",
    description:
      "Modern IT, cybersecurity and digital technology solutions for businesses.",
    type: "website",
    siteName: "RaoofTech",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}