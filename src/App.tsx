import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useLocation, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import Docs from './pages/Docs';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import { Privacy, Terms, Cookies } from './pages/Legal';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LayoutWrapper = () => (
  <Layout>
    <ScrollToTop />
    <Outlet />
  </Layout>
);

const NotFound = () => (
  <div className="pt-48 pb-32 text-center px-8">
    <h1 className="text-9xl font-black font-headline text-slate-200 mb-8">404</h1>
    <h2 className="text-4xl font-black font-headline mb-8 text-on-surface">System Malfunction.</h2>
    <p className="text-secondary mb-12 text-lg">The coordinate you're looking for does not exist in our cluster.</p>
    <a href="/" className="px-10 py-4 bg-primary text-on-primary font-bold rounded-2xl shadow-xl shadow-primary/20 inline-block hover:scale-105 active:scale-95 transition-transform">Return to Origin</a>
  </div>
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
      { path: '*', element: <NotFound /> },

      // Protected Routes
      { 
        path: '/pricing', 
        element: (
          <ProtectedRoute>
            <Pricing />
          </ProtectedRoute>
        ) 
      },
      { 
        path: '/docs', 
        element: (
          <ProtectedRoute>
            <Docs />
          </ProtectedRoute>
        ) 
      },
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
