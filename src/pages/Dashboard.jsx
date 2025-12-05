import React, { useState } from 'react';
import { 
  Settings, Bell, Plus, IndianRupee, Box, Star, Calendar, 
  TrendingUp, ArrowUpRight, MoreHorizontal, Edit3, Trash2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      <div className="max-w-[90%] mx-auto px-4 py-10">
        
        {/* --- 1. WELCOME HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">Chintan</span>!
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Here's what's happening with your listings today.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-3 bg-white text-slate-400 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-xl border border-slate-200 transition-all shadow-sm">
              <Settings size={20} />
            </button>
            <Link 
              to="/post-item" 
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all active:scale-95"
            >
              <Plus size={20} strokeWidth={2.5} /> Add New Item
            </Link>
          </div>
        </div>

        {/* --- 2. STATS OVERVIEW --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard 
            title="Total Earnings" 
            value="₹12,500" 
            icon={IndianRupee} 
            color="text-green-600" 
            bg="bg-green-50"
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
            color="text-orange-500" 
            bg="bg-orange-50" 
          />
          <StatsCard 
            title="Total Bookings" 
            value="12" 
            icon={Calendar} 
            color="text-purple-600" 
            bg="bg-purple-50"
            trend="+2 this week" 
          />
        </div>

        {/* --- 3. TABS NAVIGATION --- */}
        <div className="flex gap-2 mb-8 border-b border-slate-200">
          {["Overview", "My Listings", "Bookings", "History"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab 
                  ? 'border-[#06b6d4] text-[#06b6d4]' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- 4. DYNAMIC CONTENT AREA --- */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* VIEW: OVERVIEW */}
          {activeTab === "Overview" && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Activity Card */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 h-80 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                   <button className="text-sm font-bold text-[#06b6d4] hover:underline">View All</button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                      <Calendar size={32} />
                   </div>
                   <div>
                     <p className="text-slate-900 font-bold">No recent bookings</p>
                     <p className="text-slate-500 text-sm">When someone books your item, it will show up here.</p>
                   </div>
                </div>
              </div>

              {/* Performance Card */}
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 h-80 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-xl font-bold text-slate-900">Performance</h3>
                   <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#06b6d4]"></span>
                      <span className="text-xs text-slate-500 font-bold">Views</span>
                   </div>
                </div>
                {/* Simulated Chart */}
                <div className="flex-1 flex items-end justify-between gap-2 px-2">
                   {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                     <div key={i} className="w-full bg-cyan-50 rounded-t-lg relative group hover:bg-cyan-100 transition-colors" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          {h * 12}
                        </div>
                     </div>
                   ))}
                </div>
                <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase">
                   <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: MY LISTINGS */}
          {activeTab === "My Listings" && (
            <div className="space-y-4">
               {/* Example Listing Item */}
               <ListingItem 
                 title="Sony DSLR Camera" 
                 price="₹1500" 
                 views="245" 
                 status="Active" 
                 image="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=200" 
               />
               <ListingItem 
                 title="Camping Tent" 
                 price="₹500" 
                 views="120" 
                 status="Active" 
                 image="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=200" 
               />
               
               {/* Add New Placeholder */}
               <Link to="/post-item" className="block border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-[#06b6d4] hover:bg-cyan-50/30 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-3 group-hover:bg-white group-hover:text-[#06b6d4]">
                     <Plus size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900">List another item</h4>
                  <p className="text-slate-500 text-sm">Start earning more today</p>
               </Link>
            </div>
          )}

          {/* VIEW: BOOKINGS (Empty State) */}
          {activeTab === "Bookings" && (
             <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-slate-200">
                <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-4 mx-auto text-purple-500">
                   <Calendar size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No active bookings</h3>
                <p className="text-slate-500 max-w-xs mx-auto">
                  You don't have any upcoming bookings at the moment.
                </p>
             </div>
          )}

        </div>

      </div>
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const StatsCard = ({ title, value, icon: Icon, color, bg, trend }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${bg} ${color}`}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          <TrendingUp size={12} className="mr-1" /> {trend}
        </span>
      )}
    </div>
    <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{value}</h3>
    <p className="text-sm font-bold text-slate-400">{title}</p>
  </div>
);

const ListingItem = ({ title, price, views, status, image }) => (
  <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-all group">
     <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
     </div>
     
     <div className="flex-1">
        <h4 className="font-bold text-slate-900 text-lg">{title}</h4>
        <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
           <span className="font-bold text-[#06b6d4]">{price} <span className="font-normal text-slate-400">/day</span></span>
           <span>•</span>
           <span>{views} views</span>
           <span>•</span>
           <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded text-xs uppercase">{status}</span>
        </div>
     </div>

     <div className="flex gap-2">
        <button className="p-2 text-slate-400 hover:text-[#06b6d4] hover:bg-cyan-50 rounded-lg transition-colors">
           <Edit3 size={18} />
        </button>
        <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
           <Trash2 size={18} />
        </button>
     </div>
  </div>
);

export default Dashboard;