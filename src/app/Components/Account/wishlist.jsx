'use client'
import Sidebar from "./Sidebar";
import Wishlist from "@/app/pages/wishlist/page";

export default function WishlistPage() {

  return (
    <div className="flex gap-4 px-4 md:px-8 py-6">
      {/* <Sidebar /> */}
      <div className="flex-1">
        <Wishlist/>
      </div>
    </div>
  );
}
