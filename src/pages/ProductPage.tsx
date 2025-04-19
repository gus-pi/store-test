import { useParams } from 'react-router';
import { Product } from '../lib/types';
import { fetchSingleProduct } from '../services/productServices';
import { useEffect, useState } from 'react';

const ProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const [imgIndex, setImgIndex] = useState(0);
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
      <div className="card bg-base-100 max-w-1/4 shadow-sm flex flex-col overflow-hidden">
        <div className="carousel w-full">
          <div id="slide1" className="carousel-item relative w-full">
            <img src={product?.images[imgIndex]} className="w-full" />
            <div className="absolute left-5 right-5 bottom-0 mb-2 flex  transform justify-between">
              <button
                className="btn btn-circle btn-sm"
                onClick={() => setImgIndex(imgIndex - 1)}
                disabled={imgIndex <= 0}
              >
                ❮
              </button>
              <button
                className="btn btn-circle  btn-sm"
                onClick={() => setImgIndex(imgIndex + 1)}
                disabled={
                  product?.images && imgIndex >= product?.images.length - 1
                }
              >
                ❯
              </button>
            </div>
          </div>
        </div>
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
