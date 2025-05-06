import { Link } from 'react-router';
import { Product } from '../lib/types';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }: { product: Product }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { cartItems, addItemToCart, decreaseItemFromCart } = cartContext;

  const cartItem = cartItems.find((item) => item.id === product.id);
  return (
    <div className="card bg-base-100 w-64 h-96 shadow-sm flex flex-col overflow-hidden">
      <figure className="h-1/2 overflow-hidden ">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </Link>
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
            {cartItem ? (
              <div className="flex items-center gap-1">
                <button
                  className="btn btn-xs"
                  onClick={() => decreaseItemFromCart(cartItem)}
                >
                  -
                </button>
                {cartItem.quantity}
                <button
                  className="btn btn-xs"
                  onClick={() => addItemToCart(product)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => addItemToCart(product)}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
