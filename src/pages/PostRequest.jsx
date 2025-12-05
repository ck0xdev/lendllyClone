import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Send } from 'lucide-react';

const PostRequest = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request Posted Successfully!");
    navigate('/requests');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 font-sans relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-cyan-100/40 blur-3xl rounded-full -z-10 animate-blob"></div>
      
      <div className="max-w-3xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#06b6d4] font-bold mb-8 transition-colors group"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Back to Requests</span>
        </button>

        <div className="bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl shadow-slate-200/50 border border-white/50 p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="text-center mb-10">
             <div className="w-20 h-20 bg-gradient-to-br from-cyan-50 to-teal-50 text-[#06b6d4] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner transform rotate-3">
                <MessageCircle size={36} />
             </div>
             <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Post a Request</h1>
             <p className="text-slate-500 text-lg font-medium">Let the community know what you need.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">What do you need?</label>
                <input type="text" placeholder="e.g. Hiking Backpack, DSLR Camera" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-400" required />
             </div>

             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                <div className="relative">
                   <select className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all appearance-none cursor-pointer">
                      <option>Select a Category</option>
                      <option>Electronics</option>
                      <option>Sports & Outdoor</option>
                      <option>Tools</option>
                   </select>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700 ml-1">Budget (₹)</label>
                   <input type="number" placeholder="500" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700 ml-1">Duration</label>
                   <input type="text" placeholder="e.g. 3 Days" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all" />
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                <textarea rows="4" placeholder="Describe specific requirements, preferred brands, etc..." className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 font-medium focus:bg-white focus:border-[#06b6d4]/30 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all resize-none placeholder:text-slate-400"></textarea>
             </div>

             <button type="submit" className="group w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3">
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                Submit Request
             </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default PostRequest;