import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/restaurants');
  };

  const handleViewOrders = () => {
    navigate('/your-orders');
  };

  return (
    <div className="flex absolute w-full h-100% flex-col items-center justify-center h-screen bg-green-50 p-4 z-4 left-0 top-0">
      <CheckCircle className="text-green-600 w-20 h-20 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-gray-700 text-center mb-6">
        Thank you for your purchase. Your payment has been successfully
        processed.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleGoHome}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </button>
        <button
          onClick={handleViewOrders}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};
