import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Home as HomeIcon, Search, ShoppingCart, User } from 'lucide-react';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import VendorDashboard from './pages/VendorDashboard';
import Header from './components/layout/Header';
import { cn } from './lib/utils';

import RegisterVendor from './pages/RegisterVendor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-slate-900 pb-20 md:pb-0">
        <Header />
        <main className="max-w-md mx-auto md:max-w-4xl px-4 py-6">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/vendor" element={<VendorDashboard />} />
              <Route path="/register-vendor" element={<RegisterVendor />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        {/* Mobile Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center md:hidden z-50">
          <MobileNavItem Icon={HomeIcon} label="Home" href="/" />
          <MobileNavItem Icon={Search} label="Search" href="/search" />
          <MobileNavItem Icon={ShoppingCart} label="Cart" href="/cart" />
          <MobileNavItem Icon={User} label="Profile" href="/vendor" />
        </nav>
      </div>
    </Router>
  );
}

function MobileNavItem({ Icon, label, href }: { Icon: any, label: string, href: string }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link 
      to={href} 
      className={cn(
        "flex flex-col items-center gap-1 transition-colors duration-200", 
        isActive ? "text-blue-600" : "text-gray-400"
      )}
    >
      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[10px] font-bold tracking-tight uppercase">{label}</span>
    </Link>
  );
}

export default App;
