import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { MessageSquare, Send, User, ArrowLeft, MoreVertical, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMessages, useAuth } from '../services/store';

export default function Inbox() {
  const { messages, sendMessage } = useMessages();
  const { user, isLoggedIn } = useAuth();
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    sendMessage({
      text: inputText,
      sender: user?.name || 'Guest',
      senderRole: 'buyer',
      isMe: true
    });
    setInputText('');
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-4">
        <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400">
          <MessageSquare size={40} />
        </div>
        <h2 className="text-xl font-black text-slate-800">Sign in to message sellers</h2>
        <p className="text-sm text-slate-400 max-w-xs">You need to be logged in to chat with business owners in Blantyre.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-200"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-[calc(100vh-80px)] max-w-2xl mx-auto bg-white sm:rounded-t-[40px] shadow-2xl overflow-hidden border-x border-slate-50"
    >
      {/* Chat Header */}
      <header className="p-4 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-sm">
              BT
            </div>
            <div>
              <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">Blantyre Market Support</h3>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active Now</p>
            </div>
          </div>
        </div>
        <button className="p-2 text-slate-400">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        <div className="text-center py-8">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-4">Chat Started May 08, 2026</p>
          <div className="bg-white/80 backdrop-blur-sm border border-slate-100 p-4 rounded-3xl inline-block max-w-[280px]">
            <p className="text-[11px] text-slate-500 font-medium">Hello! Welcome to Wave. You can chat with sellers here to negotiate prices or delivery.</p>
          </div>
        </div>

        {messages.map((msg: any) => (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            key={msg.id} 
            className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
              msg.isMe 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
              <div className={`text-[8px] font-black uppercase tracking-tighter mt-1 opacity-60 flex items-center gap-1 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.isMe && <span>• Read</span>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSend} className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-100 focus-within:border-blue-300 transition-colors">
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..." 
            className="flex-1 bg-transparent border-none focus:ring-0 px-3 py-2 text-sm font-medium"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50"
          >
            <Send size={18} fill="currentColor" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}
