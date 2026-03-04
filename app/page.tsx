import React from 'react';
import { 
  Compass, Flame, Users, CheckCircle2, 
  ShieldCheck, BedDouble, Utensils, Info, AlertCircle
} from 'lucide-react';
import ActivityCard from '../src/components/ActivityCard'; 
import GoogleReviews from '../src/components/GoogleReviews'; 

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000" 
            alt="บรรยากาศค่ายลูกเสือ" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs md:text-sm font-semibold mb-4 backdrop-blur-sm">
            เปิดรับจองรอบปีการศึกษา {new Date().getFullYear()} แล้ว
          </span>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl leading-[1.15]">
            บริการค่ายพักแรม <br className="hidden md:block" /> 
            ฝึกอบรมลูกเสือครบวงจร <br/>
            <span className="text-orange-500">ณ ค่ายอนุสรณ์ศุภมาศ ราชบุรี</span>
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-8 drop-shadow-md max-w-3xl mx-auto font-light leading-relaxed">
            มาตรฐานความปลอดภัยสูงสุด ฐานกิจกรรมระดับสากล <br className="hidden md:block" /> 
            ท่ามกลางบรรยากาศธรรมชาติที่สมบูรณ์แบบ
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none">
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl">
              ดูโปรแกรมค่าย
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1">
              ชมวิดีโอบรรยากาศ
            </button>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="relative z-20 -mt-10 md:-mt-20 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-b-4 border-orange-500">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-extrabold text-green-800 mb-1">12+</div>
            <div className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">ปีแห่งประสบการณ์</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="text-2xl md:text-4xl font-extrabold text-orange-500 mb-1">17+</div>
            <div className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">ฐานกิจกรรม</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="text-2xl md:text-4xl font-extrabold text-green-800 mb-1">600 คน</div>
            <div className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">ความจุเรือนนอน</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="text-2xl md:text-4xl font-extrabold text-orange-500 mb-1">100%</div>
            <div className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">ความปลอดภัย</div>
          </div>
        </div>
      </section>

      {/* 3. Highlight Activities */}
      <section className="py-20 bg-gray-50" id="กิจกรรม">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">กิจกรรมไฮไลท์ของเรา</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">ออกแบบโดยผู้เชี่ยวชาญ เน้นความสนุก ควบคู่ไปกับการฝึกทักษะชีวิต</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ActivityCard title="ฐานกิจกรรมผจญภัย" description="ทดสอบความกล้าหาญกับฐานไต่เชือก โดดหอ สไลเดอร์น้ำ ภายใต้การดูแลอย่างใกล้ชิด" image="https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=800" Icon={Compass} />
            <ActivityCard title="กิจกรรมรอบกองไฟ" description="ลานกิจกรรมกว้างขวาง พร้อมระบบแสงเสียงครบวงจร พร้อมบริการ LIVE สำหรับค่ำคืนแห่งความทรงจำ" image="https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=800" Icon={Flame} />
            <ActivityCard title="ทักษะชีวิต & ทีมเวิร์ค" description="เรียนรู้การปฐมพยาบาล การเอาตัวรอด และการแก้ปัญหาร่วมกันผ่านเกมสถานการณ์จำลอง" image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" Icon={Users} />
          </div>
        </div>
      </section>

      {/* 4. Facilities Section */}
      <section className="py-20 bg-white" id="สถานที่">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">สิ่งอำนวยความสะดวก</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">พื้นที่แบ่งเป็นสัดส่วน คำนึงถึงความสะอาดและสุขอนามัยเป็นสำคัญ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <ShieldCheck className="w-12 h-12 text-green-700 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">ความปลอดภัย 24 ชม.</h3>
              <p className="text-gray-600 text-sm">กล้องวงจรปิดรอบค่ายกว่า40จุด และเจ้าหน้าที่พยาบาลดูแลตลอดคืน</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <BedDouble className="w-12 h-12 text-orange-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">เรือนนอนกว้างขวาง</h3>
              <p className="text-gray-600 text-sm">แยกส่วนชาย-หญิง อากาศถ่ายเทสะดวก พัดลมครบ</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <Utensils className="w-12 h-12 text-blue-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">โรงอาหารมาตรฐาน</h3>
              <p className="text-gray-600 text-sm">อาหารสะอาด ปรุงสดใหม่ รองรับได้ถึง 600 ท่าน</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Packages Section */}
      <section className="py-24 bg-gray-50" id="โปรแกรม">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">แพ็กเกจแนะนำ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">ราคาประหยัด มาตรฐานสากล โปรแกรมปรับแต่งได้ตามต้องการ</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Package 1: One Day Trip */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col hover:shadow-md transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">One Day Trip</h3>
                <div className="flex items-baseline gap-1">
                   <span className="text-gray-400 text-sm italic">เริ่มต้น</span>
                   <span className="text-2xl font-bold text-green-800">150</span>
                   <span className="text-gray-400 text-sm">บาท/คน</span>
                </div>
                <p className="text-[10px] text-orange-600 font-medium">*ไม่รวมค่าวิทยากร</p>
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {["อุปกรณ์กิจกรรมครบชุด", "กิจกรรมทักษะลูกเสือ", "อาหารกลางวัน 1 มื้อ", "กิจกรรมผจญภัย","เจ้าหน้าที่พยาบาลจากมูลนิธิสว่างราชบุรีตลอดวัน"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Package 2: 3 วัน 2 คืน (The HIGHLIGHT) */}
            <div className="bg-green-900 p-8 rounded-3xl border border-green-800 flex flex-col transform md:-translate-y-6 shadow-2xl relative">
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 uppercase tracking-widest shadow-lg">
                <Flame className="w-4 h-4" /> แนะนำพิเศษ
              </span>
              
              <div className="mb-6">
                <h3 className="text-3xl font-bold text-white mb-1">3 วัน 2 คืน</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-green-200 text-sm">เริ่มต้น</span>
                  <span className="text-4xl font-black text-orange-400">340</span>
                  <span className="text-green-200 text-sm">บาท/คน</span>
                </div>
                <p className="text-green-300 mt-2 text-xs font-semibold border-l-2 border-orange-500 pl-2">โปรแกรมครบตามหลักสูตร</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1 text-white">
                {[
                  "กิจกรรมทักษะลูกเสือ",
                  "การบันเทิงในกองลูกเสือ",
                  "กิจกรรมบุกเบิก",
                  "กิจกรรมประกอบอาหาร / สูทกรรม",
                  "กิจกรรมผจญภัย",
                  "กิจกรรมรอบกองไฟ",
                  "กิจกรรมเดินทางไกล / สำรวจ",
                  "อาหาร 7 มื้อ + ที่พัก 2 คืน",
                  "พยาบาลจากมูลนิธิสว่างราชบุรี 24 ชม."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[13px] font-light leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="/campcalendar.html" 
                className="w-full py-4 rounded-xl font-extrabold bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-xl text-center text-lg active:scale-95 flex items-center justify-center gap-2"
              >
                เช็กคิวว่างทันที
              </a>
              <p className="text-center text-[10px] text-green-300 mt-3">*อัตรานี้ยังไม่รวมค่าวิทยากร</p>
            </div>

            {/* Package 3: 2 วัน 1 คืน */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col hover:shadow-md transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">2 วัน 1 คืน</h3>
                <div className="flex items-baseline gap-1">
                   <span className="text-gray-400 text-sm italic">เริ่มต้น</span>
                   <span className="text-2xl font-bold text-green-800">240</span>
                   <span className="text-gray-400 text-sm">บาท/คน</span>
                </div>
                <p className="text-[10px] text-orange-600 font-medium">*ไม่รวมค่าวิทยากร</p>
              </div>
              <ul className="space-y-3 flex-1 mb-6">
                {[
                  "กิจกรรมบุกเบิก",
                  "กิจกรรมประกอบอาหาร / สูทกรรม",
                  "กิจกรรมผจญภัย",
                  "กิจกรรมรอบกองไฟ",
                  "กิจกรรมเดินทางไกล / สำรวจ",
                  "อาหาร 4 มื้อ + ที่พัก 1 คืน",
                  "เจ้าหน้าที่พยาบาลจากมูลนิธิสว่างราชบุรี 24 ชม."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ส่วนข้อมูลค่าวิทยากรเพิ่มเติม */}
          <div className="mt-16 max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-orange-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6 text-orange-600">
              <AlertCircle className="w-6 h-6" />
              <h4 className="text-xl font-bold">อัตราค่าธรรมเนียมวิทยากร (Instructor Fee)</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="font-bold text-green-900 border-b pb-2">ค่ายค้างแรม (2 วัน 1 คืน / 3 วัน 2 คืน)</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 italic">ต่ำกว่า 250 ท่าน</span>
                  <span className="font-bold text-gray-900">เหมา 15,000 บาท</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 italic">250 ท่าน ขึ้นไป</span>
                  <span className="font-bold text-orange-600 underline">60 บาท / ท่าน</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-bold text-green-900 border-b pb-2">ค่ายกลางวัน (Day Camp)</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 italic">ต่ำกว่า 200 ท่าน</span>
                  <span className="font-bold text-gray-900">เหมา 6,000 บาท</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 italic">200 ท่าน ขึ้นไป</span>
                  <span className="font-bold text-orange-600 underline">30 บาท / ท่าน</span>
                </div>
              </div>
            </div>
            
            <p className="mt-8 text-xs text-gray-400 text-center italic">
              * ทางค่ายจะสรุปยอดรวมพร้อมค่าวิทยากรให้ในใบเสนอราคาอย่างเป็นทางการอีกครั้ง
            </p>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* 7. Final Call to Action Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            พร้อมพานักเรียนมาเปิดประสบการณ์<br />ลูกเสือที่สมบูรณ์แบบหรือยัง?
          </h2>
          <p className="text-orange-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            ตรวจสอบคิวว่างและขอใบเสนอราคาได้ฟรี ทีมงานของเราพร้อมดูแลคุณครูและน้องๆ อย่างดีที่สุด
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl active:scale-95">
              ติดต่อสอบถาม / จองค่าย
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-all">
              ดูแผนที่การเดินทาง
            </button>
          </div>
        </div>
      </section>
    </>
  );
}