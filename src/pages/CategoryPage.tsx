import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useCart } from '../services/store';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Fresh Maize (50kg)', price: 12500, vendor: 'Chambo Farms', category: 'farming', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '2', name: 'Airtel/Mpamba Kiosk', price: 450000, vendor: 'Smart Connect', category: 'electronics', image: 'https://images.unsplash.com/photo-1556742049-dfbd24439199?auto=format&fit=crop&q=80&w=400', verified: true },
  { id: '3', name: 'Chitenje Fabric', price: 8500, vendor: 'Blantyre Text', category: 'fashion', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=400', verified: false },
];

export default function CategoryPage() {
  const { id } = useParams();
  const { add } = useCart();
  
  const categoryTitle = id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Categories';
  const filteredProducts = MOCK_PRODUCTS.filter(p => p.category === id || !id);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Link to="/" className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 active:scale-95 transition-transform">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">{categoryTitle}</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
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
                <h3 className="font-bold text-sm text-slate-800 truncate hover:text-blue-600 transition-colors uppercase tracking-tight">{product.name}</h3>
              </Link>
              <p className="text-lg font-black text-slate-900">MWK {product.price.toLocaleString()}</p>
              <button 
                onClick={() => add(product)}
                className="w-full bg-slate-50 text-slate-900 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest active:bg-blue-600 active:text-white transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm">
          <p className="text-slate-400 font-bold italic tracking-tight underline decoration-slate-200">No items found in this category yet.</p>
          <Link to="/" className="inline-block mt-6 text-blue-600 font-black text-sm uppercase tracking-widest border-b-2 border-blue-600">Back to Shopping</Link>
        </div>
      )}
    </motion.div>
  );
}
