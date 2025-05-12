import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {HeaderPage} from "@/app/UI/Header";
import { MobileBottomNav } from "@/app/UI/Header";
import Footer from "@/app/UI/Footer"
import Docs from "./UI/Docs";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderPage/>
        <MobileBottomNav/>
        {children}
        <Docs/>
        <Footer/>
      </body>
    </html>
  );
}
