import { useParams } from 'react-router';
import { Product } from '../lib/types';
import { fetchSingleProduct } from '../services/productServices';
import { useEffect, useState } from 'react';

const ProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();

  const getProduct = async (id: string) => {
    try {
      const productData = await fetchSingleProduct(id);
      setProduct(productData);
    } catch (error) {
      console.log('error getting product');
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id);
    }
  }, []);

  return (
    <div className="flex flex-row justify-between">
      <div className="card bg-base-100 w-96 shadow-sm flex flex-col overflow-hidden">
        <figure>
          <img src={product?.images[0]} />
        </figure>
      </div>
      <div>
        <h2>{product?.title}</h2>
        <h1>{product?.description}</h1>
        <div className="flex justify-around">
          <p>${product?.price}</p>
          <button className="btn btn-sm btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
