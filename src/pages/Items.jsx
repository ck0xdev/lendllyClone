import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, ChevronDown, LayoutGrid, List, 
  X, ArrowRight, ArrowUpDown, Plus, MapPin, Star 
} from 'lucide-react';
import ItemCard from '../components/UI/ItemCard';
import { FEATURED_ITEMS, CATEGORIES } from '../data';
import { useNavigate, Link } from 'react-router-dom';

const Items = () => {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Recommended");
  const [viewMode, setViewMode] = useState("grid");

  // --- FILTERING & SORTING LOGIC ---
  const filteredItems = useMemo(() => {
    // 1. Filter
    let items = FEATURED_ITEMS.filter(item => {
      const matchesCategory = activeCategory === "All Categories" || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // 2. Sort
    if (sortBy === "PriceLow") {
      items.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "PriceHigh") {
      items.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    // 3. Duplicate for Demo (To fill the grid)
    return [...items, ...items, ...items]; 
  }, [searchQuery, activeCategory, sortBy]);

  const handleCardClick = (id) => {
    navigate(`/items/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      
      {/* --- 1. PAGE HEADER --- */}
      <div className="bg-white border-b border-slate-100 shadow-sm relative z-20">
        <div className="max-w-[90%] mx-auto px-4 py-8">
          
          {/* Top Row: Title + Main Actions */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">All Items</span>
              </h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">
                Showing <span className="text-slate-900 font-bold">{filteredItems.length}</span> results in your area
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
               
               {/* Search */}
               <div className="relative flex-1 sm:w-72 group">
                 <Search className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-[#06b6d4] transition-colors" size={20} />
                 <input 
                   type="text" 
                   placeholder="Search items..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 focus:outline-none transition-all placeholder:text-slate-400"
                 />
               </div>

               {/* Sort Dropdown */}
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-hover:text-[#06b6d4] transition-colors">
                    <ArrowUpDown size={18} />
                 </div>
                 <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/10 cursor-pointer hover:border-[#06b6d4] transition-all appearance-none shadow-sm"
                 >
                    <option value="Recommended">Recommended</option>
                    <option value="PriceLow">Price: Low to High</option>
                    <option value="PriceHigh">Price: High to Low</option>
                 </select>
                 <ChevronDown size={16} className="absolute right-4 top-3.5 text-slate-400 pointer-events-none" />
               </div>

               {/* View Toggle */}
               <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 rounded-xl transition-all ${
                      viewMode === 'grid' 
                        ? 'bg-white text-[#06b6d4] shadow-sm scale-105' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <LayoutGrid size={20} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 rounded-xl transition-all ${
                      viewMode === 'list' 
                        ? 'bg-white text-[#06b6d4] shadow-sm scale-105' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <List size={20} />
                  </button>
               </div>

               {/* LIST ITEM BUTTON */}
               <Link 
                 to="/post-item" 
                 className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:-translate-y-1 active:scale-95"
               >
                 <Plus size={20} strokeWidth={2.5} />
                 <span className="whitespace-nowrap">List Item</span>
               </Link>

            </div>
          </div>

          {/* Categories Bar */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide animate-in fade-in slide-in-from-left-4 duration-700">
            {CATEGORIES.map((cat, i) => (
              <button 
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 flex items-center gap-2 ${
                  activeCategory === cat 
                    ? 'bg-[#06b6d4] text-white border-[#06b6d4] shadow-lg shadow-cyan-500/30' 
                    : 'bg-white text-slate-600 border-slate-100 hover:border-cyan-200 hover:text-[#06b6d4]'
                }`}
              >
                {cat}
                {activeCategory === cat && <X size={14} className="ml-1 opacity-50 hover:opacity-100" onClick={(e) => { e.stopPropagation(); setActiveCategory("All Categories"); }} />}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* --- 2. ITEMS GRID --- */}
      <div className="max-w-[90%] mx-auto px-4 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {filteredItems.length === 0 ? (
           // Empty State
           <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                 <Search size={40} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-8">
                We couldn't find items matching "{searchQuery}". Try a different category or keyword.
              </p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All Categories");}}
                className="text-[#06b6d4] font-bold hover:underline flex items-center gap-2"
              >
                Clear all filters <ArrowRight size={16} />
              </button>
           </div>
        ) : (
           // Grid Layout
           <div className={`grid gap-8 ${
             viewMode === 'grid' 
               ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
               : 'grid-cols-1 max-w-4xl mx-auto'
           }`}>
             {filteredItems.map((item, index) => (
               <div 
                 key={`${item.id}-${index}`} 
                 onClick={() => handleCardClick(item.id)}
                 className="cursor-pointer"
               >
                 {viewMode === 'grid' ? (
                    // GRID CARD (Using your ItemCard component which has the hover effects)
                    <ItemCard item={item} />
                 ) : (
                    // LIST CARD (Premium Horizontal Layout)
                    <div className="bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-cyan-100 hover:-translate-y-1 transition-all duration-300 group">
                       {/* Image */}
                       <div className="w-full sm:w-64 h-48 sm:h-40 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0 relative">
                          <img 
                            src={item.image} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            alt={item.title} 
                          />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wide">
                             {item.category}
                          </div>
                       </div>
                       
                       {/* Content */}
                       <div className="flex-1 py-1 flex flex-col justify-between">
                          <div>
                             <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#06b6d4] transition-colors">{item.title}</h3>
                                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold bg-yellow-50 px-2 py-1 rounded-lg">
                                   <Star size={14} fill="currentColor" /> 4.8
                                </div>
                             </div>
                             <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4">
                               {item.subtitle || "A high-quality item available for rent. Well maintained and ready for immediate use."}
                             </p>
                             <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                <MapPin size={14} /> {item.location || "Surat, Gujarat"}
                             </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                             <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-extrabold text-[#06b6d4]">₹{item.price}</span>
                                <span className="text-slate-400 text-xs font-bold">/ day</span>
                             </div>
                             <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#06b6d4] transition-colors shadow-lg shadow-slate-900/10 active:scale-95">
                               View Details
                             </button>
                          </div>
                       </div>
                    </div>
                 )}
               </div>
             ))}
           </div>
        )}

        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <div className="mt-20 text-center">
              <button className="px-10 py-4 bg-white border-2 border-slate-100 text-slate-600 font-bold rounded-full hover:bg-slate-50 hover:text-[#06b6d4] hover:border-cyan-200 transition-all shadow-sm active:scale-95 flex items-center gap-2 mx-auto">
                  Load More Items <ArrowRight size={18} />
              </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Items;