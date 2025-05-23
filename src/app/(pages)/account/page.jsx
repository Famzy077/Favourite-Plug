// 'use client'
// import Sidebar from '@/app/Components/Account/Sidebar';
// import AddressBook from '@/app/Components/Account/AddressBook';
// import { useState } from "react";
// import { AccountDetail } from '../Components/Account/AccountDetails';
// import { AccountWishlist } from '../Components/accountWishlist/wishlist';
// import { HeaderPage, MobileBottomNav } from '../UI/Header';
// import Footer from '../UI/Footer';
// import Docs from '../UI/Docs';
// // import Voucher from "./Voucher"; // Optional for now

// const AccountPage = () => {
//   const [activeTab, setActiveTab] = useState("accountdetails");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "accountdetails":
//         return <AccountDetail />;
//       case "voucher":
//         return <Voucher />; 
//       default:
//         return <AccountWishlist />;
//     }
//   };

//   return (
    
//     <div>
//       <HeaderPage/>

//       <div className="flex gap-6 max-sm:gap-0 min-h-[85vh]">
//         <Sidebar selectedTab={activeTab} onTabChange={setActiveTab} />
//         <div className="flex-1 bg-white p-4 rounded shadow">
//           {renderContent()}
//         </div>

//       </div>
//       <Docs/>
//       <Footer/>
//       <MobileBottomNav/>
//     </div>
//   );
// };

// export default AccountPage;


'use client';

import { useState } from "react";
import Sidebar from '@/app/Components/Account/Sidebar';
import AddressBook from '@/app/Components/Account/AddressBook';
import { AccountDetails } from "../../Components/Account/AccountDetails";
// import Voucher from '@/app/Components/Account/Voucher'; 
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
      case "address":
        return <AddressBook />;
      default:
        return <AccountDetails />;
    }
  };

  return (
    <div>
      <div className="flex gap-6 max-sm:gap-0 min-h-[85vh]">
        <Sidebar selectedTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 bg-white p-4 rounded shadow">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
