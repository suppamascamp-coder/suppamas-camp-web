import React, { useState, useEffect } from 'react';
import { X, Loader2, Map as MapIcon, Image as ImageIcon, Navigation } from 'lucide-react';

// 📌 นำเข้า Firebase
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function AdventureMapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // State สำหรับเก็บข้อมูล
  const [adventureBases, setAdventureBases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State สำหรับ Popup เมื่อกดหมุดบนแผนที่
  const [activePopupData, setActivePopupData] = useState<any | null>(null);

  // 📸 ฟังก์ชันดึงข้อมูลจาก Firebase
  useEffect(() => {
    if (!isOpen) return;

    const fetchBases = async () => {
      setIsLoading(true);
      try {
        const q = query(collection(db, "adventure_bases"), orderBy("id_number", "asc"));
        const querySnapshot = await getDocs(q);
        
        const fetchedBases: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedBases.push({ id: doc.id, ...doc.data() });
        });
        
        setAdventureBases(fetchedBases);
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
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-green-950/90 backdrop-blur-sm p-2 md:p-4 animate-in fade-in duration-300">
      
      {/* 🌟 คอนเทนเนอร์หลัก (เลื่อน Scroll ได้) 🌟 */}
      <div className="bg-slate-50 w-full max-w-5xl h-[95vh] rounded-[2rem] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 border border-white/10">
        
        {/* Header คงที่ด้านบน */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-slate-200 z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
              <MapIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-green-950 leading-none">ฐานกิจกรรมผจญภัย</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Adventure Map & Details</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="bg-slate-100 text-slate-500 hover:text-rose-500 hover:bg-rose-50 p-2.5 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* พื้นที่เนื้อหาที่สามารถเลื่อนได้ (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-slate-50">
          
          {/* สถานะกำลังโหลด */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
              <p className="text-slate-500 font-bold">กำลังโหลดข้อมูลฐานกิจกรรม...</p>
            </div>
          )}

          {!isLoading && adventureBases.length === 0 && (
             <div className="text-center py-20 text-slate-400 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                <MapIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="font-bold">ยังไม่มีข้อมูลฐานกิจกรรมในระบบ</p>
             </div>
          )}

          {!isLoading && adventureBases.length > 0 && (
            <div className="space-y-12">
              
              {/* 🗺️ ส่วนที่ 1: แผนที่ Interactive */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                   <h3 className="text-lg font-black text-slate-800 flex items-center gap-2"><Navigation className="w-5 h-5 text-orange-500" /> แผนที่จำลอง</h3>
                   <span className="text-xs font-bold text-slate-400 bg-slate-200 px-3 py-1 rounded-full">จิ้มที่หมุดเพื่อดูข้อมูล</span>
                </div>
                
                <div className="w-full h-[250px] md:h-[400px] bg-slate-200 rounded-[2rem] relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')] bg-cover bg-center border-4 border-white shadow-lg">
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div> 
                  
                  {/* 📌 หมุดบนแผนที่ */}
                  {adventureBases.map((base) => (
                    <button 
                      key={`pin-${base.id}`}
                      onClick={() => setActivePopupData(base)} // กดแล้วเซ็ตข้อมูลเปิด Popup
                      className="absolute w-10 h-10 md:w-12 md:h-12 bg-orange-500 text-white rounded-full font-black text-lg md:text-xl transition-all transform -translate-x-1/2 -translate-y-1/2 shadow-[0_10px_20px_rgba(249,115,22,0.4)] border-[3px] border-white hover:scale-125 hover:bg-green-700 hover:z-20 active:scale-95 flex items-center justify-center z-10"
                      style={{ top: base.top, left: base.left }}
                    >
                      {base.id_number}
                    </button>
                  ))}
                </div>
              </div>

              {/* 📋 ส่วนที่ 2: รายการฐานทั้งหมด (แสดงแบบการ์ดเรียงลงมา) */}
              <div className="space-y-6">
                <div className="px-2 border-b border-slate-200 pb-4 mb-6">
                  <h3 className="text-2xl font-black text-slate-800">รายละเอียดฐานทั้งหมด</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">เลื่อนดูภาพและข้อมูลของทุกฐานได้ที่นี่</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {adventureBases.map((base) => (
                    <div key={`card-${base.id}`} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col">
                      {/* รูปภาพของฐาน */}
                      <div className="relative h-48 md:h-56 bg-slate-100 overflow-hidden shrink-0">
                        {base.img ? (
                          <img src={base.img} alt={base.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <ImageIcon className="w-12 h-12" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        {/* ป้ายหมายเลขฐานมุมซ้ายล่าง */}
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white text-green-950 rounded-xl flex items-center justify-center font-black text-2xl shadow-lg border-2 border-white/50">
                          {base.id_number}
                        </div>
                      </div>
                      
                      {/* ข้อมูลของฐาน */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h4 className="text-xl font-black text-slate-800 mb-3 leading-tight">{base.name}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium mb-4 flex-1">
                          {base.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🌟 POPUP MODAL (เด้งขึ้นมาเมื่อกดหมุดบนแผนที่) 🌟 */}
      {/* ========================================================= */}
      {activePopupData && (
        <div 
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActivePopupData(null)} // กดพื้นที่ว่างเพื่อปิด
        >
          <div 
            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()} // ป้องกันการกดทะลุ
          >
            {/* รูปภาพฐานใน Popup */}
            <div className="relative h-56 bg-slate-100 shrink-0">
              {activePopupData.img ? (
                <img src={activePopupData.img} alt={activePopupData.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <ImageIcon className="w-16 h-16" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <button onClick={() => setActivePopupData(null)} className="bg-black/50 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute -bottom-6 left-6 w-16 h-16 bg-orange-500 text-white rounded-[1.2rem] flex items-center justify-center font-black text-3xl shadow-lg border-4 border-white">
                {activePopupData.id_number}
              </div>
            </div>

            {/* ข้อมูลฐานใน Popup */}
            <div className="p-8 pt-10 overflow-y-auto custom-scrollbar flex-1">
              <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight">{activePopupData.name}</h3>
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100">
                <p className="text-slate-600 leading-relaxed font-medium">
                  {activePopupData.desc}
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 shrink-0">
               <button onClick={() => setActivePopupData(null)} className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors">
                 ปิดหน้าต่าง
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}