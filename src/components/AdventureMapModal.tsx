import React, { useState, useEffect } from 'react';
// 📌 แก้ไขแล้ว: เพิ่ม Image as ImageIcon เข้ามาตรงนี้ครับ
import { X, Loader2, Map as MapIcon, Image as ImageIcon } from 'lucide-react'; 

// 📌 นำเข้า Firebase
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function AdventureMapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeBase, setActiveBase] = useState<string | null>(null);
  
  // State สำหรับเก็บข้อมูลฐานที่ดึงมาจาก Firebase
  const [adventureBases, setAdventureBases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 📸 ฟังก์ชันดึงข้อมูลจาก Firebase (จะทำงานเมื่อ Modal ถูกเปิดขึ้นมา)
  useEffect(() => {
    if (!isOpen) return; // ถ้าไม่ได้เปิดแผนที่อยู่ ไม่ต้องดึงข้อมูลให้เปลืองโควต้า

    const fetchBases = async () => {
      setIsLoading(true);
      try {
        // ดึงข้อมูลจากคอลเล็กชัน adventure_bases โดยเรียงตาม id_number จากน้อยไปมาก
        const q = query(collection(db, "adventure_bases"), orderBy("id_number", "asc"));
        const querySnapshot = await getDocs(q);
        
        const fetchedBases: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedBases.push({ id: doc.id, ...doc.data() });
        });
        
        setAdventureBases(fetchedBases);
        
        // ตั้งค่าให้ฐานแรกลำดับที่ 1 ถูกเลือกแสดงผลเป็นค่าเริ่มต้น (ถ้ามีข้อมูล)
        if (fetchedBases.length > 0) {
          setActiveBase(fetchedBases[0].id);
        }
      } catch (error) {
        console.error("Error fetching bases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBases();
  }, [isOpen]);

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
            
            {/* แสดงสถานะกำลังโหลด */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-50">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
                <p className="text-green-900 font-bold">กำลังโหลดข้อมูลแผนที่...</p>
              </div>
            )}
            
            {/* 📌 หมุดบนแผนที่ (วนลูปจากข้อมูล Firebase) */}
            {!isLoading && adventureBases.map((base) => (
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
                {base.id_number}
              </button>
            ))}

            {/* แจ้งเตือนกรณีไม่มีข้อมูล */}
            {!isLoading && adventureBases.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                 <MapIcon className="w-16 h-16 mb-4 opacity-50" />
                 <p className="font-bold">ยังไม่มีข้อมูลฐานกิจกรรม</p>
              </div>
            )}
          </div>
          <p className="text-slate-400 text-sm mt-4 italic">*คลิกที่หมายเลขหมุดเพื่อดูรูปและข้อมูลฐาน</p>
        </div>

        {/* ส่วนขวา: ข้อมูลฐานที่ถูกเลือก */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white p-8 md:p-12 flex flex-col relative">
          {!isLoading && adventureBases.map((base) => (
            <div 
              key={base.id} 
              className={`flex flex-col h-full absolute inset-0 p-8 md:p-12 transition-opacity duration-500 bg-white ${activeBase === base.id ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-[1.5rem] flex items-center justify-center font-black text-3xl mb-6 shadow-inner border border-orange-200 shrink-0">
                {base.id_number}
              </div>
              <h3 className="text-3xl font-black text-slate-800 mb-4 leading-tight">{base.name}</h3>
              <p className="text-slate-500 leading-relaxed font-medium mb-8 overflow-y-auto custom-scrollbar pr-2">
                {base.desc}
              </p>
              
              <div className="mt-auto relative rounded-[2rem] overflow-hidden shadow-2xl group shrink-0 h-48 md:h-1/2">
                {base.img ? (
                  <img src={base.img} alt={base.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}