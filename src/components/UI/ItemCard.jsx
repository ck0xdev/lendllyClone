import React from 'react';

const ItemCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="h-48 w-full bg-gray-100 relative group">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-1">{item.subtitle}</p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-primary font-bold text-lg">₹{item.price}</span>
              <span className="text-gray-400 text-xs">/day</span>
            </div>
            
            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
              {item.category}
            </span>
          </div>

          <button className="w-full bg-primary text-white py-2 rounded-lg font-medium text-sm hover:bg-secondary transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;