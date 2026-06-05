import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from '@/lib/zustandStore';
import { apiInstance } from '@/lib/axiosInstance';
import { Menu, PanelLeftClose, LayoutDashboard, Key, CreditCard, HelpCircle, LogOut, Zap, User, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ApiKeyCreationForm from '@/components/auth/ApiKeyCreationForm';

interface ApiKey {
  _id: string;
  name: string;
  description: string;
  keyPrefix: string;
  keyHint: string;
  environment: string;
  keyStatus: string;
  scopes: string[];
  createdAt: string;
  lastUsedAt?: string;
  usageCount: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = authStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [responseFilter, setResponseFilter] = useState<'all' | 'success' | 'error'>('all');
  const [stats, setStats] = useState({
    apiRequests: 0,
    activeSessions: 0,
    avgLatency: 0,
    successCount: 0,
    failedCount: 0
  });
  const [usageData, setUsageData] = useState<Array<{ day: string; requests: number }>>([]);
  const [responseTimeData, setResponseTimeData] = useState<Array<{ time: string; success: number; error: number }>>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const keysResponse = await apiInstance.get('/api/v1/apikey/list');
      if (keysResponse.data?.data) {
        setApiKeys(keysResponse.data.data);
      }

      const statsResponse = await apiInstance.get('/api/v1/stats/dashboard');
      if (statsResponse.data?.data) {
        const data = statsResponse.data.data;
        setStats({
          apiRequests: data.apiRequests || 0,
          activeSessions: data.activeSessions || 0,
          avgLatency: data.avgLatency || 0,
          successCount: data.successCount || 0,
          failedCount: data.failedCount || 0
        });
        if (data.usageData) setUsageData(data.usageData);
        if (data.responseTimeData) setResponseTimeData(data.responseTimeData);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };



  const getFilteredResponseTimeData = () => {
    if (responseFilter === 'success') {
      return responseTimeData.map(d => ({ time: d.time, success: d.success }));
    } else if (responseFilter === 'error') {
      return responseTimeData.map(d => ({ time: d.time, error: d.error }));
    }
    return responseTimeData;
  };

  const getAvatarUrl = () => {
    return user?.profile?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] overflow-x-hidden">
      <aside className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 z-50 ${sidebarOpen ? 'w-72' : 'w-0'} overflow-hidden`}>
        <div className="flex flex-col h-full p-4">
          <div className="mb-10 px-4 flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-[#004e47]">TaskAPI</h1>
            <Button onClick={() => setSidebarOpen(false)} variant="ghost" size="icon" className="p-1">
              <PanelLeftClose className="w-5 h-5 text-gray-700" />
            </Button>
          </div>

          <div className="px-4 mb-10">
            <div className="flex items-center gap-4 mb-4">
              <img src={getAvatarUrl()} alt={user?.username} className="w-12 h-12 rounded-full ring-2 ring-[#004e47]/10" />
              <div className="flex flex-col">
                <span className="font-bold">{user?.username || 'User'}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-primary font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Status: {user?.status}
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#dee2f4] text-[#5f6473] rounded-xl font-bold text-sm">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard Overview</span>
            </a>
            <Button onClick={() => navigate('/profile')} variant="ghost" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl w-full justify-start h-auto text-sm">
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Button>
            <Button onClick={() => navigate('/api-credentials')} variant="ghost" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl w-full justify-start h-auto text-sm">
              <Key className="w-5 h-5" />
              <span>API Credentials</span>
            </Button>
            <Button onClick={() => navigate('/pricing')} variant="ghost" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl w-full justify-start h-auto text-sm">
              <CreditCard className="w-5 h-5" />
              <span>Billing & Plans</span>
            </Button>
          </nav>

          <div className="mt-auto pt-4 space-y-2 border-t border-gray-200">
            {(!user?.role?.includes('pro') && !user?.role?.includes('premium')) && (
              <Button className="w-full bg-[#004e47] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#004e47]/90 flex items-center justify-center gap-2 text-sm">
                <Zap className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            )}
            <Button onClick={() => navigate('/contact')} variant="ghost" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 w-full justify-start text-sm">
              <HelpCircle className="w-5 h-5" />
              <span>Help Center</span>
            </Button>
            <Button onClick={handleLogout} variant="ghost" className="flex items-center gap-3 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 w-full justify-start text-sm">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>

      <header className={`fixed top-0 right-0 h-16 z-40 bg-white/80 backdrop-blur-md flex items-center px-6 border-b border-gray-200 transition-all duration-300 ${sidebarOpen ? 'left-72' : 'left-0'}`}>
        <div className="flex items-center gap-4 justify-between w-full">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setSidebarOpen(true)} 
              variant="ghost"
              size="icon"
              className={`transition-all ${sidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </Button>
            <span className="text-2xl font-extrabold text-[#004e47]">TaskAPI Console</span>
          </div>
          <nav className="hidden lg:flex items-center gap-3">
            <Button onClick={() => navigate('/docs')} variant="ghost" className="text-gray-600 hover:text-[#004e47] h-auto py-2 px-3">
              Docs
            </Button>
            <Button onClick={() => navigate('/contact')} variant="ghost" className="text-gray-600 hover:text-[#004e47] h-auto py-2 px-3">
              Support
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-[#004e47] h-auto py-2 px-3">
              Changelog
            </Button>
          </nav>
        </div>
      </header>

      <main className={`pt-16 min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <section className="mb-20 flex items-start justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-2">Welcome back, {user?.username}</h2>
              {user?.profile?.bio && (
                <p className="text-lg text-gray-600 max-w-3xl">{user.profile.bio}</p>
              )}
            </div>
            <Button
              onClick={() => navigate('/api-credentials', { state: { openCreateForm: true } })}
              className="bg-[#004e47] text-white hover:bg-[#004e47]/90 flex items-center gap-2 shrink-0"
            >
              <Key className="w-4 h-4" />
              Create API Key
            </Button>
          </section>

          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-8 rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">API Request Status</h3>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Successful</p>
                      <p className="text-3xl font-bold text-green-600">{stats.successCount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                      <XCircle className="w-7 h-7 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Failed</p>
                      <p className="text-3xl font-bold text-red-600">{stats.failedCount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="text-sm font-bold text-[#004e47]">
                      {((stats.successCount / (stats.successCount + stats.failedCount)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${(stats.successCount / (stats.successCount + stats.failedCount)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Response Time Analysis</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setResponseFilter('all')}
                      variant={responseFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      className={responseFilter === 'all' ? 'bg-[#004e47] hover:bg-[#004e47]/90' : ''}
                    >
                      All
                    </Button>
                    <Button
                      onClick={() => setResponseFilter('success')}
                      variant={responseFilter === 'success' ? 'default' : 'outline'}
                      size="sm"
                      className={responseFilter === 'success' ? 'bg-green-600 hover:bg-green-600/90' : ''}
                    >
                      Success
                    </Button>
                    <Button
                      onClick={() => setResponseFilter('error')}
                      variant={responseFilter === 'error' ? 'default' : 'outline'}
                      size="sm"
                      className={responseFilter === 'error' ? 'bg-[#D32F2F] hover:bg-[#D32F2F]/90' : ''}
                    >
                      Error
                    </Button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={responseTimeData.length > 0 ? getFilteredResponseTimeData() : [{ time: '00:00', success: 0, error: 0 }]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      type="category"
                      dataKey="time" 
                      tick={{ fontSize: 12 }} 
                      axisLine={{ stroke: '#9ca3af' }} 
                      tickLine={{ stroke: '#9ca3af' }}
                    />
                    <YAxis 
                      type="number"
                      domain={[0, 150]}
                      tick={{ fontSize: 12 }} 
                      label={{ value: 'ms', angle: -90, position: 'insideLeft', fontSize: 12 }} 
                      axisLine={{ stroke: '#9ca3af' }} 
                      tickLine={{ stroke: '#9ca3af' }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                    />
                    {(responseFilter === 'all' || responseFilter === 'success') && (
                      <Bar dataKey="success" fill="#10b981" radius={[8, 8, 0, 0]} barSize={20} />
                    )}
                    {(responseFilter === 'all' || responseFilter === 'error') && (
                      <Bar dataKey="error" fill="#D32F2F" radius={[8, 8, 0, 0]} barSize={20} />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">API Usage Trend</h3>
                <div className="text-sm text-gray-600">Last 7 days</div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={usageData.length > 0 ? usageData : [{ day: 'Mon', requests: 0 }]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    type="category"
                    dataKey="day" 
                    tick={{ fontSize: 12 }} 
                    axisLine={{ stroke: '#9ca3af' }} 
                    tickLine={{ stroke: '#9ca3af' }} 
                  />
                  <YAxis 
                    type="number"
                    domain={[0, 'auto']}
                    tick={{ fontSize: 12 }} 
                    axisLine={{ stroke: '#9ca3af' }} 
                    tickLine={{ stroke: '#9ca3af' }}
                    label={{ value: 'Requests', angle: -90, position: 'insideLeft', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#004e47" 
                    strokeWidth={3} 
                    dot={{ fill: '#004e47', r: 5 }} 
                    name="API Requests" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </main>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#004e47]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {showCreateForm && (
        <ApiKeyCreationForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={fetchDashboardData}
        />
      )}
    </div>
  );
};

export default Dashboard;
