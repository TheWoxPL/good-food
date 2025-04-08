import { UserOrderContext } from '@/context';
import { Item } from '@/types';

export const YourCartPage = () => {
  const { order, removeItem } = UserOrderContext();

  return (
    <div>
      <div className="p-4 bg-gray-100 min-h-screen mb-10">
        {order?.items.map((item: Item) => (
          <div
            key={item.productId}
            className="shadow-lg rounded-lg flex items-center bg-white mb-4"
          >
            <div className="w-30 h-20 mr-4 min-h-[120px]">
              <img
                src={
                  'https://www.kfc-suisse.ch/fileadmin/_processed_/1/f/csm_webseite_desktop-classic-zinger_ca8e21bb94.jpg'
                }
                className="rounded-l-lg w-full h-full object-cover"
                alt={item.name}
              />
            </div>
            <div className="flex-1 ">
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
            <div className="text-right pr-4">
              <div className="mb-2">
                <button
                  className="text-red-500 font-bold bg-red-100 rounded-[20px] px-3 py-1 text-[14px] transition-transform transform hover:scale-105 active:scale-95"
                  onClick={() => removeItem(item.productId)}
                >
                  remove
                </button>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Subtotal:</p>
                <p className="text-lg font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="fixed bottom-0 left-0 w-full flex justify-between items-center bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-t-lg shadow-sm">
          <span className="text-gray-700 font-medium">Total Amount:</span>
          <span className="text-xl font-bold text-gray-900">
            ${order?.totalAmount || 0}
          </span>
        </div>
      </div>
    </div>
  );
};
