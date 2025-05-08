import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/UI/Header";
import Footer from "@/app/UI/Footer"
import Docs from "./UI/Docs";
import MiniHeader from "./UI/miniHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gadget Shop",
  description: "Your tech plug",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
        {/* <MiniHeader/> */}
        {children}
        <Docs/>
        <Footer/>
      </body>
    </html>
  );
}
