import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, ShieldCheck, Heart, Share2, MessageCircle, Calendar } from 'lucide-react';
import { FEATURED_ITEMS } from '../data';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the item by ID (Simulated Database)
  // In a real app, you would fetch this from a backend
  const product = FEATURED_ITEMS.find(item => item.id === parseInt(id)) || FEATURED_ITEMS[0];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#06b6d4] font-bold mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Search
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* --- LEFT: IMAGE GALLERY --- */}
          <div className="space-y-4">
            <div className="bg-white rounded-[32px] p-2 border border-slate-100 shadow-sm overflow-hidden h-[400px] md:h-[500px]">
               <img 
                 src={product.image} 
                 alt={product.title} 
                 className="w-full h-full object-cover rounded-[24px] hover:scale-105 transition-transform duration-700" 
               />
            </div>
            {/* Thumbnails (Static for demo) */}
            <div className="flex gap-4 overflow-x-auto pb-2">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="w-24 h-24 flex-shrink-0 bg-white rounded-2xl border border-slate-200 p-1 cursor-pointer hover:border-[#06b6d4]">
                    <img src={product.image} className="w-full h-full object-cover rounded-xl" />
                 </div>
               ))}
            </div>
          </div>

          {/* --- RIGHT: INFO & ACTIONS --- */}
          <div className="space-y-8">
            
            {/* Header */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <span className="bg-cyan-50 text-[#06b6d4] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-1">{product.title}</h1>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                         <MapPin size={16} /> {product.location || "Surat, Gujarat"}
                         <span className="mx-2">•</span>
                         <Star size={16} className="text-yellow-400 fill-yellow-400" /> 4.8 (24 reviews)
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-3 rounded-full bg-slate-50 hover:bg-pink-50 hover:text-pink-500 transition-colors">
                        <Heart size={20} />
                      </button>
                      <button className="p-3 rounded-full bg-slate-50 hover:bg-blue-50 hover:text-blue-500 transition-colors">
                        <Share2 size={20} />
                      </button>
                   </div>
                </div>

                <div className="h-px bg-slate-100 my-6"></div>

                {/* Price & Owner */}
                <div className="flex justify-between items-center">
                   <div>
                      <p className="text-slate-400 text-sm font-medium mb-1">Price per day</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#06b6d4]">₹{product.price}</span>
                        <span className="text-slate-400 text-sm">/ day</span>
                      </div>
                   </div>
                   <div className="flex items-center gap-3 bg-slate-50 pl-2 pr-4 py-2 rounded-full border border-slate-100">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-slate-200">
                         <span className="font-bold text-[#06b6d4]">CK</span>
                      </div>
                      <div className="text-left">
                         <p className="text-xs text-slate-400 font-bold">Owner</p>
                         <p className="text-sm font-bold text-slate-700">Chintan K.</p>
                      </div>
                   </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
               <h3 className="font-bold text-lg text-slate-900 mb-4">Description</h3>
               <p className="text-slate-500 leading-relaxed">
                 {product.subtitle || "This item is well maintained and perfect for your needs. Please contact me for availability before booking."}
                 <br /><br />
                 Includes all original accessories. Pickup available from Vesu area.
               </p>
               
               <div className="mt-6 flex gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-lg">
                    <ShieldCheck size={18} className="text-green-500" /> Verified Item
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-lg">
                    <Calendar size={18} className="text-blue-500" /> Min. 2 Days
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
               <button className="flex-1 bg-white border-2 border-slate-200 text-slate-700 py-4 rounded-2xl font-bold text-lg hover:border-[#06b6d4] hover:text-[#06b6d4] transition-all flex items-center justify-center gap-2">
                 <MessageCircle size={20} /> Chat with Owner
               </button>
               <button className="flex-[2] bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:-translate-y-1 transition-all">
                 Rent Now
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;