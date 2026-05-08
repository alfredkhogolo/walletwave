import { motion } from 'motion/react';
import { Package, Smartphone, Sprout, Shirt, Utensils, ArrowRight, ShieldCheck, ShoppingCart, Store, Star, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart, useVendors, useProducts } from '../services/store';

const CATEGORIES = [
  { id: 'food', name: 'Food', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
  { id: 'electronics', name: 'Elec', icon: Smartphone, color: 'bg-blue-100 text-blue-600' },
  { id: 'farming', name: 'Farm', icon: Sprout, color: 'bg-green-100 text-green-600' },
  { id: 'fashion', name: 'Style', icon: Shirt, color: 'bg-purple-100 text-purple-600' },
];

export default function Home() {
  const { add } = useCart();
  const { vendors } = useVendors();
  const { products } = useProducts();

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
          <Link to="/search" className="inline-block bg-yellow-400 text-blue-900 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
            Start Shopping
          </Link>
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
          <Link to="/search" className="text-blue-600 text-sm font-medium flex items-center gap-1">
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.id}`} className="flex flex-col items-center gap-2 group">
              <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center group-active:scale-90 transition-transform shadow-sm`}>
                <cat.icon size={28} />
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Shops - eBay Style */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-black text-xl text-slate-800 flex items-center gap-2 italic">
            <Store className="text-blue-600" />
            Top Rated Shops
          </h2>
          <Link to="/search" className="text-xs font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-600 pb-0.5">Explore All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="flex-shrink-0 w-64 bg-white rounded-3xl p-4 border border-slate-100 shadow-sm relative group hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors uppercase">
                    {vendor.logo}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 uppercase tracking-tighter flex items-center gap-1">
                      {vendor.name}
                      {vendor.verified && <CheckCircle2 size={12} className="text-blue-500" />}
                    </h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{vendor.category}</p>
                  </div>
                </div>
                {vendor.verified && (
                  <div className="bg-yellow-400/10 text-yellow-600 p-1.5 rounded-xl">
                    <Star size={14} fill="currentColor" />
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill={i < Math.floor(vendor.rating) ? 'currentColor' : 'none'} className={i < Math.floor(vendor.rating) ? '' : 'text-slate-200'} />
                    ))}
                  </div>
                  <span className="text-[10px] font-black underline decoration-slate-200 underline-offset-2 ml-1">{vendor.reviews} reviews</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-[9px] font-black uppercase tracking-widest">
                  <div className="bg-slate-50 p-2 rounded-xl text-slate-500 flex flex-col gap-1">
                    <span className="opacity-60 text-[7px]">Delivery From</span>
                    <span className="text-slate-800">MWK {vendor.deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl text-slate-500 flex flex-col gap-1">
                    <span className="opacity-60 text-[7px]">Est. Time</span>
                    <span className="text-slate-800">{vendor.deliveryTime}</span>
                  </div>
                </div>
                
                <Link to={`/search?q=${vendor.name}`} className="w-full bg-slate-900 text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-blue-600 transition-colors">
                  Visit Shop
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Flash Deals - AliExpress Style */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-md animate-pulse">DEALS</div>
            <h2 className="font-bold text-lg text-slate-800 tracking-tight">Flash Sale</h2>
          </div>
          <div className="text-red-600 font-black text-xs tabular-nums">04:22:15</div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
          {products.map((product) => (
            <Link key={`deal-${product.id}`} to={`/product/${product.id}`} className="flex-shrink-0 w-32 bg-white rounded-2xl overflow-hidden shadow-sm border border-red-50">
              <div className="aspect-square relative">
                <img src={product.image} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-[8px] font-black py-1 text-center uppercase">
                  -20% OFF
                </div>
              </div>
              <div className="p-2">
                <p className="font-black text-xs text-slate-900 leading-none">MWK {(product.price * 0.8).toLocaleString()}</p>
                <div className="w-full bg-slate-100 h-1 rounded-full mt-2 overflow-hidden">
                  <div className="bg-red-500 h-full w-[70%]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Seller Onboarding CTA */}
      <section className="bg-slate-900 rounded-3xl p-6 text-white flex items-center gap-6 shadow-xl active:scale-[0.98] transition-transform">
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-bold">Have a business in Blantyre?</h3>
          <p className="text-xs text-slate-400">Join 500+ local sellers today. Set your delivery price and hours.</p>
          <Link to="/register-vendor" className="inline-flex items-center gap-2 text-yellow-400 font-black text-sm uppercase tracking-widest mt-2 active:translate-x-1 transition-transform">
            Start Selling <ArrowRight size={16} />
          </Link>
        </div>
        <div className="bg-slate-800 p-4 rounded-2xl hidden sm:block">
          <Store size={32} className="text-blue-500" />
        </div>
      </section>

      {/* Daily Discovery Grid */}
      <section className="space-y-4 pb-12">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-black text-xl text-slate-800 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-600 rounded-full" />
            Daily Discovery
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 flex flex-col group active:scale-[0.98] transition-transform">
              <Link to={`/product/${product.id}`} className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  loading="lazy"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
                  New Arrival
                </div>
              </Link>
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{product.vendor}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-sm text-slate-800 line-clamp-2 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  </Link>
                </div>
                
                <div className="pt-2 space-y-3">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[8px] text-slate-400 font-bold uppercase line-through mb-0.5">MWK {(product.price * 1.2).toLocaleString()}</p>
                      <p className="text-xl font-black text-slate-900 tracking-tighter leading-none">MWK {product.price.toLocaleString()}</p>
                    </div>
                    <div className="text-[9px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded">12 Sold</div>
                  </div>
                  
                  <button 
                    onClick={() => add(product)}
                    className="w-full bg-slate-900 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest active:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                  >
                    <ShoppingCart size={14} strokeWidth={3} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
