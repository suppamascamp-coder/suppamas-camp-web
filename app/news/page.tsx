"use client";
import React, { useState, useEffect } from 'react';
import { Metadata } from 'next';
import { Newspaper, Calendar, ArrowRight, Home as HomeIcon, ChevronRight, Tag, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';

// 📌 นำเข้า Firebase
import { db } from '../../src/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, "news"), orderBy("createdAt", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedNews: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedNews.push({ id: doc.id, ...doc.data() });
        });
        setNewsList(fetchedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const newsListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ข่าวสารและกิจกรรมล่าสุด ค่ายอนุสรณ์ศุภมาศ",
    "description": "อัปเดตบรรยากาศการเข้าค่ายลูกเสือ กิจกรรมผจญภัย และข่าวสารสำคัญจากจังหวัดราชบุรี",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี",
      "logo": "https://www.suppamascamp.me/favicon.ico"
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsListSchema) }} />

      <div className="max-w-7xl mx-auto px-4">
        
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 bg-white w-fit px-5 py-2.5 rounded-full shadow-sm border border-slate-100">
          <Link href="/" className="hover:text-orange-500 transition-colors flex items-center gap-1.5 font-medium">
            <HomeIcon className="w-3.5 h-3.5" /> หน้าหลัก
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-black italic">ข่าวสารและกิจกรรม</span>
        </nav>

        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="border-l-8 border-orange-500 pl-6 space-y-2">
            <h1 className="text-4xl md:text-6xl font-black text-green-950 uppercase italic tracking-tighter leading-none">News & Activities</h1>
            <p className="text-slate-500 font-bold text-lg md:text-xl">ความเคลื่อนไหวล่าสุด และความประทับใจจากค่ายศุภมาศ</p>
          </div>
          <div className="bg-green-100 text-green-800 px-8 py-4 rounded-[2rem] font-black italic border border-green-200 shadow-sm">
             ⭐ ค่ายลูกเสือยอดนิยมในราชบุรี
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] shadow-inner">
                <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
                <p className="text-slate-400 font-bold animate-pulse">กำลังดึงข้อมูลกิจกรรมล่าสุด...</p>
              </div>
            ) : newsList.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold">ยังไม่มีการลงข่าวสารในขณะนี้</p>
              </div>
            ) : (
              newsList.map((item) => (
                <article key={item.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-slate-100 flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative overflow-hidden h-72 md:h-auto">
                    <img 
                      src={item.img || 'https://via.placeholder.com/800x600'} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    />
                    <div className="absolute top-6 left-6 bg-orange-500 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                      {item.category || 'กิจกรรม'}
                    </div>
                  </div>
                  <div className="md:w-3/5 p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-slate-400 text-xs font-black uppercase tracking-widest">
                        <span className="flex items-center gap-2 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                           <Calendar className="w-3.5 h-3.5 text-orange-500" /> 
                           {item.date || (item.createdAt?.toDate ? item.createdAt.toDate().toLocaleDateString('th-TH') : 'ไม่ระบุวันที่')}
                        </span>
                        <span className="text-green-600 font-black flex items-center gap-1.5">
                           <Clock className="w-3.5 h-3.5" /> Verified Update
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight group-hover:text-orange-500 transition-colors">
                        {item.title}
                      </h2>
                      <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 italic">
                        {/* 🌟 ใช้เฉพาะคำอธิบายสั้นๆ ตรงนี้ เพื่อไม่ให้มีโค้ด HTML ติดมาโชว์ */}
                        {item.excerpt || "คลิกอ่านรายละเอียดเพิ่มเติม..."}
                      </p>
                    </div>
                    <div className="pt-8 border-t border-slate-50 flex justify-between items-center">
                       {/* 🌟 แก้ไข: เปลี่ยนจาก <button> เป็น <Link> เพื่อให้กดทะลุไปหน้าข่าวเต็มได้ */}
                       <Link href={`/news/${item.id}`} className="flex items-center gap-2 text-green-800 font-black uppercase text-xs tracking-[0.2em] group/btn">
                         อ่านเนื้อหาทั้งหมด <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                       </Link>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <aside className="space-y-10">
            <div className="bg-green-950 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-orange-500/20 transition-all duration-700"></div>
               <h3 className="text-xl font-black mb-8 italic flex items-center gap-3 border-b border-white/10 pb-6 uppercase tracking-tighter">
                 <Tag className="text-orange-500" /> Popular Tags
               </h3>
               <div className="flex flex-wrap gap-3">
                 {['ค่ายลูกเสือราชบุรี', 'ค่ายลูกเสือ', 'ค่ายลูกเสืออนุสรณ์ศุภมาศ', 'ที่พักลูกเสือ', 'กิจกรรมผจญภัย', 'มัธยมศึกษา'].map((tag) => (
                   <span key={tag} className="bg-white/5 hover:bg-orange-500 hover:text-white px-5 py-2.5 rounded-2xl text-[10px] font-black transition-all cursor-pointer border border-white/10 uppercase tracking-widest">
                     #{tag}
                   </span>
                 ))}
               </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
               <h3 className="text-2xl font-black text-slate-800 mb-6 italic underline decoration-orange-500 decoration-8 underline-offset-8">แผนกรับจองค่าย</h3>
               <div className="space-y-6">
                  <p className="text-slate-500 font-medium leading-relaxed">
                    คุณครูสามารถตรวจสอบคิวว่างและปรึกษาแนวทางการจัดกิจกรรมเพื่อให้เหมาะสมกับหลักสูตรของโรงเรียนได้ฟรีครับ
                  </p>
                  <Link href="/packages" className="flex items-center justify-between bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:bg-orange-50 hover:border-orange-200 transition-all group/link">
                    <span className="font-black text-slate-800 uppercase tracking-tighter">โปรแกรมและราคา</span>
                    <ArrowRight className="w-5 h-5 text-orange-500 group-hover/link:translate-x-2 transition-all" />
                  </Link>
               </div>
            </div>
          </aside>

        </div>

        <section className="mt-24 p-12 bg-white rounded-[4rem] border border-slate-100 shadow-inner text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 to-transparent opacity-50"></div>
           <div className="relative z-10">
              <h3 className="text-2xl font-black text-green-950 mb-6 uppercase tracking-tighter italic">ศูนย์ฝึกอบรมเยาวชนและค่ายลูกเสือ มาตรฐานระดับประเทศ</h3>
              <p className="max-w-5xl mx-auto text-slate-400 font-medium leading-relaxed text-sm md:text-base">
               ค่ายอนุสรณ์ศุภมาศ ราชบุรี ตั้งอยู่รอยต่อของอำเภอโพธาราม จังหวัดราชบุรีและตำบลหนองตากยา จังหวัดกาญจนบุรี 
                สถานที่ที่ได้รับความไว้วางใจจากสถาบันการศึกษาทั่วประเทศไทย ในการจัดค่ายพักแรมลูกเสือ-เนตรนารี-ยุวกาชาด 
                กิจกรรมนันทนาการครอบคลุมความรู้และกิจกรรม บนพื้นที่กว่า 50 ไร่ ฐานกิจกรรมผจญภัยที่ผ่านการรับรองความปลอดภัย 
                ระบบรักษาความปลอดภัย CCTV 24 ชั่วโมง มีเจ้าหน้าที่พยาบาลดูแล รับส่ง ตลอด 24 ชั่วโมง 
                ห้องพักพร้อมเครื่องนอน ที่จุดเชื่อมต่อกันอย่างเป็นสัดส่วน พร้อมบริการอาหารคุณภาพเยี่ยมที่เด็กๆ ชื่นชอบ
              </p>
           </div>
        </section>
      </div>
    </div>
  );
}