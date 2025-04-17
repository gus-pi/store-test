import { useEffect, useState } from 'react';
import { Product } from '../lib/types';
import { fetchProducts } from '../services/productServices';
import ProductCard from '../components/ProductCard';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>();
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 8;
  const totalPages = Math.ceil(50 / limit);

  const getProducts = async () => {
    try {
      const productsData = await fetchProducts(currentPage * limit, limit);
      setProducts(productsData);
    } catch (error) {
      console.log('failed loading products data');
    }
  };
  useEffect(() => {
    getProducts();
  }, [currentPage]);

  return (
    <div className="my-5 mx-5 flex flex-col items-center gap-4">
      <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
        {products?.map((product: Product) => (
          <li key={product.title}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div className="join">
        <button
          className="join-item btn btn-sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          «
        </button>
        <p className="join-item btn btn-sm">{currentPage + 1}</p>
        <button
          className="join-item btn btn-sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          »
        </button>
      </div>
    </div>
  );
};
export default Catalog;
