import { useEffect, useState } from 'react';
import {
  User,
  ShoppingCart,
  Store,
  Package,
  LogOut,
  Pizza,
  PhoneCall,
  Headset,
} from 'lucide-react';
import { UserAuth } from '@/context';
import { useNavigate } from 'react-router';

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  const [selfVisibility, setSelfVisibility] = useState(isVisible);
  const { user, signOut } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setSelfVisibility(isVisible);
  }, [isVisible]);

  return (
    <>
      {selfVisibility && (
        <div
          className="fixed w-full h-screen z-1 backdrop-blur-xs bg-black/10"
          onClick={() => {
            setSelfVisibility(false);
            onClose();
          }}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full z-50 w-70 bg-gray-800 text-white transform ${
          selfVisibility ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="space-y-4 flex-grow">
            <div className="flex items-center space-x-4 border-b border-gray-700 pb-4">
              <User className="w-10 h-10 text-white p-1 border-2 border-white rounded-xl" />
              <div>
                <p className="text-white font-semibold">{user?.displayName}</p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <span className="block px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer flex items-center space-x-2">
                <Pizza className="w-5 h-5" />
                <span onClick={() => navigate('product-list')}>Meals</span>
              </span>
              <span
                className="block px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
                onClick={() => navigate('/restaurants')}
              >
                <Store className="w-5 h-5" />
                <span>Restaurants</span>
              </span>
              <span
                className="block px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
                onClick={() => navigate('/your-orders')}
              >
                <Package className="w-5 h-5" />
                <span>Orders</span>
              </span>
              <span
                className="block px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer flex items-center space-x-2"
                onClick={() => navigate('/your-cart')}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Your Cart</span>
              </span>

              <span
                className="block px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer flex items-center space-x-2"
                onClick={() => navigate('/about')}
              >
                <User className="w-5 h-5" />
                <span>About Us</span>
              </span>
              <span
                className="block px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer flex items-center space-x-2"
                onClick={() => navigate('/support-contact')}
              >
                <Headset className="w-5 h-5" />
                <span>Support Contact</span>
              </span>
              <span className="block px-4 py-2 rounded-lg hover:bg-gray-600 cursor-pointer flex items-center space-x-2">
                <PhoneCall className="w-5 h-5" />
                <span>
                  <a href="tel:+000000000" className="btn">
                    Call Us
                  </a>
                </span>
              </span>
            </div>
          </div>
          <div className="mt-auto">
            <button
              className="w-full text-center text-red-500 hover:underline bg-gray-700 p-2 rounded-2xl"
              onClick={() => signOut()}
            >
              <LogOut className="w-5 h-5 inline-block mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
