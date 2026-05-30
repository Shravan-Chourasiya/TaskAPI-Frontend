// Frontend/src/components/Layout/ProfileSidebar.tsx
import { useState } from 'react';
import { Key, LogOut, Copy, Eye, EyeOff, X, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authStore from '@/lib/zustandStore';
import { Button } from '../ui/button';
import { DICEBEAR_AVATAR_API, MOCK_API_KEY, COPIED_FEEDBACK_DURATION } from '@/constants';

const ProfileSidebar = () => {
    const navigate = useNavigate();
    const [showApiKey, setShowApiKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const store = authStore();
    const user = store.user;

    // Fallback avatar if no profile avatar
    const avatarUrl = user?.profile?.avatarUrl || `${DICEBEAR_AVATAR_API}?seed=${user?.username || 'default'}`;
    const displayName = user?.profile?.firstName && user?.profile?.lastName 
        ? `${user.profile.firstName} ${user.profile.lastName}`
        : user?.username || 'User';

    // Mock API key - replace with actual API key from backend
    const apiKey = MOCK_API_KEY;

    const handleCopyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), COPIED_FEEDBACK_DURATION);
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
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full overflow-hidden bg-surface-container shadow-md hover:shadow-lg transition-shadow"
            >
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            </button>

            <div
                className={`fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsOpen(false)}
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
                                onClick={() => setIsOpen(false)}
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
                    <div className="flex-1 mb-6">
                        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-ambient">
                            <div className="flex items-center gap-2 mb-4">
                                <Key className="w-5 h-5 text-primary" />
                                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">API Keys</h3>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label htmlFor="api-key-input" className="text-xs text-secondary font-bold mb-2 block">
                                        Production Key
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="api-key-input"
                                            type={showApiKey ? 'text' : 'password'}
                                            value={apiKey}
                                            readOnly
                                            title="API Key"
                                            aria-label="Production API Key"
                                            className="w-full bg-surface-container px-3 py-2 rounded-lg text-xs font-mono text-on-surface pr-20"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                            <Button
                                                onClick={() => setShowApiKey(!showApiKey)}
                                                variant="ghost"
                                                size="icon"
                                                title={showApiKey ? 'Hide API key' : 'Show API key'}
                                                aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                                                className="h-7 w-7"
                                            >
                                                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </Button>
                                            <Button
                                                onClick={handleCopyApiKey}
                                                variant="ghost"
                                                size="icon"
                                                title="Copy API key"
                                                aria-label="Copy API key to clipboard"
                                                className="h-7 w-7"
                                            >
                                                <Copy className={`w-4 h-4 ${copied ? 'text-primary' : ''}`} />
                                            </Button>
                                        </div>
                                    </div>
                                    {copied && <p className="text-xs text-primary mt-1">Copied!</p>}
                                </div>

                                <Button
                                    variant="ghost"
                                    className="w-full text-primary hover:bg-primary/10"
                                >
                                    Generate New Key
                                </Button>
                            </div>
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
        </>
    );
};

export default ProfileSidebar;
