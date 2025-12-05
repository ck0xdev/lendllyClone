import React, { useState } from 'react';
import { 
  MessageCircle, User, Calendar, IndianRupee, ArrowUpRight, 
  ArrowDownLeft, Clock, CheckCircle, XCircle, Filter, ChevronDown 
} from 'lucide-react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState("Active");

  // Mock Data
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
    },
    {
      id: 3,
      item: "Gaming Laptop",
      owner: "Amit Patel",
      amount: "₹2,000",
      status: "Completed",
      type: "Lending",
      dates: "Nov 01 - Nov 05",
      image: "https://images.unsplash.com/photo-1603302576837-63f3ebee9b45?auto=format&fit=crop&q=80&w=200"
    }
  ];

  // Helper for Status Colors
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-50 text-green-700 border-green-100';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'Completed': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      <div className="max-w-[90%] mx-auto px-4 py-10">
        
        {/* --- 1. HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">Transactions</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Track your rentals, swaps, and earnings.</p>
          </div>

          <div className="flex gap-3">
             <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Filter size={16} /> Filter
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                Export CSV <ArrowUpRight size={16} />
             </button>
          </div>
        </div>

        {/* --- 2. TABS --- */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit flex gap-1 mb-8">
          {["Active", "History", "Swaps", "Disputes"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- 3. TRANSACTIONS LIST --- */}
        <div className="space-y-6">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                
                {/* Image */}
                <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                   <img src={tx.image} alt={tx.item} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                         <div className="flex items-center gap-3 mb-1">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(tx.status)}`}>
                               {tx.status}
                            </span>
                            <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md">{tx.type}</span>
                         </div>
                         <h3 className="text-xl font-bold text-slate-900">{tx.item}</h3>
                      </div>
                      <div className="text-right">
                         <span className="block text-2xl font-extrabold text-slate-900">{tx.amount}</span>
                         <span className="text-xs text-slate-400 font-bold">Total</span>
                      </div>
                   </div>

                   {/* Meta Grid */}
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-sm text-slate-500">
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                         <User size={16} className="text-slate-400" />
                         <span className="font-medium">{tx.owner}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                         <Calendar size={16} className="text-slate-400" />
                         <span className="font-medium">{tx.dates}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
                         <IndianRupee size={16} className="text-slate-400" />
                         <span className="font-medium">Paid Online</span>
                      </div>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                   {tx.status === "Active" || tx.status === "Pending" ? (
                     <>
                       <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-100 text-slate-700 font-bold rounded-xl hover:border-[#06b6d4] hover:text-[#06b6d4] transition-all">
                          <MessageCircle size={18} /> Chat
                       </button>
                       <button className="flex-1 md:flex-none px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors">
                          Cancel
                       </button>
                     </>
                   ) : (
                     <button className="w-full md:w-auto px-6 py-3 bg-slate-100 text-slate-500 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                        <ArrowDownLeft size={18} /> Receipt
                     </button>
                   )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State (Hidden by default, easy to toggle) */}
        {transactions.length === 0 && (
           <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                 <Clock size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No transactions yet</h3>
              <p className="text-slate-500">Start renting or swapping to see activity here.</p>
           </div>
        )}

      </div>
    </div>
  );
};

export default Transactions;