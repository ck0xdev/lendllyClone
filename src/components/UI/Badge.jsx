import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  
  const variants = {
    default: "bg-slate-100 text-slate-600",
    primary: "bg-cyan-50 text-[#06b6d4]",
    success: "bg-green-50 text-green-700 border border-green-100",
    warning: "bg-yellow-50 text-yellow-700 border border-yellow-100",
    danger: "bg-red-50 text-red-700 border border-red-100",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;