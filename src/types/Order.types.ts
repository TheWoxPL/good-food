import { Item } from './Item.types';

export interface Order {
  id?: string;
  userId: string;

  items: Item[];

  totalAmount: number;
  status: 'pending' | 'done';
  paymentMethod: 'card' | 'cash' | 'online' | null;

  deliveryAddress: {
    city: string;
    street: string;
    house: string;
    flat: string;
    coordinates?: { lat: number; lng: number };
  };

  createdAt: Date;
}
