import { UserOrderContext } from '@/context';
import { Order } from '@/types';
import { useEffect, useState } from 'react';

export const YourOrdersPage = () => {
  const { getAllOrders } = UserOrderContext();
  const [allOrders, setAllOrders] = useState<Order[] | undefined>(undefined);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getAllOrders();
      setAllOrders(orders);
      console.log('Fetched orders:', orders);
    };
    fetchOrders();
  }, [getAllOrders]);

  if (allOrders === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-sans p-6 bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-600 min-h-screen">
      <h1 className="text-center text-yellow-900 text-3xl font-extrabold mb-8">
        Your Orders
      </h1>
      {allOrders.length === 0 ? (
        <p className="text-center text-gray-700 text-lg font-medium">
          You have no orders.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allOrders
            .filter(
              (order) =>
                !(order.status === 'pending' && order.items.length === 0)
            )
            .sort((a, b) =>
              a.status === 'pending' ? -1 : b.status === 'pending' ? 1 : 0
            )
            .map((order) => (
              <li
                key={order.id}
                className={`p-6 border-2 rounded-lg shadow-lg relative transition-transform transform hover:scale-105 ${
                  order.status === 'pending'
                    ? 'border-red-600 border-3 bg-gradient-to-br from-gray-100 to-gray-380 text-white'
                    : 'border-gray-700 border-3 bg-gradient-to-br from-gray-250 to-gray-100'
                }`}
              >
                {order.status === 'pending' && (
                  <span className="absolute top-2 right-2 bg-red-100 text-red-800 font-bold text-xs px-2 py-1 rounded-full">
                    Pending
                  </span>
                )}
                {order.status === 'done' && (
                  <span className="absolute top-2 right-2 bg-green-100 text-green-800 font-bold text-xs px-2 py-1 rounded-full">
                    Done
                  </span>
                )}
                <p className="text-black">Order</p>
                <ul className="list-disc pl-5 text-gray-700">
                  {order.items.map((item) => (
                    <li key={item.productId} className="mb-1">
                      {item.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-800 mt-4 text-right">
                  <span className="block">
                    <strong>Total:</strong>
                  </span>
                  <span className="block text-yellow-900 font-extrabold text-xl">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </p>
              </li>
            ))}
        </ul>
      )}
      <div className="fixed bottom-0 left-0 w-full bg-white text-yellow-700 text-center py-4 shadow-lg px-6 rounded-t-lg mt-8">
        <strong className="text-lg">Total of All Orders:</strong>{' '}
        <span className="text-yellow-900 font-extrabold text-xl">
          $
          {allOrders
            .reduce((sum, order) => sum + order.totalAmount, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
};
