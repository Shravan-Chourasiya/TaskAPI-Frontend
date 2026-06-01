import { Link } from "react-router-dom";
import { APP_NAME } from '@/constants';
import { Globe, Share2, Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-low pt-16 pb-12 border-t border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-extrabold text-xl text-primary mb-4 block">{APP_NAME}</span>
            <p className="text-on-surface-variant mb-6 max-w-xs">
              The infrastructure for developers to build and scale production-ready APIs with ease.
            </p>
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase tracking-wider text-on-surface">Subscribe to our newsletter</h5>
              <div className="flex gap-2">
                <input 
                  className="bg-surface border border-outline-variant rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-primary focus:border-transparent outline-none" 
                  placeholder="Enter your email" 
                  type="email"
                />
                <button className="bg-primary text-on-primary px-4 py-2 rounded-md text-sm whitespace-nowrap hover:opacity-90 transition-all">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-on-surface mb-6">Products</h5>
            <ul className="space-y-4 text-on-surface-variant">
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-on-surface mb-6">Company</h5>
            <ul className="space-y-4 text-on-surface-variant">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-on-surface mb-6">Resources</h5>
            <ul className="space-y-4 text-on-surface-variant">
              <li><Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-on-surface mb-6">Legal</h5>
            <ul className="space-y-4 text-on-surface-variant">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-outline-variant pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm">© 2024 {APP_NAME} Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Globe className="w-5 h-5" />
            </Link>
            <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Share2 className="w-5 h-5" />
            </Link>
            <Link to="#" className="text-on-surface-variant hover:text-primary transition-colors">
              <Terminal className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;