import { Heart, User } from 'lucide-react';
import { FaHeart, FaBoxOpen} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-[250px] bg-white shadow px-4 py-6">
        <div className='flex gap-2.5 items-center text-gray-700 '>
            <User size={25} className='' />
            <h3 className="text-blue-600 font-semibold">My Favorite Account</h3>
        </div>
        <div className='flex gap-2.5 items-center text-gray-700'>
            <FaBoxOpen size={25} />
            <h2>Voucher</h2>
        </div>
        <div className='flex gap-2.5 items-center text-gray-700'>
            <Heart size={25} />
            <h2>Wishlist</h2>
        </div>
    </div>
  );
};

export default Sidebar;
