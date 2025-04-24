import { useEffect, useState } from 'react';
import { Product } from '../lib/types';
import { fetchProducts } from '../services/productServices';
import ProductCard from '../components/ProductCard';
import SideBar from '../components/SideBar';
import { useDebouncedCallback } from 'use-debounce';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>();
  const [activeFilter, setActiveFilter] = useState({
    category: '0',
    title: '',
    priceRange: { label: 'Default', min: 0, max: 100 },
  });
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 8;
  const totalPages = Math.ceil(50 / limit);

  const getProducts = async () => {
    try {
      const productsData = await fetchProducts(
        activeFilter.title,
        currentPage * limit,
        limit,
        activeFilter.category
      );
      setProducts(productsData);
    } catch (error) {
      console.log('failed loading products data');
    }
  };

  const debouncedFetchUsers = useDebouncedCallback(() => {
    getProducts();
  }, 400);

  useEffect(() => {
    debouncedFetchUsers();
  }, [currentPage, activeFilter]);

  return (
    <div className="flex flex-row min-h-svh min-w-screen">
      <SideBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        setCurrentPage={setCurrentPage}
      />
      <div className="flex-1 flex flex-col items-center justify-start py-5 px-5">
        {products && products.length > 0 ? (
          <>
            <ul className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
              {products.map((product: Product) => (
                <li key={product.title}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            <div className="join mt-5">
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
                disabled={currentPage === totalPages - 1}
              >
                »
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No products to show
          </p>
        )}
      </div>
    </div>
  );
};
export default ProductsPage;
