// Frontend/src/components/Layout/ProfileSidebar.tsx
import { useState } from 'react';
import { Key, LogOut, Copy, Eye, EyeOff, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import authStore from '@/lib/zustandStore';
import { Button } from '../ui/button';

interface ProfileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileSidebar = ({ isOpen, onClose }: ProfileSidebarProps) => {
    const navigate = useNavigate();
    const [showApiKey, setShowApiKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const store = authStore();

    // Mock data - replace with actual user data from context/API
    const userData = {
        username: 'developer',
        email: 'dev@example.com',
        profilePic: 'https://api.dicebear.com/7.x/avataaars/svg?seed=developer',
        apiKey: 'tk_live_492x82abc123def456'
    };

    const handleCopyApiKey = () => {
        navigator.clipboard.writeText(userData.apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                className={`fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            <aside
                className={`fixed top-0 left-0 h-full w-80 bg-surface-container-low border-r border-outline-variant/20 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex flex-col h-full p-6">
                    <Button
                        onClick={onClose}
                        title="Close sidebar"
                        aria-label="Close sidebar"
                        className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-secondary hover:text-on-surface"
                    >
                        <X className="w-5 h-5" />
                    </Button>

                    {/* Profile Section */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container shadow-ambient">
                                <img src={userData.profilePic} alt={userData.username} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-on-surface">{userData.username}</h2>
                                <p className="text-sm text-secondary truncate">{userData.email}</p>
                            </div>
                        </div>
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
                                            value={userData.apiKey}
                                            readOnly
                                            title="API Key"
                                            aria-label="Production API Key"
                                            className="w-full bg-surface-container px-3 py-2 rounded-lg text-xs font-mono text-on-surface pr-20"
                                        />
                                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                            <Button
                                                onClick={() => setShowApiKey(!showApiKey)}
                                                title={showApiKey ? 'Hide API key' : 'Show API key'}
                                                aria-label={showApiKey ? 'Hide API key' : 'Show API key'}
                                                className="p-1.5 hover:bg-surface-container-high rounded-md transition-colors"
                                            >
                                                {showApiKey ? <EyeOff className="w-4 h-4 text-secondary" /> : <Eye className="w-4 h-4 text-secondary" />}
                                            </Button>
                                            <Button
                                                onClick={handleCopyApiKey}
                                                title="Copy API key"
                                                aria-label="Copy API key to clipboard"
                                                className="p-1.5 hover:bg-surface-container-high rounded-md transition-colors"
                                            >
                                                <Copy className={`w-4 h-4 ${copied ? 'text-primary' : 'text-secondary'}`} />
                                            </Button>
                                        </div>
                                    </div>
                                    {copied && <p className="text-xs text-primary mt-1">Copied!</p>}
                                </div>

                                <Button className="w-full text-xs font-bold text-primary hover:bg-primary/10 py-2 rounded-lg transition-colors">
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
