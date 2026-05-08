import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, ArrowRight, Smartphone, Truck, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../services/store';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, total, updateQuantity, remove, clear } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'selection' | 'processing' | 'done'>('selection');
  const [payMethod, setPayMethod] = useState<'cod' | 'mobile'>('cod');
  const [deliveryType, setDeliveryType] = useState<'standard' | 'wave_fast'>('standard');
  const [phone, setPhone] = useState('');

  const deliveryPrice = deliveryType === 'wave_fast' ? 5000 : 2500;
  const grandTotal = total + deliveryPrice;

  const handleOrder = () => {
    if (payMethod === 'mobile') {
      if (!phone) {
        alert('Please enter your mobile money number first');
        return;
      }
      setPaymentStep('processing');
      // Simulate Airtel/Mpamba USSD Push
      setTimeout(() => {
        setPaymentStep('done');
        setIsOrdered(true);
        setTimeout(() => clear(), 2000);
      }, 3000);
    } else {
      // Cash on Delivery specific confirmation
      alert(`Confirming MWK ${grandTotal.toLocaleString()} Cash on Delivery...`);
      setIsOrdered(true);
      setTimeout(() => clear(), 2000);
    }
  };

  if (isOrdered) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-12 text-center space-y-6 border border-slate-100 shadow-xl"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 size={40} />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-800">Order Placed!</h1>
          <p className="text-slate-500 text-sm">
            {payMethod === 'mobile' 
              ? `Payment received. Vendor notified via WhatsApp.` 
              : `Payment of MWK ${grandTotal.toLocaleString()} due on delivery.`}
          </p>
          <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3 justify-center mt-4">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-bold text-blue-900 uppercase">Wave Protected Order</span>
          </div>
        </div>
        <Link to="/" className="inline-block bg-blue-900 text-white px-8 py-3 rounded-2xl font-black uppercase text-sm tracking-widest shadow-lg active:scale-95 transition-transform">
          Continue Shopping
        </Link>
      </motion.div>
    );
  }

  if (paymentStep === 'processing') {
    return (
      <div className="bg-white rounded-3xl p-12 text-center space-y-6 border border-slate-100 shadow-xl min-h-[400px] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Processing Payment...</h2>
          <p className="text-sm text-slate-400">Please check your phone for the PIN request from <span className="font-bold text-slate-800">WalletWave Pay</span>.</p>
        </div>
      </div>
    );
  }

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
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4">
          <p className="italic text-slate-400">Your basket is empty.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 font-bold uppercase text-xs tracking-widest border-b-2 border-blue-600">Start Shopping</Link>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-3 rounded-2xl border border-slate-100 flex gap-4 shadow-sm transition-all hover:border-blue-200">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1 py-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm truncate">{item.name}</h3>
                    <p className="text-lg font-black text-slate-900 tracking-tight">MWK {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-slate-50 px-2 rounded-lg border border-slate-100">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 font-black h-8 w-6">-</button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-blue-600 font-black h-8 w-6">+</button>
                    </div>
                    <button onClick={() => remove(item.id)} className="text-red-400 p-2 active:scale-90 transition-transform">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 space-y-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-50 pb-2">Delivery Options</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setDeliveryType('standard')}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${deliveryType === 'standard' ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100' : 'border-slate-100 hover:border-blue-200'}`}
              >
                <div>
                  <p className="font-bold text-slate-800">Standard Delivery</p>
                  <p className="text-xs text-slate-500">2-4 Hours in Blantyre</p>
                </div>
                <span className="font-black text-slate-900">MWK 2,500</span>
              </button>
              <button 
                onClick={() => setDeliveryType('wave_fast')}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${deliveryType === 'wave_fast' ? 'border-yellow-500 bg-yellow-50 ring-2 ring-yellow-100' : 'border-slate-100 hover:border-blue-200'}`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-800 italic">Wave Fast</p>
                    <span className="bg-yellow-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest">Recommended</span>
                  </div>
                  <p className="text-xs text-slate-500 underline decoration-yellow-400 decoration-2">Arrives in &lt; 45 Mins</p>
                </div>
                <span className="font-black text-slate-900">MWK 5,000</span>
              </button>
            </div>
          </div>

          <div className="bg-blue-900 rounded-3xl p-6 text-white space-y-6 shadow-xl shadow-blue-100">
            <h2 className="font-bold flex items-center gap-2 text-blue-200 uppercase text-[10px] tracking-widest">
              Order Summary
            </h2>
            
            <div className="space-y-3 border-b border-white/10 pb-4">
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60 font-medium">Subtotal</span>
                <span className="font-bold">MWK {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="opacity-60 font-medium">Delivery</span>
                <span className="font-bold">MWK {deliveryPrice.toLocaleString()}</span>
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="font-black text-xl">Total</span>
                <span className="text-3xl font-black tracking-tighter">MWK {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Payment Method</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setPayMethod('mobile')}
                  className={`h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all ${payMethod === 'mobile' ? 'bg-white text-blue-900 border-white' : 'bg-white/10 text-white border-white/20'}`}
                >
                  <Smartphone size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Airtel/Mpamba</span>
                </button>
                <button 
                  onClick={() => setPayMethod('cod')}
                  className={`h-14 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all ${payMethod === 'cod' ? 'bg-white text-blue-900 border-white' : 'bg-white/10 text-white border-white/20'}`}
                >
                  <Truck size={18} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">Cash on Delivery</span>
                </button>
              </div>

              <AnimatePresence>
                {payMethod === 'mobile' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }} 
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="text-[9px] font-black text-blue-200 uppercase tracking-widest ml-1">Mobile Money Number</label>
                    <input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+265..."
                      className="w-full bg-blue-800 text-white border-none rounded-xl py-3 px-4 font-bold placeholder:text-blue-400 focus:ring-2 focus:ring-yellow-400"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                onClick={handleOrder}
                className="w-full bg-yellow-400 text-blue-900 h-16 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
              >
                {payMethod === 'mobile' ? 'Pay Now' : 'Confirm Order'}
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
