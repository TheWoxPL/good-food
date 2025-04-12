import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { UserOrderContext } from '@/context';
import { useState } from 'react';
import { LocateFixed } from 'lucide-react';
import { HandCoins } from 'lucide-react';
import { PaymentSuccess } from '@/components/payment-success';
import { useNavigate } from 'react-router';

export const PaymentPage = () => {
  const { order, finalizePayment } = UserOrderContext();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paymentMethod, setPaymentMethod] = useState('on-site');

  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [flat, setFlat] = useState('');

  const [additionalInfo, setAdditionalInfo] = useState('');

  const [cityError, setCityError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [houseError, setHouseError] = useState(false);
  const [flatError, setFlatError] = useState(false);

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const isEmpty = (value: string) => value.trim() === '';

  const validateForm = () => {
    let isValid = true;

    setCityError(isEmpty(city));
    setStreetError(isEmpty(street));
    setHouseError(isEmpty(house));
    setFlatError(isEmpty(flat));

    if ([city, street, house, flat].some(isEmpty)) {
      isValid = false;
    }

    return isValid;
  };

  const handlePay = () => {
    if (!validateForm()) return;
    const audio = new Audio('/notification.mp3');
    audio.play().catch((error) => {
      console.error('Error playing sound:', error);
    });
    finalizePayment();
    setIsPaymentSuccess(true);
  };

  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col p-4 sm:p-6 gap-4">
      {isPaymentSuccess && (
        <div className="absolute inset-0 h-full w-full bg-green-50 bg-opacity-50 flex items-center justify-center z-50">
          <PaymentSuccess />
        </div>
      )}
      <div className=" sticky">
        <Button
          variant="ghost"
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-lg shadow"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>
      </div>
      {isPaymentSuccess && <PaymentSuccess />}
      <h1 className="text-xl font-bold text-gray-800 mb-2">
        We are just one step away...
      </h1>

      <ScrollArea className="max-h-40 overflow-y-auto bg-white rounded shadow p-4">
        {order?.items.map((item) => (
          <div key={item.productId} className="flex justify-between mb-2">
            <span className="text-sm text-gray-800">
              {item.name} x{item.quantity}
            </span>
            <span className="text-sm font-semibold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </ScrollArea>

      <div className="space-y-2">
        <div className="flex items-center justify-between mb-1">
          <Label className="text-gray-700 font-medium">Delivery address</Label>
          <Button variant="outline" size="sm">
            <LocateFixed className="w-4 h-4 mr-1" />
            Locate me
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              className="bg-white"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
              aria-invalid={cityError}
            />
            {cityError && (
              <p className="text-red-500 text-sm mt-1">City is required</p>
            )}
          </div>
          <div>
            <Input
              className="bg-white"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              required
              aria-invalid={streetError}
            />
            {streetError && (
              <p className="text-red-500 text-sm mt-1">Street is required</p>
            )}
          </div>
          <div>
            <Input
              className="bg-white"
              value={house}
              onChange={(e) => setHouse(e.target.value)}
              placeholder="House number"
              required
              aria-invalid={houseError}
            />
            {houseError && (
              <p className="text-red-500 text-sm mt-1">
                House number is required
              </p>
            )}
          </div>
          <div>
            <Input
              className="bg-white"
              value={flat}
              onChange={(e) => setFlat(e.target.value)}
              placeholder="Flat number"
              required
              aria-invalid={flatError}
            />
            {flatError && (
              <p className="text-red-500 text-sm mt-1">
                Flat number is required
              </p>
            )}
          </div>
          <Input
            className="bg-white"
            value={additionalInfo}
            placeholder="Additional notes (optional)"
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label className="text-gray-700 font-medium mb-2 block">
          Payment method
        </Label>
        <RadioGroup
          defaultValue="on-site"
          className="flex flex-col sm:flex-row gap-4"
          onValueChange={setPaymentMethod}
        >
          <div className="flex items-center space-x-2 border-5 border-yellow-400 rounded-lg p-2">
            <RadioGroupItem value="on-site" id="on-site" />
            <Label htmlFor="on-site">
              <HandCoins />
              On delivery
            </Label>
          </div>
          <div className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
            <RadioGroupItem value="online" id="online" disabled />
            <Label htmlFor="online">Online (coming soon)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mt-auto w-full">
        <Button
          className="w-full text-lg py-6 bg-gradient-to-r from-yellow-400 to-yellow-600"
          onClick={handlePay}
        >
          Pay
        </Button>
      </div>
    </div>
  );
};
