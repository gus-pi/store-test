import { createBrowserRouter } from 'react-router';
import App from '../App';
import Catalog from '../pages/Catalog';
import ProductPage from '../pages/ProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/catalog', element: <Catalog /> },
      { path: '/product/:id', element: <ProductPage /> },
    ],
  },
]);

export default router;
