import React from 'react';
import { formatCurrency } from '../lib/utils';

export default function KpiCard({ title, amount, color, icon, isPrimary }) {
  return (
    <div className={`p-6 rounded-xl shadow-sm border relative overflow-hidden group ${isPrimary ? 'bg-[#2E5A27] border-[#2E5A27]' : 'bg-white border-slate-100'}`}>
      <div className="relative z-10">
        <div className={`p-2 rounded-lg inline-block mb-3 ${isPrimary ? 'bg-white/20 text-white' : `bg-${color}-50 text-${color}-600`}`}>
          {icon}
        </div>
        <p className={`text-sm font-medium mb-1 ${isPrimary ? 'text-white/70' : 'text-slate-500'}`}>{title}</p>
        <h3 className={`text-2xl font-bold ${isPrimary ? 'text-white' : 'text-slate-800'}`}>{formatCurrency(amount)}</h3>
      </div>
    </div>
  );
}