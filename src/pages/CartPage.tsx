import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('AuthContext.Provider is missing!');
  }

  const { cartItems, getCartTotal } = cartContext;
  return (
    <div className="flex flex-col gap-2 justify-center mx-auto my-10">
      <h1 className="text-3xl font-bold text-center">Your Cart</h1>
      {cartItems.map((item) => (
        <ul>
          <li key={item.id} className="flex">
            <img src={item.images[0]} width={24} alt="" />
            {item.title} {item.quantity}
          </li>
        </ul>
      ))}
      total : ${getCartTotal()}
    </div>
  );
};

export default CartPage;
