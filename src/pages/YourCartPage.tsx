import { UserOrderContext } from '@/context';
import { Item } from '@/types';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export const YourCartPage = () => {
  const { order, removeItem } = UserOrderContext();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen pb-4 px-2 sm:px-4">
      <div className="p-4 bg-gray-100 min-h-screen pb-14">
        {order?.items.map((item: Item) => (
          <div
            key={item.productId}
            className="bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center bg-white overflow-hidden mb-4 p-4 gap-4"
          >
            <div className="w-full sm:w-[120px] h-[200px] flex-shrink-0 ">
              <img
                src={
                  'https://www.kfc-suisse.ch/fileadmin/_processed_/1/f/csm_webseite_desktop-classic-zinger_ca8e21bb94.jpg'
                }
                className="rounded-lg w-full h-full object-cover"
                alt={item.name}
              />
            </div>
            <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between w-full">
              <div className="flex-3 w-full sm:w-auto">
                <h2 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">
                  Price: <span className="font-medium">${item.price}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
              </div>
              <div className="text-right w-full sm:w-auto flex-1">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Subtotal:
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="mt-2">
                  <div className="relative group inline-block">
                    <Trash2
                      className="text-red-500 cursor-pointer transition-colors duration-200 group-hover:text-red-700"
                      size={22}
                      onClick={() => removeItem(item.productId)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="fixed bottom-0 left-0 w-full flex justify-between items-center bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-t-lg shadow-sm">
          <span className="text-gray-700 font-medium">Total Amount:</span>
          <span className="text-xl font-bold text-gray-900">
            ${order?.totalAmount.toFixed(2) || 0}
          </span>
          <Button
            className="ml-4 bg-violet-500 text-white shadow-lg"
            onClick={() => navigate('/payment')}
          >
            Sfinalizuj zamówienie
          </Button>
        </div>
      </div>
    </div>
  );
};
