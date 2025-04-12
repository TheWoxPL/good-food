import { UserOrderContext } from '@/context';
import { Item, Product } from '@/types';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export const YourCartPage = () => {
  const { order, removeItem } = UserOrderContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data: Product[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        price: doc.data().price,
        restaurantId: doc.data().restaurantId,
        imageUrl: doc.data().imageUrl,
      }));
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 font-semibold">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-4 px-2 sm:px-4">
      <div className="p-4 fixed -top-2 -left-2">
        <Button
          variant="ghost"
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-lg shadow"
          onClick={handleBack}
        >
          ← Back
        </Button>
      </div>
      <div className="p-4 bg-gray-100 min-h-screen pb-14">
        {order.items.length === 0 ? (
          <p className="text-center text-gray-500 font-semibold">Cart empty</p>
        ) : (
          order.items.map((item: Item) => {
            const productImage = products.find(
              (product) => product.id === item.productId
            );

            return (
              <div
                key={item.productId}
                className="bg-white shadow-lg rounded-lg flex flex-col sm:flex-row items-center bg-white overflow-hidden mb-4 p-4 gap-4"
              >
                <div className="w-full sm:w-[120px] h-[200px] flex-shrink-0">
                  <img
                    src={productImage?.imageUrl}
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
                      Quantity:{' '}
                      <span className="font-medium">{item.quantity}</span>
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
            );
          })
        )}
        <div className="fixed bottom-0 left-0 w-full flex justify-between items-center bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-t-lg shadow-sm">
          <span className="text-gray-700 font-medium">Total Amount:</span>
          <span className="text-xl font-bold text-gray-900">
            ${order.totalAmount.toFixed(2) || 0}
          </span>
          <Button
            className={`ml-4 shadow-lg ${
              order.totalAmount > 0
                ? 'bg-violet-500 text-white'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            onClick={() => {
              if (order.totalAmount > 0) {
                navigate('/payment');
              }
            }}
            disabled={order.totalAmount <= 0}
          >
            Finalize Order
          </Button>
        </div>
      </div>
    </div>
  );
};
