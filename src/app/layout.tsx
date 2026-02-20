import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Management System",
  description: "A simple test management system for teachers and students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
