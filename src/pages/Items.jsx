import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, ChevronDown, LayoutGrid, List, 
  X, ArrowRight, ArrowUpDown, Plus 
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

    // 3. Duplicate for Demo (Grid fullness)
    return [...items, ...items, ...items]; 
  }, [searchQuery, activeCategory, sortBy]);

  const handleCardClick = (id) => {
    navigate(`/items/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      
      {/* --- 1. PAGE HEADER (Non-Sticky now) --- */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-[90%] mx-auto px-4 py-8">
          
          {/* Top Row: Title + Main Actions */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">All Items</span>
              </h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">
                Showing {filteredItems.length} results
              </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
               
               {/* Search */}
               <div className="relative flex-1 sm:w-64">
                 <Search className="absolute left-4 top-3 text-slate-400" size={18} />
                 <input 
                   type="text" 
                   placeholder="Search items..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all hover:bg-white"
                 />
               </div>

               {/* Sort Dropdown */}
               <div className="relative group">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <ArrowUpDown size={16} />
                 </div>
                 <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 cursor-pointer hover:border-cyan-500 transition-colors appearance-none"
                 >
                    <option value="Recommended">Recommended</option>
                    <option value="PriceLow">Price: Low to High</option>
                    <option value="PriceHigh">Price: High to Low</option>
                 </select>
                 <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
               </div>

               {/* View Toggle */}
               <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <List size={18} />
                  </button>
               </div>

               {/* NEW: LIST ITEM BUTTON */}
               <Link 
                 to="/post-item" 
                 className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95"
               >
                 <Plus size={18} strokeWidth={2.5} />
                 <span className="whitespace-nowrap">List Item</span>
               </Link>

            </div>
          </div>

          {/* Categories Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat, i) => (
              <button 
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                  activeCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg transform scale-105' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-cyan-500 hover:text-cyan-600'
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
      <div className="max-w-[90%] mx-auto px-4 mt-8">
        
        {filteredItems.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                 <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-6">
                We couldn't find items matching "{searchQuery}".
              </p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All Categories");}}
                className="text-cyan-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
           </div>
        ) : (
           <div className={`grid gap-6 ${
             viewMode === 'grid' 
               ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
               : 'grid-cols-1'
           }`}>
             {filteredItems.map((item, index) => (
               <div 
                 key={`${item.id}-${index}`} 
                 onClick={() => handleCardClick(item.id)}
                 className="cursor-pointer transition-transform hover:-translate-y-1"
               >
                 {viewMode === 'grid' ? (
                    <ItemCard item={item} />
                 ) : (
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-6 hover:shadow-md transition-all group">
                       <div className="w-48 h-32 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
                       </div>
                       <div className="flex-1 py-2">
                          <div className="flex justify-between items-start">
                             <div>
                                <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded mb-2 inline-block">{item.category}</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-slate-500 text-sm line-clamp-2">{item.subtitle || "No description available."}</p>
                             </div>
                             <div className="text-right">
                                <span className="block text-2xl font-bold text-cyan-600">₹{item.price}</span>
                                <span className="text-xs text-slate-400">/day</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 )}
               </div>
             ))}
           </div>
        )}

      </div>
    </div>
  );
};

export default Items;