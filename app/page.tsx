import React from 'react';
import { 
  Compass, Flame, Users, CheckCircle2, 
  ShieldCheck, BedDouble, Utensils, Star, Quote 
} from 'lucide-react';
import ActivityCard from '../src/components/ActivityCard'; // ดึงชิ้นส่วนการ์ดมาใช้
import GoogleReviews from '../src/components/GoogleReviews'; 

export default function Home() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000" 
            alt="บรรยากาศค่ายลูกเสือ" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-950/60 mix-blend-multiply"></div>
          {/* เพิ่ม Gradient เพื่อไล่สีให้ข้อความเด่นขึ้น */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16 w-full">
          <span className="inline-block py-1.5 px-4 rounded-full bg-black/40 text-orange-400 border border-orange-500/50 text-sm md:text-base font-semibold mb-6 backdrop-blur-md">
            เปิดรับจองรอบปีการศึกษา {new Date().getFullYear()} แล้ว
          </span>
          
          {/* ปรับขนาดฟอนต์ให้ Responsive (text-4xl สำหรับมือถือ, text-6xl สำหรับ PC) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-xl leading-tight">
            บริการค่ายพักแรม <br className="hidden md:block" /> 
            ฝึกอบรมลูกเสือครบวงจร <br/>
            <span className="text-orange-500">ณ ค่ายอนุสรณ์ศุภมาศ ราชบุรี</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10 drop-shadow-md max-w-3xl mx-auto font-light">
            มาตรฐานความปลอดภัยสูงสุด ฐานกิจกรรมระดับสากล ท่ามกลางบรรยากาศธรรมชาติที่สมบูรณ์แบบ
          </p>
          
          {/* ปรับปุ่มให้เรียงแนวตั้งบนมือถือ (flex-col) และแนวนอนบน PC (sm:flex-row) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0">
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-xl">
              ดูโปรแกรมค่าย
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/50 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1">
              ชมวิดีโอบรรยากาศ
            </button>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      {/* ใช้ Grid แทน Flex เพื่อให้บนมือถือแบ่งเป็น 2x2 คอลัมน์สวยๆ */}
      <section className="relative z-20 -mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-b-4 border-orange-500">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-green-800 mb-1">12+</div>
            <div className="text-sm md:text-base text-gray-500 font-medium">ปีแห่งประสบการณ์</div>
          </div>
          <div className="text-center md:border-l md:border-gray-200">
            <div className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-1">17+</div>
            <div className="text-sm md:text-base text-gray-500 font-medium">ฐานกิจกรรมผจญภัย</div>
          </div>
          <div className="text-center border-t pt-6 md:pt-0 md:border-t-0 md:border-l md:border-gray-200">
            <div className="text-3xl md:text-4xl font-extrabold text-green-800 mb-1">600 คน</div>
            <div className="text-sm md:text-base text-gray-500 font-medium">ต่อการรับนักเรียน</div>
          </div>
          
          <div className="text-center border-t pt-6 md:pt-0 md:border-t-0 md:border-l md:border-gray-200">
            <div className="text-3xl md:text-4xl font-extrabold text-orange-500 mb-1">100%</div>
            <div className="text-sm md:text-base text-gray-500 font-medium">มาตรฐานความปลอดภัย</div>
          </div>
        </div>
      </section>

      {/* 3. Highlight Activities */}
      <section className="py-24 bg-gray-50" id="กิจกรรม">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">กิจกรรมไฮไลท์ของเรา</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              ออกแบบโดยผู้เชี่ยวชาญ เน้นความสนุก ควบคู่ไปกับการฝึกทักษะชีวิตและการทำงานเป็นทีม
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ActivityCard 
              title="ฐานกิจกรรมผจญภัย"
              description="ทดสอบความกล้าหาญกับฐานไต่เชือก โดดหอ สไลเดอร์น้ำ ภายใต้การดูแลอย่างใกล้ชิด"
              image="https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=800"
              Icon={Compass}
            />
            <ActivityCard 
              title="กิจกรรมรอบกองไฟ"
              description="ลานกิจกรรมกว้างขวาง พร้อมระบบแสงเสียงครบวงจร พร้อมบริการ LIVE สำหรับค่ำคืนแห่งความทรงจำและการแสดง"
              image="https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=800"
              Icon={Flame}
            />
            <ActivityCard 
              title="ทักษะชีวิต & ทีมเวิร์ค"
              description="เรียนรู้การปฐมพยาบาล การเอาตัวรอด และการแก้ปัญหาร่วมกันผ่านเกมสถานการณ์จำลอง"
              image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800"
              Icon={Users}
            />
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-transparent border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-8 py-3 rounded-full font-bold transition-colors">
              ดูกิจกรรมทั้งหมด
            </button>
          </div>
        </div>
      </section>

      {/* 4. Facilities Section (สิ่งอำนวยความสะดวก) */}
      <section className="py-24 bg-white" id="สถานที่">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">สิ่งอำนวยความสะดวกครบครัน</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              เราคำนึงถึงความปลอดภัย สุขอนามัย และความสะดวกสบายของนักเรียนและคณะครูเป็นอันดับแรก
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-700">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ความปลอดภัยสูงสุด 24 ชม.</h3>
              <p className="text-gray-600">มีเจ้าหน้าที่รักษาความปลอดภัยตลอดคืน กล้องวงจรปิดรอบค่าย และห้องพยาบาลพร้อมอุปกรณ์ปฐมพยาบาลครบครัน</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                <BedDouble className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">เรือนนอนกว้างขวาง</h3>
              <p className="text-gray-600">เรือนนอนแยกสัดส่วนชาย-หญิง อากาศถ่ายเทสะดวก พร้อมพัดลมและเครื่องนอนที่ผ่านการทำความสะอาดอย่างถูกสุขลักษณะ</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">โรงอาหารมาตรฐาน</h3>
              <p className="text-gray-600">อาหารปรุงสุกใหม่ สะอาด ถูกหลักโภชนาการ พื้นที่กว้างขวางรองรับนักเรียนและคณะครูได้พร้อมกันกว่า 600 คน</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Packages Section */}
      <section className="py-24 bg-gray-50" id="โปรแกรม">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">แพ็กเกจแนะนำ</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">ปรับแต่งได้ตามความต้องการและงบประมาณของแต่ละโรงเรียน</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Package 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">One Day Trip</h3>
              <p className="text-gray-500 mb-6">กิจกรรมเช้า-เย็นกลับ เน้นฐานผจญภัย</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> วิทยากรประจำกลุ่ม</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> อุปกรณ์กิจกรรมครบชุด</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> อาหารกลางวัน 1 มื้อ</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-bold bg-white border-2 border-gray-200 text-gray-700 hover:border-green-800 hover:text-green-800 transition-colors">
                ขอใบเสนอราคา
              </button>
            </div>

            {/* Package 2 (Highlight) */}
            <div className="bg-green-900 p-8 rounded-3xl border border-green-800 flex flex-col transform md:-translate-y-4 shadow-2xl relative">
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Flame className="w-4 h-4" /> ยอดนิยม
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">2 วัน 1 คืน</h3>
              <p className="text-green-200 mb-6">โปรแกรมยอดฮิต รวมที่พักและรอบกองไฟ</p>
              <ul className="space-y-4 mb-8 flex-1 text-white">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-400" /> วิทยากรและทีมงานดูแล 24 ชม.</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-400" /> กิจกรรมรอบกองไฟจัดเต็ม</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-400" /> อาหาร 4 มื้อ + ที่พักเรือนนอน</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg">
                เช็กคิวว่างทันที
              </button>
            </div>

            {/* Package 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">3 วัน 2 คืน</h3>
              <p className="text-gray-500 mb-6">จัดเต็มทุกทักษะ ซึมซับบรรยากาศเต็มรูปแบบ</p>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> รวมทุกอย่างในแพ็กเกจ 2 วัน 1 คืน</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> กิจกรรมเดินทางไกล / สูทกรรม</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500" /> อาหาร 7 มื้อ + ที่พัก 2 คืน</li>
              </ul>
              <button className="w-full py-3 rounded-xl font-bold bg-white border-2 border-gray-200 text-gray-700 hover:border-green-800 hover:text-green-800 transition-colors">
                ขอใบเสนอราคา
              </button>
            </div>
          </div>
        </div>
      </section>

     <GoogleReviews />

      {/* 7. Final Call to Action Section */}
      <section className="py-20 bg-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            พร้อมพานักเรียนมาเปิดประสบการณ์<br />ลูกเสือที่สมบูรณ์แบบแล้วหรือยัง?
          </h2>
          <p className="text-orange-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            ตรวจสอบคิวว่างและขอใบเสนอราคาได้ฟรี ทีมงานของเราพร้อมให้คำปรึกษาและจัดแพ็กเกจที่เหมาะสมที่สุดสำหรับโรงเรียนของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-xl">
              ติดต่อสอบถาม / จองค่าย
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-colors">
              ดูแผนที่การเดินทาง
            </button>
          </div>
        </div>
      </section>
    </>
  );
}