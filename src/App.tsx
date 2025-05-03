import { Outlet } from 'react-router';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <div className="flex flex-row">
            <main className="flex flex-1 px-1">
              <Outlet />
            </main>
          </div>
        </div>
      </CartProvider>
    </AuthProvider>
  );
};
export default App;
