import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AdventureMapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeBase, setActiveBase] = useState<number>(1);

  // 🏕️ ข้อมูลฐานกิจกรรมผจญภัย
  // วิธีปรับตำแหน่งหมุดบนแผนที่:
  // top: คือแกน Y (0% คือขอบบนสุด, 100% คือขอบล่างสุด)
  // left: คือแกน X (0% คือขอบซ้ายสุด, 100% คือขอบขวาสุด)
  // *ในอนาคตข้อมูลนี้จะถูกดึงมาจาก Firebase ที่แอดมินตั้งค่าไว้*
  const adventureBases = [
    { 
      id: 1, 
      name: "ฐานกระโดดหอสูง 34 ฟุต", 
      desc: "ทดสอบความกล้าหาญและการตัดสินใจ ด้วยการกระโดดจากหอคอยสูง พร้อมระบบเซฟตี้มาตรฐานสากล", 
      img: "https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=800",
      top: "20%", left: "30%" 
    },
    { 
      id: 2, 
      name: "ฐานไต่เชือกข้ามลำน้ำ", 
      desc: "ฝึกสมดุลของร่างกาย สมาธิ และความแข็งแรงของกล้ามเนื้อในการข้ามอุปสรรคทางน้ำ", 
      img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800",
      top: "45%", left: "60%" 
    },
    { 
      id: 3, 
      name: "ฐานกำแพงจำลอง", 
      desc: "การปีนป่ายข้ามกำแพงสูง ต้องอาศัยทั้งทักษะส่วนตัวและการช่วยเหลือพยุงกันเป็นทีม", 
      img: "https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=800",
      top: "70%", left: "40%" 
    },
    { 
      id: 4, 
      name: "ฐานสไลเดอร์โคลน", 
      desc: "กิจกรรมสุดมันส์ที่เด็กๆ ชื่นชอบ คลายความร้อนและทลายกำแพงความกลัวเรื่องความเลอะเทอะ", 
      img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
      top: "80%", left: "75%" 
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-green-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-slate-50 w-full max-w-6xl h-[90vh] md:h-[80vh] rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500 border border-white/20">
        
        {/* ปุ่มปิด */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 z-20 bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 p-3 rounded-full transition-all shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        {/* ส่วนซ้าย: แผนที่แบบ Interactive */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full bg-slate-200 relative p-8 md:p-12 flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-3xl font-black text-green-950 mb-6 w-full text-left uppercase italic tracking-tighter">Adventure Map</h2>
          
          <div className="w-full h-full relative bg-white rounded-[2rem] shadow-inner border-4 border-slate-100 overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')] bg-cover bg-center">
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div> 
            
            {/* 📌 หมุดบนแผนที่ */}
            {adventureBases.map((base) => (
              <button 
                key={base.id}
                onClick={() => setActiveBase(base.id)}
                className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full font-black text-lg transition-all transform -translate-x-1/2 -translate-y-1/2 shadow-xl border-4 ${
                  activeBase === base.id 
                    ? 'bg-orange-500 text-white border-white scale-125 z-10 animate-bounce' 
                    : 'bg-white text-green-900 border-green-900 hover:bg-green-100 hover:scale-110 z-0'
                }`}
                style={{ top: base.top, left: base.left }}
              >
                {base.id}
              </button>
            ))}
          </div>
          <p className="text-slate-400 text-sm mt-4 italic">*คลิกที่หมายเลขหมุดเพื่อดูรูปและข้อมูลฐาน</p>
        </div>

        {/* ส่วนขวา: ข้อมูลฐานที่ถูกเลือก */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white p-8 md:p-12 flex flex-col relative">
          {adventureBases.map((base) => (
            <div 
              key={base.id} 
              className={`flex flex-col h-full absolute inset-0 p-8 md:p-12 transition-opacity duration-500 bg-white ${activeBase === base.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-[1.5rem] flex items-center justify-center font-black text-3xl mb-6 shadow-inner border border-orange-200">
                {base.id}
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4 leading-tight">{base.name}</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-8">
                {base.desc}
              </p>
              
              <div className="mt-auto relative rounded-[2rem] overflow-hidden shadow-2xl group flex-1 max-h-[40%]">
                <img src={base.img} alt={base.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}