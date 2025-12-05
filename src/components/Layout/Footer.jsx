import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-8 font-sans">
      <div className="max-w-[90%] mx-auto px-4">
        
        {/* --- Top Section: 3 Columns --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-6">
            {/* Gradient Logo */}
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="bg-gradient-to-br from-cyan-400 to-teal-500 p-2 rounded-xl text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all duration-300">
                <MapPin size={22} fill="currentColor" />
              </div>
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500 tracking-tight">
                Lendlly
              </span>
            </Link>

            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              The modern marketplace for renting and swapping items within your community. Connect with neighbors, save money, and reduce waste.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link to="/items" className="hover:text-cyan-600 transition-colors">Browse Items</Link></li>
              <li><Link to="/requests" className="hover:text-cyan-600 transition-colors">Requests Feed</Link></li>
              <li><Link to="/post-item" className="hover:text-cyan-600 transition-colors">List Your Item</Link></li>
              <li><Link to="/explore" className="hover:text-cyan-600 transition-colors">Explore Map</Link></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><Link to="/contact" className="hover:text-cyan-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-cyan-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-cyan-600 transition-colors">Terms and Conditions</Link></li>
              <li><Link to="/safety" className="hover:text-cyan-600 transition-colors">Trust & Safety</Link></li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section: Centered Copyright --- */}
        <div className="border-t border-gray-100 mt-16 pt-8 text-center">
          <p className="text-slate-400 text-sm font-medium">
            © 2025 Lendlly. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

// Helper for Social Icons
const SocialIcon = ({ icon: Icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-300">
    <Icon size={18} />
  </a>
);

export default Footer;