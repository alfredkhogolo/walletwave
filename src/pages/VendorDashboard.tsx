import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { LayoutDashboard, Package, TrendingUp, Plus, DollarSign, Users, CheckCircle2, Clock, X, Image as ImageIcon, ArrowRight, Loader2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../services/store';

const STATS = [
  { label: 'Total Sales', value: 'MWK 245,600', icon: DollarSign, color: 'text-green-600 bg-green-50' },
  { label: 'Active Orders', value: '8', icon: Clock, color: 'text-blue-600 bg-blue-50' },
  { label: 'Total Views', value: '1.2k', icon: Users, color: 'text-purple-600 bg-purple-50' },
];

const RECENT_ORDERS = [
  { id: '#ORD-991', customer: 'Alfred K.', status: 'Pending', total: 12500, time: '2h ago' },
  { id: '#ORD-988', customer: 'Grace M.', status: 'Delivered', total: 8500, time: '5h ago' },
];

export default function VendorDashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState({ fee: 1500, time: '2-4 Hours' });
  const { products, addProduct } = useProducts();

  const [formData, setFormData] = useState({ name: '', price: '', stock: '', description: '' });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate upload delay
    setTimeout(() => {
      addProduct({
        name: formData.name,
        price: parseInt(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        vendor: 'Chambo Farms',
        vendorId: 'v1',
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b2527231?auto=format&fit=crop&q=80&w=400',
        deliveryPrice: settings.fee,
        deliveryHours: settings.time,
        telegram: 'chambofarms_mw'
      });
      setIsSubmitting(false);
      setIsAddModalOpen(false);
      setFormData({ name: '', price: '', stock: '', description: '' });
      alert('Product listed successfully on WalletWave!');
    }, 1500);
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSettingsModalOpen(false);
      alert('Logistics settings updated!');
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Business Hub</p>
          <h1 className="text-2xl font-black text-slate-800">Chambo Farms</h1>
        </div>
        <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
          CF
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center gap-4 shadow-sm">
            <div className={`${stat.color} p-3 rounded-2xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</p>
              <p className="text-xl font-black text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h2 className="font-bold text-lg text-slate-800">Your Logistics</h2>
          </div>
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 transition-colors active:bg-blue-100"
          >
            Edit Settings
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-dotted border-slate-200">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Standard Fee</p>
            <p className="font-black text-slate-800 text-lg">MWK {settings.fee.toLocaleString()}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-dotted border-slate-200">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Fast Delivery</p>
            <p className="font-black text-slate-800 text-lg">{settings.time}</p>
          </div>
        </div>
      </section>

      {/* My Products with View Counts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-slate-400" />
            My Listings Performance
          </h2>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3 Items active</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {products.filter(p => p.vendorId === 'v1' || p.vendor === 'Chambo Farms').map((prod) => (
            <div key={prod.id} className="bg-white p-3 rounded-3xl border border-slate-100 flex gap-4 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
              <img src={prod.image} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-black text-slate-800 uppercase tracking-tighter text-sm truncate max-w-[140px]">{prod.name}</h4>
                    <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded ${prod.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                      {prod.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </div>
                  <p className="text-blue-600 font-black text-xs leading-none">MWK {prod.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Users size={12} />
                    <span className="text-[9px] font-black tracking-widest uppercase">0 Visitors</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-green-500">
                    <TrendingUp size={12} />
                    <span className="text-[9px] font-black tracking-widest uppercase">New</span>
                  </div>
                </div>
              </div>
              <button className="p-3 text-slate-300">
                 <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            Recent Orders
          </h2>
          <Link to="/orders" className="text-blue-600 text-sm font-bold uppercase tracking-widest text-[10px]">View All</Link>
        </div>
        <div className="space-y-3">
          {RECENT_ORDERS.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm transition-transform active:scale-[0.99]">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                  {order.status === 'Delivered' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <h3 className="font-black text-slate-800">{order.id}</h3>
                  <p className="text-xs text-slate-500 font-medium">{order.customer} • {order.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800 leading-none mb-1">MWK {order.total.toLocaleString()}</p>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-24 right-4 md:static md:mt-8 z-40">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-900 text-white w-14 h-14 md:w-full md:h-16 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-300 active:scale-95 transition-all ring-4 ring-white"
        >
          <Plus size={32} className="md:w-6 md:h-6" />
          <span className="hidden md:inline font-black text-lg uppercase tracking-widest">Add New Product</span>
        </button>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSettingsModalOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-x-0 bottom-0 max-w-lg mx-auto bg-white rounded-t-[40px] z-[101] shadow-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Shop Settings</h2>
                  <p className="text-sm text-slate-400">Update your logistics and delivery info.</p>
                </div>
                <button onClick={() => setIsSettingsModalOpen(false)} className="p-3 bg-slate-100 rounded-full">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <form onSubmit={handleUpdateSettings} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Standard Delivery Fee (MWK)</label>
                    <input 
                      required 
                      type="number" 
                      value={settings.fee}
                      onChange={(e) => setSettings({ ...settings, fee: parseInt(e.target.value) || 0 })}
                      placeholder="1500" 
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 font-bold focus:ring-2 focus:ring-blue-600 transition-all shadow-inner" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Avg. Delivery Time</label>
                    <input 
                      required 
                      type="text" 
                      value={settings.time}
                      onChange={(e) => setSettings({ ...settings, time: e.target.value })}
                      placeholder="2-4 Hours" 
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 font-bold focus:ring-2 focus:ring-blue-600 transition-all shadow-inner" 
                    />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 text-white h-16 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Save Settings'}
                  {!isSubmitting && <ArrowRight size={24} />}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Product Modal Overlay */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="fixed inset-x-0 bottom-0 max-w-lg mx-auto bg-white rounded-t-[40px] z-[101] shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">List New Item</h2>
                  <p className="text-sm text-slate-400">Add a product to your Blantyre shop.</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="p-3 bg-slate-100 rounded-full active:scale-90 transition-transform">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    id="product-upload" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        alert(`Selected: ${e.target.files[0].name}`);
                      }
                    }}
                  />
                  <label 
                    htmlFor="product-upload"
                    className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-3 cursor-pointer group active:bg-slate-100 transition-colors block"
                  >
                    <div className="w-12 h-12 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-sm text-slate-400 group-hover:text-blue-600">
                      <ImageIcon size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 uppercase tracking-widest">Select Image</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Works on Camera & Gallery</p>
                    </div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Organic Tomatoes" 
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 font-bold focus:ring-2 focus:ring-blue-600 transition-all shadow-inner" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Price (MWK)</label>
                      <input 
                        required 
                        type="number" 
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="5500" 
                        className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 font-bold focus:ring-2 focus:ring-blue-600 transition-all shadow-inner" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Stock Left</label>
                      <input 
                        required 
                        type="number" 
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="10" 
                        className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 font-bold focus:ring-2 focus:ring-blue-600 transition-all shadow-inner" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Tell customers more about your item..." 
                      rows={3} 
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 font-bold focus:ring-2 focus:ring-blue-600 transition-all shadow-inner resize-none h-24" 
                    />
                  </div>
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 text-white h-16 rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all shadow-blue-100 disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Listing'}
                  {!isSubmitting && <ArrowRight size={24} />}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
