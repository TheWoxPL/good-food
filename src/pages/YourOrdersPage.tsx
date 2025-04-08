import { UserOrderContext } from '@/context';
import { Order } from '@/types';
import { useEffect, useState } from 'react';

export const YourOrdersPage = () => {
  const { getAllOrders } = UserOrderContext();
  const [allOrders, setAllOrders] = useState<Order[] | undefined>(undefined);

  useEffect(() => {
    const fetchOrders = async () => {
      // Replace with actual user ID
      const orders = await getAllOrders();
      setAllOrders(orders);
      console.log('Fetched orders:', orders);
    };
    fetchOrders();
  }, [getAllOrders]);

  if (allOrders === undefined) {
    return <div></div>;
  }

  return (
    <div className="font-sans p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 min-h-screen">
      <h1 className="text-center text-yellow-900 text-2xl font-bold mb-5">
        Your Orders
      </h1>
      {allOrders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders.</p>
      ) : (
        <ul className="list-none p-0 pb-20">
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
                className={`mb-5 p-4 border-2 rounded-lg shadow-md relative ${
                  order.status === 'pending'
                    ? 'border-yellow-700 bg-yellow-600 text-white'
                    : 'border-yellow-700 bg-white'
                }`}
              >
                {order.status === 'pending' && (
                  <span className="absolute top-2 right-2 text-red-800 font-bold text-normal">
                    Pending
                  </span>
                )}
                <p className="text-gray-600 mb-2">
                  <strong>Items:</strong>
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                  {order.items.map((item) => (
                    <li key={item.productId} className="mb-1">
                      <strong className="text-yellow-800">Quantity:</strong>
                      {item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 mt-3 text-right">
                  <span className="block">
                    <strong>Total:</strong>
                  </span>
                  <span className="block text-yellow-900 font-bold text-lg">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </p>
              </li>
            ))}
        </ul>
      )}
      <div className="fixed bottom-0 left-0 w-full bg-white text-yellow-700 text-center py-3 shadow-lg px-4 rounded-t-lg mt-5">
        <strong>Total of All Orders:</strong> $
        {allOrders
          .reduce((sum, order) => sum + order.totalAmount, 0)
          .toFixed(2)}
      </div>
    </div>
  );
};
