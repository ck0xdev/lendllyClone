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
    }
  };

  const handleViewDetails = (itemId) => {
    navigate(`/items/${itemId}`);
    window.scrollTo(0, 0);
  };

  const handleInteraction = (type) => {
    // In a real app, this would trigger an API call
    console.log(`${type} action recorded`);
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
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans overflow-x-hidden">
      
      {/* --- 1. PROFESSIONAL MAP HEADER --- */}
      <div className="relative w-full z-0 group shadow-sm">
        {/* Map Container with Soft Curve */}
        <div className="h-[500px] w-full relative overflow-hidden rounded-b-[40px] border-b border-slate-200 shadow-sm">
            <MapContainer 
              center={[37.7749, -122.4194]} 
              zoom={13} 
              scrollWheelZoom={false}
              zoomControl={false}
              className="h-full w-full z-0 grayscale-map"
            >
              <TileLayer
                attribution='&copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
            </MapContainer>
            
            {/* Gradient Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none z-[400]"></div>
        </div>
        
        {/* GPS Glass Card */}
        <div className="absolute inset-0 flex items-center justify-center z-[400] bg-slate-900/5 pointer-events-none backdrop-blur-[2px]">
            <div className="bg-white/95 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 max-w-md mx-4 text-center pointer-events-auto border border-white transform transition-all duration-500 hover:scale-105 hover:shadow-cyan-500/20">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-50 to-teal-50 text-[#06b6d4] rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-4 ring-white">
                    <MapPin size={32} strokeWidth={2.5} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-2xl mb-3">Location Not Found</h3>
                <p className="text-slate-500 text-sm mb-8 px-4 leading-relaxed font-medium">
                    We couldn't locate you automatically. Pick your location manually to find items nearby.
                </p>
                <button 
                  onClick={handlePickLocation}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-4 rounded-full text-sm font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                >
                    Pick Location Manually
                </button>
            </div>
        </div>
      </div>

      {/* --- 2. SEARCH & FILTERS (Floating) --- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 -mt-8">
        <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            {/* Search Input */}
            <div className="relative flex-1 w-full max-w-2xl group">
              <div className="absolute left-6 top-4 text-slate-400 group-focus-within:text-[#06b6d4] transition-colors duration-300">
                 <Search size={22} />
              </div>
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="What are you looking for?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-base font-medium text-slate-700 focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full md:w-auto">
               <button 
                  onClick={() => setActiveCategory("All Categories")}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all active:scale-95"
               >
                  <LayoutGrid size={18} /> 
                  <span className="hidden sm:inline">All Categories</span>
               </button>
               <button className="p-4 text-slate-500 hover:bg-slate-100 hover:text-[#06b6d4] rounded-2xl border border-slate-200 hover:border-[#06b6d4]/30 transition-all active:scale-95">
                 <Filter size={20} />
               </button>
            </div>
          </div>

          {/* Categories Pills */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
             {CATEGORIES.map((cat, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap border-2 transition-all duration-300 active:scale-95 ${
                    activeCategory === cat
                    ? 'bg-[#06b6d4] text-white border-[#06b6d4] shadow-lg shadow-cyan-500/30' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-cyan-200 hover:text-[#06b6d4] hover:shadow-md'
                  }`}
                >
                  {cat}
                </button>
             ))}
          </div>
        </div>
      </div>

      {/* --- 3. MAIN CONTENT --- */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-16 space-y-16">
        
        {/* Featured Items Section */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-cyan-100 to-teal-100 text-[#06b6d4] rounded-2xl shadow-sm">
                <TrendingUp size={24} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Featured Items</h2>
            </div>

            {filteredItems.length === 0 ? (
               <div className="text-center py-32 bg-white rounded-[40px] border border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                     <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">No items found</h3>
                  <p className="text-slate-500 mt-1">Try adjusting your filters</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                 {filteredItems.map(item => (
                   <div key={item.id} onClick={() => handleViewDetails(item.id)} className="cursor-pointer group">
                      <ItemCard item={item} />
                   </div>
                 ))}
               </div>
            )}
        </section>

        {/* --- 4. COMMUNITY FEED (Interactive) --- */}
        <section className="grid lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            
            {/* Feed Column */}
            <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Community Posts</h2>
                    <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200">
                        {filteredPosts.length} updates
                    </span>
                </div>

                {/* Interactive Banners */}
                <div className="grid sm:grid-cols-2 gap-5">
                    <button 
                        onClick={() => navigate('/items')}
                        className="bg-[#f0f9ff] p-6 rounded-[32px] flex items-center gap-5 border border-cyan-100 cursor-pointer hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all text-left group"
                    >
                        <div className="bg-white p-4 rounded-2xl text-[#06b6d4] shadow-sm group-hover:scale-110 transition-transform"><LayoutGrid size={24}/></div>
                        <div>
                            <h4 className="font-bold text-base text-slate-900 group-hover:text-[#06b6d4] transition-colors">Items for Rent</h4>
                            <p className="text-sm text-slate-500 mt-0.5 font-medium">View available items</p>
                        </div>
                    </button>
                    
                    <button 
                        onClick={() => navigate('/requests')}
                        className="bg-[#f0f9ff] p-6 rounded-[32px] flex items-center gap-5 border border-cyan-100 cursor-pointer hover:border-cyan-300 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all text-left group"
                    >
                        <div className="bg-white p-4 rounded-2xl text-[#06b6d4] shadow-sm group-hover:scale-110 transition-transform"><MessageCircle size={24}/></div>
                        <div>
                            <h4 className="font-bold text-base text-slate-900 group-hover:text-[#06b6d4] transition-colors">Requests</h4>
                            <p className="text-sm text-slate-500 mt-0.5 font-medium">View what people need</p>
                        </div>
                    </button>
                </div>

                {/* Feed Stream */}
                <div className="space-y-6">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group">
                            
                            {/* User Header */}
                            <div className="flex justify-between items-start mb-5">
                                <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                        <img src={`https://ui-avatars.com/api/?name=${post.user}&background=random`} alt="User" />
                                     </div>
                                     <div>
                                        <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#06b6d4] transition-colors">{post.user}</h4>
                                        <p className="text-xs text-slate-400 font-bold mt-0.5">{post.time}</p>
                                     </div>
                                </div>
                                <button className="text-slate-300 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-full transition-colors"><MoreVertical size={20} /></button>
                            </div>

                            {/* Content Logic */}
                            {post.type === 'request' ? (
                                <div className="pl-16">
                                     <div className="bg-slate-50 p-6 rounded-3xl rounded-tl-none border border-slate-100 relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#06b6d4] rounded-l-full"></div>
                                        <p className="text-slate-700 text-sm font-medium leading-relaxed">"{post.content}"</p>
                                     </div>
                                </div>
                            ) : (
                                <div className="pl-16">
                                    <p className="text-sm text-slate-500 mb-4 font-medium">
                                        Listed a new item: <span className="text-slate-900 font-bold">{post.item.title}</span>
                                    </p>
                                    
                                    {/* Product Card */}
                                    <div 
                                        onClick={() => handleViewDetails(post.item.id)}
                                        className="flex gap-5 p-4 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer group/card"
                                    >
                                        <div className="w-24 h-24 bg-white rounded-2xl overflow-hidden border border-slate-200 flex-shrink-0 shadow-sm">
                                            <img 
                                              src={post.item.image} 
                                              alt="Item" 
                                              className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700" 
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center py-1">
                                            <span className="bg-white text-[#06b6d4] border border-cyan-100 text-[10px] font-bold px-3 py-1 rounded-full w-fit mb-2 shadow-sm">
                                                {post.item.category}
                                            </span>
                                            <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1 group-hover/card:text-[#06b6d4] transition-colors">{post.item.title}</h4>
                                            <span className="text-[#06b6d4] font-extrabold text-sm">₹{post.item.price} <span className="text-slate-400 font-medium text-xs">/day</span></span>
                                        </div>
                                        <div className="ml-auto flex items-center pr-2 opacity-0 group-hover/card:opacity-100 transition-opacity transform translate-x-2 group-hover/card:translate-x-0">
                                            <div className="p-2 bg-cyan-50 rounded-full text-[#06b6d4]">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="pl-16 mt-6 flex items-center gap-8 border-t border-slate-50 pt-4">
                                <button onClick={() => handleInteraction("Like")} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors group/action">
                                    <Heart size={18} className="group-hover/action:scale-110 transition-transform" /> 
                                    <span>{post.likes} Likes</span>
                                </button>
                                <button onClick={() => handleInteraction("Comment")} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors group/action">
                                    <MessageCircle size={18} className="group-hover/action:scale-110 transition-transform" /> 
                                    <span>{post.comments} Comments</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block space-y-6">
               <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-lg shadow-slate-200/50 sticky top-32">
                  <div className="flex items-center gap-4 mb-6">
                     <div className="p-3 bg-cyan-50 rounded-2xl text-[#06b6d4]">
                        <Info size={24} />
                     </div>
                     <h3 className="font-bold text-slate-900 text-lg">Safety Tips</h3>
                  </div>
                  <ul className="space-y-6">
                     <li className="flex gap-4 items-start group">
                        <div className="mt-1 p-1 bg-green-50 rounded-full text-green-500 group-hover:scale-110 transition-transform">
                            <CheckCircle size={14} />
                        </div>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">Meet in public places (malls, cafes) for exchanges.</p>
                     </li>
                     <li className="flex gap-4 items-start group">
                        <div className="mt-1 p-1 bg-green-50 rounded-full text-green-500 group-hover:scale-110 transition-transform">
                            <CheckCircle size={14} />
                        </div>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">Inspect items thoroughly before accepting them.</p>
                     </li>
                     <li className="flex gap-4 items-start group">
                        <div className="mt-1 p-1 bg-green-50 rounded-full text-green-500 group-hover:scale-110 transition-transform">
                            <CheckCircle size={14} />
                        </div>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">Use Lendlly chat for all payments and messages.</p>
                     </li>
                  </ul>
               </div>
            </div>

        </section>
      </div>
    </div>
  );
};

export default Explore;