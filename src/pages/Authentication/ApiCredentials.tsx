import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authStore from '@/lib/zustandStore';
import { apiInstance } from '@/lib/axiosInstance';
import { Menu, PanelLeftClose, LayoutDashboard, Key, CreditCard, HelpCircle, LogOut, Zap, User, Pencil, Trash2, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ApiKeyCreationForm from '@/components/auth/ApiKeyCreationForm';
import ReusableForm from '@/components/ReusableForm';
import { toast } from 'sonner';
import { API_ENDPOINTS } from '@/constants';

interface ApiKey {
  _id: string;
  name: string;
  description: string;
  keyPrefix: string;
  keyHint: string;
  environment: string;
  keyStatus: string;
  scopes: string[];
  allowedIPs: string[];
  createdAt: string;
  lastUsedAt?: string;
  usageCount: number;
}

interface UpdateFormState {
  heading: string;
  inputPlaceholder: string;
  submitBtnText: string;
  functionParams?: object;
  functionToExecute: (inputValue: string, functionParams?: object) => void | Promise<void>;
}

const ApiCredentials = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = authStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [updateForm, setUpdateForm] = useState<UpdateFormState | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  useEffect(() => {
    if (location.state?.openCreateForm) {
      const timer = setTimeout(() => {
        setShowCreateForm(true);
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const closeApiUpdateForm = () => {
    setUpdateForm(null);
  };

  const fetchApiKeys = async () => {
    try {
      setLoading(true);
      setTimeout(() => { }, 1500);
      const response = await apiInstance.get(API_ENDPOINTS.APIKEY.LIST);
      if (response.data?.data) {
        setApiKeys(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch API keys:', error);
      toast.error('Failed to load API keys');
    } finally {
      setLoading(false);
    }
  };

  const openApiUpdateForm = (
    heading: string,
    inputPlaceholder: string,
    submitBtnText: string,
    functionParams: object,
    functionToExecute: (inputValue: string, functionParams?: object) => void | Promise<void>
  ) => {
    setUpdateForm({
      heading,
      inputPlaceholder,
      submitBtnText,
      functionParams,
      functionToExecute,
    });
  }
  const handleDelete = async (keyId: string) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;

    try {
      const response = await apiInstance.post(API_ENDPOINTS.APIKEY.REVOKE.replace(':id', keyId));

      if (response.data?.success) {
        toast.success('API key deleted successfully');
      } else {
        toast.error('Failed to delete API key');
      }

      fetchApiKeys();
    } catch (error) {
      console.error('Failed to delete API key:', error);
      toast.error('Failed to delete API key');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };


  const handleUpdateApiName = async (newName: string, functionParams?: object) => {
    try {
      const keyId = functionParams && typeof functionParams === 'object' && 'id' in functionParams
        ? String((functionParams as { id?: string }).id ?? '')
        : '';

      if (!keyId) {
        toast.error('Missing API key identifier');
        return;
      }

      const response = await apiInstance.patch(API_ENDPOINTS.APIKEY.UPDATE_NAME, { keyId, newName });

      if (response.data?.success) {
        toast.success('API key name updated successfully');
        fetchApiKeys();
        closeApiUpdateForm();
      } else {
        toast.error('Failed to update API key name');
      }
      fetchApiKeys();
    } catch (error) {
      console.error('Failed to update API key name:', error);
      toast.error('Failed to update API key name');
    }
  }

  const getAvatarUrl = () => {
    return user?.profile?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
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
            <Button onClick={() => navigate('/dashboard')} variant="ghost" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl w-full justify-start h-auto text-sm">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard Overview</span>
            </Button>
            <Button onClick={() => navigate('/profile')} variant="ghost" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl w-full justify-start h-auto text-sm">
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Button>
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#dee2f4] text-[#5f6473] rounded-xl font-bold text-sm">
              <Key className="w-5 h-5" />
              <span>API Credentials</span>
            </a>
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
            <span className="text-2xl font-extrabold text-[#004e47]">API Credentials</span>
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
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">API Keys Management</h2>
              <p className="text-gray-600">Manage your API keys, permissions, and access controls</p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-[#004e47] text-white hover:bg-[#004e47]/90 flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              Create API Key
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Key className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No API Keys Found</h3>
              <p className="text-gray-600">Create your first API key to get started</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <TooltipProvider>
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">API Key</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created At</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Environment</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {apiKeys.map((apiKey) => (
                      <tr key={apiKey._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{apiKey.name}</div>
                          <div className="text-sm text-gray-500">{apiKey.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono">
                              {apiKey.keyPrefix}••••{apiKey.keyHint}
                            </code>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(apiKey.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apiKey.environment === 'production'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                            }`}>
                            {apiKey.environment}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${apiKey.keyStatus === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {apiKey.keyStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => openApiUpdateForm("Renaming API Key", "Enter new name for the API...", "Update Name", { id: apiKey._id }, handleUpdateApiName)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-600 hover:text-blue-600"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Rename</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => console.log('Edit scopes', apiKey._id)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-600 hover:text-purple-600"
                                >
                                  <Shield className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Scopes</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => console.log('Manage IPs', apiKey._id)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-600 hover:text-orange-600"
                                >
                                  <Globe className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Manage IP Whitelist</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => handleDelete(apiKey._id)}
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-gray-600 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TooltipProvider>
            </div>
          )}
        </div>
      </main>

      {updateForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          onClick={closeApiUpdateForm}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <ReusableForm
              heading={updateForm.heading}
              inputPlaceholder={updateForm.inputPlaceholder}
              submitBtnText={updateForm.submitBtnText}
              functionParams={updateForm.functionParams}
              functionToExecute={updateForm.functionToExecute}
              onCancel={closeApiUpdateForm}
            />
          </div>
        </div>
      )}

      {showCreateForm && (
        <ApiKeyCreationForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={fetchApiKeys}
        />
      )}
    </div>
  );
};

export default ApiCredentials;
