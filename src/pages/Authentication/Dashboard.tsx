// Frontend/src/pages/Authentication/Dashboard.tsx
import ProfileSidebar from '../../components/Layout/ProfileSidebar.jsx';
import DashboardStats from '../../components/Layout/DashboardStats.jsx';
import { Activity, Key } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-surface">
      <ProfileSidebar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-on-surface mb-2">
            Dashboard
          </h1>
          <p className="text-secondary">Monitor your API usage and manage your account</p>
        </div>

        <DashboardStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-surface-container-low p-6 rounded-2xl shadow-ambient">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-outline-variant/20 last:border-0">
                  <div>
                    <p className="text-sm font-bold text-on-surface">API Request</p>
                    <p className="text-xs text-secondary">2 minutes ago</p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Success
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low p-6 rounded-2xl shadow-ambient">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-on-surface">API Usage</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-secondary">Requests this month</span>
                  <span className="text-sm font-bold text-on-surface">1,247 / 10,000</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '12.47%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
