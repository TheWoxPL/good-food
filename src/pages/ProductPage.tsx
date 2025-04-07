import { useParams } from 'react-router-dom';

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <p className="text-lg">Product ID: {productId}</p>
      <p className="text-lg">Product Name: Product Name</p>
      <p className="text-lg">Product Description: Product Description</p>
      <p className="text-lg">Price: $100.00</p>
    </div>
  );
};
