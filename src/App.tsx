import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import ForgotPassword from './pages/Authentication/ForgotPassword';
import Profile from './pages/Authentication/Profile';
import ProfileForm from './pages/Authentication/ProfileForm';
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
import ApiCredentials from './pages/Authentication/ApiCredentials';
import { ProtectedRoute } from './utils/routesProtection';
import { PublicRoute } from './utils/PublicRoute';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/ui/LoadingSpinner';



const LayoutWrapper = () => {
  const { isLoading } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard' || location.pathname === '/api-credentials';
  
  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // Dashboard has its own layout, no navbar/footer
  if (isDashboard) {
    return <Outlet />;
  }
  
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};


const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: [
      // Public Routes (redirect to dashboard if authenticated)
      { path: '/', element: <PublicRoute><Home /></PublicRoute> },
      { path: '/login', element: <PublicRoute><Login /></PublicRoute> },
      { path: '/register', element: <PublicRoute><Register /></PublicRoute> },
      { path: '/forgot-password', element: <PublicRoute><ForgotPassword /></PublicRoute> },
      
      // Unprotected Routes
      { path: '/features', element: <Features /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
      { path: '/cookies', element: <Cookies /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/docs', element: <Docs /> },
      { path: '*', element: <Notfound /> },


      // Protected Routes
      {
        path: '/checkout', element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },
      {
        path: '/payment-success', element: (
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        )
      },
      {
        path: '/dashboard', element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: '/api-credentials', element: (
          <ProtectedRoute>
            <ApiCredentials />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile', element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile/edit', element: (
          <ProtectedRoute>
            <ProfileForm />
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
