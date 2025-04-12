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
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <CheckCircle className="text-green-600 w-16 h-16 sm:w-20 sm:h-20 mb-6 animate-bounce" />

      <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4 text-center">
        Payment Successful!
      </h1>
      <p className="text-gray-700 text-center mb-8 max-w-md">
        Thank you for your purchase. Your payment has been successfully
        processed.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={handleGoHome}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full"
        >
          Go to Home
        </button>
        <button
          onClick={handleViewOrders}
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition w-full"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};
