import { NavLink } from 'react-router-dom';
import { APP_NAME } from '@/constants';

const Navbar = () => {
    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-200">
            <nav className="bg-surface/60 dark:bg-inverse-surface/60 backdrop-blur-lg border-2 border-outline-variant shadow-lg rounded-full px-8 py-3 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <NavLink to='/' className="font-extrabold text-[22px] text-primary">
                        {APP_NAME}
                    </NavLink>
                    <div className="hidden md:flex gap-6 items-center">
                        <NavLink 
                            to='/pricing' 
                            className={({ isActive }) => 
                                `text-[15.4px] font-semibold transition-all duration-200 ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`
                            }
                        >
                            Pricing
                        </NavLink>
                        <NavLink 
                            to='/docs' 
                            className={({ isActive }) => 
                                `text-[15.4px] font-semibold transition-all duration-200 ${isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`
                            }
                        >
                            Docs
                        </NavLink>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <NavLink
                        to='/login'
                        className="text-[15.4px] font-semibold text-on-surface-variant hover:opacity-80 transition-all"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to='/register'
                        className="bg-primary text-on-primary px-5 py-2 rounded-full text-[15.4px] font-bold hover:opacity-90 active:scale-95 transition-all"
                    >
                        Get Started
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;