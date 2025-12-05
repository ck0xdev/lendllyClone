import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const PostRequest = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request Posted Successfully!");
    navigate('/requests');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100">
        
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-[#06b6d4] font-bold mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#06b6d4]">
              <MessageCircle size={32} />
           </div>
           <h1 className="text-3xl font-extrabold text-slate-900">Post a Request</h1>
           <p className="text-slate-500 mt-2">Let the community know what you need.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">What do you need?</label>
              <input type="text" placeholder="e.g. Hiking Backpack, DSLR Camera" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#06b6d4] focus:ring-2 focus:ring-cyan-500/20 outline-none font-medium" required />
           </div>

           <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Category</label>
              <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#06b6d4] focus:ring-2 focus:ring-cyan-500/20 outline-none font-medium bg-white">
                 <option>Electronics</option>
                 <option>Sports & Outdoor</option>
                 <option>Tools</option>
              </select>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Budget (₹)</label>
                 <input type="number" placeholder="500" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#06b6d4] outline-none font-medium" />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Duration</label>
                 <input type="text" placeholder="e.g. 3 Days" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#06b6d4] outline-none font-medium" />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Description</label>
              <textarea rows="4" placeholder="Describe specific requirements..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#06b6d4] outline-none font-medium resize-none"></textarea>
           </div>

           <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:-translate-y-1 transition-all">
              Submit Request
           </button>
        </form>

      </div>
    </div>
  );
};

export default PostRequest;