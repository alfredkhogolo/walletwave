import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Phone, ShieldCheck, MapPin, Clock, Star, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart } from '../services/store';

const MOCK_PRODUCTS = [
  { 
    id: '1', 
    name: 'Fresh Maize (50kg)', 
    price: 12500, 
    vendor: 'Chambo Farms', 
    category: 'farming', 
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800', 
    verified: true, 
    description: 'High-quality freshly harvested maize from Salima. Perfect for local processing or direct sale.', 
    stock: 15, 
    rating: 4.8,
    deliveryPrice: 1500,
    deliveryHours: '2-4 hours',
    telegram: 'chambofarms_mw'
  },
  { 
    id: '2', 
    name: 'Airtel/Mpamba Kiosk', 
    price: 450000, 
    vendor: 'Smart Connect', 
    category: 'electronics', 
    image: 'https://images.unsplash.com/photo-1556742049-dfbd24439199?auto=format&fit=crop&q=80&w=800', 
    verified: true, 
    description: 'Standard size metal kiosk, painted and ready for use. Includes secure locking mechanism.', 
    stock: 2, 
    rating: 5.0,
    deliveryPrice: 5000,
    deliveryHours: '24-48 hours',
    telegram: 'smartconnect_mw'
  },
  { 
    id: '3', 
    name: 'Chitenje Fabric', 
    price: 8500, 
    vendor: 'Blantyre Text', 
    category: 'fashion', 
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800', 
    verified: false, 
    description: 'Beautiful traditional patterns, 6 yards. High quality cotton.', 
    stock: 50, 
    rating: 4.2,
    deliveryPrice: 1000,
    deliveryHours: '1-2 hours',
    telegram: 'bttextiles'
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32"
    >
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-slate-600 font-medium active:scale-95"
      >
        <ChevronLeft size={20} />
        Back to Results
      </button>

      {/* Main Content */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
        <div className="aspect-[4/3] relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.verified && (
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg scale-110">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black text-blue-900 uppercase tracking-widest">Verified Seller</span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{product.vendor}</p>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-yellow-700">{product.rating}</span>
              </div>
            </div>
            <h1 className="text-2xl font-black text-slate-800 leading-tight">{product.name}</h1>
            <p className="text-3xl font-black text-slate-900 tracking-tight">MWK {product.price.toLocaleString()}</p>
          </div>

          {/* Delivery Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Delivery Price</span>
              </div>
              <p className="text-sm font-black text-slate-700">MWK {product.deliveryPrice.toLocaleString()}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Arrival Time</span>
              </div>
              <p className="text-sm font-black text-slate-700">{product.deliveryHours}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-800">About this product</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Chat Options */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect with Vendor</p>
            <div className="flex gap-2">
              <a 
                href={`https://t.me/${product.telegram}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#0088cc] text-white h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md shadow-blue-100 active:scale-95 transition-transform"
              >
                <Send size={18} />
                Chat on Telegram
              </a>
              <a 
                href="tel:+265888000000"
                className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-green-100 active:scale-95 transition-transform"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-slate-200 p-4 md:static md:bg-transparent md:border-none md:p-0 md:mt-8 z-40">
        <div className="max-w-md mx-auto md:max-w-none">
          <button 
            onClick={() => {
              add(product);
              navigate('/cart');
            }}
            className="w-full bg-blue-900 text-white h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-200"
          >
            <ShoppingCart size={24} />
            Buy Now • MWK {product.price.toLocaleString()}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
