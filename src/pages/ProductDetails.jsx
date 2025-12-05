import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, ShieldCheck, Heart, Share2, 
  MessageCircle, Calendar, CheckCircle, Clock, Info 
} from 'lucide-react';
import { FEATURED_ITEMS } from '../data';
import Button from '../components/UI/Button'; // Using new component
import Badge from '../components/UI/Badge';   // Using new component

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  // Find item (Simulated)
  const product = FEATURED_ITEMS.find(item => item.id === parseInt(id)) || FEATURED_ITEMS[0];
  
  // Mock Images (In real app, this comes from DB)
  const images = [product.image, "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=800"];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8 px-4 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-slate-500 hover:text-[#06b6d4] font-bold mb-8 transition-colors"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-sm">Back to Search</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* --- LEFT COLUMN: IMAGES & INFO --- */}
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden h-[500px] relative group">
                 <img 
                   src={images[selectedImage]} 
                   alt={product.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                 />
                 <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-3 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-red-500 hover:bg-white shadow-lg transition-all active:scale-95">
                       <Heart size={20} />
                    </button>
                    <button className="p-3 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-[#06b6d4] hover:bg-white shadow-lg transition-all active:scale-95">
                       <Share2 size={20} />
                    </button>
                 </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                 {images.map((img, i) => (
                   <div 
                     key={i} 
                     onClick={() => setSelectedImage(i)}
                     className={`w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                       selectedImage === i ? 'border-[#06b6d4] shadow-md scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                     }`}
                   >
                      <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
                   </div>
                 ))}
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
               <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Description</h2>
               <p className="text-slate-600 leading-relaxed text-lg mb-8">
                 {product.subtitle || "This item is in excellent condition and perfect for your needs. It has been well-maintained and comes with all necessary accessories. Please feel free to ask any questions before booking."}
                 <br /><br />
                 Whether you need it for a weekend project or a long-term requirement, this item is ready to use. Pickup is easy and flexible.
               </p>
               
               <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="p-2 bg-green-100 text-green-600 rounded-full"><ShieldCheck size={20} /></div>
                    <div>
                        <p className="font-bold text-slate-900">Verified Item</p>
                        <p className="text-xs text-slate-500">Checked for quality</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><Clock size={20} /></div>
                    <div>
                        <p className="font-bold text-slate-900">Quick Response</p>
                        <p className="text-xs text-slate-500">Owner replies in 1hr</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Reviews Preview */}
            <div className="bg-white p-8 md:p-10 rounded-[40px] border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-2xl font-extrabold text-slate-900">Reviews</h2>
                   <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 px-3 py-1 rounded-xl">
                      <Star size={18} fill="currentColor" /> 4.8
                   </div>
                </div>
                {/* Single Review */}
                <div className="border-b border-slate-100 pb-6 mb-6">
                   <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                      <div>
                         <p className="font-bold text-slate-900">Rahul Varma</p>
                         <p className="text-xs text-slate-400">2 days ago</p>
                      </div>
                   </div>
                   <p className="text-slate-600">"Great item! Works perfectly and the owner was very helpful."</p>
                </div>
                <Button variant="ghost" className="w-full">View all 24 reviews</Button>
            </div>

          </div>

          {/* --- RIGHT COLUMN: STICKY BOOKING CARD --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
               
               <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-1">Total Price</p>
                        <div className="flex items-baseline gap-1">
                           <span className="text-4xl font-extrabold text-[#06b6d4]">₹{product.price}</span>
                           <span className="text-slate-500 font-medium">/ day</span>
                        </div>
                     </div>
                     <Badge variant="success">Available</Badge>
                  </div>

                  <div className="space-y-4 mb-8">
                     <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer hover:border-cyan-200 transition-colors">
                        <span className="text-slate-500 font-medium">Dates</span>
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                           <Calendar size={18} className="text-[#06b6d4]" /> Select Dates
                        </div>
                     </div>
                     <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Location</span>
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                           <MapPin size={18} className="text-[#06b6d4]" /> {product.location || "Surat"}
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <Button variant="primary" size="lg" className="w-full">
                        Rent Now
                     </Button>
                     <Button variant="outline" size="lg" className="w-full">
                        <MessageCircle size={20} className="mr-2" /> Chat with Owner
                     </Button>
                  </div>

                  <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
                     <ShieldCheck size={14} /> You won't be charged yet
                  </p>
               </div>

               {/* Owner Card */}
               <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                     CK
                  </div>
                  <div>
                     <p className="text-xs text-slate-400 font-bold uppercase">Listed by</p>
                     <h4 className="font-bold text-slate-900 text-lg">Ck</h4>
                     <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                        <CheckCircle size={12} /> Verified Owner
                     </p>
                  </div>
               </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;