import { motion } from 'motion/react';
import { Search, Package, ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts, useCart } from '../services/store';
import { useState } from 'react';

export default function SearchPage() {
  const { products } = useProducts();
  const { add } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="relative">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search items in Blantyre..." 
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-800 font-bold shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          autoFocus
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
      </div>

      {searchQuery ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-black text-slate-800 uppercase tracking-tighter">Results for "{searchQuery}"</h2>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredProducts.length} Items found</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white p-3 rounded-3xl border border-slate-100 flex gap-4 shadow-sm group hover:border-blue-200 transition-colors">
                <Link to={`/product/${product.id}`} className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{product.vendor}</p>
                      <div className="flex items-center gap-0.5 text-yellow-400">
                        <Star size={10} fill="currentColor" />
                        <span className="text-[10px] font-black text-slate-800">{product.rating}</span>
                      </div>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-sm font-black text-slate-900 mt-1">MWK {product.price.toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => add(product)}
                    className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 w-fit px-3 py-1.5 rounded-lg border border-blue-100"
                  >
                    <ShoppingCart size={12} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300">
                  <Search size={32} />
                </div>
                <div>
                  <p className="font-black text-slate-800 uppercase tracking-tighter">No items found</p>
                  <p className="text-xs text-slate-400">Try searching for Maize, Kiosk or Fabric</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Recent Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Fresh Maize', 'Chitenje Fabric', 'Kiosk', 'Farming Tools'].map(label => (
                <button 
                  key={label} 
                  onClick={() => setSearchQuery(label)}
                  className="bg-white border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 active:bg-blue-50 active:text-blue-600 transition-all shadow-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h2 className="font-bold text-lg text-slate-800">Popular Categories</h2>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/category/farming" className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between group shadow-sm active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-2xl">
                    <Package size={24} />
                  </div>
                  <span className="font-bold text-slate-700">Farming & Agriculture</span>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </Link>
              <Link to="/category/electronics" className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between group shadow-sm active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl">
                    <Package size={24} />
                  </div>
                  <span className="font-bold text-slate-700">Electronics & Gadgets</span>
                </div>
                <ArrowRight size={20} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
              </Link>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
