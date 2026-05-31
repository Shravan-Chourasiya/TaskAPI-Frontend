import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard } from 'lucide-react';
import { DICEBEAR_AVATAR_API } from '@/constants';
import { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';

const Navbar = () => {
    const auth = useAuth();
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        const greetings = [
            { time: [5, 12], messages: ['Rise & shine', 'Morning vibes', 'Fresh start', 'New day awaits'] },
            { time: [12, 17], messages: ['Keep going', 'Halfway there', 'Crushing it', 'Stay focused'] },
            { time: [17, 21], messages: ['Wrapping up', 'Evening grind', 'Final stretch', 'Nearly there'] },
            { time: [21, 5], messages: ['Night owl', 'Burning midnight', 'Late hustle', 'Rest soon'] }
        ];
        
        const timeSlot = greetings.find(g => 
            (g.time[0] < g.time[1] && hour >= g.time[0] && hour < g.time[1]) ||
            (g.time[0] > g.time[1] && (hour >= g.time[0] || hour < g.time[1]))
        );
        
        const messages = timeSlot?.messages || greetings[0].messages;
        return messages[Math.floor(Math.random() * messages.length)];
    };

    const avatarUrl = auth.user?.profile?.avatarUrl || `${DICEBEAR_AVATAR_API}?seed=${auth.user?.username || 'default'}`;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-semibold text-gray-900">
                        <NavLink to='/'>
                            TaskAPI
                        </NavLink>
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        <NavLink 
                            to='/docs' 
                            className={({ isActive }) => 
                                `text-sm transition-colors pb-1 border-b-2 ${isActive ? 'text-primary border-primary font-bold' : 'text-gray-600 border-transparent hover:text-gray-900'}`
                            }
                        >
                            Docs
                        </NavLink>
                        <NavLink 
                            to='/pricing' 
                            className={({ isActive }) => 
                                `text-sm transition-colors pb-1 border-b-2 ${isActive ? 'text-primary border-primary font-bold' : 'text-gray-600 border-transparent hover:text-gray-900'}`
                            }
                        >
                            Pricing
                        </NavLink>
                        <NavLink 
                            to='/contact' 
                            className={({ isActive }) => 
                                `text-sm transition-colors pb-1 border-b-2 ${isActive ? 'text-primary border-primary font-bold' : 'text-gray-600 border-transparent hover:text-gray-900'}`
                            }
                        >
                            Contact Us
                        </NavLink>
                    </nav>

                    <div className="flex items-center gap-3">
                        {auth.isAuthenticated ? (
                            <>
                                {isDashboard ? (
                                    <div className="flex items-center gap-3 relative right-[65px]">
                                        <div className="text-right">
                                            <p className="text-xs font-semibold text-primary animate-pulse">{getGreeting()} 👋</p>
                                            <p className="text-base font-bold text-on-surface">{auth.user?.username}</p>
                                        </div>
                                        <button
                                            onClick={() => setIsSidebarOpen(true)}
                                            className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shadow-md hover:shadow-lg hover:ring-2 hover:ring-primary/50 hover:scale-110 transition-all duration-300 flex-shrink-0"
                                        >
                                            <img src={avatarUrl} alt={auth.user?.username} className="w-full h-full object-cover" />
                                        </button>
                                    </div>
                                ) : (
                                    <NavLink
                                        to='/dashboard'
                                        className="bg-primary hover:bg-primary-container text-on-primary rounded-full px-6 py-2 text-sm font-bold transition-colors flex items-center gap-2"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </NavLink>
                                )}
                            </>
                        ) : (
                            <NavLink
                                to='/login'
                                className="bg-primary hover:bg-primary-container text-on-primary rounded-full px-6 py-2 text-sm font-bold transition-colors"
                            >
                                Get Alpha Access
                            </NavLink>
                        )}
                    </div>
                </div>
            </header>
            {auth.isAuthenticated && <ProfileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
        </>
    );
};

export default Navbar;
