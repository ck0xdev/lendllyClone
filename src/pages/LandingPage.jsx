import React from 'react';
import { 
  ArrowRight, Sparkles, Smartphone, Bike, Camera, Gamepad, Music, Wrench, Dumbbell, Book, Shirt, Armchair, 
  MessageCircle, RefreshCw, MapPin, CheckCircle, ShieldCheck, Clock, Users 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white font-sans pb-20 overflow-x-hidden">
      
      {/* --- CSS ANIMATIONS (No external library needed) --- */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-enter {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* --- 1. HERO SECTION (Container Style) --- */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8 animate-enter">
        <div className="max-w-[1400px] mx-auto bg-[#e0f2fe] rounded-[40px] px-6 py-20 md:py-32 relative overflow-hidden text-center shadow-sm">
            
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/40 blur-3xl rounded-full -z-0 pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              {/* Tagline */}
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/50 px-4 py-1.5 rounded-full shadow-sm mb-4 hover:bg-white transition-colors cursor-default">
                 <Sparkles size={14} className="text-[#06b6d4]" />
                 <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Rent Anything, Anytime</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#0f172a] tracking-tight leading-[1.1]">
                Discover Items to <span className="text-[#06b6d4]">Rent</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Find the perfect items for your needs. Rent items from trusted community members and save money.
              </p>

              {/* Buttons with Motion */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <Link 
                  to="/items" 
                  className="group bg-[#06b6d4] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-all duration-300 hover:bg-[#0891b2] hover:scale-105 hover:shadow-cyan-500/50 active:scale-95"
                >
                  Browse All Items 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                to="/post-item" 
                className="bg-white text-slate-700 px-8 py-4 rounded-full font-bold text-lg shadow-sm border border-slate-200 transition-all duration-300 hover:bg-slate-50 hover:text-[#06b6d4] hover:border-[#06b6d4] hover:-translate-y-1 active:scale-95">
                    <span>List yout Item</span>
               </Link>
              </div>
            </div>
        </div>
      </div>

      {/* --- 2. BROWSE BY CATEGORY --- */}
      <div className="py-20 bg-white animate-enter delay-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              Browse by <span className="text-[#06b6d4]">Category</span>
            </h2>
            <p className="text-slate-500 mt-3">Find exactly what you need from our wide range of categories</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <CategoryPill icon={Smartphone} label="Electronics" />
            <CategoryPill icon={Bike} label="Sports & Outdoor" />
            <CategoryPill icon={Camera} label="Photography" />
            <CategoryPill icon={Gamepad} label="Gaming" />
            <CategoryPill icon={Music} label="Music" />
            <CategoryPill icon={Wrench} label="Tools" />
            <CategoryPill icon={Dumbbell} label="Fitness" />
            <CategoryPill icon={Book} label="Books" />
            <CategoryPill icon={Shirt} label="Clothing" />
            <CategoryPill icon={Armchair} label="Furniture" />
          </div>
        </div>
      </div>

      {/* --- 3. HOW IT WORKS --- */}
      <div className="py-10 bg-white animate-enter delay-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            How <span className="text-[#06b6d4]">Lendlly</span> Works
          </h2>
          <p className="text-slate-500 mb-16">Three simple ways to get what you need</p>

          <div className="grid md:grid-cols-3 gap-8">
             <WorkCard 
               icon={MapPin} 
               title="1. Rent Items" 
               desc="Browse available items and rent them for a few days or weeks." 
               btnText="Browse Items" 
               delay="0"
             />
             <WorkCard 
               icon={MessageCircle} 
               title="2. Request Items" 
               desc="Can't find what you need? Post a request! Others can offer." 
               btnText="Post Request" 
               delay="100"
             />
             <WorkCard 
               icon={RefreshCw} 
               title="3. Swap Items" 
               desc="Exchange items with others - no money needed!" 
               btnText="Find Swaps" 
               delay="200"
             />
          </div>
        </div>
      </div>

      {/* --- 4. SMART SWAPPING (Container Style) --- */}
      <div className="py-10 px-4 sm:px-6 lg:px-8 animate-enter delay-300">
        <div className="max-w-[1400px] mx-auto bg-[#ecfeff] rounded-[40px] p-8 md:p-16 relative overflow-hidden transition-transform hover:scale-[1.01] duration-500">
          
          <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-bold text-cyan-700 shadow-sm border border-cyan-100">
                <RefreshCw size={14} /> Smart Swapping
              </div>
              
              <h2 className="text-4xl font-extrabold text-slate-900 leading-tight">
                Swap Items, Not Just <span className="text-[#06b6d4]">Rent</span>
              </h2>
              
              <p className="text-slate-600 text-lg leading-relaxed">
                Exchange items with other community members! No money needed - just swap what you have for what you need.
              </p>

              <div className="space-y-4">
                <FeatureCheck title="No Cash Required" desc="Trade items directly with other users" />
                <FeatureCheck title="Try Before You Buy" desc="Test items you're considering purchasing" />
                <FeatureCheck title="Sustainable Sharing" desc="Reduce waste by sharing resources" />
              </div>

              <button 
                onClick={() => navigate('/items')} 
                className="group bg-[#06b6d4] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-cyan-500/20 mt-4 flex items-center gap-2 transition-all duration-300 hover:bg-[#0891b2] hover:-translate-y-1 hover:shadow-cyan-500/40 active:scale-95"
              >
                Explore Swap Options 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Grid */}
            <div className="flex-1 grid grid-cols-2 gap-4">
               <SwapCard icon={Bike} label="Sports Gear" />
               <SwapCard icon={Camera} label="Electronics" />
               <SwapCard icon={Book} label="Books" />
               <SwapCard icon={Wrench} label="Tools" />
            </div>
          </div>
        </div>
      </div>

      {/* --- 5. WHY CHOOSE LENDLLY --- */}
      <div className="py-24 bg-white text-center animate-enter delay-200">
        <div className="max-w-7xl mx-auto px-4">
           <h2 className="text-3xl font-bold text-slate-900 mb-4">
             Why Choose <span className="text-[#06b6d4]">Lendlly</span>?
           </h2>
           <div className="grid md:grid-cols-4 gap-8 mt-16">
              <BenefitCard icon={MapPin} title="Location-Based" desc="Find items near you easily" />
              <BenefitCard icon={ShieldCheck} title="Secure" desc="Verified users & payments" />
              <BenefitCard icon={Clock} title="Flexible" desc="Rent for hours or weeks" />
              <BenefitCard icon={Users} title="Community" desc="Join a trusted network" />
           </div>
        </div>
      </div>

      {/* --- 6. CTA BANNER (Container Style) --- */}
      <div className="pb-10 px-4 sm:px-6 lg:px-8 animate-enter delay-300">
         <div className="max-w-[1400px] mx-auto bg-[#ecfeff] rounded-[40px] py-16 px-4 text-center transition-transform hover:scale-[1.01] duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Start <span className="text-[#06b6d4]">Sharing</span>?
            </h2>
            <p className="text-slate-500 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of users who are already saving money and earning extra income through sharing.
            </p>
            <div className="flex justify-center gap-4">
               <button className="bg-[#06b6d4] text-white px-8 py-3 rounded-full font-bold shadow-md transition-all duration-300 hover:bg-[#0891b2] hover:-translate-y-1 hover:shadow-lg active:scale-95">
                 Get Started Free
               </button>
               <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-slate-50 hover:border-[#06b6d4] hover:text-[#06b6d4] hover:-translate-y-1 active:scale-95">
                 Browse Items
               </button>
            </div>
         </div>
      </div>

    </div>
  );
};

/* --- SUB-COMPONENTS WITH HOVER EFFECTS --- */

// 1. Category Pill
const CategoryPill = ({ icon: Icon, label }) => (
  <Link 
    to={`/items?cat=${label}`} 
    className="group flex items-center gap-3 px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all duration-300 min-w-[160px] justify-center hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100 hover:-translate-y-1 active:scale-95"
  >
    <Icon size={20} className="text-slate-400 transition-colors group-hover:text-[#06b6d4]" />
    <span className="text-slate-600 font-semibold text-sm group-hover:text-slate-900">{label}</span>
  </Link>
);

// 2. How it Works Card (UPDATED BUTTONS)
const WorkCard = ({ icon: Icon, title, desc, btnText, delay }) => (
  <div 
    className="bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-center text-center group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-cyan-100"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-16 h-16 bg-[#06b6d4] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
      <Icon size={28} />
    </div>
    <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
    <p className="text-slate-500 text-sm mb-8 h-10 leading-relaxed">{desc}</p>
    
    {/* NEW BUTTON STYLE: White to Cyan on Hover */}
    <button className="w-full py-3 rounded-xl text-sm font-bold border transition-all duration-300 bg-white text-slate-600 border-slate-200 group-hover:bg-[#06b6d4] group-hover:text-white group-hover:border-[#06b6d4] group-hover:shadow-md">
      {btnText}
    </button>
  </div>
);

// 3. Feature Check
const FeatureCheck = ({ title, desc }) => (
  <div className="flex gap-4 items-start group">
    <div className="mt-1 transition-transform group-hover:scale-125 duration-300">
      <CheckCircle size={20} className="text-[#06b6d4]" />
    </div>
    <div>
      <h4 className="font-bold text-slate-900 group-hover:text-[#06b6d4] transition-colors">{title}</h4>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  </div>
);

// 4. Swap Card
const SwapCard = ({ icon: Icon, label }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center transition-all duration-300 cursor-pointer hover:border-[#06b6d4] hover:shadow-lg hover:shadow-cyan-100 hover:-translate-y-1 group">
    <Icon size={32} className="text-[#06b6d4] mx-auto mb-3 transition-transform group-hover:scale-110" />
    <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#06b6d4] transition-colors">{label}</h4>
  </div>
);

// 5. Benefit Card
const BenefitCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-cyan-100 group">
    <div className="w-12 h-12 bg-[#06b6d4] text-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#06b6d4] transition-colors">{title}</h3>
    <p className="text-slate-500 text-sm">{desc}</p>
  </div>
);

export default LandingPage;