import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, MapPin, Clock, 
  MessageCircle, Info, CheckCircle, ArrowRight 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const REQUESTS_DATA = [
  { id: 1, title: "Gaming Laptop", category: "Electronics", user: "Harshvardhan G.", desc: "I need a laptop with 16GB RAM for a weekend gaming tournament.", time: "3 days", budget: "₹1000/day", location: "Surat", status: "Active" },
  { id: 2, title: "DSLR Camera", category: "Photography", user: "Priya Sharma", desc: "Looking for a Canon/Sony DSLR for a wedding shoot.", time: "5 days", budget: "₹1500/day", location: "Vesu", status: "Matched" },
  { id: 3, title: "Camping Tent", category: "Sports", user: "Rahul Varma", desc: "Planning a trip to Dang. Need a 4-person tent.", time: "2 days", budget: "₹500/day", location: "Adajan", status: "Active" },
  { id: 4, title: "Drill Machine", category: "Tools", user: "Amit Patel", desc: "Need a hammer drill for some home renovation.", time: "1 day", budget: "₹200/day", location: "Varachha", status: "Active" }
];

const Requests = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredRequests = REQUESTS_DATA.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) || req.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || req.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      <div className="max-w-[90%] mx-auto px-4 py-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Requests <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">Feed</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">See what others are looking for — respond if you have it!</p>
          </div>
          <button 
            onClick={() => navigate('/post-request')}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all active:scale-95"
          >
            <Plus size={20} strokeWidth={3} className="group-hover:rotate-90 transition-transform" /> Post Request
          </button>
        </div>

        {/* --- INFO BOX --- */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-100/50 rounded-[32px] p-8 mb-12 flex flex-col md:flex-row gap-6 items-start shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
          <div className="bg-white p-4 rounded-2xl text-[#06b6d4] shadow-md shadow-cyan-100">
             <MessageCircle size={32} />
          </div>
          <div className="space-y-3 flex-1">
            <h3 className="font-bold text-slate-900 text-lg">What are Requests?</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              Requests are posts from users looking for specific items. If you have what they need, you can respond and offer to rent or swap!
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
               <div className="flex items-center gap-2 text-sm text-slate-500 font-bold bg-white/60 px-4 py-2 rounded-xl">
                 <div className="w-2 h-2 bg-cyan-400 rounded-full"></div> Click "I Have This Item"
               </div>
               <div className="flex items-center gap-2 text-sm text-slate-500 font-bold bg-white/60 px-4 py-2 rounded-xl">
                 <div className="w-2 h-2 bg-teal-400 rounded-full"></div> Chat to discuss terms
               </div>
            </div>
          </div>
        </div>

        {/* --- FILTERS --- */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
          <div className="relative w-full max-w-lg group">
             <Search className="absolute left-5 top-4 text-slate-400 group-focus-within:text-[#06b6d4] transition-colors" size={20} />
             <input 
                type="text" 
                placeholder="Search requests..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-5 py-4 bg-white border-2 border-transparent rounded-2xl text-slate-700 font-medium focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all shadow-sm group-hover:shadow-md"
             />
          </div>
          
          <div className="relative w-full md:w-auto group">
             <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full md:w-56 pl-5 pr-12 py-4 bg-white border-2 border-transparent rounded-2xl text-slate-700 font-bold focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 cursor-pointer appearance-none shadow-sm group-hover:shadow-md transition-all"
             >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Photography</option>
                <option>Sports & Outdoor</option>
                <option>Tools</option>
             </select>
             <ChevronDown size={18} className="absolute right-5 top-4.5 text-slate-400 pointer-events-none group-hover:text-[#06b6d4] transition-colors" />
          </div>
        </div>

        {/* --- CARDS GRID --- */}
        {filteredRequests.length === 0 ? (
           <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-slate-100 text-slate-400 font-medium">
             No requests found matching your search.
           </div>
        ) : (
           <div className="grid md:grid-cols-2 gap-8">
             {filteredRequests.map((req) => (
               <div key={req.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full cursor-default relative overflow-hidden">
                  
                  {/* Decorative Gradient Line */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#06b6d4] transition-colors">{req.title}</h3>
                        <span className="inline-block bg-slate-100 text-slate-600 text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wide">
                           {req.category}
                        </span>
                     </div>
                     <div className="text-right bg-cyan-50 px-4 py-2 rounded-2xl">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Budget</p>
                        <p className="text-lg font-extrabold text-[#06b6d4]">{req.budget}</p>
                     </div>
                  </div>

                  <p className="text-slate-600 text-base mb-8 leading-relaxed flex-grow font-medium">"{req.desc}"</p>

                  <div className="flex flex-wrap gap-3 text-xs font-bold text-slate-500 mb-8">
                     <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <Clock size={14} /> Posted {req.time} ago
                     </div>
                     <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <MapPin size={14} /> {req.location}
                     </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between gap-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-sm shadow-inner">
                          {req.user.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{req.user}</span>
                     </div>

                     {req.status === "Active" ? (
                       <button 
                         onClick={() => navigate('/chat')}
                         className="px-6 py-3 bg-[#06b6d4] text-white text-sm font-bold rounded-xl hover:bg-[#0891b2] transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-2"
                       >
                         I Have This Item <ArrowRight size={16} />
                       </button>
                     ) : (
                       <div className="px-6 py-3 bg-slate-50 text-slate-400 text-sm font-bold rounded-xl border border-slate-200 flex items-center gap-2 cursor-not-allowed">
                         <CheckCircle size={16} /> Request Matched
                       </div>
                     )}
                  </div>
               </div>
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default Requests;