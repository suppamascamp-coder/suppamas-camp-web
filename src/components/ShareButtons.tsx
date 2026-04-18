"use client";
import React, { useState } from 'react';
import { Facebook, MessageCircle, Link as LinkIcon, Check } from 'lucide-react';

export default function ShareButtons({ currentUrl, title }: { currentUrl: string, title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // 🌟 พระเอกของเรา: decodeURI จะแปลงรหัส % ยาวๆ ให้กลับมาเป็นภาษาไทยสวยๆ
    const decodedUrl = decodeURI(currentUrl);
    navigator.clipboard.writeText(decodedUrl);
    
    // เปลี่ยนสถานะปุ่มเป็น "คัดลอกแล้ว!" ชั่วคราว 2 วินาที
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const xShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
  const lineShare = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-10 pb-10 border-b border-slate-100">
       <span className="font-black text-slate-400 uppercase tracking-widest text-xs w-full md:w-auto mb-2 md:mb-0 mr-2">แชร์บทความ:</span>
       
       <a href={fbShare} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#1877F2]/90 rounded-2xl text-white transition-all shadow-lg shadow-blue-500/20 active:scale-95">
         <Facebook className="w-4 h-4" /> <span className="text-sm font-bold">Facebook</span>
       </a>
       
       <a href={xShare} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-slate-800 rounded-2xl text-white transition-all shadow-lg active:scale-95">
         <span className="font-black text-sm">𝕏</span> <span className="text-sm font-bold">Post</span>
       </a>
       
       <a href={lineShare} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#00B900] hover:bg-[#00B900]/90 rounded-2xl text-white transition-all shadow-lg shadow-green-500/20 active:scale-95">
         <MessageCircle className="w-4 h-4" /> <span className="text-sm font-bold">LINE</span>
       </a>

       {/* 🌟 ปุ่มคัดลอกลิงก์ภาษาไทยสวยๆ */}
       <button 
         onClick={handleCopy} 
         className={`flex items-center gap-2 px-4 py-2 rounded-2xl transition-all shadow-sm active:scale-95 border ${copied ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
       >
         {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
         <span className="text-sm font-bold">{copied ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}</span>
       </button>
    </div>
  );
}