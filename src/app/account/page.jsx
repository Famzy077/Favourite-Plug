'use client'
import Sidebar from '@/app/Components/Account/Sidebar';
import AddressBook from '@/app/Components/Account/AddressBook';
import { useState } from "react";
import AccountDetails from '@/app/Components/Account/AccountDetails.';
import { AccountWishlist } from '../Components/accountWishlist/wishlist';
import { HeaderPage, MobileBottomNav } from '../UI/Header';
import Footer from '../UI/Footer';
import Docs from '../UI/Docs';
// import Voucher from "./Voucher"; // Optional for now

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("wishlist");

  const renderContent = () => {
    switch (activeTab) {
      case "wishlist":
        return <AccountWishlist />;
      case "voucher":
        return <Voucher />;
      default:
        return <AccountDetails />;
    }
  };

  return (
    
    <div>
      <HeaderPage/>

      <div className="flex gap-6 max-sm:gap-0 min-h-[85vh]">
        <Sidebar selectedTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 bg-white p-4 rounded shadow">
          {renderContent()}
        </div>

      </div>
      <Docs/>
      <Footer/>
      <MobileBottomNav/>
    </div>
  );
};

export default AccountPage;
