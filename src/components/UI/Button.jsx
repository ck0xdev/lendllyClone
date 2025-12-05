import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false, 
  ...props 
}) => {
  
  // Base Styles
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variants
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5",
    secondary: "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:-translate-y-0.5",
    outline: "bg-white border-2 border-slate-200 text-slate-700 hover:border-[#06b6d4] hover:text-[#06b6d4]",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
  };

  // Sizes
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2"></span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;