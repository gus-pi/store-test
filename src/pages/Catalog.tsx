import { useEffect, useState } from 'react';
import { Product } from '../lib/types';
import { fetchProducts } from '../services/productServices';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>();
  const getProducts = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.log('failed loading products data');
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      {products?.map((product: Product) => (
        <li key={product.title}>{product.title}</li>
      ))}
    </div>
  );
};
export default Catalog;
