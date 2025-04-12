import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from 'react';
import { User } from 'firebase/auth';
import { UserAuth } from './AuthContext';
import { Order, Product } from '@/types';
import {
  addEmptyOrderLocally,
  addProductToOrder,
  fetchOrder,
  getAllOrdersForUser,
  removeItemFromOrder,
  updateOrCreateOrder,
} from '@/utils/OrderUtils';
interface OrderContextType {
  user: User | null | undefined;
  loadingOrder: boolean;
  order: Order | null | undefined;
  addProduct: (product: Product) => void;
  removeItem: (itemId: string) => void;
  getAllOrders: () => Promise<Order[]>;
  finalizePayment: () => void;
}

const OrderContext = createContext<OrderContextType>({
  user: undefined,
  loadingOrder: true,
  order: undefined,
  addProduct: () => {},
  removeItem: () => {},
  getAllOrders: async () => Promise.resolve([]),
  finalizePayment: () => {},
});

interface UserOrderContextProviderProps {
  children: ReactNode;
}

export const UserOrderContextProvider = ({
  children,
}: UserOrderContextProviderProps) => {
  const { user, loading } = UserAuth();
  const [order, setOrder] = useState<Order>();
  const [loadingOrder, setLoadingOrder] = useState(true);

  useEffect(() => {
    if (!loading && user) {
      fetchOrder(user, setOrder, setLoadingOrder);
    }
  }, [loading, user]);

  useEffect(() => {
    // if (loadingOrder === false && order?.items && order.items.length > 0) {
    if (loadingOrder === false && order) {
      updateOrCreateOrder(order, setOrder);
    }
  }, [order, loadingOrder]);

  const addProduct = (product: Product) => {
    addProductToOrder(product, order!, setOrder);
  };

  const removeItem = (itemId: string) => {
    removeItemFromOrder(itemId, order!, setOrder);
  };

  const getAllOrders = (): Promise<Order[]> => {
    return getAllOrdersForUser(user!.uid);
  };

  const finalizePayment = (): void => {
    setOrder({ ...order!, status: 'done' });
    addEmptyOrderLocally(user!.uid, setOrder);
  };

  if (!loadingOrder && order) {
    <div></div>;
  }

  return (
    <OrderContext.Provider
      value={{
        user,
        loadingOrder,
        order,
        addProduct,
        removeItem,
        getAllOrders,
        finalizePayment,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const UserOrderContext = () => {
  return useContext(OrderContext);
};
