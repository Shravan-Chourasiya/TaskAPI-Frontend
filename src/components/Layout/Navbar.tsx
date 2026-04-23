import { NavLink } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';
import axios from 'axios';
import { config } from '../../utils/config';
import { Button } from '../ui/button';

const Navbar = () => {

    const handleLogout = async () => {
        try {
            await axios.delete(`${config.SERVER_URL}/api/v1/auth/logout`, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="text-xl font-semibold text-gray-900">
                    <NavLink to='/'>
                        TaskAPI
                    </NavLink>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <NavLink to='/docs' className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Docs
                    </NavLink>
                    <NavLink to='/pricing' className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Pricing
                    </NavLink>
                    <NavLink to='/contact' className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        Contact Us
                    </NavLink>
                </nav>

                <div className="flex items-center gap-3">
                    {/* {user ? ( */}
                            <NavLink 
                                to='/dashboard' 
                                className="bg-primary hover:bg-primary-container text-on-primary rounded-full px-6 py-2 text-sm font-bold transition-colors flex items-center gap-2"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </NavLink>
                            <Button 
                                onClick={handleLogout}
                                className="bg-surface-container hover:bg-surface-container-high text-on-surface rounded-full px-6 py-2 text-sm font-bold transition-colors flex items-center gap-2"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </Button>
                    {/* ) : (
                        <NavLink 
                            to='/login' 
                            className="bg-primary hover:bg-primary-container text-on-primary rounded-full px-6 py-2 text-sm font-bold transition-colors"
                        >
                            Get Alpha Access
                        </NavLink>
                    )} */}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
