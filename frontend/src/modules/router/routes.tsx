import { createBrowserRouter } from 'react-router-dom';
import Layout from '../../core/presenter/layout/layout';
import TransactionPage from '../transaction/presenter/page/transaction.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <TransactionPage />,
      }
    ],
  },
]);

export default router;
