import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../services/store';

export default function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#1e3a8a] text-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
            <span className="text-blue-900 font-bold">W</span>
          </div>
          <span className="font-bold text-xl tracking-tight">WalletWave</span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-sm relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-blue-800/50 border-none rounded-full py-2 pl-4 pr-10 text-sm focus:ring-2 focus:ring-yellow-400 placeholder:text-blue-200"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-200" />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 hover:bg-blue-800 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                {itemCount}
              </span>
            )}
          </Link>
          <Link to="/vendor" className="hidden md:flex items-center gap-2 p-2 hover:bg-blue-800 rounded-lg transition-colors">
            <User className="w-5 h-5" />
            <span className="text-sm font-medium">Account</span>
          </Link>
          <button className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
