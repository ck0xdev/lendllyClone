import React, { useState } from 'react';
import { Upload, DollarSign, MapPin, Tag, Image as ImageIcon, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostItem = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  // Simulating an Image Upload preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this sends data to the backend
    // For now, we simulate success
    alert("Item Listed Successfully! (This is a demo)");
    navigate('/items');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900">List your item for <span className="text-[#06b6d4]">Rent</span></h1>
            <p className="text-slate-500 mt-2">Share your items with the community and earn.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. IMAGE UPLOAD SECTION */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Item Photos</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-200 border-dashed rounded-2xl hover:border-[#06b6d4] hover:bg-cyan-50/30 transition-all cursor-pointer relative group">
                
                {image ? (
                  <div className="relative w-full h-64">
                    <img src={image} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                    <button 
                      type="button" 
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-slate-500 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1 text-center py-8">
                    <div className="w-16 h-16 bg-cyan-100 text-[#06b6d4] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                       <Upload size={28} />
                    </div>
                    <div className="flex text-sm text-slate-600 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-bold text-[#06b6d4] focus-within:outline-none hover:underline">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {/* 2. TITLE */}
               <div className="space-y-2">
                 <label className="block text-sm font-bold text-slate-700">Item Name</label>
                 <input type="text" placeholder="e.g. DSLR Camera, Mountain Bike" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/20 focus:border-[#06b6d4] outline-none transition-all font-medium" required />
               </div>

               {/* 3. CATEGORY */}
               <div className="space-y-2">
                 <label className="block text-sm font-bold text-slate-700">Category</label>
                 <div className="relative">
                   <Tag className="absolute left-4 top-3.5 text-slate-400" size={18} />
                   <select className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/20 focus:border-[#06b6d4] outline-none transition-all font-medium appearance-none bg-white">
                      <option>Select a category</option>
                      <option>Electronics</option>
                      <option>Sports & Outdoor</option>
                      <option>Photography</option>
                      <option>Tools</option>
                      <option>Books</option>
                   </select>
                 </div>
               </div>
            </div>

            {/* 4. DESCRIPTION */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700">Description</label>
              <textarea rows="4" placeholder="Describe your item... (Condition, features, rules)" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/20 focus:border-[#06b6d4] outline-none transition-all font-medium resize-none"></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {/* 5. PRICE */}
               <div className="space-y-2">
                 <label className="block text-sm font-bold text-slate-700">Price per Day (₹)</label>
                 <div className="relative">
                   <DollarSign className="absolute left-4 top-3.5 text-slate-400" size={18} />
                   <input type="number" placeholder="0.00" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/20 focus:border-[#06b6d4] outline-none transition-all font-medium" />
                 </div>
               </div>

               {/* 6. LOCATION */}
               <div className="space-y-2">
                 <label className="block text-sm font-bold text-slate-700">Location</label>
                 <div className="relative">
                   <MapPin className="absolute left-4 top-3.5 text-slate-400" size={18} />
                   <input type="text" placeholder="e.g. Surat, Gujarat" className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500/20 focus:border-[#06b6d4] outline-none transition-all font-medium" />
                 </div>
               </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all active:scale-95">
                Publish Listing
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default PostItem;