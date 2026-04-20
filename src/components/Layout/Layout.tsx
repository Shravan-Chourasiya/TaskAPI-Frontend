import React from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20 selection:text-primary bg-surface transition-colors duration-500">
      <Navbar />
      <main className="grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
