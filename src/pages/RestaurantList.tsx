import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Product, Restaurant } from '@/types';
import { useNavigate } from 'react-router';
import { UserOrderContext } from '@/context/OrderContext';
import { Navbar } from '@/components';
import { Spinner } from '@/components/Spinner';

export const RestaurantList = () => {
  const { order, addProduct } = UserOrderContext();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
        imageUrl: productsData.imageUrl,
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
    <div className="flex flex-col min-h-screen">
      <Navbar onSearchChange={setSearchTerm} />
      <div className="flex-1 overflow-auto p-4 mt-12 mb-8">
        {restaurants.length === 0 && <Spinner />}
        {restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 &&
          searchTerm !== '' &&
          restaurants.length > 0 && (
            <p className="text-center text-gray-500 text-sm mt-10">
              Brak wyników
            </p>
          )}
        {restaurants
          .filter((restaurant) =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((restaurant) => (
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
                  className="ml-5 shadow-lg bg-blue-500 text-white"
                  onClick={() => handleSelect(restaurant)}
                >
                  Select
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>

      {selectedRestaurant && (
        <div className="fixed w-full h-screen z-1 backdrop-blur-xs bg-black/10 ">
          <div className="fixed inset-0 z-2 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg w-full max-w-lg m-3">
              <h2 className="text-xl font-semibold mb-4">
                {selectedRestaurant.name} - Food List
              </h2>
              <ul className="mb-4 max-h-110 overflow-y-auto">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center text-gray-700 mb-4 bg-gray-100 p-4 rounded-lg shadow"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div className="flex-1">
                      <span className="block font-semibold">
                        {product.name}
                      </span>
                      <span className="block text-gray-500">
                        ${product.price}
                      </span>
                    </div>
                    <Button
                      variant="default"
                      className="ml-4 rounded-lg transition-transform transform active:scale-90 bg-black hover:bg-gray-800 text-white"
                      onClick={(event) => {
                        handleAddProduct(event, product);
                        event.currentTarget.textContent = 'Added';
                        event.currentTarget.classList.remove(
                          'bg-black',
                          'hover:bg-gray-800'
                        );
                        event.currentTarget.classList.add(
                          'bg-green-500',
                          'hover:bg-green-600'
                        );
                        event.currentTarget.disabled = true;
                      }}
                      disabled={false}
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
        </div>
      )}

      <div className="fixed bottom-0 bg-gradient-to-r from-yellow-400 to-yellow-600 left-0 w-full p-2 bg-neutral-700 flex justify-end items-center">
        <Button
          className="w-32 bg-blue-500 shadow-lg"
          onClick={() => navigate('/your-cart')}
        >
          Make an order
        </Button>
        <div
          className="relative ml-4 mr-3"
          onClick={() => navigate('/your-cart')}
        >
          <ShoppingCart size={24} className="text-yellow-900" />
          <span className="absolute -top-2 -right-2 shadow-lg bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            <span>{order?.items.length || 0}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
