import { Geist, Geist_Mono } from "next/font/google";
import PageProvider from "./page";
import { HeaderPage, MobileBottomNav } from "../UI/Header";
import Footer from "../UI/Footer";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Favorite Plug",
  description: "Favorite your tech plug",
};

export default function PageLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PageProvider>
          <HeaderPage />
          {children}
          <MobileBottomNav />
          <Footer />
        </PageProvider>
      </body>
    </html>
  );
}