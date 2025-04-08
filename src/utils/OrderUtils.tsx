import { db } from '@/firebase';
import { Product } from '@/types';
import { Order } from '@/types/Order.types';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export const fetchOrder = async (
  user: User,
  setOrder: (order: Order) => void,
  setLoadingOrder: (loading: boolean) => void
) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', user!.uid),
      where('status', '!=', 'done'),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
      addEmptyOrderLocally(user!.uid, setOrder);
    } else {
      const lastOrder: Order = querySnapshot.docs[0].data() as Order;
      setOrder({ id: querySnapshot.docs[0].id, ...lastOrder });
    }
  } catch (error) {
    console.error('Error fetching the last order:', error);
  } finally {
    setLoadingOrder(false);
  }
};

export const addEmptyOrderLocally = (
  userId: string,
  setOrder: (order: Order) => void
) => {
  const emptyOrder: Order = {
    userId: userId,
    items: [],
    totalAmount: 0,
    status: 'pending',
    paymentMethod: null,
    deliveryAddress: {
      street: '',
      city: '',
      postalCode: '',
      coordinates: { lat: 0, lng: 0 },
    },
    createdAt: new Date(),
  };
  setOrder(emptyOrder);
};

export const addProductToOrder = (
  product: Product,
  order: Order,
  setOrder: (order: Order) => void
) => {
  const existingItemIndex = order.items.findIndex(
    (item) => item.productId === product.id
  );

  if (existingItemIndex !== -1) {
    const updatedItems = [...order.items];
    updatedItems[existingItemIndex].quantity += 1;
    setOrder({
      ...order,
      items: updatedItems,
      totalAmount: calculateTotalAmount(updatedItems),
    });
  } else {
    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    const newItems = [...order.items, newItem];
    setOrder({
      ...order,
      items: newItems,
      totalAmount: calculateTotalAmount(newItems),
    });
  }
};

export const updateOrCreateOrder = async (
  order: Order,
  setOrder: (order: Order) => void
): Promise<void> => {
  try {
    if (order) {
      if (order?.id) {
        const orderRef = doc(db, 'orders', order.id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...orderDataWithoutId } = order;
        await setDoc(orderRef, orderDataWithoutId, { merge: true });
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...orderDataWithoutId } = order;
      const docRef = await addDoc(collection(db, 'orders'), orderDataWithoutId);
      setOrder({ ...order, id: docRef.id });
    }
  } catch (error) {
    console.error('Error updating or creating order:', error);
    throw error;
  }
};

export const calculateTotalAmount = (
  items: { name: string; price: number; productId: string; quantity: number }[]
): number => {
  console.log(items);
  let total = 0;
  items.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};

export const removeItemFromOrder = (
  itemId: string,
  order: Order,
  setOrder: (order: Order) => void
) => {
  const updatedItems = order.items.filter((item) => item.productId !== itemId);
  setOrder({
    ...order,
    items: updatedItems,
    totalAmount: calculateTotalAmount(updatedItems),
  });
};
