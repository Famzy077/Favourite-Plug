'use client';
import { usePathname } from 'next/navigation';
import { HeaderPage, MobileBottomNav } from "@/app/UI/Header";
import Footer from "@/app/UI/Footer";
import Docs from "@/app/UI/Docs";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === pathname ===  '/pages/login' || '/pages/signup' || pathname === '/pages/verify';

  return (
    <>
      {!isAuthPage && <HeaderPage />}
      {!isAuthPage && <MobileBottomNav />}
      {children}
      {!isAuthPage && <Docs />}
      {!isAuthPage && <Footer />}
    </>
  );
}