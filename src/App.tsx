import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Pricing from './pages/Business/Pricing';
import Checkout from './pages/Business/Checkout';
import PaymentSuccess from './pages/Business/PaymentSuccess';
import Docs from './pages/Business/Docs';
import About from './pages/Utility/About';
import Contact from './pages/Utility/Contact';
import Features from './pages/Business/Features';
import { Privacy, Terms, Cookies } from './pages/Utility/Legal';
import Notfound from './pages/Utility/Notfound';
import Dashboard from './pages/Authentication/Dashboard';
import { ProtectedRoute } from './utils/routesProtection';


const LayoutWrapper = () => (
  <Layout>
    <Outlet />
  </Layout>
);


const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: [
      // Unprotected Routes
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/features', element: <Features /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
      { path: '/cookies', element: <Cookies /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/payment-success', element: <PaymentSuccess /> },
      { path: '/docs', element: <Docs /> },
      { path: '*', element: <Notfound /> },

      // Protected Routes
      {
        path: '/dashboard', element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      }
    ],
  },
]);

export default function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
