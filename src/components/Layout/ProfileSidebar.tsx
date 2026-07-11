// Frontend/src/components/Layout/ProfileSidebar.tsx
import { Key, LogOut, X, Edit, Plus, Eye, EyeOff, Copy, Check, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authStore } from '@/lib/zustandStore';
import { Button } from '../ui/button';
import { DICEBEAR_AVATAR_API } from '@/constants';
import { useState } from 'react';

interface ProfileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileSidebar = ({ isOpen, onClose }: ProfileSidebarProps) => {
    const navigate = useNavigate();
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showKeyDialog, setShowKeyDialog] = useState(false);
    const [keyName, setKeyName] = useState('');
    const [permissions, setPermissions] = useState({
        read: false,
        write: false,
        delete: false,
        all: false
    });
    const [creating, setCreating] = useState(false);
    const [generatedKey, setGeneratedKey] = useState('');
    const [showFullKey, setShowFullKey] = useState(false);
    const [copied, setCopied] = useState(false);
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
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Generate mock API key
        const mockKey = `tk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        setGeneratedKey(mockKey);
        setCreating(false);
        setShowCreateForm(false);
        setShowKeyDialog(true);
        setKeyName('');
        setPermissions({ read: false, write: false, delete: false, all: false });
    };

    const handleCopyKey = () => {
        navigator.clipboard.writeText(generatedKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadKey = () => {
        const keyData = {
            apiKey: generatedKey,
            name: keyName,
            permissions: Object.keys(permissions).filter(p => permissions[p as keyof typeof permissions] && p !== 'all'),
            createdAt: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(keyData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `api-key-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const maskKey = (key: string) => {
        if (!key) return '';
        const visible = key.substring(0, 9);
        const masked = '•'.repeat(key.length - 9);
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
        <>
            <div
                className={`fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            <aside
                className={`fixed top-0 right-0 h-full w-80 bg-surface-container-low border-l border-outline-variant/20 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Profile Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shadow-ambient flex-shrink-0">
                                <img src={avatarUrl} alt={user?.username} className="w-full h-full object-cover" />
                            </div>
                            <h2 className="text-lg font-bold text-on-surface flex-1 truncate">{user?.username}</h2>
                            <Button
                                onClick={onClose}
                                variant="ghost"
                                size="icon"
                                className="flex-shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <Button
                            onClick={() => navigate('/profile')}
                            variant="outline"
                            size="sm"
                            className="w-full"
                        >
                            <Edit className="w-4 h-4" />
                            Edit Profile
                        </Button>
                    </div>

                    {/* API Keys Section */}
                    <div className="flex-1 mb-6 overflow-y-auto">
                        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Key className="w-5 h-5 text-primary" />
                                    <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">API Keys</h3>
                                </div>
                            </div>

                            {!showCreateForm ? (
                                <Button
                                    onClick={() => setShowCreateForm(true)}
                                    variant="default"
                                    className="w-full"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create API Key
                                </Button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary">Key Name</label>
                                        <input
                                            type="text"
                                            value={keyName}
                                            onChange={(e) => setKeyName(e.target.value)}
                                            placeholder="My API Key"
                                            className="w-full px-3 py-2 bg-surface-container rounded-lg text-sm text-on-surface border-2 border-transparent focus:border-primary outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary">Permissions</label>
                                        <div className="space-y-2">
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
                                            <div className="border-t border-outline-variant/20 pt-2 mt-2">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={permissions.all}
                                                        onChange={() => handlePermissionChange('all')}
                                                        className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-sm text-on-surface font-bold">All Permissions</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            onClick={handleCreateKey}
                                            disabled={creating || !keyName.trim() || (!permissions.read && !permissions.write && !permissions.delete)}
                                            className="flex-1"
                                        >
                                            {creating ? 'Creating...' : 'Create'}
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
                            )}
                        </div>
                    </div>

                    {/* Logout Section */}
                    <div>
                        <Button
                            onClick={handleLogout}
                            variant="outline"
                            className="w-full justify-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* API Key Dialog */}
            {showKeyDialog && (
                <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
                    <div className="bg-surface-container-low rounded-3xl p-6 max-w-md w-full shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <Key className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-on-surface">API Key Created!</h3>
                                    <p className="text-xs text-secondary">Save this key securely</p>
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    setShowKeyDialog(false);
                                    setGeneratedKey('');
                                    setShowFullKey(false);
                                    setCopied(false);
                                }}
                                variant="ghost"
                                size="icon"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="bg-surface-container rounded-xl p-4 mb-4">
                            <label className="text-xs font-bold text-secondary mb-2 block">Your API Key</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={showFullKey ? generatedKey : maskKey(generatedKey)}
                                    readOnly
                                    className="w-full bg-surface-container-low px-3 py-2 rounded-lg text-xs font-mono text-on-surface pr-20"
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                    <Button
                                        onClick={() => setShowFullKey(!showFullKey)}
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                    >
                                        {showFullKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </Button>
                                    <Button
                                        onClick={handleCopyKey}
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-error/10 border border-error/20 rounded-xl p-3 mb-4">
                            <p className="text-xs text-error font-bold mb-1">
                                ⚠️ Store this key securely!
                            </p>
                            <p className="text-xs text-error">
                                This key will only be shown once. If lost, you'll have to regenerate a new one.
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={handleDownloadKey}
                                variant="outline"
                                className="flex-1"
                            >
                                <Download className="w-4 h-4" />
                                Download JSON
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowKeyDialog(false);
                                    setGeneratedKey('');
                                    setShowFullKey(false);
                                    setCopied(false);
                                }}
                                className="flex-1"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileSidebar;
