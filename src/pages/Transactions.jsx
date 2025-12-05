import React, { useState } from 'react';
import { 
  MessageCircle, User, Calendar, IndianRupee, ArrowUpRight, 
  ArrowDownLeft, Clock, Filter 
} from 'lucide-react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("Active");

  const transactions = [
    {
      id: 1,
      item: "Sony DSLR Camera",
      owner: "Hibah Hanif",
      amount: "₹1,500",
      status: "Active",
      type: "Rent",
      dates: "Dec 10 - Dec 15",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 2,
      item: "Camping Tent",
      owner: "Rahul Varma",
      amount: "₹500",
      status: "Pending",
      type: "Rent",
      dates: "Dec 20 - Dec 22",
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      <div className="max-w-[90%] mx-auto px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">Transactions</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Track your rentals, swaps, and earnings.</p>
          </div>

          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-700 hover:border-cyan-200 hover:text-cyan-700 transition-colors shadow-sm active:scale-95">
                <Filter size={18} /> Filter
             </button>
             <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl text-sm font-bold text-slate-700 hover:border-cyan-200 hover:text-cyan-700 transition-colors shadow-sm active:scale-95">
                Export CSV <ArrowUpRight size={18} />
             </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm w-fit flex gap-1 mb-10">
          {["Active", "History", "Swaps"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-6">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 group">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                
                <div className="w-28 h-28 bg-slate-100 rounded-3xl overflow-hidden flex-shrink-0 border-4 border-white shadow-md">
                   <img src={tx.image} alt={tx.item} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="flex-1 w-full">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <div className="flex items-center gap-3 mb-2">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getStatusStyle(tx.status)}`}>
                               {tx.status}
                            </span>
                            <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-100">{tx.type}</span>
                         </div>
                         <h3 className="text-2xl font-bold text-slate-900">{tx.item}</h3>
                      </div>
                      <div className="text-right">
                         <span className="block text-3xl font-extrabold text-slate-900">{tx.amount}</span>
                         <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Amount</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                         <User size={16} className="text-[#06b6d4]" />
                         <span className="font-bold text-slate-700">{tx.owner}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                         <Calendar size={16} className="text-[#06b6d4]" />
                         <span className="font-bold text-slate-700">{tx.dates}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                         <IndianRupee size={16} className="text-[#06b6d4]" />
                         <span className="font-bold text-slate-700">Paid Online</span>
                      </div>
                   </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                   <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-100 text-slate-700 font-bold rounded-2xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-all hover:shadow-md active:scale-95">
                      <MessageCircle size={20} /> Chat
                   </button>
                   <button className="flex-1 md:flex-none px-8 py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors border border-red-100 active:scale-95">
                      Cancel
                   </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {transactions.length === 0 && (
           <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                 <Clock size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No transactions yet</h3>
              <p className="text-slate-500 mt-1">Start renting to see activity.</p>
           </div>
        )}

      </div>
    </div>
  );
};

export default Transactions;