export interface Order {
  id?: string;
  userId: string;

  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];

  totalAmount: number;
  status: 'pending' | 'done';
  paymentMethod: 'card' | 'cash' | 'online' | null;

  deliveryAddress: {
    street: string;
    city: string;
    postalCode: string;
    coordinates?: { lat: number; lng: number };
  };

  createdAt: Date;
}
