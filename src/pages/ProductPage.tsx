import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
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
          src="/goodFood.png"
          alt={productId}
          className="w-1/1.5 h-auto mx-auto object-cover rounded-lg"
        />
      </div>

      <Card className="flex-1 bg-orange-100 text-gray-800 rounded-t-2xl p-4 sm:p-6 border-t border-gray-300 ml-4 mr-4 p-4">
        <CardContent>
          <h2 className="font-bold text-xl sm:text-2xl mb-4">
            Pizza Capricciosa
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Indulge in the perfect blend of savory flavors with our Pizza
            Capricciosa. This classic Italian masterpiece features a rich, tangy
            tomato sauce base topped with creamy mozzarella cheese, tender
            slices of ham, earthy mushrooms, briny black olives, and delicate
            artichoke hearts.
          </p>
          <div className="flex flex-col sm:flex-row items-center sm:justify-between">
            <span className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-0">
              $25.00
            </span>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg">
              Add to Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
