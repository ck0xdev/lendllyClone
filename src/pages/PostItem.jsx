import React, { useState } from 'react';
import { Upload, DollarSign, MapPin, Tag, Image as ImageIcon, X, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostItem = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Item Listed Successfully!");
    navigate('/items');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 font-sans relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-100/40 blur-3xl rounded-full -z-10 animate-blob"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-100/40 blur-3xl rounded-full -z-10 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#06b6d4] font-bold mb-8 transition-colors group"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-sm">Back</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-slate-200/50 border border-white/50 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-cyan-50 text-[#06b6d4] rounded-2xl mb-4 shadow-inner">
               <Upload size={32} />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              List your item for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">Rent</span>
            </h1>
            <p className="text-slate-500 font-medium text-lg">Share your items with the community and start earning.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. DRAG & DROP IMAGE UPLOAD */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1">Item Photos</label>
              <div 
                className={`relative flex justify-center px-6 pt-10 pb-10 border-2 border-dashed rounded-[32px] transition-all cursor-pointer group ${
                  isDragging 
                    ? 'border-[#06b6d4] bg-cyan-50/50 scale-[1.02]' 
                    : 'border-slate-200 hover:border-[#06b6d4] hover:bg-slate-50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                
                {image ? (
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <p className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">Change Photo</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); setImage(null); }}
                      className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-slate-500 hover:text-red-500 hover:bg-white shadow-lg transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-white text-[#06b6d4] rounded-full flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300">
                       <ImageIcon size={32} />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="file-upload" className="relative cursor-pointer text-lg font-bold text-[#06b6d4] hover:underline">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} />
                      </label>
                      <p className="text-slate-500 font-medium">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">PNG, JPG up to 10MB</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {/* 2. TITLE */}
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700 ml-1">Item Name</label>
                 <input type="text" placeholder="e.g. Sony Alpha a7 III" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-400" required />
               </div>

               {/* 3. CATEGORY */}
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                 <div className="relative">
                   <Tag className="absolute left-5 top-4 text-slate-400" size={20} />
                   <select className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all appearance-none cursor-pointer">
                      <option>Select a category</option>
                      <option>Electronics</option>
                      <option>Photography</option>
                      <option>Sports & Outdoor</option>
                      <option>Tools</option>
                   </select>
                 </div>
               </div>
            </div>

            {/* 4. DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
              <textarea rows="4" placeholder="Describe the condition, features, and rental rules..." className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all resize-none placeholder:text-slate-400"></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {/* 5. PRICE */}
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700 ml-1">Price per Day (₹)</label>
                 <div className="relative">
                   <DollarSign className="absolute left-5 top-4 text-slate-400" size={20} />
                   <input type="number" placeholder="0.00" className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-bold focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all" />
                 </div>
               </div>

               {/* 6. LOCATION */}
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                 <div className="relative">
                   <MapPin className="absolute left-5 top-4 text-slate-400" size={20} />
                   <input type="text" placeholder="e.g. Vesu, Surat" className="w-full pl-12 pr-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all" />
                 </div>
               </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-6">
              <button type="submit" className="group w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
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