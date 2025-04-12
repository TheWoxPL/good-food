import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserOrderContext } from '@/context';
import { Product } from '@/types';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const { addProduct } = UserOrderContext();

  const [product, setProduct] = useState<Product>();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      const productRef = doc(db, 'products', productId);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        const productData = productSnap.data();
        setProduct({
          id: productId,
          name: productData.name,
          price: productData.price,
          restaurantId: productData.restaurantId,
          imageUrl: productData.imageUrl,
          description: productData.description,
        });
      }
    };

    fetchProduct();
  }, [productId]);

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
    <div className="flex flex-col h-screen bg-gray-100">
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
      <div className="relative bg-gray-200 border border-gray-300 rounded-lg m-4 p-4 shadow-md">
        <img
          src={product?.imageUrl}
          alt={product?.name}
          className="w-1/1 h-auto mx-auto object-cover rounded-lg"
        />
      </div>

      <Card className="flex-1 bg-orange-100 text-gray-800 rounded-t-2xl p-4 sm:p-6 border-t border-gray-300 ml-4 mr-4 p-4">
        <CardContent>
          <h2 className="font-bold text-xl sm:text-2xl mb-4">
            {product?.name}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            {product?.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-0">
              {product?.price}$
            </span>
            <Button
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg"
              onClick={(event) => product && handleAddProduct(event, product)}
            >
              Add to Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
