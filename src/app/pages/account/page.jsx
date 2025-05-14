'use client'
import Sidebar from '@/app/Components/Account/Sidebar';
import AddressBook from '@/app/Components/Account/AddressBook';
import { useState } from "react";
import AccountDetails from '@/app/Components/Account/AccountDetails.';
import Wishlist from "@/app/Components/Account/wishlist";
// import Voucher from "./Voucher"; // Optional for now

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("wishlist");

  const renderContent = () => {
    switch (activeTab) {
      case "wishlist":
        return <Wishlist />;
      case "voucher":
        return <Voucher />;
      default:
        return <AccountDetails />;
    }
  };

  return (
    <div className="flex gap-6 min-h-[85vh]">
      <Sidebar selectedTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 bg-white p-4 rounded shadow">
        {renderContent()}
      </div>

    </div>
  );
};

export default AccountPage;
