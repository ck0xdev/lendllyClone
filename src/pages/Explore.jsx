import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Search, LayoutGrid, MessageCircle, Heart, MoreVertical, 
  MapPin, TrendingUp, Filter, ArrowRight, Info, CheckCircle 
} from 'lucide-react';
import ItemCard from '../components/UI/ItemCard';
import { FEATURED_ITEMS, POSTS, CATEGORIES } from '../data';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useNavigate } from 'react-router-dom';

// Fix Leaflet Icons
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Explore = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");

  // --- ACTIONS ---
  const handlePickLocation = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.placeholder = "Enter your city or area...";
      alert("Please enter your location in the search bar.");
    }
  };

  // REDIRECT TO SPECIFIC PRODUCT PAGE
  const handleViewDetails = (itemId) => {
    navigate(`/items/${itemId}`); // Goes to specific ID (e.g., /items/1)
    window.scrollTo(0, 0);
  };

  const handleInteraction = (type) => {
    alert(`${type} action recorded!`);
  };

  // --- FILTERING ---
  const filteredItems = FEATURED_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "All Categories" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredPosts = POSTS.filter(post => {
    if (post.type === 'request') {
      return post.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
    const matchesCategory = activeCategory === "All Categories" || post.item.category === activeCategory;
    const matchesSearch = post.item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      
      {/* --- 1. MAP SECTION --- */}
      <div className="relative h-[450px] w-full z-0 border-b border-gray-200 group">
        <MapContainer 
          center={[37.7749, -122.4194]} 
          zoom={13} 
          scrollWheelZoom={false}
          zoomControl={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
        </MapContainer>
        
        <div className="absolute inset-0 flex items-center justify-center z-[400] bg-slate-900/5 pointer-events-none backdrop-blur-[1px]">
            <div className="bg-white p-8 rounded-[32px] shadow-2xl max-w-sm mx-4 text-center pointer-events-auto border border-white transform transition-transform hover:scale-105 duration-300">
                <div className="mx-auto w-14 h-14 bg-cyan-50 text-[#06b6d4] rounded-full flex items-center justify-center mb-5 shadow-inner">
                    <MapPin size={28} strokeWidth={2.5} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">Location Not Found</h3>
                <p className="text-slate-500 text-sm mb-6 px-2 leading-relaxed font-medium">
                    We couldn't locate you. Pick your location manually to see items nearby.
                </p>
                <button 
                  onClick={handlePickLocation}
                  className="bg-[#06b6d4] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#0891b2] transition-all shadow-lg shadow-cyan-500/30 active:scale-95"
                >
                    Pick Location Manually
                </button>
            </div>
        </div>
      </div>

      {/* --- 2. SEARCH & FILTERS --- */}
      <div className="bg-white border-b border-gray-100 py-8 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 w-full max-w-2xl">
              <Search className="absolute left-5 top-3.5 text-slate-400" size={20} />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="What are you looking for?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-[#06b6d4] transition-all hover:bg-white"
              />
            </div>
            
            <div className="flex items-center gap-3">
               <button 
                  onClick={() => setActiveCategory("All Categories")}
                  className="flex items-center gap-2 px-6 py-3 bg-[#06b6d4] text-white rounded-full text-sm font-bold shadow-md shadow-cyan-500/20 hover:bg-[#0891b2] transition-all active:scale-95"
               >
                  <LayoutGrid size={18} /> All Categories
               </button>
               <button className="p-3 text-slate-500 hover:bg-slate-100 rounded-full border border-transparent hover:border-slate-200 transition-all active:scale-95">
                 <Filter size={20} />
               </button>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
             {CATEGORIES.map((cat, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap border transition-all duration-200 active:scale-95 ${
                    activeCategory === cat
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#06b6d4] hover:text-[#06b6d4]'
                  }`}
                >
                  {cat}
                </button>
             ))}
          </div>
        </div>
      </div>

      {/* --- 3. MAIN CONTENT --- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-12">
        
        {/* Featured Items */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-cyan-50 text-[#06b6d4] rounded-xl">
            <TrendingUp size={22} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Featured Items</h2>
        </div>

        {filteredItems.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-slate-400">
              No items found matching your filters.
           </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
             {filteredItems.map(item => (
               <div key={item.id} onClick={() => handleViewDetails(item.id)} className="cursor-pointer">
                  <ItemCard item={item} />
               </div>
             ))}
           </div>
        )}

        {/* --- 4. COMMUNITY FEED --- */}
        <div className="grid lg:grid-cols-3 gap-10">
            
            <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-900">Community Posts</h2>
                    <span className="text-slate-500 text-sm font-medium">{filteredPosts.length} updates</span>
                </div>

                {/* Banners */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <button onClick={() => navigate('/items')} className="bg-[#f0f9ff] p-5 rounded-2xl flex items-center gap-4 border border-blue-100 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all text-left">
                        <div className="bg-white p-3 rounded-xl text-blue-500 shadow-sm"><LayoutGrid size={20}/></div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-900">Items for Rent</h4>
                            <p className="text-xs text-slate-500 mt-0.5">View available items</p>
                        </div>
                    </button>
                    <button onClick={() => navigate('/requests')} className="bg-[#f0f9ff] p-5 rounded-2xl flex items-center gap-4 border border-blue-100 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all text-left">
                        <div className="bg-white p-3 rounded-xl text-blue-500 shadow-sm"><MessageCircle size={20}/></div>
                        <div>
                            <h4 className="font-bold text-sm text-slate-900">Requests</h4>
                            <p className="text-xs text-slate-500 mt-0.5">View what people need</p>
                        </div>
                    </button>
                </div>

                {/* Feed */}
                <div className="space-y-6">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            
                            {/* User Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                     <div className="w-9 h-9 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
                                        <img src={`https://ui-avatars.com/api/?name=${post.user}&background=random`} alt="User" />
                                     </div>
                                     <div>
                                        <h4 className="font-bold text-sm text-slate-900">{post.user}</h4>
                                        <p className="text-[11px] text-slate-400 font-medium">{post.time}</p>
                                     </div>
                                </div>
                                <button className="text-slate-300 hover:text-slate-600"><MoreVertical size={16} /></button>
                            </div>

                            {/* Content Logic */}
                            {post.type === 'request' ? (
                                <div className="pl-12">
                                     <div className="bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                        <p className="text-slate-700 text-sm font-medium">"{post.content}"</p>
                                     </div>
                                </div>
                            ) : (
                                <div className="pl-12">
                                    <p className="text-sm text-slate-500 mb-3">
                                        Listed a new item: <span className="text-slate-900 font-bold">{post.item.title}</span>
                                    </p>
                                    
                                    {/* CLICKABLE PRODUCT CARD */}
                                    <div 
                                        onClick={() => handleViewDetails(post.item.id)} // Pass ID to function
                                        className="flex gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-cyan-400 hover:shadow-md transition-all cursor-pointer group"
                                    >
                                        <div className="w-24 h-24 bg-white rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                                            <img 
                                              src={post.item.image} 
                                              alt="Item" 
                                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center py-1">
                                            <span className="bg-[#06b6d4] text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-1">
                                                {post.item.category}
                                            </span>
                                            <h4 className="font-bold text-slate-900 text-base group-hover:text-[#06b6d4] transition-colors">{post.item.title}</h4>
                                            <p className="text-xs text-slate-500 line-clamp-1 mb-2">{post.item.subtitle}</p>
                                            <span className="text-[#06b6d4] font-bold text-sm">₹{post.item.price} <span className="text-slate-400 font-normal text-xs">/day</span></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="pl-12 mt-4 flex items-center gap-6">
                                <button onClick={() => handleInteraction("Like")} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                                    <Heart size={16} /> {post.likes}
                                </button>
                                <button onClick={() => handleInteraction("Comment")} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors">
                                    <MessageCircle size={16} /> {post.comments}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block space-y-6">
               <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-32">
                  <div className="flex items-center gap-3 mb-5">
                     <div className="p-2 bg-cyan-50 rounded-lg text-[#06b6d4]">
                        <Info size={18} />
                     </div>
                     <h3 className="font-bold text-slate-900">Safety Tips</h3>
                  </div>
                  <ul className="space-y-4 text-xs font-medium text-slate-500">
                     <li className="flex gap-3">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span>Meet in public places (malls, cafes) for exchanges.</span>
                     </li>
                     <li className="flex gap-3">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span>Inspect items thoroughly before accepting them.</span>
                     </li>
                     <li className="flex gap-3">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span>Use Lendlly chat for all payments.</span>
                     </li>
                  </ul>
               </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Explore;