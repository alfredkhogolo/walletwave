import { Search, ShoppingCart, User, Menu, Home, X, Package, ShieldCheck, ChevronRight, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart, useAuth } from '../../services/store';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { cart } = useCart();
  const { user, login, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSignIn = () => {
    // Simple simulated login
    login({ name: 'Alfred K.', email: 'alfred@example.com', avatar: 'AK' });
  };

  const menuItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'My Orders', icon: Package, href: '/orders' },
    { label: 'Vendor Dashboard', icon: User, href: '/vendor' },
    { label: 'Start Selling', icon: ShieldCheck, href: '/register-vendor' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#1e3a8a] text-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-blue-800 rounded-lg transition-colors border border-blue-700 md:border-none"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-blue-900/40">
              <span className="text-blue-900 font-black text-xl">W</span>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-black text-lg tracking-tighter uppercase leading-none">WalletWave</span>
              <span className="text-[8px] font-black tracking-[0.2em] text-yellow-400 uppercase opacity-80 leading-none">Market</span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-sm relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              onFocus={() => navigate('/search')}
              className="w-full bg-blue-800/50 border-none rounded-full py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-yellow-400 placeholder:text-blue-200 cursor-pointer"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200" />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {!isLoggedIn ? (
              <button 
                onClick={handleSignIn}
                className="hidden md:flex items-center gap-2 px-4 py-2 border border-blue-400 rounded-full text-sm font-bold hover:bg-blue-800 transition-colors"
              >
                Sign in
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-3 pr-2 border-r border-blue-700">
                <span className="text-[10px] uppercase font-black tracking-widest text-blue-200">Hi, {user.name.split(' ')[0]}</span>
              </div>
            )}

            <Link to="/cart" className="relative p-2 hover:bg-blue-800 rounded-full transition-colors border border-blue-700 md:border-none">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {isLoggedIn ? (
              <Link to="/vendor" className="p-2 hover:bg-blue-800 rounded-full md:rounded-lg md:px-4 flex items-center gap-2 border border-blue-700 md:border-none">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-[10px] font-black border border-blue-500">
                  {user.avatar}
                </div>
                <span className="text-sm font-medium hidden md:inline">Account</span>
              </Link>
            ) : (
              <button onClick={handleSignIn} className="p-2 hover:bg-blue-800 rounded-full md:hidden">
                <User className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Side Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-[101] shadow-2xl flex flex-col"
            >
              <div className="bg-[#1e3a8a] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                    <span className="text-blue-900 font-bold text-xl">W</span>
                  </div>
                  <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-blue-800 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-700 rounded-2xl flex items-center justify-center font-black text-lg border-2 border-blue-500 shadow-xl">
                        {user.avatar}
                      </div>
                      <div>
                        <h2 className="text-xl font-black">{user.name}</h2>
                        <p className="text-blue-200 text-xs">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-300 hover:text-white transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-black">Welcome to Wave</h2>
                    <p className="text-blue-200 text-sm mb-4">Blantyre's Trusted Market</p>
                    <button 
                      onClick={() => {
                        handleSignIn();
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-white text-blue-900 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn size={18} />
                      Sign In Now
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-6">
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/search');
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 flex items-center gap-3 text-slate-400 font-medium"
                  >
                    <Search size={18} />
                    <span>Quick search...</span>
                  </button>
                </div>

                <div className="space-y-1 px-2">
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 text-slate-700 group transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                        <span className="font-bold">{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </Link>
                  ))}
                </div>

                <div className="mt-8 px-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Categories</p>
                  <div className="grid grid-cols-1 gap-2">
                    {['Farming', 'Electronics', 'Fashion', 'Home Goods'].map(cat => (
                      <Link 
                        key={cat}
                        to={`/category/${cat.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm font-bold text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 italic text-[10px] text-slate-400 font-medium">
                WalletWave Market v1.0.0 • Verified in Malawi
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
