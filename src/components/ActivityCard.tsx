import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function ActivityCard({ title, description, image, Icon }: any) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100">
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        {Icon && <Icon className="absolute bottom-4 left-4 w-8 h-8 text-orange-400 drop-shadow-md" />}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        <span className="text-orange-500 font-semibold flex items-center gap-1 group-hover:translate-x-2 transition-transform">
          ดูรายละเอียด <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
