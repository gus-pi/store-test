import { Product } from '../lib/types';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card bg-base-100 w-64 h-96 shadow-sm flex flex-col overflow-hidden">
      <figure className="h-1/2 overflow-hidden ">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body p-4 flex flex-col justify-between h-1/2 overflow-hidden">
        <h2 className="card-title text-sm">{product.title}</h2>
        <div className="">
          <p className="bg-stone-300 py-0 px-2 rounded-sm text-xs text-center text-white ">
            {product.category.name}
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xs text-gray-500 line-clamp-3">
            {product.description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xl">${product.price}</div>
          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
