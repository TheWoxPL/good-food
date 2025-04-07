export interface Product {
  id: string; // Firestore document ID
  name: string;
  price: number; // Optional image URL
  restaurantId: string;
}
