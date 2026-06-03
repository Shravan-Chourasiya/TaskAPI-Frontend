import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authStore from '@/lib/zustandStore';
import { apiInstance } from '@/lib/axiosInstance';
import { Menu, PanelLeftClose, LayoutDashboard, Key, CreditCard, HelpCircle, LogOut, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [stats, setStats] = useState({
    apiRequests: 0,
    activeSessions: 0,
    avgLatency: 0
  });

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
        setStats(statsResponse.data.data);
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
            <div className="bg-gray-50 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-[#004e47]"></span> Status: {user?.status}
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#dee2f4] text-[#5f6473] rounded-xl font-bold">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard Overview</span>
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl">
              <Key className="w-5 h-5" />
              <span>API Credentials</span>
            </a>
            <Button onClick={() => navigate('/pricing')} variant="ghost" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl w-full justify-start h-auto">
              <CreditCard className="w-5 h-5" />
              <span>Billing & Plans</span>
            </Button>
          </nav>

          <div className="mt-auto pt-4 space-y-2 border-t border-gray-200">
            <Button className="w-full bg-[#004e47] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#004e47]/90 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Upgrade to Pro
            </Button>
            <Button onClick={() => navigate('/contact')} variant="ghost" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-900 w-full justify-start">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Help Center</span>
            </Button>
            <Button onClick={handleLogout} variant="ghost" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-red-600 w-full justify-start">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Log Out</span>
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
          <section className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold mb-2">Welcome back, {user?.username}</h2>
              <p className="text-lg text-gray-600">Architecting the future of your infrastructure.</p>
            </div>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white shadow rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004e47] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00685f]"></span>
              </span>
              <span className="text-sm font-bold text-[#004e47]">All Systems Nominal</span>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-lg shadow hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined p-2 bg-[#004e47]/5 text-[#004e47] rounded-lg">api</span>
                <span className="text-[#004e47] font-bold text-sm">+12.4% <span className="text-gray-500 font-normal">this week</span></span>
              </div>
              <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-2">API Requests</h3>
              <div className="text-5xl font-mono font-bold">{stats.apiRequests.toLocaleString()}</div>
              <div className="w-full h-1 bg-gray-200 mt-6 rounded-full overflow-hidden">
                <div className="h-full bg-[#004e47] w-[74%]"></div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined p-2 bg-[#595e6d]/5 text-[#595e6d] rounded-lg">passkey</span>
                <span className="text-[#004e47] font-bold text-sm">99.98% <span className="text-gray-500 font-normal">success rate</span></span>
              </div>
              <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Active API Keys</h3>
              <div className="text-5xl font-mono font-bold">{apiKeys.filter(k => k.keyStatus === 'active').length}</div>
              <div className="flex items-center gap-2 mt-6">
                <div className="text-[10px] bg-[#dee2f4] px-2 py-0.5 rounded text-[#5f6473] font-bold">STABLE</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow hover:-translate-y-1 transition-transform relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#004e47]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="flex justify-between items-start mb-6">
                <span className="material-symbols-outlined p-2 bg-[#00685f] text-white rounded-lg">speed</span>
                <span className="text-[#004e47] font-bold text-sm">-2.1ms <span className="text-gray-500 font-normal">vs last hour</span></span>
              </div>
              <h3 className="text-gray-500 text-xs uppercase tracking-wider mb-2">Avg Response Latency</h3>
              <div className="text-5xl font-mono font-bold text-[#004e47]">{stats.avgLatency}ms</div>
            </div>
          </section>

          <section className="mb-20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Your API Keys</h3>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-[#004e47] text-white hover:bg-[#004e47]/90"
              >
                + Create New Key
              </Button>
            </div>

            {loading ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">Loading...</div>
            ) : apiKeys.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
                No API keys yet. Create one to get started!
              </div>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key._id} className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{key.name}</h4>
                      <p className="text-sm text-gray-500">{key.description}</p>
                      <p className="text-xs font-mono text-gray-400 mt-2">{key.keyPrefix}...{key.keyHint}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${key.keyStatus === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {key.keyStatus}
                      </span>
                      <span className="text-sm text-gray-500">{key.environment}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
