// Frontend/src/pages/Authentication/Dashboard.tsx
import { useState } from 'react';
import { Key, BookOpen, Copy, Trash2, Edit2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import authStore from '@/lib/zustandStore';
import { DICEBEAR_AVATAR_API } from '@/constants';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    delete: false,
    all: false
  });
  const [creating, setCreating] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production Key',
      key: 'tk_live_abc123def456ghi789',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Development Key',
      key: 'tk_test_xyz789uvw456rst123',
      createdAt: '2024-01-10'
    }
  ]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const store = authStore();
  const user = store.user;
  const avatarUrl = user?.profile?.avatarUrl || `${DICEBEAR_AVATAR_API}?seed=${user?.username || 'default'}`;

  const handlePermissionChange = (perm: keyof typeof permissions) => {
    if (perm === 'all') {
      const newValue = !permissions.all;
      setPermissions({ read: newValue, write: newValue, delete: newValue, all: newValue });
    } else {
      const newPermissions = { ...permissions, [perm]: !permissions[perm] };
      newPermissions.all = newPermissions.read && newPermissions.write && newPermissions.delete;
      setPermissions(newPermissions);
    }
  };

  const handleCreateKey = async () => {
    if (!keyName.trim()) return;
    if (!permissions.read && !permissions.write && !permissions.delete) return;

    setCreating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockKey = `tk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: keyName,
      key: mockKey,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setApiKeys([newKey, ...apiKeys]);
    setCreating(false);
    setShowCreateForm(false);
    setKeyName('');
    setPermissions({ read: false, write: false, delete: false, all: false });
  };

  const handleCopyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  const maskKey = (key: string) => {
    const visible = key.substring(0, 12);
    const masked = '•'.repeat(Math.max(0, key.length - 12));
    return visible + masked;
  };

  const handleLogout = async () => {
    try {
      store.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Left Sidebar - Always Open */}
      <aside
        className={`fixed top-0 left-0 h-full bg-surface-container-low border-r border-outline-variant/20 transition-all duration-300 z-50 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Profile Section */}
          <div className="mb-6">
            {!sidebarCollapsed ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shadow-ambient flex-shrink-0">
                    <img src={avatarUrl} alt={user?.username} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base font-bold text-on-surface truncate">{user?.username}</h2>
                    <p className="text-xs text-secondary truncate">{user?.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate('/profile')}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              </>
            ) : (
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shadow-ambient">
                  <img src={avatarUrl} alt={user?.username} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>

          {/* Collapse Button */}
          <Button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            variant="ghost"
            size="sm"
            className="mb-6"
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            {!sidebarCollapsed && <span>Collapse</span>}
          </Button>

          {/* Logout */}
          <div className="mt-auto">
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`w-full ${sidebarCollapsed ? 'px-2' : ''}`}
            >
              {sidebarCollapsed ? '↗' : 'Logout'}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Key className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-extrabold text-on-surface">API Keys</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/docs')}
                variant="outline"
              >
                <BookOpen className="w-4 h-4" />
                API Quickstart
              </Button>
              <Button
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                <Plus className="w-4 h-4" />
                Create API Key
              </Button>
            </div>
          </div>

          <hr className="border-outline-variant/20 mb-6" />

          {/* Create Form */}
          {showCreateForm && (
            <div className="bg-surface-container-low rounded-2xl p-6 mb-6 shadow-ambient">
              <h3 className="text-lg font-bold text-on-surface mb-4">Create New API Key</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-secondary mb-2 block">Key Name</label>
                  <input
                    type="text"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                    placeholder="My API Key"
                    className="w-full px-4 py-2 bg-surface-container rounded-xl text-sm text-on-surface border-2 border-transparent focus:border-primary outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-secondary mb-2 block">Permissions</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.read}
                        onChange={() => handlePermissionChange('read')}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-on-surface">Read</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.write}
                        onChange={() => handlePermissionChange('write')}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-on-surface">Write</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.delete}
                        onChange={() => handlePermissionChange('delete')}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-on-surface">Delete</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={permissions.all}
                        onChange={() => handlePermissionChange('all')}
                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-on-surface font-bold">All</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateKey}
                    disabled={creating || !keyName.trim() || (!permissions.read && !permissions.write && !permissions.delete)}
                  >
                    {creating ? 'Creating...' : 'Create Key'}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreateForm(false);
                      setKeyName('');
                      setPermissions({ read: false, write: false, delete: false, all: false });
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Table */}
          <div className="space-y-3">
            {apiKeys.map((apiKey) => (
              <div
                key={apiKey.id}
                className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <h4 className="text-sm font-bold text-on-surface mb-1">{apiKey.name}</h4>
                  <p className="text-xs font-mono text-secondary">{maskKey(apiKey.key)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-secondary whitespace-nowrap">{apiKey.createdAt}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => handleCopyKey(apiKey.id, apiKey.key)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      {copiedId === apiKey.id ? (
                        <Copy className="w-4 h-4 text-primary" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeleteKey(apiKey.id)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-error"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {apiKeys.length === 0 && (
            <div className="text-center py-12">
              <Key className="w-16 h-16 text-secondary mx-auto mb-4 opacity-50" />
              <p className="text-secondary">No API keys yet. Create your first one!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
