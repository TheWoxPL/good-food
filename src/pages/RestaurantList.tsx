import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Product, Restaurant } from '@/types';
import { useNavigate } from 'react-router';
import { UserOrderContext } from '@/context/OrderContext';

export const RestaurantList = () => {
  const { order, addProduct } = UserOrderContext();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, 'restaurants'));
      const data: Restaurant[] = querySnapshot.docs.map((doc) => {
        const restaurantData = doc.data();
        return {
          id: doc.id,
          name: restaurantData.name,
          description: restaurantData.description,
        };
      });
      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  const handleSelect = async (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    const restaurantRefPath = `restaurants/${restaurant.id}`;

    const productsQuery = query(
      collection(db, 'products'),
      where('restaurantId', '==', restaurantRefPath)
    );
    const productsSnapshot = await getDocs(productsQuery);
    const data: Product[] = productsSnapshot.docs.map((doc) => {
      const productsData = doc.data();
      return {
        id: doc.id,
        name: productsData.name,
        price: productsData.price,
        restaurantId: productsData.restaurantId,
      };
    });
    setProducts(data);
  };

  const handleClose = () => {
    setSelectedRestaurant(undefined);
    setProducts([]);
  };

  const handleAddProduct = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    event.stopPropagation();
    addProduct(product);
  };

  return (
    <div className="flex flex-col min-h-screen mt-5">
      <div className="p-4 flex justify-center">
        <Input placeholder="Search" className="w-1/3" />
      </div>
      <div className="flex-1 overflow-auto p-4">
        {restaurants.map((restaurant) => (
          <Card key={restaurant.id} className="mb-4">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{restaurant.name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {restaurant.description}
                </p>
              </div>
              <Button
                variant="default"
                className="ml-5"
                onClick={() => handleSelect(restaurant)}
              >
                Select
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {selectedRestaurant.name} - Food List
            </h2>
            <ul className="mb-4">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center text-gray-700 mb-4 bg-gray-100 p-4 rounded-lg shadow"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src="src/assets/images/goodFood.png"
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-1">
                    <span className="block font-semibold">{product.name}</span>
                    <span className="block text-gray-500">
                      ${product.price}
                    </span>
                  </div>
                  <Button
                    variant="default"
                    className="ml-4 rounded-lg"
                    onClick={(event) => {
                      handleAddProduct(event, product);
                    }}
                  >
                    +
                  </Button>
                </li>
              ))}
            </ul>
            <Button variant="default" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      )}

      <div className="p-4 bg-neutral-700 rounded-lg flex justify-end items-center">
        <Button className="w-32" onClick={() => console.log(order)}>
          Make an order
        </Button>
        <div className="relative ml-4" onClick={() => navigate('/your-cart')}>
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {order?.items.length || 0}
          </span>
        </div>
      </div>
    </div>
  );
};
