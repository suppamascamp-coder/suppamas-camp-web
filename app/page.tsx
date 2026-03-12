"use client"; 
import React, { useState, useEffect } from 'react';
import { 
  Compass, Flame, Users, CheckCircle2, 
  ShieldCheck, BedDouble, Utensils, AlertCircle,
  ArrowRight, Image as ImageIcon, MapPin, Navigation, Heart,
  Phone, Facebook, MessageCircle, Clock, UserCheck, Award,
  X, ChevronUp, HelpCircle, Briefcase, ChevronDown, Map, Loader2, Sparkles, Calendar, Info, ZoomIn
} from 'lucide-react';
import GoogleReviews from '../src/components/GoogleReviews'; 
import AdventureMapModal from '../src/components/AdventureMapModal'; 

// 📌 นำเข้า Firebase
import { db } from '../src/lib/firebase';
import { collection, getDocs, getDoc, doc, query, orderBy, limit } from 'firebase/firestore';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // ==========================================
  // 🎯 State สำหรับเก็บข้อมูลจาก Firebase
  // ==========================================
  const [homepageData, setHomepageData] = useState<any>(null);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // ==========================================
  // 🔄 ดึงข้อมูลทั้งหมดเมื่อเปิดหน้าเว็บ
  // ==========================================
  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const docRef = doc(db, "settings", "homepage");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHomepageData(docSnap.data());
        }
      } catch (error) { 
        console.error("Error fetching homepage data:", error); 
      }
    };
    fetchHomepageData();
  }, []);

  useEffect(() => {
    if (!homepageData?.slides || homepageData.slides.length === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % homepageData.slides.length);
    }, 5000); 
    return () => clearInterval(slideInterval);
  }, [homepageData?.slides]);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoadingGallery(true);
      try {
        const baseQuery = collection(db, "gallery");
        const qGallery = showAllGallery 
          ? query(baseQuery, orderBy("createdAt", "desc"))
          : query(baseQuery, orderBy("createdAt", "desc"), limit(8));
          
        const querySnapshot = await getDocs(qGallery);
        const images: any[] = [];
        querySnapshot.forEach((doc) => {
          images.push({ id: doc.id, ...doc.data() });
        });
        setGalleryImages(images);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setIsLoadingGallery(false);
      }
    };
    fetchGallery();
  }, [showAllGallery]);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==========================================
  // 🛡️ ข้อมูลสำรอง (Fallback Data)
  // ==========================================
  const fallbackHeroSlides = [
    "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000"
  ];

  const defaultTexts = {
    badge: 'เปิดรับจองรอบปีการศึกษา 2569 แล้ว',
    title: 'ค่ายลูกเสือ อนุสรณ์ศุภมาศ ราชบุรี',
    subtitle: 'ศูนย์ฝึกอบรมเยาวชนที่เน้นความปลอดภัยและคุณภาพอาหาร สร้างวินัยผ่านความสุข ในบรรยากาศธรรมชาติที่สมบูรณ์ที่สุด',
    stat1Val: '15+', stat1Label: 'ปีแห่งประสบการณ์',
    stat2Val: '20+', stat2Label: 'ฐานกิจกรรมผจญภัย',
    stat3Val: '600', stat3Label: 'ความจุเรือนนอน (คน)',
    stat4Val: '100%', stat4Label: 'มาตรฐานความปลอดภัย',
    activityTitle: 'HIGH-IMPACT ACTIVITIES',
    activitySubtitle: '"สนุก ท้าทาย ได้ทักษะชีวิตที่แท้จริง"',
    facilityTitle: 'SAFETY & COMFORT',
    facilitySubtitle: '"ความสะอาดและปลอดภัยคือหัวใจของค่ายอนุสรณ์ศุภมาศ"'
  };

  const defaultCards = [
    { title: 'ฐานกิจกรรมผจญภัย', desc: 'ทดสอบความกล้ากับสไลเดอร์น้ำสูง 10 เมตร, โดดหอ และฐานเชือกกว่า 10 รูปแบบ', img: 'https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=800' },
    { title: 'กิจกรรมรอบกองไฟ', desc: 'ลานกิจกรรมมาตรฐานจุได้ 1-600 คน พร้อมระบบแสงสีเสียงเต็มรูปแบบ และบริการ LIVE Streaming ให้ผู้ปกครองดูจากที่บ้าน', img: 'https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=800' },
    { title: 'ทักษะชีวิตและทีมเวิร์ค', desc: 'วิชาประกอบอาหาร (สูทกรรม), ปฐมพยาบาล และการแก้ปัญหาร่วมกันผ่านเกมสถานการณ์จำลอง', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800' },
    { title: 'เดินทางไกล/สำรวจ', desc: 'ระยะทางที่อยู่ในระดับพอดีไม่ใกล้เกินไป บนหุบเขาที่จัดว่าเป็นหนึ่งในสวรรค์ของนักเดินทางไกล', img: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800' }
  ];

  const defaultFeatures = [
    { title: "ความปลอดภัย 24 ชม.", desc: "กล้อง CCTV 40 จุด รอบค่าย และหน่วยพยาบาลจากสว่างราชบุรีสแตนด์บายตลอดการเข้าค่าย", icon: "ShieldCheck", color: "text-orange-500" },
    { title: "เรือนนอนมาตรฐาน", desc: "แยกสัดส่วนชาย-หญิงชัดเจน ห้องน้ำสะอาดเพียงพอกับจำนวนเด็ก อากาศถ่ายเทสะดวก พัดลมครบ", icon: "BedDouble", color: "text-blue-400" },
    { title: "โรงอาหารสะอาด 5 ดาว", desc: "อาหารปรุงสุกใหม่ ถูกหลักโภชนาการ ปริมาณเต็มอิ่ม เติมได้ไม่อั้น และรองรับได้กว่า 600 ท่าน", icon: "Utensils", color: "text-green-400" }
  ];

  const displayTexts = homepageData?.texts ? { ...defaultTexts, ...homepageData.texts } : defaultTexts;
  const displayCards = homepageData?.highlightCards?.length > 0 ? homepageData.highlightCards : defaultCards;
  const displayFeatures = homepageData?.featureCards?.length > 0 ? homepageData.featureCards : defaultFeatures;
  const displaySlides = homepageData?.slides?.length > 0 ? homepageData.slides.map((s: any) => s.url) : fallbackHeroSlides;

  // ฟังก์ชันแปลงชื่อ Icon เป็น Component
  const renderIcon = (iconName: string) => {
    const iconClass = "w-16 h-16 mx-auto mb-8 transition-transform group-hover:scale-110";
    switch(iconName) {
      case 'ShieldCheck': return <ShieldCheck className={`${iconClass} text-orange-500`} />;
      case 'BedDouble': return <BedDouble className={`${iconClass} text-blue-400`} />;
      case 'Utensils': return <Utensils className={`${iconClass} text-green-400`} />;
      default: return <Info className={`${iconClass} text-orange-400`} />;
    }
  };

  const fallbackImages = [
    { src: "https://images.unsplash.com/photo-1533240332313-0cb49f47c422?auto=format&fit=crop&q=80&w=1000", name: "ฐานผจญภัยลูกเสือ", category: "กิจกรรม" },
    { src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=1000", name: "วิวธรรมชาติในค่าย", category: "สถานที่" },
    { src: "https://images.unsplash.com/photo-1504280655536-2605761a54dc?auto=format&fit=crop&q=80&w=1000", name: "กองไฟและการแสดง", category: "กิจกรรม" },
    { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000", name: "กิจกรรมกลุ่มเยาวชน", category: "กิจกรรม" }
  ];
  const displayImages = galleryImages.length > 0 ? galleryImages : fallbackImages;

  const faqs = [
    { q: "ทางค่ายมีประกันอุบัติเหตุให้นักเรียนหรือไม่?", a: "ในแพ็กเกจมาตรฐานจะยังไม่รวมประกันอุบัติเหตุรายบุคคล แต่ทางค่ายมีหน่วยพยาบาลสว่างราชบุรีสแตนด์บาย 24 ชม." },
    { q: "เรือนนอนมีอุปกรณ์เครื่องนอนให้ครบไหม?", a: "เรามีที่นอน หมอน และผ้าห่มที่ผ่านการซักสะอาดเตรียมไว้ให้ครบทุกท่านครับ นักเรียนเพียงเตรียมของใช้ส่วนตัวมาเท่านั้น" },
    { q: "กรณีมีนักเรียนแพ้อาหาร หรือทานมังสวิรัติ จัดการอย่างไร?", a: "คุณครูสามารถแจ้งรายการอาหารพิเศษล่วงหน้าอย่างน้อย 7 วัน ทางโรงครัวของเราจะจัดเตรียมเมนูแยกเฉพาะบุคคลให้โดยไม่มีค่าใช้จ่ายเพิ่มครับ" },
    { q: "สามารถปรับเปลี่ยนตารางกิจกรรมเองได้ไหม?", a: "ได้ครับ ทีมวิทยากรของเรายินดีปรับตารางกิจกรรมให้สอดคล้องกับวัตถุประสงค์ของโรงเรียน ไม่ว่าจะเป็นเน้นวิชาการลูกเสือเข้มข้น หรือเน้นนันทนาการสร้างความสัมพันธ์" },
    { q: "เครื่องเซ่นไหว้และป้ายชื่อต้องเตรียมไหม?", a: "ไม่ต้องเตรียม ทางค่ายมีบริการให้พร้อม" }
  ];

  // 🌟 Schema Markup สำหรับ SEO Local Business 🌟
  // ข้อมูลส่วนนี้จะช่วยให้ Google เข้าใจโครงสร้างเว็บเราและดันอันดับ "ค่ายลูกเสือราชบุรี" ได้ดีขึ้นมาก
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี",
    "alternateName": "ค่ายศุภมาศ",
    "description": "ศูนย์ฝึกอบรมเยาวชนและค่ายลูกเสือที่ได้มาตรฐานที่สุดในจังหวัดราชบุรี กิจกรรมผจญภัยครบครัน ปลอดภัย 100%",
    "url": "https://www.suppamascamp.me", // ใส่โดเมนจริงของคุณครู
    "telephone": "+66865515110",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ต.หนองกวาง",
      "addressLocality": "อ.โพธาราม",
      "addressRegion": "จ.ราชบุรี",
      "postalCode": "70120",
      "addressCountry": "TH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "13.758768997131973", // สามารถใส่ละติจูดจริงได้
      "longitude": "99.57713877516328"  // สามารถใส่ลองจิจูดจริงได้
    },
    "image": displaySlides[0],
    "priceRange": "$$"
  };

  return (
    <div className="relative font-sans antialiased text-slate-900 bg-white">
      {/* 🚀 ฝัง JSON-LD เพื่อทำ SEO แบบเจาะลึก */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Section */}
      <section id="home" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 z-0">
          {displaySlides.map((slideUrl: string, index: number) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                index === currentHeroSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            >
              <img 
                src={slideUrl} 
                alt={`ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี รูปที่ ${index + 1}`} // SEO: อัปเดต alt tag
                className="w-full h-full object-cover transition-transform duration-[10000ms]" 
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-green-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {displaySlides.map((_: any, i: number) => (
              <button key={i} onClick={() => setCurrentHeroSlide(i)} className={`h-1.5 transition-all duration-500 rounded-full ${i === currentHeroSlide ? 'w-8 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/50'}`} />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs md:text-sm font-semibold mb-6 backdrop-blur-sm uppercase tracking-widest">
            {displayTexts.badge}
          </span>
          {/* SEO: H1 Tag คือจุดสำคัญที่สุด ใช้ดึงคำที่แอดมินตั้งมาแยกบรรทัด */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl leading-tight">
            {(() => {
              const titleStr = displayTexts.title || '';
              const firstSpaceIndex = titleStr.indexOf(' ');
              if (firstSpaceIndex === -1) return titleStr;
              
              const firstPart = titleStr.substring(0, firstSpaceIndex);
              const secondPart = titleStr.substring(firstSpaceIndex + 1);
              
              return (
                <>
                  {firstPart} <br className="hidden md:block" />
                  <span className="text-orange-500 italic">{secondPart}</span>
                </>
              );
            })()}
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-10 drop-shadow-md max-w-3xl mx-auto font-light leading-relaxed">
            {displayTexts.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/campcalendar.html" target="_blank" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95">
              <Calendar className="w-5 h-5" /> ตรวจสอบคิวว่าง
            </a>
            <a href="#about" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/40 text-white px-10 py-4 rounded-full font-bold text-lg transition-all text-center active:scale-95">
              ทำความรู้จักเรา
            </a>
          </div>
        </div>
      </section>

      {/* 2. Trust Bar */}
      <section className="relative z-20 -mt-10 md:-mt-20 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-[2rem] shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-b-8 border-orange-500">
          {[
            { label: displayTexts.stat1Label, val: displayTexts.stat1Val, color: "text-green-800" },
            { label: displayTexts.stat2Label, val: displayTexts.stat2Val, color: "text-orange-500" },
            { label: displayTexts.stat3Label, val: displayTexts.stat3Val, color: "text-green-800" },
            { label: displayTexts.stat4Label, val: displayTexts.stat4Val, color: "text-orange-500" }
          ].map((item, i) => (
            <div key={i} className={`text-center ${i !== 0 ? 'border-l border-gray-100' : ''}`}>
              <div className={`text-3xl md:text-4xl font-black ${item.color}`}>{item.val}</div>
              <div className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-tighter mt-1 leading-none">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. About */}
      <section id="about" className="py-24 scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-green-100 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0 duration-500"></div>
              <img src="/about-us.jpg" alt="ประวัติค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี" className="rounded-[2.5rem] shadow-2xl relative z-10 w-full h-[550px] object-cover" />
              <div className="absolute top-6 left-6 bg-orange-500 text-white p-4 rounded-2xl z-20 shadow-lg font-black italic">- SINCE 2014 -</div>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-orange-600 font-black uppercase text-xs tracking-[0.3em]"><Heart className="w-4 h-4 fill-orange-500" /> Our Philosophy</div>
              {/* SEO: H2 Tag */}
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
      <section id="activities" className="py-24 scroll-mt-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-center md:text-left">
             <div>
                <h2 className="text-3xl md:text-5xl font-black text-green-950 mb-4 uppercase">{displayTexts.activityTitle}</h2>
                <p className="text-orange-500 text-lg font-bold italic leading-none">{displayTexts.activitySubtitle}</p>
             </div>
             <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="text-green-800 font-bold border-b-2 border-green-800 pb-1 hover:text-orange-500 transition-all flex items-center gap-2 mx-auto md:mx-0 shrink-0">ดูรูปทั้งหมด <ArrowRight className="w-4 h-4" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayCards.map((card: any, index: number) => {
              const icons = [Compass, Flame, Users, Sparkles];
              const Icon = icons[index % icons.length];
              const isFirst = index === 0;

              return (
                <div key={index} className="group rounded-[2.5rem] overflow-hidden bg-white shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-100 relative flex flex-col">
                  <div className="relative h-64 overflow-hidden shrink-0 bg-slate-200">
                    <img src={card.img} alt={`กิจกรรมค่ายลูกเสือราชบุรี: ${card.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${isFirst ? 'from-green-950/90' : 'from-black/80'} via-black/20 to-transparent`}></div>
                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className={`text-xl font-black mb-4 ${isFirst ? 'text-green-800' : 'text-slate-800 group-hover:text-green-800'} transition-colors`}>{card.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium flex-1 text-sm">{card.desc}</p>
                    {isFirst && (
                      <button onClick={() => setIsMapModalOpen(true)} className="mt-8 w-full py-4 rounded-2xl font-black bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        <Map className="w-5 h-5" /> ดูแผนที่ฐานผจญภัย
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Facilities & Safety */}
      <section id="facilities" className="py-24 bg-green-950 text-white scroll-mt-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full blur-[100px] opacity-20 -mr-48 -mt-48"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight italic">{displayTexts.facilityTitle}</h2>
             <p className="text-green-300 max-w-2xl mx-auto text-lg font-light tracking-wide italic leading-relaxed">{displayTexts.facilitySubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
            {displayFeatures.map((item: any, idx: number) => (
              <div key={idx} className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all group shadow-inner">
                {renderIcon(item.icon)}
                <h3 className="text-2xl font-black mb-4 italic uppercase">{item.title}</h3>
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
                {["ทักษะลูกเสือ / บุกเบิก", "ประกอบอาหาร / สูทกรรม", "ผจญภัย / รอบกองไฟ", "เดินทางไกล / สำรวจ", "อาหาร 7 มื้อ + ที่พัก 2 คืน", "พยาบาลสว่างราชบุรี 24 ชม."].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-bold"><CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" /> <span>{item}</span></li>
                ))}
              </ul>
            </div>

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
        </div>
      </section>

      {/* 8. Gallery Section */}
      <section id="gallery" className="py-24 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-green-950 mb-4 flex items-center justify-center gap-3 italic underline underline-offset-[12px] decoration-orange-500/20">
              <ImageIcon className="w-8 h-8 text-orange-500 not-italic" /> EXPLORE THE VIBE
            </h2>
            <p className="text-slate-400 text-lg italic mt-4">ภาพบรรยากาศอัปเดตล่าสุดจากค่ายอนุสรณ์ศุภมาศ ราชบุรี</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
             {displayImages.map((img, i) => (
               <div key={img.id || i} className={`group cursor-pointer relative overflow-hidden rounded-[2rem] shadow-xl transition-all duration-700 hover:-translate-y-2 ${i % 3 === 0 ? 'h-72' : 'h-48'}`} onClick={() => setSelectedImage(img.src)}>
                 <img src={img.src} alt={img.name || `ภาพบรรยากาศค่ายลูกเสืออนุสรณ์ศุภมาศ ${i+1}`} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <p className="text-white text-lg md:text-xl font-black tracking-wide mb-2 drop-shadow-md leading-tight">
                      {img.name || img.alt}
                    </p>
                    <div>
                      <span className="text-orange-400 text-[10px] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg inline-flex items-center gap-1 border border-white/10">
                        <ImageIcon className="w-3 h-3" /> {img.category || "แกลลอรี่"}
                      </span>
                    </div>
                 </div>
               </div>
             ))}
          </div>

          {!showAllGallery && galleryImages.length >= 8 && (
            <div className="mt-16 text-center">
              <button 
                onClick={() => setShowAllGallery(true)}
                disabled={isLoadingGallery}
                className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-10 py-4 rounded-full font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 mx-auto disabled:opacity-50 active:scale-95"
              >
                {isLoadingGallery ? 'กำลังโหลด...' : 'ดูภาพบรรยากาศทั้งหมด'} {!isLoadingGallery && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          )}

          {showAllGallery && (
            <div className="mt-16 text-center">
              <button 
                onClick={() => {
                  setShowAllGallery(false);
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-10 py-4 rounded-full font-black text-lg transition-all flex items-center justify-center gap-3 mx-auto shadow-sm active:scale-95"
              >
                <ChevronUp className="w-5 h-5" /> ย่อแกลลอรี่กลับ
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 9. FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
              <div className="bg-green-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                 <div className="inline-flex items-center gap-2 text-orange-400 font-black uppercase text-xs tracking-[0.3em] mb-4"><Briefcase className="w-4 h-4" /> Preparation</div>
                 <h2 className="text-3xl md:text-4xl font-black mb-8 italic uppercase underline decoration-white/20 underline-offset-8">สิ่งที่ควรเตรียมมาเข้าค่าย</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                       "ยาสามัญประจำตัว (ถ้ามี)", "ชุดลำลอง 3-4 ชุด", "รองเท้าผ้าใบและรองเท้าแตะ", "ของใช้ส่วนตัว (แปรงสีฟัน/สบู่)", "เชือก (ทางค่ายมีจำหน่าย)", "สุขภาพกายใจที่สมบูรณ์"
                    ].map((item, i) => (
                       <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                          <span className="text-sm font-bold text-green-50 tracking-tight">{item}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 10. Contact & Map Section (ปรับปรุงให้มี Thumbnail Map) */}
      <section id="contact" className="py-24 scroll-mt-20 overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* ซ้าย: ข้อมูลติดต่อ */}
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
              </div>
            </div>

            {/* ขวา: แผนที่ Google Map แบบเต็ม + Thumbnail แผนที่วาด */}
            <div className="space-y-6">
              <div className="relative bg-white p-4 rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden group h-[500px]">
                
                {/* 🗺️ Google Map เต็มพื้นที่ */}
                <div className="bg-slate-200 w-full h-full rounded-[2.5rem] overflow-hidden relative z-0">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.3332011746957!2d99.57713877516328!3d13.758768997131973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e314250c5a6003%3A0x591426503e1ce901!2z4LiE4LmI4Liy4Lii4Lil4Li54LiB4LmA4Liq4Li34Lit4Lit4LiZ4Li44Liq4Lij4LiT4LmM4Lio4Li44Lig4Lih4Liy4LioIOC4iC7guKPguLLguIrguJrguLjguKPguLUt4LiB4Liy4LiN4LiI4LiZ4Lia4Li44Lij4Li1!5e0!3m2!1sth!2sth!4v1772644912554!5m2!1sth!2sth" className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" allowFullScreen loading="lazy" title="Google Maps"></iframe>
                </div>

                {/* 🗺️ Thumbnail แผนที่ภาพวาด (ลอยทับอยู่มุมขวาล่าง) */}
                <div 
                  className="absolute bottom-8 right-8 w-40 h-40 md:w-48 md:h-48 bg-white p-2 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 cursor-zoom-in group/map transform hover:scale-105 transition-all duration-300 border-4 border-white"
                  onClick={() => setSelectedImage('/map.jpg')} 
                  title="คลิกเพื่อขยายแผนที่ภาพวาด"
                >
                  <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                    <img src="/map.jpg" alt="แผนที่ภาพวาดค่ายลูกเสือ" className="w-full h-full object-cover group-hover/map:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center opacity-0 group-hover/map:opacity-100 transition-opacity">
                      <ZoomIn className="w-8 h-8 text-white drop-shadow-md mb-1" />
                      <span className="text-white text-[10px] font-black uppercase tracking-widest drop-shadow-md">คลิกเพื่อซูม</span>
                    </div>
                  </div>
                  {/* ป้ายเตือนเล็กๆ (Pulse) */}
                  <div className="absolute -top-3 -left-3 bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <MapPin className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Google Reviews Section */}
      <GoogleReviews />

      {/* 12. Final Call to Action Section */}
      <section className="py-32 bg-orange-500 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-950/20 rounded-full translate-x-1/3 translate-y-1/3 blur-[120px]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-white">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter italic uppercase underline decoration-green-950/40 decoration-[16px] underline-offset-[-10px]">Adventure Calls!</h2>
          <p className="text-2xl md:text-3xl font-light mb-16 italic opacity-90 leading-relaxed font-bold">พานักเรียนมาสัมผัสความหมายของคำว่า "ศุภมาศ" <br />สนุก ปลอดภัย อิ่มท้อง และมีความสุขที่สุด</p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a href="https://line.me/ti/p/vLpgOF-XSu" target="_blank" rel="noreferrer" className="bg-white text-orange-600 hover:bg-gray-100 px-16 py-6 rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4"><MessageCircle className="w-8 h-8 fill-orange-600" /> สอบถามผ่าน LINE</a>
            <a href="tel:0865515110" className="bg-transparent border-4 border-white hover:bg-white/10 text-white px-16 py-6 rounded-[2.5rem] font-black text-2xl transition-all flex items-center justify-center gap-4 shadow-xl"><Phone className="w-8 h-8" /> โทรหาฝ่ายจอง</a>
          </div>
        </div>
      </section>

      {/* 🌟 แสดง Interactive Map Modal เมื่อถูกเปิด */}
      <AdventureMapModal 
        isOpen={isMapModalOpen} 
        onClose={() => setIsMapModalOpen(false)} 
      />

      {/* UTILITY: Image Expanded */}
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