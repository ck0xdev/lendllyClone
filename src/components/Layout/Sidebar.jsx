import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, MessageSquare, User, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const links = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Items', icon: ShoppingBag, path: '/items' },
    { name: 'Messages', icon: MessageSquare, path: '/chat' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-slate-100 flex flex-col fixed left-0 top-0 z-40 hidden lg:flex">
      {/* Brand */}
      <div className="p-8">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Lendlly</h1>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold text-sm
              ${isActive 
                ? 'bg-cyan-50 text-[#06b6d4] shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <link.icon size={20} />
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-50">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-bold text-sm">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;