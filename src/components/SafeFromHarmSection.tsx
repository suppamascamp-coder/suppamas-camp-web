import React from 'react';
import Image from 'next/image';
import { ShieldCheck, MapPin, HeartHandshake } from 'lucide-react'; // อย่าลืม import icon จาก lucide-react

export default function SafeFromHarmSection() {
  return (
    <section className="bg-slate-50 py-16 md:py-24 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* ฝั่งซ้าย: โลโก้ Badge */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500">
              <Image
                src="/image.jpg"
                alt="Safe from Harm Thailand Badge"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
              />
            </div>
          </div>

          {/* ฝั่งขวา: เนื้อหาและข้อความ */}
          <div className="md:col-span-8 text-center md:text-left">
            <p className="text-sm font-black uppercase tracking-widest text-orange-500 mb-2">
              มาตรฐานความปลอดภัยระดับสากล
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-green-950 mb-6 tracking-tight">
              คุ้มครองและปลอดภัย <br className="hidden md:block" />
              ด้วยนโยบาย Safe from Harm
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
              ค่ายลูกเสืออนุสรณ์ศุภมาศ ให้ความสำคัญกับความปลอดภัยของเยาวชนทุกคนเป็นอันดับหนึ่ง เราดำเนินกิจกรรมภายใต้กรอบนโยบายขององค์การลูกเสือโลก (WOSM) เพื่อสร้างพื้นที่ที่ปลอดภัยทั้งทางร่างกายและจิตใจ
            </p>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">บุคลากรผ่านการอบรม</h4>
                <p className="text-sm text-slate-500 leading-relaxed">ทีมงานได้รับการฝึกอบรมด้านความปลอดภัยอย่างเข้มงวด</p>
              </div>

              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">พื้นที่ปลอดภัย</h4>
                <p className="text-sm text-slate-500 leading-relaxed">สภาพแวดล้อมได้รับการตรวจสอบและดูแลอย่างรัดกุม</p>
              </div>

              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">เคารพและให้เกียรติ</h4>
                <p className="text-sm text-slate-500 leading-relaxed">สร้างวัฒนธรรมที่ปราศจากการกลั่นแกล้งทุกรูปแบบ</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}