import { motion } from 'motion/react';
import { Store, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVendors } from '../services/store';

export default function RegisterVendor() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fee, setFee] = useState(1500);
  const navigate = useNavigate();
  const { addVendor } = useVendors();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      addVendor({
        name,
        logo: name.substring(0, 2).toUpperCase(),
        deliveryFee: fee,
        category: 'Market Shop',
        deliveryTime: '2-4 Hours'
      });
      navigate('/vendor');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8 py-4"
    >
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-blue-50">
          <Store size={32} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Open Your Shop</h1>
        <p className="text-sm text-slate-500">Sell to thousands of customers in Blantyre.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center gap-4">
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`h-1.5 w-12 rounded-full transition-colors ${step >= s ? 'bg-blue-600' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="font-bold text-lg text-slate-800">Business Details</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Shop Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Blantyre Spices"
                  className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number (Airtel/Mpamba)</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="088..."
                    className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-600 font-medium"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="font-bold text-lg text-slate-800">Location & Delivery</h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Primary Area</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-600 font-medium appearance-none">
                    <option>Blantyre CBD</option>
                    <option>Limbe</option>
                    <option>Chichiri</option>
                    <option>Ndirande</option>
                  </select>
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Average Delivery Price (MWK)</label>
                <input 
                  type="number" 
                  value={fee}
                  onChange={(e) => setFee(parseInt(e.target.value) || 0)}
                  placeholder="1500"
                  className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-600 font-medium"
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 py-6 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h2 className="font-bold text-xl text-slate-800">You're Ready!</h2>
              <p className="text-sm text-slate-500 mt-2">Finish setting up to start listing your first products.</p>
            </div>
          </motion.div>
        )}

        <button 
          onClick={handleNext}
          className="w-full bg-blue-600 text-white h-14 rounded-2xl font-black mt-8 flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-100"
        >
          {step === 3 ? 'Go to Dashboard' : 'Continue'}
          <ArrowRight size={18} />
        </button>
      </div>

      <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest px-8">
        By continuing, you agree to WalletWave's Vendor Terms and 5% commission per sale.
      </p>
    </motion.div>
  );
}
