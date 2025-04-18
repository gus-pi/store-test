import { createBrowserRouter } from 'react-router';
import App from '../App';
import ProductsPage from '../pages/ProductsPage';
import SingleProductPage from '../pages/SingleProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/products', element: <ProductsPage /> },
      { path: '/product/:id', element: <SingleProductPage /> },
    ],
  },
]);

export default router;
