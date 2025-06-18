'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { User, Heart, Ticket, LogOut } from 'lucide-react'; // NEW: Added LogOut icon

import { AccountDetails } from "../../Components/Account/AccountDetails";
import Voucher from "@/app/Components/Account/Voucher"; 
import { AccountWishlist } from '../../Components/accountWishlist/wishlist';

// --- UPDATED Sidebar Component ---
// I've recreated your Sidebar here to add the logout functionality.
const Sidebar = ({ selectedTab, onTabChange, onLogout }) => {
    const tabs = [
        { id: "accountdetails", label: "Account Details", icon: <User /> },
        { id: "wishlist", label: "Wishlist", icon: <Heart /> },
        { id: "voucher", label: "Voucher", icon: <Ticket /> },
    ];

    return (
        <div className="w-64 max-sm:w-24 bg-gray-50 p-4 flex flex-col border-r">
            <div className="flex-grow">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`w-full flex items-center gap-3 p-3 my-1 rounded-lg text-left text-sm font-medium transition-colors ${
                            selectedTab === tab.id
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'text-gray-600 hover:bg-blue-100'
                        }`}
                    >
                        {tab.icon}
                        <span className="max-sm:hidden">{tab.label}</span>
                    </button>
                ))}
            </div>
            {/* --- NEW: Logout Button --- */}
            <div className="mt-auto">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 p-3 my-1 rounded-lg text-left text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                >
                    <LogOut />
                    <span className="max-sm:hidden">Logout</span>
                </button>
            </div>
        </div>
    );
};


// --- Main Account Page Component ---
const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("accountdetails");
  const router = useRouter();
  const queryClient = useQueryClient(); // Get the query client instance

  // --- NEW: Logout Handler Function ---
  const handleLogout = () => {
    // 1. Show a confirmation alert
    if (window.confirm("Are you sure you want to log out?")) {
        // 2. Clear the user's authentication token
        localStorage.removeItem('authToken');

        // 3. Invalidate all queries to clear cached user data (like cart/wishlist)
        queryClient.invalidateQueries();
        
        // 4. Show a success notification
        toast.success("You have been logged out successfully.");

        // 5. Redirect to the home page
        router.push('/home');
    }
  };

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
        
        {/* Pass the handleLogout function as a prop to the Sidebar */}
        <Sidebar 
            selectedTab={activeTab} 
            onTabChange={setActiveTab} 
            onLogout={handleLogout} 
        />
        
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h1 className="text-3xl max-sm:text-2xl font-semibold py-4">Account Overview</h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;