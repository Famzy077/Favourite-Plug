'use client';
import { useState } from "react";
import Sidebar from '@/app/Components/Account/Sidebar';
import { AccountDetails } from "../../Components/Account/AccountDetails";
import Voucher from "@/app/Components/Account/Voucher"; 
import { AccountWishlist } from '../../Components/accountWishlist/wishlist';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("accountdetails");

  const renderContent = () => {
    switch (activeTab) {
      case "accountdetails":
        return <AccountDetails />;
      case "voucher":
        return <Voucher />;
      case "wishlist":
        return <AccountWishlist />;
      default:
        return <AccountDetails />;
    }
  };

  return (
    <div>
      <div className="flex gap-6 max-sm:gap-0 min-h-[85vh]">
        
        <Sidebar selectedTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h1 className="text-3xl max-sm:text-2xl font-semibold py-4">Acount Overview</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;