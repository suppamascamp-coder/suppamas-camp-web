import React from 'react';
import { 
  Compass, Flame, Users, CheckCircle2, 
  ShieldCheck, BedDouble, Utensils, Info, AlertCircle,
  ArrowRight, Image as ImageIcon, MapPin, Navigation, Heart,
  Phone, Facebook, MessageCircle, Clock, UserCheck, Award
} from 'lucide-react';
import ActivityCard from '../src/components/ActivityCard'; 
import GoogleReviews from '../src/components/GoogleReviews'; 

export const metadata = {
  title: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี | ศูนย์ฝึกอบรมและค่ายพักแรมมาตรฐาน',
  description: 'บริการค่ายพักแรม ฝึกอบรมลูกเสือ เนตรนารี ครบวงจร ณ อ.โพธาราม จ.ราชบุรี มาตรฐานความปลอดภัยสูงสุด พร้อมทีมวิทยากรผู้เชี่ยวชาญ',
};

export default function Home() {
  return (
    <div className="scroll-smooth">
      {/* 1. Hero Section */}
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
          <span className="inline-block py-1 px-4 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs md:text-sm font-semibold mb-4 backdrop-blur-sm animate-pulse uppercase tracking-widest">
            Welcome to Suppamas Camp || เปิดให้จองแล้ววันนี้
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
            ค่ายลูกเสือ <br className="hidden md:block" /> 
            <span className="text-orange-500">อนุสรณ์ศุภมาศ ราชบุรี</span>
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-8 drop-shadow-md max-w-3xl mx-auto font-light leading-relaxed">
            ศูนย์ฝึกอบรมเยาวชนและค่ายพักแรมมาตรฐานระดับสากล <br className="hidden md:block" />
            สร้างระเบียบวินัย เรียนรู้วิถีธรรมชาติ ในบรรยากาศที่ปลอดภัยที่สุด
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#packages" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl text-center">
              ดูโปรแกรมค่าย
            </a>
            <a href="#about" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg transition-all text-center">
              รู้จักกับเรา
            </a>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="relative z-20 -mt-10 md:-mt-20 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-b-4 border-orange-500">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-extrabold text-green-800">12+</div>
            <div className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">ปีแห่งประสบการณ์</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="text-2xl md:text-4xl font-extrabold text-orange-500">17+</div>
            <div className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">ฐานกิจกรรม</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="text-2xl md:text-4xl font-extrabold text-green-800">600 คน</div>
            <div className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">ความจุเรือนนอน</div>
          </div>
          <div className="text-center border-l border-gray-100">
            <div className="text-2xl md:text-4xl font-extrabold text-orange-500">100%</div>
            <div className="text-[10px] md:text-sm text-gray-500 font-medium uppercase tracking-wider">ความปลอดภัย</div>
          </div>
        </div>
      </section>

      {/* 3. About Section - id="about" */}
      <section id="about" className="py-24 bg-white scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full opacity-50 blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1526491109672-7474065da441?auto=format&fit=crop&q=80&w=1000" 
                alt="ประวัติค่ายอนุสรณ์ศุภมาศ" 
                className="rounded-[2.5rem] shadow-2xl relative z-10 w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-900 text-white p-8 rounded-3xl z-20 shadow-xl hidden md:block">
                <p className="text-3xl font-black mb-1">12+</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-70">Years of Training</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-orange-600 font-bold tracking-widest uppercase text-sm">
                <Heart className="w-4 h-4 fill-orange-500" /> มุ่งมั่นพัฒนาเยาวชน
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-green-900 leading-tight">
                รู้จักกับเรา <br /> 
                <span className="text-orange-500 font-extrabold">อนุสรณ์ศุภมาศ ราชบุรี</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                ค่ายอนุสรณ์ศุภมาศ เป็นค่ายในเครือโรงเรียนอนุสรณ์ศุภมาศ สมุทรสาคร ก่อตั้งขึ้นบนพื้นที่กว่า 50 ไร่ ในอำเภอโพธาราม จังหวัดราชบุรี ด้วยเจตนารมณ์ที่ต้องการสร้างพื้นที่แห่งการเรียนรู้ที่สมบูรณ์แบบสำหรับเยาวชนไทย 
                เราไม่เพียงแต่จัดสถานที่พักแรม แต่เรามุ่งเน้นการจัดกิจกรรมที่ปลูกฝังทักษะชีวิต ความเป็นผู้นำ และความสามัคคีผ่านกระบวนการทางลูกเสือที่เป็นสากล ด้วยสโลแกน "กินอิ่ม นอนหลับ พักสบาย คลายอารมณ์"
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                      <Award className="w-5 h-5" />
                   </div>
                   <span className="font-bold text-gray-700 text-sm">วิทยากรผู้เชี่ยวชาญทุก Generation</span>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <ShieldCheck className="w-5 h-5" />
                   </div>
                   <span className="font-bold text-gray-700 text-sm">มาตรฐานความปลอดภัย 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Staff Section - id="staff" (ใหม่!) */}
      <section id="staff" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-green-900 mb-4">บุคลากรและทีมงาน</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg italic uppercase tracking-wider">Professional Support & Instructor Team</p>
            <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "นายมนตรี คงสกุลถาวร", pos: "ผู้อำนวยการค่ายอนุสรณ์ศุภมาศ", img: "https://ui-avatars.com/api/?name=Director&background=064e3b&color=fff&size=512" },
              { name: "นายเฉลิมชัย คงสกุลถาวร", pos: "ฝ่ายหลักสูตรและการฝึกอบรม", img: "https://ui-avatars.com/api/?name=Instructor&background=ea580c&color=fff&size=512" },
              { name: "นายสหัส บ่อขุนทด", pos: "ดูแลกิจกรรมฐานและนันทนาการ", img: "https://ui-avatars.com/api/?name=Activity&background=1d4ed8&color=fff&size=512" },
              { name: "นายสุรินทร์ ครบเบญจะ", pos: "เจ้าหน้าที่พยาบาลและกู้ภัย", img: "https://ui-avatars.com/api/?name=Safety&background=b91c1c&color=fff&size=512" }
            ].map((person, idx) => (
              <div key={idx} className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  <img src={person.img} alt={person.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{person.name}</h3>
                  <p className="text-orange-600 text-sm font-semibold">{person.pos}</p>
                  <div className="mt-4 flex justify-center gap-3 border-t border-gray-50 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"><UserCheck className="w-4 h-4" /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-green-900 rounded-[2.5rem] shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                   <Users className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                   <h4 className="text-2xl font-bold">ทีมงานวิทยากรและสตาฟกว่า 30 ท่าน</h4>
                   <p className="text-green-200 font-light">พร้อมดูแลนักเรียนทุกคนอย่างใกล้ชิด ตลอด 24 ชั่วโมง</p>
                </div>
             </div>
             <button className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-bold transition-all shadow-lg">ดูผังองค์กรทั้งหมด</button>
          </div>
        </div>
      </section>

      {/* 5. Activities */}
      <section id="activities" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-green-900 mb-4 tracking-tight">กิจกรรมไฮไลท์</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg italic underline decoration-orange-500/30 decoration-2 underline-offset-8">เรียนรู้ผ่านประสบการณ์จริงที่สนุกและได้สาระ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ActivityCard title="ฐานกิจกรรมผจญภัย" description="ทดสอบความกล้าหาญกับฐานไต่เชือก โดดหอ สไลเดอร์น้ำ ภายใต้การดูแลอย่างใกล้ชิด" image="https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=800" Icon={Compass} />
            <ActivityCard title="กิจกรรมรอบกองไฟ" description="ลานกิจกรรมกว้างขวาง พร้อมระบบแสงเสียงครบวงจร สำหรับค่ำคืนแห่งความทรงจำ" image="https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=800" Icon={Flame} />
            <ActivityCard title="ทักษะชีวิต & ทีมเวิร์ค" description="เรียนรู้การปฐมพยาบาล การเอาตัวรอด และการแก้ปัญหาความร่วมมือผ่านเกมสถานการณ์จำลอง" image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800" Icon={Users} />
          </div>
        </div>
      </section>

      {/* 6. Facilities */}
      <section id="facilities" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-green-900 mb-4 uppercase">สิ่งอำนวยความสะดวก</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">พื้นที่แบ่งเป็นสัดส่วน สะอาด และปลอดภัยมาตรฐาน SHA</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <ShieldCheck className="w-14 h-14 text-green-700 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">ความปลอดภัย 24 ชม.</h3>
              <p className="text-gray-500 text-sm leading-relaxed">กล้องวงจรปิดรอบค่ายกว่า 40 จุด และเจ้าหน้าที่พยาบาลดูแลตลอดคืน</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <BedDouble className="w-14 h-14 text-orange-500 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">เรือนนอนกว้างขวาง</h3>
              <p className="text-gray-500 text-sm leading-relaxed">แยกส่วนชาย-หญิง อากาศถ่ายเทสะดวก พร้อมพัดลมและเครื่องนอนสะอาด</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all">
              <Utensils className="w-14 h-14 text-blue-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-3 text-gray-900">โรงอาหารมาตรฐาน</h3>
              <p className="text-gray-500 text-sm leading-relaxed">อาหารสะอาด ปรุงสดใหม่ ถูกหลักโภชนาการ รองรับได้ถึง 600 ท่าน</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Packages */}
      <section id="packages" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-green-900 mb-4 uppercase">แพ็กเกจแนะนำ</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg italic">คุ้มค่าที่สุด พร้อมโปรแกรมที่ปรับเปลี่ยนได้ตามความต้องการ</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* One Day Trip */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col hover:shadow-xl transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 underline decoration-green-500 decoration-4 underline-offset-4">One Day Trip</h3>
                <div className="flex items-baseline gap-1 mt-4">
                   <span className="text-gray-400 text-sm italic font-medium">เริ่มต้น</span>
                   <span className="text-4xl font-black text-green-800">150</span>
                   <span className="text-gray-400 text-sm font-medium">บาท/ท่าน</span>
                </div>
                <p className="text-[11px] text-orange-600 font-bold mt-2 uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> ไม่รวมค่าวิทยากร</p>
              </div>
              <ul className="space-y-3.5 flex-1 mb-6 border-t border-gray-200 pt-6">
                {["อุปกรณ์กิจกรรมครบชุด", "กิจกรรมทักษะลูกเสือ", "อาหารกลางวัน 1 มื้อ", "กิจกรรมผจญภัย", "หน่วยปฐมพยาบาล"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[13px] text-gray-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3 วัน 2 คืน */}
            <div className="bg-green-900 p-8 rounded-3xl border border-green-800 flex flex-col transform lg:-translate-y-8 shadow-2xl relative ring-4 ring-orange-500/20">
              <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black flex items-center gap-1.5 uppercase tracking-[0.2em] shadow-xl"><Flame className="w-3 h-3 fill-white" /> แนะนำพิเศษ</span>
              <div className="mb-6 text-white">
                <h3 className="text-3xl font-black mb-2 tracking-tight">3 วัน 2 คืน</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-green-300 text-sm font-medium tracking-wide">เริ่มต้น</span>
                  <span className="text-5xl font-black text-orange-400 tracking-tighter">340</span>
                  <span className="text-green-300 text-sm font-medium tracking-wide">บาท/ท่าน</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8 flex-1 text-white border-t border-white/10 pt-6">
                {["กิจกรรมลูกเสือ / บุกเบิก", "กิจกรรมประกอบอาหาร / สูทกรรม", "กิจกรรมผจญภัย / รอบกองไฟ", "กิจกรรมเดินทางไกล / สำรวจ", "อาหาร 7 มื้อ + ที่พัก 2 คืน", "พยาบาลสว่างราชบุรี 24 ชม."].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[13px] font-medium leading-tight text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" /> <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="/campcalendar.html" className="w-full py-4 rounded-2xl font-black bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-xl text-center text-lg active:scale-95 flex items-center justify-center gap-2 group">
                เช็กคิวว่างทันที <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-[10px] text-green-300 mt-4 font-bold uppercase tracking-widest flex items-center justify-center gap-1"><AlertCircle className="w-3 h-3" /> ไม่รวมค่าวิทยากร</p>
            </div>

            {/* 2 วัน 1 คืน */}
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col hover:shadow-xl transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 underline decoration-green-500 decoration-4 underline-offset-4">2 วัน 1 คืน</h3>
                <div className="flex items-baseline gap-1 mt-4">
                   <span className="text-gray-400 text-sm italic font-medium">เริ่มต้น</span>
                   <span className="text-4xl font-black text-green-800">240</span>
                   <span className="text-gray-400 text-sm font-medium">บาท/ท่าน</span>
                </div>
                <p className="text-[11px] text-orange-600 font-bold mt-2 uppercase flex items-center gap-1"><AlertCircle className="w-3 h-3" /> ไม่รวมค่าวิทยากร</p>
              </div>
              <ul className="space-y-3.5 flex-1 mb-6 border-t border-gray-200 pt-6">
                {["กิจกรรมบุกเบิก / ผจญภัย", "กิจกรรมประกอบอาหาร / สูทกรรม", "กิจกรรมรอบกองไฟ", "กิจกรรมเดินทางไกล / สำรวจ", "อาหาร 4 มื้อ + ที่พัก 1 คืน", "พยาบาลดูแล 24 ชม."].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[13px] text-gray-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Gallery - id="gallery" */}
      <section id="gallery" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-green-900 mb-4 uppercase tracking-tighter">ภาพบรรยากาศ</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg italic">สัมผัสประสบการณ์ความสนุกผ่านภาพถ่ายกิจกรรมจริง</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-4">
              <img className="rounded-3xl shadow-lg w-full h-64 object-cover" src="https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=600" alt="ฐานกิจกรรม" />
              <img className="rounded-3xl shadow-lg w-full h-40 object-cover" src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=600" alt="วิวค่าย" />
            </div>
            <div className="flex flex-col gap-4 pt-12">
              <img className="rounded-3xl shadow-lg w-full h-40 object-cover" src="https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=600" alt="กองไฟ" />
              <img className="rounded-3xl shadow-lg w-full h-64 object-cover" src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600" alt="กิจกรรมกลุ่ม" />
            </div>
            <div className="flex flex-col gap-4">
              <img className="rounded-3xl shadow-lg w-full h-64 object-cover" src="https://images.unsplash.com/photo-1526491109672-7474065da441?auto=format&fit=crop&q=80&w=600" alt="ที่พัก" />
              <img className="rounded-3xl shadow-lg w-full h-40 object-cover" src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600" alt="ป่าไม้" />
            </div>
            <div className="flex flex-col gap-4 pt-12">
              <img className="rounded-3xl shadow-lg w-full h-40 object-cover" src="https://images.unsplash.com/photo-1464207687429-7505649ad138?auto=format&fit=crop&q=80&w=600" alt="ฝึกอบรม" />
              <img className="rounded-3xl shadow-lg w-full h-64 object-cover" src="https://images.unsplash.com/photo-1496559249662-c6620ca6497a?auto=format&fit=crop&q=80&w=600" alt="รอบกองไฟ" />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Contact Section - id="contact" */}
      <section id="contact" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-orange-600 font-bold uppercase text-xs tracking-widest">
                  <Navigation className="w-4 h-4" /> แผนที่และการติดต่อ
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-green-900 leading-tight">
                  พร้อมต้อนรับคณะครู <br /> 
                  <span className="text-orange-500 italic">และเยาวชนทุกคน</span>
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  ค่ายอนุสรณ์ศุภมาศ ยินดีให้คำปรึกษาและจัดแพ็กเกจที่เหมาะสมที่สุดสำหรับโรงเรียนของคุณ ตรวจสอบคิวว่างและขอใบเสนอราคาได้ทุกวัน
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-700 shrink-0"><Phone className="w-7 h-7" /></div>
                  <div><h4 className="font-bold text-gray-900">เบอร์โทรศัพท์ติดต่อ</h4><p className="text-gray-600">086-551-5110 (ฝ่ายบริหาร)</p></div>
                </div>
                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-700 shrink-0"><Facebook className="w-7 h-7" /></div>
                  <div><h4 className="font-bold text-gray-900">Facebook Page</h4><p className="text-gray-600">ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี</p></div>
                </div>
                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-700 shrink-0"><Clock className="w-7 h-7" /></div>
                  <div><h4 className="font-bold text-gray-900">เวลาให้บริการ</h4><p className="text-gray-600">เปิดทำการทุกวัน 08:00 - 17:00 น.</p></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative bg-white p-3 rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden group">
                <div className="bg-gray-200 w-full h-[450px] rounded-[1.8rem] overflow-hidden relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3332011746957!2d99.57713877516328!3d13.758768997131973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e314250c5a6003%3A0x591426503e1ce901!2z4LiE4LmI4Liy4Lii4Lil4Li54LiB4LmA4Liq4Li34Lit4Lit4LiZ4Li44Liq4Lij4LiT4LmM4Lio4Li44Lig4Lih4Liy4LioIOC4iC7guKPguLLguIrguJrguLjguKPguLUt4LiB4Liy4LiN4LiI4LiZ4Lia4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1772644912554!5m2!1sth!2sth" 
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500" 
                    allowFullScreen loading="lazy" title="Maps"
                  ></iframe>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border-2 border-orange-100 shadow-xl flex flex-col md:flex-row items-center gap-6 group hover:border-orange-500 transition-colors">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-orange-500/20 group-hover:scale-105 transition-all"><img src="/แผนที่ค่าย 2022.png" alt="Landmark" className="w-full h-full object-cover" /></div>
                <div className="flex-1 text-center md:text-left"><h4 className="font-bold text-gray-900 text-lg italic">แผนที่จุดสังเกตสำหรับผู้เดินทาง</h4><p className="text-gray-500 text-sm mt-1">รวมแลนด์มาร์คสำคัญและทางลัดเพื่อความสะดวก</p></div>
                <a href="/แผนที่ค่าย 2022.png" target="_blank" className="bg-green-900 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 group-hover:animate-pulse"><ImageIcon className="w-4 h-4" /> ขยายภาพ</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* 10. Final Call to Action */}
      <section className="py-24 bg-orange-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-3xl md:text-6xl font-black mb-10 leading-tight">พานักเรียนมาเปิดประสบการณ์<br />ที่สนุกและปลอดภัยไปกับเรา</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://line.me/ti/p/vLpgOF-XSu" target="_blank" className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3"><MessageCircle className="w-6 h-6 fill-orange-600" /> สอบถามผ่าน LINE</a>
            <a href="tel:0865515110" className="bg-transparent border-2 border-white/50 hover:border-white text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3"><Phone className="w-6 h-6" /> โทรจองทันที</a>
          </div>
        </div>
      </section>
    </div>
  );
}