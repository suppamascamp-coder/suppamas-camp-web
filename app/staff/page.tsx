"use client";
import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Loader2, Award, ShieldCheck, ArrowLeft } from 'lucide-react';
import { db } from '../../src/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function StaffPage() {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "homepage"));
        if (snap.exists()) {
          const data = snap.data();
          setStaffList(data.staffList || []);
          setSummaryData({
            title: data.texts?.staffSummaryTitle || 'ทีมงานวิทยากรและสตาฟกว่า 30 ท่าน',
            desc: data.texts?.staffSummaryDesc || 'พร้อมดูแลนักเรียนทุกคนอย่างใกล้ชิด ตลอด 24 ชั่วโมง'
          });
        }
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm animate-pulse">Loading Organization Chart...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-24">
      {/* 1. Hero Header สำหรับหน้า Staff */}
      <section className="relative pt-32 pb-24 bg-green-950 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2000')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full blur-[120px] opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl rotate-3">
             <Users className="w-10 h-10 text-white" />
          </div>
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-orange-400 border border-white/20 text-xs font-bold mb-4 backdrop-blur-md uppercase tracking-[0.2em]">
             Organization Chart
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight italic">
            คณะผู้บริหาร <br /> <span className="text-orange-500 underline decoration-white/20 underline-offset-8">และทีมงานค่าย</span>
          </h1>
          <p className="text-green-100/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            บุคคลผู้อยู่เบื้องหลังความสำเร็จ ความปลอดภัย และรอยยิ้มของลูกเสือทุกคน ณ ค่ายอนุสรณ์ศุภมาศ ราชบุรี
          </p>
        </div>
      </section>

      {/* 2. Grid แสดงรายชื่อบุคลากรทั้งหมด */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {staffList.map((person: any, idx: number) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white hover:border-orange-500 transition-all duration-300 group relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 group-hover:scale-[8] transition-transform duration-700 ease-in-out opacity-30"></div>
              
              {/* ส่วนรูปภาพพนักงาน */}
              <div className="w-28 h-28 bg-green-50 rounded-[2rem] mb-6 flex items-center justify-center text-green-700 group-hover:bg-orange-500 group-hover:text-white transition-colors relative z-10 border border-green-100 overflow-hidden shadow-inner shrink-0">
                {person.img ? (
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCheck className="w-12 h-12" />
                )}
              </div>

              <h3 className="text-lg md:text-xl font-black text-slate-800 mb-2 relative z-10 text-center leading-tight h-14 flex items-center justify-center w-full">{person.name}</h3>
              <p className="text-orange-600 text-xs font-black uppercase tracking-[0.1em] relative z-10 text-center bg-orange-50 px-4 py-2 rounded-xl w-full border border-orange-100">
                {person.pos}
              </p>
            </div>
          ))}
        </div>

        {/* 3. แถบสรุปข้อมูลทีมงานด้านล่าง */}
        <div className="mt-16 bg-white rounded-[2rem] md:rounded-[4rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col md:flex-row items-center gap-6 w-full text-center md:text-left relative z-10">
              <div className="w-20 h-20 rounded-full bg-green-950 flex items-center justify-center shadow-xl shrink-0">
                  <ShieldCheck className="w-10 h-10 text-orange-500" />
              </div>
              <div>
                  <h4 className="text-xl md:text-2xl font-black text-green-950 mb-2 tracking-wide uppercase italic">{summaryData.title}</h4>
                  <p className="text-slate-500 text-sm md:text-base font-medium">{summaryData.desc}</p>
              </div>
            </div>
        </div>

        {/* ปุ่มกลับหน้าแรก */}
        <div className="text-center mt-16">
          <a href="/#home" className="inline-flex items-center gap-3 text-slate-500 hover:text-orange-500 font-bold text-sm bg-white px-8 py-4 rounded-full shadow-sm hover:shadow-xl transition-all border border-slate-200 group">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> กลับสู่หน้าหลัก
          </a>
        </div>

      </section>
    </div>
  );
}