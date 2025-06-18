'use client'
import { Heart, User } from "lucide-react";
import { FaBoxOpen } from "react-icons/fa";

const Sidebar = ({ selectedTab, onTabChange }) => {
  return (
    <div className="w-[250px] max-sm:w-[4em] bg-white shadow px-4 py-6 space-y-4 sticky top-0 h-full">
      <button
        className={`flex gap-2.5 items-center text-left w-full px-1 py-2 rounded ${
          selectedTab === "AccountDetails" ? "bg-blue-100 text-blue-600" : "text-gray-700"
        }`}
        onClick={() => onTabChange("AccountDetails")}
      >
        <User size={25} />
        <h3 className="text-blue-600 font-semibold max-sm:hidden">My Favorite Account</h3>
      </button>
      <button
        className={`flex gap-2.5 items-center text-left w-full px-1 py-2 rounded ${
          selectedTab === "wishlist" ? "bg-blue-100 text-blue-600" : "text-gray-700"
        }`}
        onClick={() => onTabChange("wishlist")}
      >
        <Heart size={20} />
        <h2 className="max-sm:hidden">Wishlist</h2>
      </button>

      <button
        className={`flex gap-2.5 items-center text-left w-full px-1 py-2 rounded ${
          selectedTab === "voucher" ? "bg-blue-100 text-blue-600" : "text-gray-700"
        }`}
        onClick={() => onTabChange("voucher")}
      >
        <FaBoxOpen size={20} />
        <h2 className="max-sm:hidden">Voucher</h2>
      </button>
    </div>
  );
};

export default Sidebar;