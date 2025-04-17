import { useEffect, useState } from 'react';
import { Product } from '../lib/types';
import { fetchProducts } from '../services/productServices';
import ProductCard from '../components/ProductCard';

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
    <div className="my-5 mx-5">
      <ul className="grid grid-cols-4 gap-5">
        {products?.map((product: Product) => (
          <li key={product.title}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Catalog;
