import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext.provider';
import { ProtectedRoute, PublicRoute } from '@/utils/routesProtection';
import { Spinner } from '@/components/ui/Spinner';
import { Layout } from '@/components/Layout/Layout';
import { AuthenticatedLayout } from '@/components/Layout/AuthenticatedLayout';
import { AdminLayout } from '@/components/Layout/AdminLayout';

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Authentication/Login'));
const Signup = lazy(() => import('@/pages/Authentication/Signup'));
const VerifyEmail = lazy(() => import('@/pages/Authentication/VerifyEmail'));
const TwoFA = lazy(() => import('@/pages/Authentication/TwoFA'));
const ForgotPassword = lazy(() => import('@/pages/Authentication/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/Authentication/ResetPassword'));
const Dashboard = lazy(() => import('@/pages/Authenticated/Dashboard'));
const Keys = lazy(() => import('@/pages/Authenticated/Keys'));
const KeyDetail = lazy(() => import('@/pages/Authenticated/KeyDetail'));
const Usage = lazy(() => import('@/pages/Authenticated/Usage'));
const SettingsAccount = lazy(() => import('@/pages/Authenticated/SettingsAccount'));
const SettingsSecurity = lazy(() => import('@/pages/Authenticated/SettingsSecurity'));
const SettingsBilling = lazy(() => import('@/pages/Authenticated/SettingsBilling'));
const SettingsDanger = lazy(() => import('@/pages/Authenticated/SettingsDanger'));
const AdminUsers = lazy(() => import('@/pages/Admin/Users'));
const AdminUserDetail = lazy(() => import('@/pages/Admin/UserDetail'));
const AdminKeys = lazy(() => import('@/pages/Admin/Keys'));
const AdminSubscriptions = lazy(() => import('@/pages/Admin/Subscriptions'));
const AdminMetrics = lazy(() => import('@/pages/Admin/Metrics'));
const AdminAuditLogs = lazy(() => import('@/pages/Admin/AuditLogs'));
const AdminSecurityEvents = lazy(() => import('@/pages/Admin/SecurityEvents'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const LayoutWrapper = () => {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><Spinner /></div>}>
      <Outlet />
   </Suspense>
  );
};

const PublicLayout = () => (
  <Layout>
    <Outlet />
 </Layout>
);

const AuthenticatedShell = () => (
  <AuthenticatedLayout>
    <Outlet />
  </AuthenticatedLayout>
);

const AdminShell = () => (
  <AdminLayout>
    <Outlet />
  </AdminLayout>
);

const router = createBrowserRouter([
  {
    element: <LayoutWrapper />,
    children: [
      // Public
      { path: '/', element: <PublicRoute><Home /></PublicRoute> },
      { path: '/login', element: <PublicRoute><Login /></PublicRoute> },
      { path: '/signup', element: <PublicRoute><Signup /></PublicRoute> },
      { path: '/verify-email', element: <PublicRoute><VerifyEmail /></PublicRoute> },
      { path: '/2fa', element: <PublicRoute><TwoFA /></PublicRoute> },
      { path: '/forgot-password', element: <PublicRoute><ForgotPassword /></PublicRoute> },
      { path: '/reset-password', element: <PublicRoute><ResetPassword /></PublicRoute> },

      // Authenticated
      {
        element: <ProtectedRoute><AuthenticatedShell /></ProtectedRoute>,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/keys', element: <Keys /> },
          { path: '/keys/:keyId', element: <KeyDetail /> },
          { path: '/usage', element: <Usage /> },
          { path: '/settings/account', element: <SettingsAccount /> },
          { path: '/settings/security', element: <SettingsSecurity /> },
          { path: '/settings/billing', element: <SettingsBilling /> },
          { path: '/settings/danger', element: <SettingsDanger /> },
        ],
      },

      // Admin
      {
        element: <ProtectedRoute adminOnly><AdminShell /></ProtectedRoute>,
        children: [
          { path: '/admin/users', element: <AdminUsers /> },
          { path: '/admin/users/:userId', element: <AdminUserDetail /> },
          { path: '/admin/keys', element: <AdminKeys /> },
          { path: '/admin/subscriptions', element: <AdminSubscriptions /> },
          { path: '/admin/metrics', element: <AdminMetrics /> },
          { path: '/admin/audit-logs', element: <AdminAuditLogs /> },
          { path: '/admin/security-events', element: <AdminSecurityEvents /> },
        ],
      },

      // 404
      { path: '*', element: <NotFound /> },
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
