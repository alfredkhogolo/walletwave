import { motion } from 'motion/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Phone, ShieldCheck, MapPin, Clock, Star, Send, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCart, useProducts, useVendors, useAuth } from '../services/store';
import React, { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { products } = useProducts();
  const { vendors, addComment } = useVendors();
  const { user, isLoggedIn } = useAuth();
  const [commentText, setCommentText] = useState('');

  const product = products.find(p => p.id === id) || products[0];
  const vendor = vendors.find(v => v.id === product.vendorId) || vendors.find(v => v.name === product.vendor);
  const comments = vendor?.comments || [];

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !vendor) return;
    
    addComment(vendor.id, {
      user: user?.name || 'Guest User',
      text: commentText,
      date: new Date().toISOString()
    });
    setCommentText('');
  };

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
              <button 
                onClick={() => navigate('/inbox')}
                className="flex-1 bg-blue-600 text-white h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md shadow-blue-100 active:scale-95 transition-transform"
              >
                <MessageSquare size={18} />
                Chat Internally
              </button>
              <a 
                href={`https://t.me/${product.telegram}`}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-[#0088cc] text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-100 active:scale-95 transition-transform"
              >
                <Send size={18} />
              </a>
              <a 
                href="tel:+265888000000"
                className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-md shadow-green-100 active:scale-95 transition-transform"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>

          {/* Comments Section */}
          <div className="pt-6 border-t border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-800 uppercase tracking-tighter">Business Reviews</h3>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{comments.length} Comments</span>
            </div>

            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={isLoggedIn ? "Write a comment about this vendor..." : "Please sign in to comment"}
                disabled={!isLoggedIn}
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-blue-600 min-h-[100px] disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={!isLoggedIn || !commentText.trim()}
                className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform disabled:opacity-50"
              >
                Post Comment
              </button>
            </form>

            <div className="space-y-4">
              {comments.map((comment: any) => (
                <div key={comment.id} className="bg-slate-50/50 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-[8px] font-black">
                        {comment.user.substring(0, 2).toUpperCase()}
                      </div>
                      <p className="text-[10px] font-black text-slate-800">{comment.user}</p>
                    </div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12 space-y-4">
        <h3 className="font-black text-slate-800 uppercase tracking-tighter text-lg">Similarly Listed Items</h3>
        <div className="grid grid-cols-2 gap-3">
          {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(item => (
              <Link 
                key={item.id} 
                to={`/product/${item.id}`}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm active:scale-95 transition-transform"
              >
                <div className="aspect-square relative">
                  <img src={item.image} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <p className="text-[9px] font-black text-slate-800">MWK {item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-tighter truncate">{item.name}</h4>
                  <p className="text-[8px] font-bold text-blue-600 uppercase tracking-widest">{item.vendor}</p>
                </div>
              </Link>
            ))
          }
          {products.filter(p => p.category === product.category && p.id !== product.id).length === 0 && (
            <div className="col-span-2 bg-slate-50 border border-dotted border-slate-200 rounded-3xl p-8 text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No similar items found in this category</p>
            </div>
          )}
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
