import { motion } from 'motion/react';
import { ShoppingBag, Trash2, ArrowRight, Smartphone, Truck } from 'lucide-react';
import { useCart } from '../services/store';

export default function Cart() {
  const { cart, total, updateQuantity, remove } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
          <ShoppingBag size={24} />
        </div>
        <h1 className="text-2xl font-black text-slate-800">Your Basket</h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-slate-100 italic text-slate-400">
          Your basket is empty. Start shopping!
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-2xl border border-slate-100 flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 py-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm truncate">{item.name}</h3>
                    <p className="text-lg font-black text-slate-900">MWK {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-slate-50 px-2 rounded-lg border border-slate-100">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="text-slate-400 font-black h-8 w-6"
                      >-</button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="text-blue-600 font-black h-8 w-6"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => remove(item.id)}
                      className="text-red-400 p-2 active:scale-90 transition-transform"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-900 rounded-3xl p-6 text-white space-y-6 shadow-xl shadow-blue-200">
            <h2 className="font-bold flex items-center gap-2 text-blue-200 uppercase text-xs tracking-widest">
              Checkout Summary
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60">Subtotal</span>
                <span className="font-bold">MWK {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="opacity-60">Delivery (Blantyre)</span>
                  <div className="bg-blue-800 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest text-blue-200">
                    Est. 2-4 hrs
                  </div>
                </div>
                <span className="font-bold">MWK 2,500</span>
              </div>
              <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-2xl font-black">MWK {(total + 2500).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Select Payment Method</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-white/10 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border border-white/20 active:bg-white/20 transition-colors">
                  <Smartphone size={20} className="text-yellow-400" />
                  <span className="text-[10px] font-bold">Mobile Money</span>
                </button>
                <button className="bg-white/10 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border border-white/20 active:bg-white/20 transition-colors">
                  <Truck size={20} className="text-green-400" />
                  <span className="text-[10px] font-bold">Pay on Delivery</span>
                </button>
              </div>

              <button className="w-full bg-yellow-400 text-blue-900 h-16 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg hover:bg-yellow-300 active:scale-95 transition-all outline-none border-none">
                Confirm Order
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
