import React, { useState } from 'react';
import { 
  Camera, Star, MapPin, Mail, ShieldCheck, Calendar, 
  Settings, Grid, Heart, Video, Image as ImageIcon, 
  CreditCard, HelpCircle, FileText, CheckCircle, Smartphone,
  Edit2, ChevronRight, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/UI/ItemCard';
import { FEATURED_ITEMS } from '../data';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Details');

  // Exact Tabs from Screenshot
  const tabs = [
    "Details", "Listings", "Reviews", "Images", "Videos", "Favorites", 
    "Verification", "Requests", "Payments", "Settings", "Help & Support"
  ];

  // Mock Data
  const myListings = FEATURED_ITEMS.slice(0, 3);
  const reviews = [
    { id: 1, user: "Rahul Varma", rating: 5, text: "Great experience renting from Chintan! The item was exactly as described and he was very helpful with the setup.", date: "2 days ago" },
    { id: 2, user: "Priya Sharma", rating: 4, text: "Smooth transaction, but pickup location was a bit far. Otherwise perfect.", date: "1 week ago" }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20 font-sans">
      
      {/* --- CSS ANIMATIONS --- */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>

      {/* --- 1. COVER PHOTO (Interactive) --- */}
      <div className="h-72 w-full bg-slate-900 relative group overflow-hidden">
        {/* Professional Gradient/Image Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800">
           <img 
             src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=2000" 
             alt="Cover" 
             className="w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
           />
        </div>
        
        {/* Actions Overlay */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-colors">
              <Share2 size={18} />
           </button>
        </div>

        <button className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white/20 transition-all shadow-lg translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-300">
          <Camera size={16} /> Change Cover
        </button>
      </div>

      <div className="max-w-[90%] mx-auto px-4">
        
        {/* --- 2. PROFILE HEADER CARD --- */}
        <div className="relative -mt-24 bg-white rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Avatar with Glow */}
            <div className="relative -mt-20 md:-mt-24 flex-shrink-0 group">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 p-1 shadow-2xl">
                 <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-4 border-white overflow-hidden relative">
                    <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-teal-600">CK</span>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                       <Camera size={24} className="text-white" />
                    </div>
                 </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 border-4 border-white rounded-full"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 pt-2 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                   <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                     Chintan Kukadiya
                     <ShieldCheck size={22} className="text-[#06b6d4] fill-cyan-50" />
                   </h1>
                   <div className="flex items-center gap-3 text-sm font-medium mt-1">
                      <span className="text-slate-500">@chintan_dev</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500">Joined Dec 2024</span>
                   </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  <Link 
                    to="/dashboard" 
                    className="flex-1 md:flex-none text-center px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Dashboard <ChevronRight size={16} />
                  </Link>
                  <button className="px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors hover:border-slate-300">
                    <Settings size={20} />
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 border-t border-slate-100 pt-5">
                 <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="p-1.5 bg-yellow-50 rounded-lg text-yellow-500"><Star size={16} fill="currentColor" /></div>
                    4.8 <span className="text-slate-400 font-normal">(24 Reviews)</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="p-1.5 bg-cyan-50 rounded-lg text-cyan-600"><MapPin size={16} /></div>
                    Surat, Gujarat
                 </div>
                 <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600"><ShieldCheck size={16} /></div>
                    Identity Verified
                 </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-10 border-b border-slate-100">
             <div className="flex gap-6 overflow-x-auto pb-1 scrollbar-hide">
               {tabs.map((tab) => (
                 <button 
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`pb-4 text-sm font-bold whitespace-nowrap transition-all relative ${
                     activeTab === tab 
                       ? 'text-[#06b6d4]' 
                       : 'text-slate-500 hover:text-slate-800'
                   }`}
                 >
                   {tab}
                   {activeTab === tab && (
                     <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#06b6d4] rounded-t-full layoutId='activeTab'" />
                   )}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* --- 3. DYNAMIC CONTENT SECTIONS --- */}
        <div className="min-h-[400px]">
          
          {/* TAB: DETAILS */}
          {activeTab === "Details" && (
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8 animate-slide-up">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                  <button className="text-sm font-bold text-[#06b6d4] hover:underline flex items-center gap-1">
                    <Edit2 size={14} /> Edit
                  </button>
               </div>
               
               <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-10">
                  <div className="space-y-6">
                     <InfoItem label="Full Name" value="Chintan Kukadiya" />
                     <InfoItem label="Email Address" value="kukadiyachintan026@gmail.com" />
                     <InfoItem label="Phone Number" value="+91 98765 43210" verified />
                  </div>
                  <div className="space-y-6">
                     <InfoItem label="Location" value="Surat, Gujarat, India" />
                     <InfoItem label="Languages" value="English, Hindi, Gujarati" />
                     <div className="group">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bio</p>
                        <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:border-cyan-100 transition-colors">
                          Tech enthusiast and software developer. I love trying out new gadgets and sharing my collection with the community. Let's make sharing the new norm! 🚀
                        </p>
                     </div>
                  </div>
               </div>

               <div className="border-t border-slate-100 pt-8">
                 <h3 className="font-bold text-slate-900 mb-6">Connected Accounts</h3>
                 <div className="flex gap-4">
                    <SocialButton label="Google" connected />
                    <SocialButton label="Facebook" connected={false} />
                 </div>
               </div>
            </div>
          )}

          {/* TAB: LISTINGS */}
          {activeTab === "Listings" && (
            <div className="animate-slide-up">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-900">Active Listings ({myListings.length})</h3>
                  <Link to="/post-item" className="text-[#06b6d4] font-bold text-sm hover:bg-cyan-50 px-4 py-2 rounded-lg transition-colors">
                    + Add New
                  </Link>
               </div>
               {myListings.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myListings.map(item => (
                      <div key={item.id} className="hover:-translate-y-1 transition-transform duration-300">
                        <ItemCard item={item} />
                      </div>
                    ))}
                 </div>
               ) : (
                 <EmptyState icon={Grid} label="No listings yet" sub="Start earning by listing your items." />
               )}
            </div>
          )}

          {/* TAB: REVIEWS */}
          {activeTab === "Reviews" && (
            <div className="grid lg:grid-cols-3 gap-8 animate-slide-up">
               {/* Summary Card */}
               <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-fit">
                  <h3 className="font-bold text-slate-900 mb-2">Rating Overview</h3>
                  <div className="flex items-end gap-3 mb-6">
                     <span className="text-5xl font-extrabold text-slate-900">4.8</span>
                     <div className="mb-2">
                        <div className="flex text-yellow-400 gap-0.5 text-sm">
                           {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-xs text-slate-400 font-medium mt-1">Based on 24 reviews</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     {[5,4,3,2,1].map(num => (
                        <div key={num} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                           <span className="w-2">{num}</span>
                           <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-yellow-400 rounded-full" style={{ width: num === 5 ? '70%' : num === 4 ? '20%' : '5%' }}></div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Reviews List */}
               <div className="lg:col-span-2 space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                       <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-sm">
                               {review.user.charAt(0)}
                             </div>
                             <div>
                                <h4 className="font-bold text-slate-900 text-sm">{review.user}</h4>
                                <p className="text-xs text-slate-400">{review.date}</p>
                             </div>
                          </div>
                          <div className="flex text-yellow-400 gap-0.5">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-200" : ""} />
                             ))}
                          </div>
                       </div>
                       <p className="text-slate-600 text-sm pl-13 leading-relaxed font-medium">
                         "{review.text}"
                       </p>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === "Settings" && (
            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm max-w-2xl animate-slide-up">
               <h3 className="text-xl font-bold text-slate-900 mb-6">Account Settings</h3>
               <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <InputGroup label="First Name" value="Chintan" />
                     <InputGroup label="Last Name" value="Kukadiya" />
                  </div>
                  <InputGroup label="Email" value="kukadiyachintan026@gmail.com" disabled />
                  
                  <div className="pt-4 flex gap-4">
                     <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg active:scale-95">
                       Save Changes
                     </button>
                     <button className="text-slate-500 font-bold px-6 py-3 hover:text-slate-700">Cancel</button>
                  </div>
               </form>
            </div>
          )}

          {/* TAB: PLACEHOLDERS (For completeness) */}
          {["Images", "Videos", "Favorites", "Verification", "Requests", "Payments", "Help & Support"].includes(activeTab) && (
             <EmptyState icon={Grid} label={`No ${activeTab} found`} sub="This section is currently empty." />
          )}

        </div>
      </div>
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const InfoItem = ({ label, value, verified }) => (
  <div className="group">
     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
     <div className="flex items-center gap-2">
       <p className="text-slate-900 font-bold text-lg">{value}</p>
       {verified && <CheckCircle size={16} className="text-green-500 fill-green-50" />}
     </div>
  </div>
);

const SocialButton = ({ label, connected }) => (
  <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
    connected 
      ? 'bg-green-50 text-green-700 border-green-200' 
      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
  }`}>
    {connected ? <CheckCircle size={16} /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
    {label} {connected ? 'Connected' : 'Connect'}
  </button>
);

const InputGroup = ({ label, value, disabled }) => (
  <div className="space-y-2">
     <label className="text-sm font-bold text-slate-700">{label}</label>
     <input 
       type="text" 
       defaultValue={value} 
       disabled={disabled}
       className={`w-full px-4 py-3 rounded-xl border border-slate-200 outline-none font-medium transition-all ${
         disabled ? 'bg-slate-50 text-slate-400' : 'focus:border-[#06b6d4] focus:ring-4 focus:ring-cyan-500/10'
       }`} 
     />
  </div>
);

const EmptyState = ({ icon: Icon, label, sub }) => (
  <div className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-200 animate-slide-up">
     <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon size={32} />
     </div>
     <h3 className="text-lg font-bold text-slate-900">{label}</h3>
     <p className="text-slate-500 text-sm mt-1">{sub}</p>
  </div>
);

export default Profile;