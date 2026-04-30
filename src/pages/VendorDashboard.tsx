import { motion } from 'motion/react';
import { LayoutDashboard, Package, TrendingUp, Plus, DollarSign, Users, CheckCircle2, Clock } from 'lucide-react';

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
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Business Dashboard</p>
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

      {/* Delivery Settings Mock */}
      <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg text-slate-800">Your Logistics</h2>
          <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Edit</button>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-dotted border-slate-200">
            <p className="text-[9px] font-black text-slate-400 uppercase">Delivery Fee</p>
            <p className="font-black text-slate-700">MWK 1,500</p>
          </div>
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-dotted border-slate-200">
            <p className="text-[9px] font-black text-slate-400 uppercase">Est. Arrival</p>
            <p className="font-black text-slate-700">2-4 Hours</p>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-bold text-lg text-slate-800">Recent Orders</h2>
          <button className="text-blue-600 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {RECENT_ORDERS.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-3xl border border-slate-100 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className={order.status === 'Delivered' ? 'text-green-500' : 'text-yellow-500'}>
                  {order.status === 'Delivered' ? <CheckCircle2 size={32} /> : <Clock size={32} />}
                </div>
                <div>
                  <h3 className="font-black text-slate-800">{order.id}</h3>
                  <p className="text-xs text-slate-500 font-medium">{order.customer} • {order.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-800 leading-none">MWK {order.total.toLocaleString()}</p>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-24 right-4 md:static md:mt-8">
        <button className="bg-blue-900 text-white w-14 h-14 md:w-full md:h-16 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
          <Plus size={32} className="md:w-6 md:h-6" />
          <span className="hidden md:inline font-bold">Add New Product</span>
        </button>
      </div>
    </motion.div>
  );
}
