import { createBrowserRouter } from 'react-router';
import App from '../App';
import ProductsPage from '../pages/ProductsPage';
import SingleProductPage from '../pages/SingleProductPage';
import LoginPage from '../pages/LoginPage';
import AdminDashboard from '../pages/AdminDashboard';
import CartPage from '../pages/CartPage';
import PrivateRoute from './PrivateRoute';
import SignUpPage from '../pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/products', element: <ProductsPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/product/:id', element: <SingleProductPage /> },
      { path: '/auth/login', element: <LoginPage /> },
      { path: '/auth/signup', element: <SignUpPage /> },
      {
        path: '/add-product',
        element: (
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
