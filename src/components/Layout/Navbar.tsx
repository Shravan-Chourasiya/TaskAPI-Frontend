import { NavLink, useNavigate } from 'react-router-dom';
import { APP_NAME, DICEBEAR_AVATAR_API } from '@/constants';
import authStore from '@/lib/zustandStore';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = authStore();
    const avatarUrl = user?.profile?.avatarUrl || `${DICEBEAR_AVATAR_API}?seed=${user?.username || 'default'}`;
    const hasProfile = user?.profile && (user.profile.firstName || user.profile.lastName || user.profile.bio);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <nav className="h-full max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <NavLink to='/' className="font-extrabold text-2xl text-[#004e47]">
                        {APP_NAME}
                    </NavLink>
                    <div className="hidden md:flex gap-6 items-center">
                        <NavLink 
                            to='/pricing' 
                            className={({ isActive }) => 
                                `text-sm font-semibold transition-all duration-200 ${isActive ? 'text-[#004e47]' : 'text-gray-600 hover:text-[#004e47]'}`
                            }
                        >
                            Pricing
                        </NavLink>
                        <NavLink 
                            to='/docs' 
                            className={({ isActive }) => 
                                `text-sm font-semibold transition-all duration-200 ${isActive ? 'text-[#004e47]' : 'text-gray-600 hover:text-[#004e47]'}`
                            }
                        >
                            Docs
                        </NavLink>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {isAuthenticated && user ? (
                        <>
                            <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                                Hello, {user.username}
                            </span>
                            <button
                                onClick={() => navigate(hasProfile ? '/profile' : '/profile/edit')}
                                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#004e47]/20 hover:border-[#004e47] transition-all"
                            >
                                <img src={avatarUrl} alt={user.username} className="w-full h-full object-cover" />
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to='/login'
                                className="text-sm font-semibold text-gray-600 hover:text-[#004e47] transition-all"
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to='/register'
                                className="bg-[#004e47] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#004e47]/90 transition-all"
                            >
                                Get Started
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;