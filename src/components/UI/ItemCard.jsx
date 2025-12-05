import React from 'react';
import { MapPin } from 'lucide-react';

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 flex flex-col h-full group hover:-translate-y-2 relative">
      
      {/* Image with Zoom Effect */}
      <div className="h-56 w-full bg-slate-100 relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Floating Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wide shadow-sm">
            {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow relative">
        <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-[#06b6d4] transition-colors line-clamp-1">{item.title}</h3>
        <p className="text-xs text-slate-500 font-medium mb-4 line-clamp-1">{item.subtitle || "No description available"}</p>

        <div className="mt-auto flex items-end justify-between border-t border-slate-50 pt-4">
          <div>
            <span className="text-[#06b6d4] font-extrabold text-xl">₹{item.price}</span>
            <span className="text-slate-400 text-xs font-medium ml-1">/ day</span>
          </div>
          
          <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#06b6d4] transition-colors shadow-lg shadow-slate-900/20 active:scale-95">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;