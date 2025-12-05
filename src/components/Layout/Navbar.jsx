import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, MapPin, Bell, Plus, Menu, X, 
  User, MessageSquare, LayoutDashboard, LogOut, 
  ChevronDown, Heart, Repeat
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Custom NavLink with Gradient Underline
  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`relative text-sm font-semibold transition-colors duration-200 group ${
          isActive ? 'text-cyan-600' : 'text-gray-500 hover:text-cyan-600'
        }`}
      >
        {children}
        {/* Cyan-to-Teal Gradient Underline */}
        <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-teal-500 transform origin-left transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}></span>
      </Link>
    );
  };

  return (
    // Added backdrop-blur for a professional, modern feel
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all">
      <div className="max-w-[90%] mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LOGO WITH GRADIENT --- */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Icon Gradient Background */}
            <div className="bg-gradient-to-br from-cyan-400 to-teal-500 p-2 rounded-xl text-white shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300 group-hover:scale-105">
              <MapPin size={22} fill="currentColor" className="drop-shadow-sm" />
            </div>
            <div className="flex flex-col">
              {/* Text Gradient Effect */}
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500 tracking-tight leading-none">
                Lendlly
              </span>
              <span className="text-[10px] text-gray-400 font-semibold tracking-[0.2em] uppercase">Rent & Swap</span>
            </div>
          </Link>

          {/* --- SEARCH BAR --- */}
          <div className="hidden md:flex flex-1 max-w-xl mx-12">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                {/* Icon turns cyan on focus */}
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search items, brands, or categories..."
                className="block w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-400 transition-all duration-300 hover:bg-white hover:shadow-md"
              />
            </div>
          </div>

          {/* --- ACTIONS --- */}
          <div className="hidden md:flex items-center gap-8">
            
            {/* LINKS */}
            <div className="flex items-center gap-8">
              <NavLink to="/explore">Explore</NavLink>
              <NavLink to="/items">Items</NavLink>
              <NavLink to="/requests">Requests</NavLink>
              <NavLink to="/chat">Chat</NavLink>
            </div>

            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

            <div className="flex items-center gap-5">
              {/* Notification Bell */}
              <button className="text-gray-400 hover:text-cyan-600 p-2 rounded-full transition-all relative hover:bg-cyan-50">
                <Bell size={20} strokeWidth={2} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* POST ITEM BUTTON (Gradient) */}
              <button className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-400 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300">
                <Plus size={18} strokeWidth={3} />
                <span>Post Item</span>
              </button>

              {/* PROFILE DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 pl-1 pr-1 py-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                >
                  {/* Avatar Gradient */}
                  <div className="h-10 w-10 bg-gradient-to-br from-cyan-400 to-teal-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md ring-2 ring-white group-hover:ring-cyan-100 transition-all">
                    C
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu (Same as before) */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right ring-1 ring-black/5">
                    <div className="px-5 py-4 border-b border-gray-50 bg-gray-50/50">
                      <p className="font-bold text-gray-900 text-base">Chintan Kukadiya</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">kukadiyachintan026@gmail.com</p>
                    </div>
                    <div className="py-2">
                      <DropdownItem to="/profile" icon={User} label="Profile" />
                      <DropdownItem to="/chat" icon={MessageSquare} label="Messages" />
                      <DropdownItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
                      <DropdownItem to="/transactions" icon={Repeat} label="Transactions" />
                      <DropdownItem to="/favorites" icon={Heart} label="Favorites" />
                    </div>
                    <div className="pt-2 border-t border-gray-50 pb-2">
                      <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium">
                        <LogOut size={16} />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2 hover:bg-cyan-50 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const DropdownItem = ({ to, icon: Icon, label }) => (
  <Link to={to} className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-600 hover:text-cyan-600 hover:bg-cyan-50/50 transition-all font-medium">
    <Icon size={16} className="text-gray-400 group-hover:text-cyan-500" />
    {label}
  </Link>
);

export default Navbar;