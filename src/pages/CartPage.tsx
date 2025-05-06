import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const {
    cartItems,
    getCartTotal,
    addItemToCart,
    decreaseItemFromCart,
    removeItemFromCart,
    clearCart,
  } = cartContext;

  const handleCheckOut = () => {
    clearCart();
    alert('Purchase successfull!');
  };

  return (
    <div className="flex flex-col gap-2 justify-center mx-auto my-10">
      <h1 className="text-3xl font-bold text-center mb-10">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <ul>
              <li key={item.id} className="flex justify-between gap-2">
                <img src={item.images[0]} width={40} alt="" />
                <p>
                  {item.title} (${item.price}) x{item.quantity}:
                </p>
                <p>${item.price * item.quantity}</p>
                <button
                  className="btn btn-xs btn-circle"
                  onClick={() => decreaseItemFromCart(item)}
                >
                  -
                </button>
                <button
                  className="btn btn-xs btn-circle"
                  onClick={() => addItemToCart(item)}
                >
                  +
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => removeItemFromCart(item)}
                >
                  X
                </button>
              </li>
            </ul>
          ))}
          <hr className="mt-2"></hr>
          <div className="flex justify-end">total : ${getCartTotal()}</div>
          <button className="btn btn-info w-full mt-5" onClick={handleCheckOut}>
            Checkout
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
