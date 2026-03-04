import React from 'react';
import { 
  Compass, Flame, Users, CheckCircle2, 
  ShieldCheck, BedDouble, Utensils, Info, AlertCircle,
  ArrowRight, Image as ImageIcon, MapPin, Clock, Navigation, Heart,
  Phone, Mail, Facebook, MessageCircle
} from 'lucide-react';
import ActivityCard from '../src/components/ActivityCard'; 
import GoogleReviews from '../src/components/GoogleReviews'; 

// SEO Metadata สำหรับ Next.js App Router
export const metadata = {
  title: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี | ศูนย์ฝึกอบรมและค่ายพักแรมมาตรฐาน',
  description: 'บริการค่ายพักแรม ฝึกอบรมลูกเสือ เนตรนารี ครบวงจร ณ อ.โพธาราม จ.ราชบุรี มาตรฐานความปลอดภัยสูงสุด พร้อมฐานกิจกรรมระดับสากล',
  keywords: 'ค่ายลูกเสือ, ราชบุรี, อนุสรณ์ศุภมาศ, ค่ายพักแรม, ฝึกอบรมเยาวชน, ฐานผจญภัย',
};

export default function Home() {
  return (
    <>
      {/* 1. Hero Section - id="home" */}
      <section id="home" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000" 
            alt="บรรยากาศค่ายลูกเสืออนุสรณ์ศุภมาศ" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs md:text-sm font-semibold mb-4 backdrop-blur-sm">
            เปิดรับจองรอบปีการศึกษา {new Date().getFullYear()} แล้ว
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl leading-[1.15]">
            บริการค่ายพักแรม <br className="hidden md:block" /> 
            ฝึกอบรมลูกเสือครบวงจร <br/>
            <span className="text-orange-500">ณ ค่ายอนุสรณ์ศุภมาศ ราชบุรี</span>
          </h1>
          
          <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-8 drop-shadow-md max-w-3xl mx-auto font-light leading-relaxed">
            มาตรฐานความปลอดภัยสูงสุด ฐานกิจกรรมระดับสากล <br className="hidden md:block" /> 
            ท่ามกลางบรรยากาศธรรมชาติที่สมบูรณ์แบบ
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none">
            <a href="#packages" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl text-center">
              ดูโปรแกรมค่าย
            </a>
            <a href="#contact" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 text-center">
              แผนที่การเดินทาง
            </a>
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

      {/* 3. Highlight Activities - id="activities" */}
      <section className="py-20 bg-gray-50" id="activities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">กิจกรรมไฮไลท์ของเรา</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">คัดสรรกิจกรรมที่เสริมสร้างทักษะชีวิตและความสามัคคี</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ActivityCard title="ฐานกิจกรรมผจญภัย" description="ทดสอบความกล้าหาญกับฐานไต่เชือก โดดหอ สไลเดอร์น้ำ ภายใต้การดูแลอย่างใกล้ชิด" image="https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=800" Icon={Compass} />
            <ActivityCard title="กิจกรรมรอบกองไฟ" description="ลานกิจกรรมกว้างขวาง พร้อมระบบแสงเสียงครบวงจร พร้อมบริการ LIVE สำหรับค่ำคืนแห่งความทรงจำ" image="https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=800" Icon={Flame} />
            <ActivityCard title="ทักษะชีวิต & ทีมเวิร์ค" description="เรียนรู้การปฐมพยาบาล การเอาตัวรอด และการแก้ปัญหาความร่วมมือผ่านเกมสถานการณ์จำลอง" image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" Icon={Users} />
          </div>
        </div>
      </section>

      {/* 4. Facilities Section - id="location" */}
      <section className="py-20 bg-white" id="location">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">สิ่งอำนวยความสะดวก</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">พื้นที่แบ่งเป็นสัดส่วน คำนึงถึงความสะอาดและสุขอนามัยเป็นสำคัญ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <ShieldCheck className="w-12 h-12 text-green-700 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">ความปลอดภัย 24 ชม.</h3>
              <p className="text-gray-600 text-sm">กล้องวงจรปิดรอบค่ายกว่า 40 จุด และเจ้าหน้าที่พยาบาลดูแลตลอดคืน</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <BedDouble className="w-12 h-12 text-orange-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">เรือนนอนกว้างขวาง</h3>
              <p className="text-gray-600 text-sm">แยกส่วนชาย-หญิง อากาศถ่ายเทสะดวก พร้อมพัดลมและเครื่องนอนสะอาด</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <Utensils className="w-12 h-12 text-blue-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">โรงอาหารมาตรฐาน</h3>
              <p className="text-gray-600 text-sm">อาหารสะอาด ปรุงสดใหม่ ถูกหลักโภชนาการ รองรับได้ถึง 600 ท่าน</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Packages Section - id="packages" */}
      <section className="py-24 bg-gray-50" id="packages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">แพ็กเกจแนะนำ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">ราคาประหยัด มาตรฐานสากล โปรแกรมปรับแต่งได้ตามต้องการ</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Package 1: One Day Trip */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">One Day Trip</h3>
                <div className="flex items-baseline gap-1">
                   <span className="text-gray-400 text-sm italic font-medium">เริ่มต้น</span>
                   <span className="text-4xl font-black text-green-800 tracking-tight">150</span>
                   <span className="text-gray-400 text-sm font-medium">บาท/ท่าน</span>
                </div>
                <p className="text-[11px] text-orange-600 font-bold mt-2 flex items-center gap-1 uppercase">
                  <AlertCircle className="w-3 h-3" /> ไม่รวมค่าวิทยากร
                </p>
              </div>
              <ul className="space-y-3.5 flex-1 mb-6 border-t border-gray-50 pt-6">
                {[
                  "อุปกรณ์กิจกรรมครบชุด",
                  "กิจกรรมทักษะลูกเสือ",
                  "อาหารกลางวัน 1 มื้อ",
                  "กิจกรรมผจญภัย",
                  "พยาบาลมูลนิธิสว่างราชบุรี (ตลอดวัน)"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[13px] text-gray-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Package 2: 3 วัน 2 คืน (THE HIGHLIGHT) */}
            <div className="bg-green-900 p-8 rounded-3xl border border-green-800 flex flex-col transform lg:-translate-y-8 shadow-2xl relative ring-4 ring-orange-500/20">
              <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 uppercase tracking-[0.2em] shadow-xl">
                <Flame className="w-3 h-3 fill-white" /> แนะนำพิเศษ
              </span>
              
              <div className="mb-6">
                <h3 className="text-3xl font-black text-white mb-2 tracking-tight">3 วัน 2 คืน</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-green-300 text-sm font-medium">เริ่มต้น</span>
                  <span className="text-5xl font-black text-orange-400 tracking-tighter">340</span>
                  <span className="text-green-300 text-sm font-medium">บาท/ท่าน</span>
                </div>
                <div className="mt-4 bg-orange-500/10 border border-orange-500/20 rounded-lg p-2.5">
                   <p className="text-orange-400 text-xs font-bold flex items-center gap-1.5">
                     <CheckCircle2 className="w-3.5 h-3.5" /> โปรแกรมครบตามหลักสูตร
                   </p>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1 text-white border-t border-white/10 pt-6">
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
                  <li key={idx} className="flex items-start gap-3 text-[13px] font-medium leading-tight">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="/campcalendar.html" 
                className="w-full py-4 rounded-2xl font-black bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-xl text-center text-lg active:scale-95 flex items-center justify-center gap-2 group"
              >
                เช็กคิวว่างทันที <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-[10px] text-green-300 mt-4 font-bold flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3" /> อัตรานี้ยังไม่รวมค่าวิทยากร
              </p>
            </div>

            {/* Package 3: 2 วัน 1 คืน */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col hover:shadow-xl transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">2 วัน 1 คืน</h3>
                <div className="flex items-baseline gap-1">
                   <span className="text-gray-400 text-sm italic font-medium">เริ่มต้น</span>
                   <span className="text-4xl font-black text-green-800 tracking-tight">240</span>
                   <span className="text-gray-400 text-sm font-medium">บาท/ท่าน</span>
                </div>
                <p className="text-[11px] text-orange-600 font-bold mt-2 flex items-center gap-1 uppercase">
                  <AlertCircle className="w-3 h-3" /> ไม่รวมค่าวิทยากร
                </p>
              </div>
              <ul className="space-y-3.5 flex-1 mb-6 border-t border-gray-50 pt-6">
                {[
                  "กิจกรรมบุกเบิก",
                  "กิจกรรมประกอบอาหาร / สูทกรรม",
                  "กิจกรรมผจญภัย",
                  "กิจกรรมรอบกองไฟ",
                  "กิจกรรมเดินทางไกล / สำรวจ",
                  "อาหาร 4 มื้อ + ที่พัก 1 คืน",
                  "พยาบาลจากมูลนิธิสว่างราชบุรี 24 ชม."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[13px] text-gray-600 font-medium leading-tight">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructor Fee Guide */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-orange-100 shadow-2xl shadow-orange-500/5 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-50 rounded-full opacity-50 blur-3xl"></div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 relative z-10">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900 tracking-tight">อัตราค่าธรรมเนียมวิทยากร (Instructor Fee)</h4>
                  <p className="text-gray-500 text-sm font-medium mt-1 italic">*แยกจากค่าแพ็กเกจค่าย คิดตามสัดส่วนจำนวนนักเรียน</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 text-green-800 font-bold mb-5 border-b border-green-800/10 pb-3 uppercase tracking-wider text-xs">
                    <BedDouble className="w-4 h-4" /> ค่ายค้างแรม (1-2 คืน)
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center group">
                      <span className="text-gray-600 text-sm font-medium">ต่ำกว่า 250 ท่าน</span>
                      <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">เหมา 15,000 บาท</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-gray-600 text-sm font-medium">250 ท่าน ขึ้นไป</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-orange-600">60</span>
                        <span className="text-xs font-bold text-orange-600 ml-1 italic">บาท / ท่าน</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                  <div className="flex items-center gap-2 text-blue-800 font-bold mb-5 border-b border-blue-800/10 pb-3 uppercase tracking-wider text-xs">
                    <Compass className="w-4 h-4" /> ค่ายกลางวัน (Day Camp)
                  </div>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center group">
                      <span className="text-gray-600 text-sm font-medium">ต่ำกว่า 200 ท่าน</span>
                      <span className="font-bold text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200 shadow-sm">เหมา 6,000 บาท</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-gray-600 text-sm font-medium">200 ท่าน ขึ้นไป</span>
                      <div className="text-right">
                        <span className="text-2xl font-black text-orange-600">30</span>
                        <span className="text-xs font-bold text-orange-600 ml-1 italic">บาท / ท่าน</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-start gap-3">
                <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-orange-800 font-medium leading-relaxed">
                  หมายเหตุ: อัตรานี้รวมทีมงานวิทยากรผู้เชี่ยวชาญ อุปกรณ์สันทนาการ และสวัสดิการทีมงานตลอดการฝึกอบรม <br className="hidden md:block" /> 
                  ยอดรวมทั้งหมดจะถูกสรุปให้อีกครั้งในใบเสนอราคาอย่างเป็นทางการ (Quotation) ตามจำนวนนักเรียนที่เข้าร่วมจริง
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gallery Section - id="gallery" */}
      <section className="py-24 bg-white" id="gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4 flex items-center justify-center gap-3">
              <ImageIcon className="w-8 h-8 text-orange-500" /> ภาพบรรยากาศภายในค่าย
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg italic">
              สัมผัสความสนุกและมาตรฐานความปลอดภัยผ่านภาพถ่ายกิจกรรมจริง ณ ค่ายอนุสรณ์ศุภมาศ
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-4">
              <img className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300" src="https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=600" alt="ฐานผจญภัยลูกเสือ" />
              <img className="rounded-2xl shadow-lg w-full h-40 object-cover hover:scale-[1.02] transition-transform duration-300" src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=600" alt="วิวธรรมชาติในค่าย" />
            </div>
            <div className="flex flex-col gap-4">
              <img className="rounded-2xl shadow-lg w-full h-40 object-cover hover:scale-[1.02] transition-transform duration-300" src="https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=600" alt="กองไฟและการแสดง" />
              <img className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300" src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600" alt="กิจกรรมกลุ่มเยาวชน" />
            </div>
            <div className="flex flex-col gap-4">
              <img className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300" src="https://images.unsplash.com/photo-1526491109672-7474065da441?auto=format&fit=crop&q=80&w=600" alt="ห้องพักและเรือนนอน" />
              <img className="rounded-2xl shadow-lg w-full h-40 object-cover hover:scale-[1.02] transition-transform duration-300" src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600" alt="ป่าและพื้นที่ธรรมชาติ" />
            </div>
            <div className="flex flex-col gap-4">
              <img className="rounded-2xl shadow-lg w-full h-40 object-cover hover:scale-[1.02] transition-transform duration-300" src="https://images.unsplash.com/photo-1464207687429-7505649ad138?auto=format&fit=crop&q=80&w=600" alt="ฐานเรียนรู้กลางแจ้ง" />
              <img className="rounded-2xl shadow-lg w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300" src="https://images.unsplash.com/photo-1496559249662-c6620ca6497a?auto=format&fit=crop&q=80&w=600" alt="พิธีเปิดรอบกองไฟลูกเสือ" />
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-green-900 hover:bg-green-800 text-white px-10 py-3.5 rounded-full font-bold shadow-lg transition-all flex items-center gap-2 mx-auto">
              ดูอัลบั้มภาพทั้งหมด <ImageIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. About & Contact Info - id="about" */}
      <section className="py-24 bg-gray-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-wider uppercase text-sm">
                  <Heart className="w-4 h-4 fill-orange-500" /> รู้จักกับเรา
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-green-900 leading-tight">
                  ศูนย์ฝึกอบรมลูกเสือ <br /> 
                  <span className="text-orange-500">อนุสรณ์ศุภมาศ ราชบุรี</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  ค่ายอนุสรณ์ศุภมาศ ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะสร้างพื้นที่แห่งการเรียนรู้และพัฒนาศักยภาพของเยาวชนไทย 
                  ท่ามกลางบรรยากาศธรรมชาติที่สมบูรณ์ในจังหวัดราชบุรี 
                  พร้อมทีมวิทยากรผู้เชี่ยวชาญที่พร้อมดูแลลูกเสือและเนตรนารีทุกคนอย่างมืออาชีพ
                </p>
              </div>
              
              {/* รายละเอียดการติดต่อ */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">เบอร์โทรศัพท์ติดต่อ</h4>
                    <p className="text-gray-600">086-551-5110 (สำนักงาน)</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-700 shrink-0">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Facebook Page</h4>
                    <p className="text-gray-600">ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">ที่ตั้งโครงการ</h4>
                    <p className="text-gray-600 text-sm">ต.หนองกวาง อ.โพธาราม จ.ราชบุรี 70120</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนแผนที่คู่ (Google Maps + Graphic Map) */}
            <div className="space-y-6">
              <div className="relative bg-white p-3 rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden group">
                <div className="bg-gray-200 w-full h-[400px] rounded-[1.5rem] overflow-hidden relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15509.704230870562!2d99.64295325!3d13.63185445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e319089938814b%3A0xc3b83885d1170703!2z4LiE4LmI4Liy4Lii4Lil4Li54LiB4LmA4Liq4Li34Lit4Lit4LiZ4Li44Lij4Li04Lio4Li44Lig4Liy4Lio!5e0!3m2!1sth!2sth!4v1715000000000!5m2!1sth!2sth" 
                    className="w-full h-full border-0" 
                    allowFullScreen 
                    loading="lazy"
                    title="แผนที่ค่ายอนุสรณ์ศุภมาศ"
                  ></iframe>
                </div>
              </div>

              {/* ปุ่มดูแผนที่จุดสังเกต (Graphic Map) */}
              <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-xl flex flex-col md:flex-row items-center gap-6 group hover:border-orange-500 transition-colors">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-orange-500/20 group-hover:border-orange-500 transition-colors">
                  <img src="/แผนที่ค่าย 2022.jpg" alt="แผนที่จุดสังเกต" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-gray-900 text-lg">แผนที่จุดสังเกตสำหรับผู้เดินทาง</h4>
                  <p className="text-gray-500 text-sm italic">รวมแลนด์มาร์คสำคัญและเส้นทางลัดสู่อำเภอโพธาราม</p>
                </div>
                <a 
                  href="/แผนที่ค่าย 2022.jpg" 
                  target="_blank" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/30 flex items-center gap-2"
                >
                  <ImageIcon className="w-5 h-5" /> ดูภาพขนาดใหญ่
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* 8. Call to Action - id="contact" */}
      <section id="contact" className="py-24 bg-orange-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-900/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight">
            พร้อมพานักเรียนมาเปิดประสบการณ์<br />ลูกเสือที่สมบูรณ์แบบหรือยัง?
          </h2>
          <p className="text-orange-50 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            ทีมงานค่ายอนุสรณ์ศุภมาศ ยินดีให้คำปรึกษาและจัดแพ็กเกจที่เหมาะสมที่สุดสำหรับโรงเรียนของคุณ ตรวจสอบคิวว่างและขอใบเสนอราคาได้ฟรีวันนี้
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://line.me/ti/p/vLpgOF-XSu" 
              target="_blank" 
              className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6 fill-orange-600" /> จองค่าย / ติดต่อสอบถาม
            </a>
            <a 
              href="tel:0865515110" 
              className="bg-transparent border-2 border-white/50 hover:border-white text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" /> 086-551-5110
            </a>
          </div>
        </div>
      </section>
    </>
  );
}