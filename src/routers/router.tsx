import { createBrowserRouter } from 'react-router';
import App from '../App';
import ProductsPage from '../pages/ProductsPage';
import ProductPage from '../pages/ProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/products', element: <ProductsPage /> },
      { path: '/product/:id', element: <ProductPage /> },
    ],
  },
]);

export default router;
