import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { UserOrderContext } from '@/context/OrderContext';
import { useNavigate } from 'react-router-dom';

export const ProductListPage = () => {
  const { addProduct } = UserOrderContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleAddProduct = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();
    addProduct(product);
    setPopupMessage(`Product "${product.name}" added to order!`);

    setTimeout(() => {
      setPopupMessage(null);
    }, 3000);
  };
  return (
    <div>
      {popupMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {popupMessage}
        </div>
      )}
      <div className="p-4">
        <Button
          variant="ghost"
          className="bg-white bg-opacity-75 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-lg shadow"
          onClick={handleBack}
        >
          ← Back
        </Button>
      </div>
      <div className="p-4 bg-gray-100 min-h-screen pb-14">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="shadow-lg rounded-lg bg-white mb-4 flex flex-col sm:flex-row sm:items-center overflow-hidden"
          >
            <div className="w-full sm:w-32 h-48 sm:h-24">
              <img
                src={product.imageUrl}
                className="w-full h-full object-cover"
                alt={product.name}
              />
            </div>

            <div className="flex flex-col justify-between p-4 flex-1">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h2>
              <div className="flex sm:block justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Price:</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={(event) => handleAddProduct(event, product)}
                  className="mt-2 sm:mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
                >
                  Add to Order
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
