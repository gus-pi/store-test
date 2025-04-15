import { createBrowserRouter } from 'react-router';
import App from '../App';
import Catalog from '../pages/Catalog';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '/catalog', element: <Catalog /> }],
  },
]);

export default router;
