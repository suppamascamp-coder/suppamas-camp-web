"use client"; 
import React, { useState, useEffect } from 'react';
import { 
  Compass, Flame, Users, CheckCircle2, 
  ShieldCheck, BedDouble, Utensils, Info, AlertCircle,
  ArrowRight, Image as ImageIcon, MapPin, Navigation, Heart,
  Phone, Facebook, MessageCircle, Clock, UserCheck, Award,
  X, ChevronUp, HelpCircle, Briefcase, ChevronDown
} from 'lucide-react';
import ActivityCard from '../src/components/ActivityCard'; 
import GoogleReviews from '../src/components/GoogleReviews'; 

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // 📸 รายการรูปภาพสำหรับ Slideshow พื้นหลัง (Hero Section)
  const heroSlides = [
    "/ภาพหน้าปก.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.JPG"
  ];

  // ระบบเปลี่ยนรูปสไลด์อัตโนมัติทุกๆ 5 วินาที
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=1000", alt: "ฐานผจญภัยลูกเสือ" },
    { src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1000", alt: "วิวธรรมชาติในค่าย" },
    { src: "https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=1000", alt: "กองไฟและการแสดง" },
    { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000", alt: "กิจกรรมกลุ่มเยาวชน" },
    { src: "https://images.unsplash.com/photo-1526491109672-7474065da441?auto=format&fit=crop&q=80&w=1000", alt: "ห้องพักและเรือนนอน" },
    { src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1000", alt: "ป่าและพื้นที่ธรรมชาติ" },
    { src: "https://images.unsplash.com/photo-1464207687429-7505649ad138?auto=format&fit=crop&q=80&w=1000", alt: "ฐานเรียนรู้กลางแจ้ง" },
    { src: "https://images.unsplash.com/photo-1496559249662-c6620ca6497a?auto=format&fit=crop&q=80&w=1000", alt: "พิธีเปิดรอบกองไฟลูกเสือ" }
  ];

  const faqs = [
    { q: "ทางค่ายมีประกันอุบัติเหตุให้นักเรียนหรือไม่?", a: "ในแพ็กเกจมาตรฐานจะยังไม่รวมประกันอุบัติเหตุรายบุคคล แต่ทางค่ายมีหน่วยพยาบาลสว่างราชบุรีสแตนด์บาย 24 ชม." },
    { q: "เรือนนอนมีอุปกรณ์เครื่องนอนให้ครบไหม?", a: "เรามีที่นอน หมอน และผ้าห่มที่ผ่านการซักสะอาดเตรียมไว้ให้ครบทุกท่านครับ นักเรียนเพียงเตรียมของใช้ส่วนตัวมาเท่านั้น" },
    { q: "กรณีมีนักเรียนแพ้อาหาร หรือทานมังสวิรัติ จัดการอย่างไร?", a: "คุณครูสามารถแจ้งรายการอาหารพิเศษล่วงหน้าอย่างน้อย 7 วัน ทางโรงครัวของเราจะจัดเตรียมเมนูแยกเฉพาะบุคคลให้โดยไม่มีค่าใช้จ่ายเพิ่มครับ" },
    { q: "สามารถปรับเปลี่ยนตารางกิจกรรมเองได้ไหม?", a: "ได้ครับ ทีมวิทยากรของเรายินดีปรับตารางกิจกรรมให้สอดคล้องกับวัตถุประสงค์ของโรงเรียน ไม่ว่าจะเป็นเน้นวิชาการลูกเสือเข้มข้น หรือเน้นนันทนาการสร้างความสัมพันธ์" },
    { q: "เครื่องเซ่นไหว้และป้ายชื่อต้องเตรียมไหม?", a: "ไม่ต้องเตรียม ทางค่ายมีบริการให้พร้อม" }
  ];

  return (
    <div className="relative font-sans antialiased text-slate-900 bg-white">
      {/* 1. Hero Section */}
    <section id="home" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 z-0">
          {/* 🖼️ Slideshow Layers */}
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                index === currentHeroSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            >
              <img 
                src={slide} 
                alt={`Hero Slide ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-[10000ms]"
              />
            </div>
          ))}

          {/* Overlays */}
          <div className="absolute inset-0 bg-green-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {heroSlides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentHeroSlide(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${i === currentHeroSlide ? 'w-8 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
          <span className="inline-block py-1 px-4 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs md:text-sm font-semibold mb-4 backdrop-blur-sm animate-pulse uppercase tracking-[0.2em]">WELCOME || เปิดให้จองแล้ววันนี้!!</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">ค่ายลูกเสือ <br className="hidden md:block" /> <span className="text-orange-500 italic">อนุสรณ์ศุภมาศ ราชบุรี</span></h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-8 drop-shadow-md max-w-3xl mx-auto font-light leading-relaxed">ศูนย์ฝึกอบรมเยาวชนที่เน้นความปลอดภัยและคุณภาพอาหาร <br className="hidden md:block" />สร้างวินัยผ่านความสุข ในบรรยากาศธรรมชาติที่สมบูรณ์ที่สุด</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#packages" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl text-center">จองค่าย/ดูราคา</a>
            <a href="#about" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white px-10 py-4 rounded-full font-bold text-lg transition-all text-center">ทำความรู้จักเรา</a>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="relative z-20 -mt-10 md:-mt-20 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-b-8 border-orange-500">
          {[
            { label: "ปีแห่งประสบการณ์", val: "15+", color: "text-green-800" },
            { label: "ฐานกิจกรรมผจญภัย", val: "20+", color: "text-orange-500" },
            { label: "ความจุเรือนนอน", val: "600", color: "text-green-800", unit: "คน" },
            { label: "มาตรฐานความปลอดภัย", val: "100%", color: "text-orange-500" }
          ].map((item, i) => (
            <div key={i} className={`text-center ${i !== 0 ? 'border-l border-gray-100' : ''}`}>
              <div className={`text-2xl md:text-4xl font-black ${item.color}`}>{item.val} <span className="text-sm">{item.unit}</span></div>
              <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-tighter mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About & Organizational Info (Our Philosophy) */}
      <section id="about" className="py-24 scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* 🖼️ ส่วนรูปภาพทางด้านซ้าย (พื้นที่สีเขียวตกแต่ง) */}
            <div className="relative group">
              {/* พื้นหลังสีเขียวมุมมนที่เป็นกรอบด้านหลังภาพ */}
              <div className="absolute -inset-4 bg-green-100 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500"></div>
              
              {/* 📸 รูปภาพหลัก: เปลี่ยน src เป็นชื่อไฟล์ภาพในโฟลเดอร์ public ของคุณได้ที่นี่ */}
              <img 
                src="/about-us.jpg" // เปลี่ยนเป็น "/ชื่อไฟล์.jpg" หากมีภาพในเครื่อง
                alt="บรรยากาศค่ายอนุสรณ์ศุภมาศ" 
                className="rounded-[2.5rem] shadow-2xl relative z-10 w-full h-[550px] object-cover" 
              />
              
              {/* ป้าย SINCE สีส้ม */}
              <div className="absolute top-6 left-6 bg-orange-500 text-white p-4 rounded-2xl z-20 shadow-lg font-black italic">
                - SINCE 2014 -
              </div>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-orange-600 font-black uppercase text-xs tracking-[0.3em]"><Heart className="w-4 h-4 fill-orange-500" /> Our Philosophy</div>
              <h2 className="text-3xl md:text-6xl font-black text-green-950 leading-none">กินอิ่ม นอนหลับ <br /> <span className="text-orange-500 italic underline decoration-green-800 decoration-8 underline-offset-8">พักสบาย คลายอารมณ์</span></h2>
              <p className="text-slate-500 text-lg leading-relaxed font-light italic border-l-4 border-orange-500 pl-6">"เราเชื่อว่าการเรียนรู้ที่ดีที่สุด เกิดขึ้นเมื่อเด็กๆ มีความสุขและรู้สึกปลอดภัย"</p>
              <p className="text-slate-600 leading-relaxed">ค่ายอนุสรณ์ศุภมาศ ราชบุรี เป็นศูนย์ฝึกอบรมในเครือโรงเรียนอนุสรณ์ศุภมาศ สมุทรสาคร มีเจตนารมย์เพื่อสร้างสถานที่ การเรียนรู้ท่ามกลางธรรมชาติบนเนื้อที่กว่า 50 ไร่ เพื่อหล่อหลอมเยาวชนให้เป็นคนดีมีวินัย ผ่านกิจกรรมลูกเสือที่สนุกและทันสมัย</p>
              <div className="flex flex-wrap gap-4 pt-4">
                 <div className="px-6 py-3 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3"><Award className="text-green-700 w-5 h-5" /><span className="text-sm font-bold text-green-800 italic">วิทยากรวิชาชีพผ่านการอบรมทุกคน</span></div>
                 <div className="px-6 py-3 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-3"><ShieldCheck className="text-orange-600 w-5 h-5" /><span className="text-sm font-bold text-orange-700 italic">ค่ายมีมาตรฐาน พื้นที่เป็นสัดส่วนเชื่อมโยงถึงกัน</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Staff Section */}
       <section id="staff" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-green-950 mb-16 tracking-tight uppercase">คณะผู้บริหารและทีมงาน</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "นายมนตรี คงสกุลถาวร", pos: "ผู้อำนวยการค่ายอนุสรณ์ศุภมาศ" },
              { name: "นายเฉลิมชัย คงสกุลถาวร", pos: "ฝ่ายหลักสูตรและการฝึกอบรม" },
              { name: "นายสหัส บ่อขุนทด", pos: "หัวหน้าทีมกิจกรรมและวิทยากร" },
              { name: "นายสุรินทร์ ครบเบญจะ", pos: "ฝ่ายพยาบาลและกู้ชีพ (สว่างราชบุรี)" }
            ].map((person, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-white hover:border-orange-500 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-12 -mt-12 group-hover:scale-[10] transition-transform duration-700 ease-in-out opacity-20"></div>
                <div className="w-20 h-20 bg-green-100 rounded-3xl mx-auto mb-6 flex items-center justify-center text-green-700 group-hover:bg-orange-500 group-hover:text-white transition-colors relative z-10"><UserCheck className="w-10 h-10" /></div>
                <h3 className="text-lg font-black text-slate-800 mb-2 relative z-10">{person.name}</h3>
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest relative z-10 leading-tight">{person.pos}</p>
              </div>
            ))}
          </div>

          {/* แบนเนอร์ทีมงานวิทยากร (อิงตามภาพตัวอย่าง) */}
          <div className="mt-16 bg-[#114e2d] rounded-[2rem] md:rounded-[4rem] p-4 md:p-5 pr-4 md:pr-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-green-800/50 max-w-5xl mx-auto">
             <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6 w-full text-center md:text-left">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] md:rounded-[1.8rem] bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                   <Users className="w-8 h-8 md:w-10 md:h-10 text-[#ff6600]" />
                </div>
                <div>
                   <h4 className="text-xl md:text-2xl font-bold text-white mb-1 tracking-wide">ทีมงานวิทยากรและสตาฟกว่า 30 ท่าน</h4>
                   <p className="text-green-50/90 text-sm md:text-base font-light">พร้อมดูแลนักเรียนทุกคนอย่างใกล้ชิด ตลอด 24 ชั่วโมง</p>
                </div>
             </div>
             <button className="w-full md:w-auto bg-[#ff6600] hover:bg-[#e65c00] px-8 py-4 rounded-[1.5rem] md:rounded-full font-bold text-white transition-transform active:scale-95 shadow-lg whitespace-nowrap">
                ดูผังองค์กรทั้งหมด
             </button>
          </div>

        </div>
      </section>

      {/* 5. Activities Section */}
      <section id="activities" className="py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
             <div>
                <h2 className="text-3xl md:text-5xl font-black text-green-950 mb-4 tracking-tighter uppercase">High-Impact Activities</h2>
                <p className="text-orange-500 text-lg font-bold italic">"สนุก ท้าทาย ได้ทักษะชีวิตที่แท้จริง"</p>
             </div>
             <a href="#gallery" className="text-green-800 font-bold border-b-2 border-green-800 pb-1 hover:text-orange-500 hover:border-orange-500 transition-all flex items-center gap-2 mx-auto md:mx-0">ดูอัลบั้มกิจกรรมทั้งหมด <ArrowRight className="w-4 h-4" /></a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ActivityCard title="ฐานกิจกรรมผจญภัย" description="ทดสอบความกล้ากับสไลเดอร์น้ำสูง 10 เมตร, โดดหอ และฐานเชือกกว่า 10 รูปแบบ" image={galleryImages[0].src} Icon={Compass} />
            <ActivityCard title="กิจกรรมรอบกองไฟ" description="ลานกิจกรรมมาตรฐานจุได้ 1,000 คน พร้อมระบบแสงสีเสียงเต็มรูปแบบ และบริการ LIVE Streaming ให้ผู้ปกครองดูจากที่บ้าน" image={galleryImages[2].src} Icon={Flame} />
            <ActivityCard title="ทักษะชีวิตและทีมเวิร์ค" description="วิชาประกอบอาหาร (สูทกรรม), ปฐมพยาบาล และการแก้ปัญหาร่วมกันผ่านเกมสถานการณ์จำลอง" image={galleryImages[3].src} Icon={Users} />
          </div>
        </div>
      </section>

      {/* 6. Facilities & Safety */}
      <section id="facilities" className="py-24 bg-green-950 text-white scroll-mt-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full blur-[100px] opacity-20 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">Safety & Comfort</h2>
             <p className="text-green-300 max-w-2xl mx-auto text-lg font-light tracking-wide italic">"ความสะอาดและปลอดภัยคือหัวใจของค่ายอนุสรณ์ศุภมาศ"</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: ShieldCheck, title: "ความปลอดภัย 24 ชม.", desc: "กล้อง CCTV 40 จุด รอบค่าย และหน่วยพยาบาลจากสว่างราชบุรีสแตนด์บายตลอดการเข้าค่าย", color: "text-orange-500" },
              { icon: BedDouble, title: "เรือนนอนมาตรฐาน", desc: "แยกสัดส่วนชาย-หญิงชัดเจน ห้องน้ำสะอาดเพียงพอกับจำนวนเด็ก อากาศถ่ายเทสะดวก พัดลมครบ", color: "text-blue-400" },
              { icon: Utensils, title: "โรงอาหารสะอาด 5 ดาว", desc: "อาหารปรุงสุกใหม่ ถูกหลักโภชนาการ ปริมาณเต็มอิ่ม เติมได้ไม่อั้น และรองรับได้กว่า 600 ท่าน", color: "text-green-400" }
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group">
                <item.icon className={`w-16 h-16 mx-auto mb-8 transition-transform group-hover:scale-110 ${item.color}`} />
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-green-100/70 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Packages Section */}
      <section id="packages" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-green-950 mb-4 tracking-tighter uppercase">โปรแกรมและค่าบริการ</h2>
            <p className="text-slate-400 text-lg italic font-medium">คุ้มค่าที่สุด พร้อมมาตรฐานความปลอดภัยที่เราไม่เคยละเลย</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Day Camp */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 flex flex-col hover:shadow-2xl transition-all duration-500">
              <div className="mb-8 border-b border-slate-100 pb-8">
                <h3 className="text-2xl font-black text-slate-800 mb-2 italic underline decoration-green-500 decoration-4">One Day Trip</h3>
                <div className="flex items-baseline gap-1 mt-6">
                   <span className="text-slate-400 text-sm font-bold">เริ่มต้น</span>
                   <span className="text-5xl font-black text-green-800 tracking-tighter">150</span>
                   <span className="text-slate-400 text-sm font-bold italic">/ ท่าน</span>
                </div>
                <p className="text-[10px] text-orange-600 font-black mt-3 uppercase tracking-widest flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> ไม่รวมค่าวิทยากร</p>
              </div>
              <ul className="space-y-4 flex-1 mb-8">
                {["อุปกรณ์ครบชุด", "กิจกรรมทักษะลูกเสือ", "อาหารกลางวัน 1 มื้อ", "กิจกรรมผจญภัย", "พยาบาลประจำจุด"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> {item}</li>
                ))}
              </ul>
            </div>

            {/* 3D2N - Highlight */}
            <div className="bg-green-900 p-10 rounded-[2.5rem] border-4 border-orange-500 flex flex-col transform lg:-translate-y-8 shadow-2xl relative ring-8 ring-orange-500/10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl">Most Popular</div>
              <div className="mb-8 border-b border-white/10 pb-8 text-center">
                <h3 className="text-3xl font-black text-white mb-2 italic">3 วัน 2 คืน</h3>
                <div className="flex items-baseline justify-center gap-1.5 mt-6">
                  <span className="text-green-300 text-sm font-bold uppercase">เริ่มต้น</span>
                  <span className="text-6xl font-black text-orange-400 tracking-tighter">340</span>
                  <span className="text-green-300 text-sm font-bold uppercase">/ คน</span>
                </div>
                <div className="mt-4 bg-white/10 py-2 rounded-xl border border-white/5 inline-block px-4"><p className="text-orange-300 text-[11px] font-black tracking-widest uppercase">Best Value Package</p></div>
              </div>
              <ul className="space-y-4 mb-10 flex-1 text-white">
                {["ทักษะลูกเสือ / บุกเบิก", "ประกอบอาหาร / สูทกรรม", "ผจญภัย / รอบกองไฟ (LIVE)", "เดินทางไกล / สำรวจ", "อาหาร 7 มื้อ + ที่พัก 2 คืน", "พยาบาลสว่างราชบุรี 24 ชม."].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" /> <span>{item}</span></li>
                ))}
              </ul>
              <a href="/campcalendar.html" className="w-full py-5 rounded-2xl font-black bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-xl text-center text-xl active:scale-95 flex items-center justify-center gap-2 group">เช็กคิวว่างจองค่าย <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" /></a>
            </div>

            {/* 2D1N */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 flex flex-col hover:shadow-2xl transition-all duration-500">
              <div className="mb-8 border-b border-slate-100 pb-8">
                <h3 className="text-2xl font-black text-slate-800 mb-2 italic underline decoration-green-500 decoration-4">2 วัน 1 คืน</h3>
                <div className="flex items-baseline gap-1 mt-6">
                   <span className="text-slate-400 text-sm font-bold">เริ่มต้น</span>
                   <span className="text-5xl font-black text-green-800 tracking-tighter">240</span>
                   <span className="text-slate-400 text-sm font-bold italic">/ ท่าน</span>
                </div>
                <p className="text-[10px] text-orange-600 font-black mt-3 uppercase tracking-widest flex items-center gap-1.5"><AlertCircle className="w-3 h-3" /> ไม่รวมค่าวิทยากร</p>
              </div>
              <ul className="space-y-4 flex-1 mb-8">
                {["กิจกรรมบุกเบิก / ผจญภัย", "ประกอบอาหาร / สูทกรรม", "กิจกรรมรอบกองไฟ", "เดินทางไกล / สำรวจ", "อาหาร 4 มื้อ + ที่พัก 1 คืน", "พยาบาลประจำ 24 ชม."].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-bold text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructor Fee Guide */}
          <div className="mt-20 max-w-4xl mx-auto bg-green-950 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
             <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-50 rounded-full opacity-10"></div>
             <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg"><Users className="w-8 h-8 text-white" /></div>
                <div className="text-center md:text-left">
                   <h4 className="text-2xl font-black tracking-tight leading-none uppercase">Instructor Service Fee</h4>
                   <p className="text-green-300 text-sm mt-2 italic font-light tracking-wide underline underline-offset-4 decoration-orange-500/50">*ค่าธรรมเนียมวิทยากรกรณีเหมาและรายบุคคล</p>
                </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                   <p className="font-black text-orange-400 mb-6 border-b border-white/10 pb-3 flex items-center gap-2 uppercase tracking-widest text-[11px]"><BedDouble className="w-4 h-4" /> ค่ายค้างแรม (1-2 คืน)</p>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center"><span className="text-xs font-bold text-green-100/60">ต่ำกว่า 250 ท่าน</span> <span className="bg-white text-green-950 px-4 py-1 rounded-lg font-black text-sm shadow-lg tracking-tight">เหมา 15,000.-</span></div>
                      <div className="flex justify-between items-center"><span className="text-xs font-bold text-green-100/60">250 ท่าน ขึ้นไป</span> <div className="text-right leading-none"><span className="text-3xl font-black text-orange-500">60</span><span className="text-[10px] font-bold ml-1 opacity-50 uppercase">บาท / ท่าน</span></div></div>
                   </div>
                </div>
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                   <p className="font-black text-blue-400 mb-6 border-b border-white/10 pb-3 flex items-center gap-2 uppercase tracking-widest text-[11px]"><Compass className="w-4 h-4" /> ค่ายกลางวัน (Day Camp)</p>
                   <div className="space-y-6">
                      <div className="flex justify-between items-center"><span className="text-xs font-bold text-green-100/60">ต่ำกว่า 200 ท่าน</span> <span className="bg-white text-green-950 px-4 py-1 rounded-lg font-black text-sm shadow-lg tracking-tight">เหมา 6,000.-</span></div>
                      <div className="flex justify-between items-center"><span className="text-xs font-bold text-green-100/60">200 ท่าน ขึ้นไป</span> <div className="text-right leading-none"><span className="text-3xl font-black text-blue-400">30</span><span className="text-[10px] font-bold ml-1 opacity-50 uppercase">บาท / ท่าน</span></div></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 8. Gallery Section */}
      <section id="gallery" className="py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-green-950 mb-4 flex items-center justify-center gap-3 italic underline underline-offset-[12px] decoration-orange-500/20">
              <ImageIcon className="w-8 h-8 text-orange-500 not-italic" /> EXPLORE THE VIBE
            </h2>
            <p className="text-slate-400 text-lg italic mt-4">ภาพกิจกรรมจริง ณ ค่ายอนุสรณ์ศุภมาศ ราชบุรี</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             {galleryImages.map((img, i) => (
               <div key={i} className={`group cursor-pointer relative overflow-hidden rounded-[2rem] shadow-xl transition-all duration-700 hover:-translate-y-2 ${i % 3 === 0 ? 'h-72' : 'h-48'}`} onClick={() => setSelectedImage(img.src)}>
                 <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-white text-sm font-bold italic tracking-wider flex items-center gap-2"><ImageIcon className="w-4 h-4 text-orange-500" /> {img.alt}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 9. Preparation & FAQ (ใหม่!) */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* FAQ */}
              <div>
                 <div className="inline-flex items-center gap-2 text-orange-600 font-black uppercase text-xs tracking-[0.3em] mb-4"><HelpCircle className="w-4 h-4" /> FAQ</div>
                 <h2 className="text-3xl md:text-5xl font-black text-green-950 mb-10 tracking-tight leading-none uppercase">คำถามที่พบบ่อย</h2>
                 <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                       <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                          <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full p-6 text-left flex justify-between items-center group">
                             <span className="font-black text-slate-700 group-hover:text-orange-600 transition-colors">{faq.q}</span>
                             <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-orange-500' : ''}`} />
                          </button>
                          {openFaq === idx && <div className="px-6 pb-6 text-slate-500 font-light leading-relaxed animate-in slide-in-from-top-2 duration-300">{faq.a}</div>}
                       </div>
                    ))}
                 </div>
              </div>

              {/* Checklist */}
              <div className="bg-green-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                 <div className="inline-flex items-center gap-2 text-orange-400 font-black uppercase text-xs tracking-[0.3em] mb-4"><Briefcase className="w-4 h-4" /> Preparation</div>
                 <h2 className="text-3xl md:text-4xl font-black mb-8 italic uppercase underline decoration-white/20 underline-offset-8">สิ่งที่ควรเตรียมมาเข้าค่าย</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                       "ยาสามัญประจำตัว (ถ้ามี)", "ชุดลำลอง 3-4 ชุด", "รองเท้าผ้าใบ (สำหรับกิจกรรมฐาน) และรองเท้าแตะ", "ของใช้ส่วนตัว (แปรงสีฟัน/สบู่)", "เชือก (ทางค่ายมีจำหน่าย)", "สุขภาพกายใจที่สมบูรณ์"
                    ].map((item, i) => (
                       <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                          <span className="text-sm font-bold text-green-50 tracking-tight">{item}</span>
                       </div>
                    ))}
                 </div>
                 <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-dashed border-white/20">
                    <p className="text-xs italic text-green-200/80 leading-relaxed font-light font-medium">*ทางค่ายมีบริการที่นอน หมอน และผ้าห่มสะอาดเตรียมไว้ให้ครบทุกคน ไม่ต้องพกมาจากบ้านครับ</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 10. Contact & Map Section */}
      <section id="contact" className="py-24 scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-orange-600 font-black uppercase text-xs tracking-[0.3em] mb-4"><Navigation className="w-4 h-4" /> Get in Touch</div>
                <h2 className="text-3xl md:text-6xl font-black text-green-950 leading-tight leading-none uppercase">พร้อมต้อนรับ <br /> <span className="text-orange-500 italic">คณะครูทุกคน</span></h2>
                <p className="text-slate-500 text-lg leading-relaxed font-light italic pl-6 border-l-4 border-orange-500">ทีมงานค่ายอนุสรณ์ศุภมาศ พร้อมให้คำปรึกษาและออกแบบแพ็กเกจที่เหมาะสมที่สุดให้คุณครูครับ</p>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-700 group-hover:bg-green-700 group-hover:text-white transition-colors shadow-inner"><Phone className="w-8 h-8" /></div>
                  <div><h4 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-1">เบอร์โทรศัพท์ติดต่อ</h4><p className="text-slate-800 font-black text-2xl tracking-tighter">086-551-5110</p></div>
                </div>
                <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors shadow-inner"><Facebook className="w-8 h-8" /></div>
                  <div><h4 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-1">Facebook Fanpage</h4><p className="text-slate-800 font-bold uppercase text-sm tracking-tight leading-tight">ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี</p></div>
                </div>
                <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-700 group-hover:bg-orange-700 group-hover:text-white transition-colors shadow-inner"><Clock className="w-8 h-8" /></div>
                  <div><h4 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-1">เวลาให้บริการ</h4><p className="text-slate-800 font-bold italic text-lg leading-tight uppercase">24/7</p></div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative bg-white p-4 rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden group">
                <div className="bg-slate-200 w-full h-[450px] rounded-[2.5rem] overflow-hidden relative">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3332011746957!2d99.57713877516328!3d13.758768997131973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e314250c5a6003%3A0x591426503e1ce901!2z4LiE4LmI4Liy4Lii4Lil4Li54LiB4LmA4Liq4Li34Lit4Lit4LiZ4Li44Liq4Lij4LiT4LmM4Lio4Li44Lig4Lih4Liy4LioIOC4iC7guKPguLLguIrguJrguLjguKPguLUt4LiB4Liy4LiN4LiI4LiZ4Lia4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1772644912554!5m2!1sth!2sth" className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" allowFullScreen loading="lazy" title="Google Maps"></iframe>
                </div>
              </div>
              <div className="bg-white p-8 rounded-[3rem] border-4 border-dashed border-orange-200 shadow-xl flex flex-col md:flex-row items-center gap-8 group hover:border-orange-500 transition-all hover:bg-orange-50/20">
                <div className="w-28 h-28 rounded-[2rem] overflow-hidden shrink-0 border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-all duration-500"><img src="/แผนที่ค่าย 2022.png" alt="Map" className="w-full h-full object-cover" /></div>
                <div className="flex-1 text-center md:text-left">
                   <h4 className="font-black text-slate-900 text-2xl italic tracking-tighter uppercase leading-none">Shortcut & Landmarks</h4>
                   <p className="text-slate-400 text-sm mt-2 font-bold italic">*แผนที่จุดสังเกตเพื่อความสะดวกสำหรับพลขับรถบัส</p>
                </div>
                <a href="/แผนที่ค่าย 2022.png" target="_blank" className="bg-green-950 hover:bg-orange-500 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-lg flex items-center gap-3 group-hover:scale-105 shadow-orange-500/20"><ImageIcon className="w-5 h-5" /> ดูภาพใหญ่</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      {/* 11. Final Call to Action */}
      <section className="py-32 bg-orange-500 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-950/20 rounded-full translate-x-1/3 translate-y-1/3 blur-[120px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-white">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter italic uppercase underline decoration-green-950/40 decoration-[16px] underline-offset-[-10px]">Adventure Calls!</h2>
          <p className="text-2xl md:text-3xl font-light mb-16 italic opacity-90 leading-relaxed font-bold">พานักเรียนมาสัมผัสความหมายของคำว่า "ศุภมาศ" <br />สนุก ปลอดภัย อิ่มท้อง และมีความสุขที่สุด</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a href="https://line.me/ti/p/vLpgOF-XSu" target="_blank" className="bg-white text-orange-600 hover:bg-gray-100 px-16 py-6 rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4"><MessageCircle className="w-8 h-8 fill-orange-600" /> สอบถามผ่าน LINE</a>
            <a href="tel:0865515110" className="bg-transparent border-4 border-white hover:bg-white/10 text-white px-16 py-6 rounded-[2.5rem] font-black text-2xl transition-all flex items-center justify-center gap-4 shadow-xl"><Phone className="w-8 h-8" /> โทรหาฝ่ายจอง</a>
          </div>
        </div>
      </section>

      {/* --- UTILITY COMPONENTS --- */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-8 right-8 text-white bg-white/10 p-4 rounded-full hover:bg-orange-500 transition-all z-[1000]"><X className="w-8 h-8" /></button>
          <img src={selectedImage} alt="Expanded" className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl border-8 border-white/5 object-contain animate-in zoom-in-95 duration-500" />
        </div>
      )}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-10 right-10 z-[100] w-16 h-16 bg-green-950 text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center transition-all duration-700 hover:bg-orange-500 hover:scale-110 group ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}><ChevronUp className="w-8 h-8 group-hover:animate-bounce" /></button>
    </div>
  );
}