export interface Restaurant {
  id: string; // Firestore document ID
  name: string;
  description?: string;
  // no product ids here because products are stored as a subcollection
}
