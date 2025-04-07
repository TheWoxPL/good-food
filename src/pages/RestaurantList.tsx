import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const querySnapshot = await getDocs(collection(db, 'restaurants'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRestaurants(data);
    };

    fetchRestaurants();
  }, []);

  const handleSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleClose = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="flex flex-col min-h-screen mt-5">
      <div className="p-4 flex justify-center">
        <Input placeholder="Search" className="w-1/3" />
      </div>
      <div className="flex-1 overflow-auto p-4">
        {restaurants.map((restaurant, index) => (
          <Card key={index} className="mb-4">
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
              {selectedRestaurant.foodList.map((food, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-700 mb-2 bg-gray-100"
                >
                  <span className="flex-1">{food.name}</span>
                  <span className="ml-4">${food.price}</span>
                  <Button variant="default" className="ml-4 rounded-lg">
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
        <Button className="w-32">Make an order</Button>
        <div className="relative ml-4">
          <ShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            1
          </span>
        </div>
      </div>
    </div>
  );
};
