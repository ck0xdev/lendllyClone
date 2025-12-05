import React, { useState } from 'react';
import { 
  Settings, Bell, Plus, IndianRupee, Box, Star, Calendar, 
  TrendingUp, Edit3, Trash2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      <div className="max-w-[90%] mx-auto px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">Chintan</span>!
            </h1>
            <p className="text-slate-500 mt-2 font-medium text-lg">Here's your daily activity summary.</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-4 bg-white text-slate-400 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-2xl border border-slate-200 transition-all shadow-sm hover:shadow-md">
              <Settings size={22} />
            </button>
            <Link 
              to="/post-item" 
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-2xl shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all active:scale-95"
            >
              <Plus size={22} strokeWidth={3} /> Add New Item
            </Link>
          </div>
        </div>

        {/* --- STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard 
            title="Total Earnings" 
            value="₹12,500" 
            icon={IndianRupee} 
            color="text-emerald-600" 
            bg="bg-emerald-50"
            trend="+12%" 
          />
          <StatsCard 
            title="Active Listings" 
            value="4" 
            icon={Box} 
            color="text-blue-600" 
            bg="bg-blue-50" 
          />
          <StatsCard 
            title="Average Rating" 
            value="4.8" 
            icon={Star} 
            color="text-amber-500" 
            bg="bg-amber-50" 
          />
          <StatsCard 
            title="Total Bookings" 
            value="12" 
            icon={Calendar} 
            color="text-violet-600" 
            bg="bg-violet-50"
            trend="+2 this week" 
          />
        </div>

        {/* --- TABS --- */}
        <div className="flex gap-8 mb-10 border-b-2 border-slate-100">
          {["Overview", "My Listings", "Bookings"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold transition-all relative ${
                activeTab === tab 
                  ? 'text-[#06b6d4]' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute -bottom-0.5 left-0 w-full h-1 bg-[#06b6d4] rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* --- CONTENT --- */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          
          {activeTab === "Overview" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 h-96 flex flex-col items-center justify-center text-center">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <Calendar size={40} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">No recent activity</h3>
                 <p className="text-slate-500">Your bookings will appear here.</p>
              </div>

              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 h-96 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="text-xl font-bold text-slate-900">Performance</h3>
                   <span className="text-xs font-bold text-[#06b6d4] bg-cyan-50 px-3 py-1 rounded-lg">Last 7 Days</span>
                </div>
                <div className="flex-1 flex items-end justify-between gap-3">
                   {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                     <div key={i} className="w-full bg-cyan-50 rounded-t-2xl relative group hover:bg-[#06b6d4] transition-colors duration-300" style={{ height: `${h}%` }}>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "My Listings" && (
            <div className="space-y-6">
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                     <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-slate-900 text-xl">Sony DSLR Camera</h4>
                     <div className="flex gap-4 mt-2">
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">Active</span>
                        <span className="text-sm font-medium text-slate-500">245 Views</span>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-3 bg-slate-50 text-slate-500 hover:text-[#06b6d4] rounded-xl hover:bg-cyan-50 transition-colors"><Edit3 size={20}/></button>
                     <button className="p-3 bg-slate-50 text-slate-500 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"><Trash2 size={20}/></button>
                  </div>
               </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon: Icon, color, bg, trend }) => (
  <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-2xl ${bg} ${color} group-hover:scale-110 transition-transform`}>
        <Icon size={28} />
      </div>
      {trend && (
        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
          <TrendingUp size={14} className="mr-1" /> {trend}
        </span>
      )}
    </div>
    <h3 className="text-4xl font-extrabold text-slate-900 mb-1">{value}</h3>
    <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">{title}</p>
  </div>
);

export default Dashboard;