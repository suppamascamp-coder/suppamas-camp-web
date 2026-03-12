import React from 'react';
// 📌 นำเข้าไอคอนที่จำเป็น รวมถึง Youtube และ Instagram
import { MapPin, Phone, Tent, Calendar, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-950 text-gray-300 py-20 relative overflow-hidden">
      {/* ตกแต่งฉากหลัง */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-900 rounded-full blur-[100px] opacity-20 -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center rotate-3 shadow-lg">
               <Tent className="w-7 h-7 text-white" />
            </div>
            <span className="font-black text-2xl text-white uppercase tracking-tighter italic">ค่ายอนุสรณ์ศุภมาศ ราชบุรี</span>
          </div>
          <p className="mb-8 leading-relaxed font-medium text-green-100/60 italic">"ศูนย์ฝึกอบรมเยาวชนและค่ายลูกเสือมาตรฐาน <br/>ที่หนึ่งในใจของคุณครูและนักเรียนทั่วประเทศ"</p>
          
          {/* 📱 ส่วนของ Social Media (เพิ่มใหม่) */}
          <div className="flex gap-4">
            <a href="https://www.facebook.com/camp.suppamas" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all shadow-sm group" title="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@a.s.camp" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm group" title="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.33 1.49-1.3 2.48.01 1.27.82 2.4 2.05 2.72.52.13 1.07.14 1.61.03.58-.11 1.15-.36 1.59-.75.59-.5.99-1.21 1.01-2.01.03-3.14.02-6.28.02-9.43V.02h-.01z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com/@suppamascamp" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] transition-all shadow-sm group" title="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/suppamas.camp/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white hover:border-transparent transition-all shadow-sm group" title="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 text-xl uppercase tracking-widest italic border-l-4 border-orange-500 pl-4">ช่องทางติดต่อ</h4>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-orange-500"><MapPin className="w-6 h-6" /></div>
              <span className="font-medium text-green-50/80">ต.หนองกวาง อ.โพธาราม<br/>จ.ราชบุรี 70120</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-orange-500"><Phone className="w-6 h-6" /></div>
              <span className="font-black text-white text-xl tracking-tight">086-551-5110</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black mb-8 text-xl uppercase tracking-widest italic border-l-4 border-orange-500 pl-4">จองค่ายพักแรม</h4>
          <p className="mb-8 font-medium text-green-100/70">เช็กตารางวันว่างของค่ายได้แบบ Real-time <br/>ผ่านระบบออนไลน์ ตลอด 24 ชั่วโมงครับ</p>
          <a 
            href="/campcalendar.html" 
            target="_blank" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 rounded-2xl font-black w-full transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 group"
          >
            <Calendar className="w-6 h-6 group-hover:rotate-12 transition-transform" /> ตรวจสอบคิวว่างทันที
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-bold text-green-100/30 tracking-widest uppercase italic">© {new Date().getFullYear()} ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี. All rights reserved.</p>
        <div className="flex items-center gap-2">
           <span className="text-[10px] font-black text-green-100/20 uppercase tracking-widest">Connect with us</span>
           <div className="w-8 h-[1px] bg-white/10"></div>
           <p className="text-[10px] font-bold text-green-100/40 uppercase">@ค่ายลูกเสืออนุสรณ์ศุภมาศ</p>
        </div>
      </div>
    </footer>
  );
}