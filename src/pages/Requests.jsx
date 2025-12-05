import React, { useState } from 'react';
import { 
  Plus, Search, ChevronDown, MapPin, Clock, 
  MessageCircle, Info, CheckCircle 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Mock Data
const REQUESTS_DATA = [
  {
    id: 1,
    title: "Gaming Laptop",
    category: "Electronics",
    user: "Harshvardhan Gedela",
    desc: "I need a laptop with 16GB RAM, AMD Ryzen 7, and GTX graphics for a weekend gaming tournament.",
    time: "3 days",
    budget: "₹1000/day",
    location: "Surat, Gujarat",
    status: "Active" 
  },
  {
    id: 2,
    title: "DSLR Camera",
    category: "Photography",
    user: "Priya Sharma",
    desc: "Looking for a Canon/Sony DSLR for a wedding shoot. Lens kit included preferred.",
    time: "5 days",
    budget: "₹1500/day",
    location: "Vesu, Surat",
    status: "Matched"
  },
  {
    id: 3,
    title: "Camping Tent (4 Person)",
    category: "Sports & Outdoor",
    user: "Rahul Varma",
    desc: "Planning a trip to Dang. Need a waterproof tent for 4 people.",
    time: "2 days",
    budget: "₹500/day",
    location: "Adajan, Surat",
    status: "Active"
  },
  {
    id: 4,
    title: "Drill Machine",
    category: "Tools",
    user: "Amit Patel",
    desc: "Need a hammer drill for some home renovation work. Just for one day.",
    time: "1 day",
    budget: "₹200/day",
    location: "Varachha, Surat",
    status: "Active"
  }
];

const Requests = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // --- ACTIONS ---
  const handlePostRequest = () => {
    navigate('/post-request'); // Redirects to the form
  };

  const handleRespond = (userName) => {
    // In a real app, this would open a specific chat ID
    alert(`Starting chat with ${userName}...`);
    navigate('/chat');
  };

  // --- FILTERING ---
  const filteredRequests = REQUESTS_DATA.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          req.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || req.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      <div className="max-w-[90%] mx-auto px-4 py-8">
        
        {/* --- 1. HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Requests <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">Feed</span>
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">
              See what others are looking for — respond if you have it!
            </p>
          </div>
          <button 
            onClick={handlePostRequest}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all active:scale-95"
          >
            <Plus size={20} strokeWidth={2.5} /> Post Request
          </button>
        </div>

        {/* --- 2. INFO BOX --- */}
        <div className="bg-cyan-50 border border-cyan-100 rounded-[24px] p-6 mb-10 flex gap-5 items-start shadow-sm">
          <div className="bg-white p-3 rounded-full text-[#06b6d4] shadow-sm flex-shrink-0 mt-1">
             <MessageCircle size={24} />
          </div>
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-lg">What are Requests?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Requests are posts from users looking for specific items. If you have what they need, you can respond and offer to rent or swap!
            </p>
            <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div> Click "I Have This Item" to respond
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div> Chat with the requester to discuss terms
              </li>
            </ul>
          </div>
        </div>

        {/* --- 3. FILTERS (Non-Sticky) --- */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
          <div className="relative w-full max-w-lg">
             <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
             <input 
                type="text" 
                placeholder="Search requests..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-[#06b6d4] transition-all shadow-sm hover:shadow-md"
             />
          </div>
          
          <div className="relative w-full md:w-auto">
             <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full md:w-48 pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer hover:border-[#06b6d4] appearance-none shadow-sm hover:shadow-md transition-all"
             >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Photography</option>
                <option>Sports & Outdoor</option>
                <option>Tools</option>
             </select>
             <ChevronDown size={16} className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* --- 4. REQUEST CARDS GRID --- */}
        {filteredRequests.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-[24px] border border-dashed border-slate-200 text-slate-400 font-medium">
             No requests found matching your search.
           </div>
        ) : (
           <div className="grid md:grid-cols-2 gap-6">
             {filteredRequests.map((req) => (
               <div key={req.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-default">
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#06b6d4] transition-colors">{req.title}</h3>
                        <span className="inline-block bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                           {req.category}
                        </span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="text-right hidden sm:block">
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Budget</p>
                           <p className="text-lg font-bold text-[#06b6d4]">{req.budget}</p>
                        </div>
                     </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed flex-grow font-medium">
                    "{req.desc}"
                  </p>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-50 group-hover:border-cyan-50 transition-colors">
                     <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-slate-400" /> Posted {req.time} ago
                     </div>
                     <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-slate-400" /> {req.location}
                     </div>
                  </div>

                  {/* User & Action Footer */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center text-cyan-700 font-bold text-sm shadow-inner">
                          {req.user.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-700">{req.user}</span>
                     </div>

                     {req.status === "Active" ? (
                       <button 
                         onClick={() => handleRespond(req.user)}
                         className="px-6 py-2.5 bg-[#06b6d4] text-white text-sm font-bold rounded-xl hover:bg-[#0891b2] transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                       >
                         I Have This Item
                       </button>
                     ) : (
                       <div className="px-6 py-2.5 bg-slate-100 text-slate-500 text-sm font-bold rounded-xl border border-slate-200 flex items-center gap-2 cursor-not-allowed">
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