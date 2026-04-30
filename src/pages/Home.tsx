import { motion } from 'motion/react';
import { Package, Smartphone, Sprout, Shirt, Utensils, ArrowRight, ShieldCheck, ShoppingCart, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../services/store';

const CATEGORIES = [
  { id: 'food', name: 'Food', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { id: 'electronics', name: 'Elec', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
  { id: 'farming', name: 'Farm', icon: Sprout, color: 'bg-green-100 text-green-600' },
  { id: 'fashion', name: 'Style', icon: Shirt, color: 'bg-purple-100 text-purple-600' },
];

const MOCK_PRODUCTS = [
  { id: '1', name: 'Fresh Maize (50kg)', price: 12500, vendor: 'Chambo Farms', category: 'farming', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '2', name: 'Airtel/Mpamba Kiosk', price: 450000, vendor: 'Smart Connect', category: 'electronics', image: 'https://images.unsplash.com/photo-1556742049-dfbd24439199?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '3', name: 'Chitenje Fabric', price: 8500, vendor: 'Blantyre Text', category: 'fashion', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=400', verified: false },
];

export default function Home() {
  const { add } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-blue-200">
        <div className="relative z-10 space-y-3">
          <h1 className="text-3xl font-bold leading-tight">Fastest Market in <span className="text-yellow-300 underline decoration-yellow-400 decoration-2">Blantyre</span></h1>
          <p className="text-blue-100 text-sm max-w-[240px]">Buy from local trusted shops. Pay with Airtel Money or Mpamba.</p>
          <button className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg active:scale-95 transition-transform">
            Start Shopping
          </button>
        </div>
        <div className="absolute right-[-20px] top-[-20px] opacity-20">
          <Package size={180} />
        </div>
      </section>

      {/* Trust Banner */}
      <div className="flex items-center gap-3 bg-white border border-yellow-100 p-4 rounded-2xl">
        <div className="bg-yellow-400/20 p-2 rounded-full">
          <ShieldCheck className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-800">Verified Marketplace</p>
          <p className="text-xs text-slate-500">Safe payments & local coordination.</p>
        </div>
      </div>

      {/* Categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-bold text-lg text-slate-800">Categories</h2>
          <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
            See all <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} className="flex flex-col items-center gap-2 group">
              <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center group-active:scale-90 transition-transform shadow-sm`}>
                <cat.icon size={28} />
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Seller Onboarding CTA */}
      <section className="bg-slate-900 rounded-3xl p-6 text-white flex items-center gap-6 shadow-xl active:scale-[0.98] transition-transform">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Have a business in Blantyre?</h3>
          <p className="text-xs text-slate-400">Join 500+ local sellers today. Set your delivery price and hours.</p>
          <Link to="/register-vendor" className="inline-flex items-center gap-2 text-yellow-400 font-black text-sm uppercase tracking-widest mt-2">
            Start Selling <ArrowRight size={16} />
          </Link>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl">
          <Store size={32} className="text-blue-500" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-4 pb-12">
        <h2 className="font-bold text-lg text-slate-800 px-1">Top for You</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
              <Link to={`/product/${product.id}`} className="block aspect-square relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                {product.verified && (
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-blue-600" />
                    <span className="text-[8px] font-black text-blue-900 uppercase">Verified</span>
                  </div>
                )}
              </Link>
              <div className="p-3 space-y-1">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{product.vendor}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-bold text-sm text-slate-800 truncate hover:text-blue-600 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-lg font-black text-slate-900">MWK {product.price.toLocaleString()}</p>
                <button 
                  onClick={() => add(product)}
                  className="w-full bg-slate-50 text-slate-900 py-2 rounded-xl text-xs font-bold active:bg-blue-600 active:text-white transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
