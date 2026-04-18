import React from 'react';
import { db } from '../../../src/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Calendar, Facebook, Twitter, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

// 🌟 1. ฟังก์ชันสร้าง Metadata (เพิ่ม try-catch ป้องกันบอท LINE เอ๋อเวลาดึงข้อมูลไม่ทัน)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = decodeURIComponent(resolvedParams.id);
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { title: 'ไม่พบข่าวสาร | ค่ายอนุสรณ์ศุภมาศ ราชบุรี' };

    const newsData = docSnap.data();
    const currentUrl = `https://www.suppamascamp.me/news/${resolvedParams.id}`;
    
    // ตั้งค่ารูปหน้าปก (ถ้าไม่ได้อัปรูป ให้ใช้รูป og-image.jpg เป็นค่าเริ่มต้น)
    const coverImage = newsData.img || 'https://www.suppamascamp.me/og-image.jpg';
    
    // 🌟 ดึง Alt Text (ถ้ามี) หากไม่มีให้ใช้ชื่อข่าวแทน
    const imageAltText = newsData.altText || newsData.title;

    return {
      title: `${newsData.title} | ค่ายอนุสรณ์ศุภมาศ ราชบุรี`,
      description: newsData.excerpt,
      openGraph: {
        title: newsData.title,
        description: newsData.excerpt,
        url: currentUrl,
        siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
        images: [{ 
          url: coverImage, 
          width: 1200, 
          height: 630,
          alt: imageAltText // 🌟 เพิ่ม Alt Text เข้าไปใน OpenGraph
        }],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: newsData.title,
        description: newsData.excerpt,
        images: [coverImage],
      }
    };
  } catch (error) {
    return { title: 'ข่าวสารและกิจกรรม | ค่ายอนุสรณ์ศุภมาศ ราชบุรี' };
  }
}

// 🌟 2. หน้าแสดงผลหลัก (เป็น Server Component โหลดไวสุดๆ และ SEO ดีเยี่ยม)
export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = decodeURIComponent(resolvedParams.id);
  
  let newsData: any = null;
  let docId = '';

  // 🌟 เพิ่ม try-catch ให้หน้าเว็บปลอดภัย 100% ไม่พังแน่นอน
  try {
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      newsData = docSnap.data();
      docId = docSnap.id;
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  // หากดึงข้อมูลมาไม่เจอ (หรือ URL ผิด)
  if (!newsData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 pt-20">
        <h2 className="text-2xl font-black text-slate-800">ไม่พบข่าวสารที่คุณต้องการค้นหา</h2>
        <Link href="/news" className="text-orange-500 font-bold mt-4 border-b-2 border-orange-500 pb-1 hover:text-orange-600 transition-colors">
          กลับสู่หน้ารวมข่าวสาร
        </Link>
      </div>
    );
  }

  const encodedId = encodeURIComponent(id);
  const currentUrl = `https://www.suppamascamp.me/news/${encodedId}`;
  
  // 🌟 แก้ไขระบบวันที่: แปลง Firebase Timestamp เป็นวันที่ภาษาไทยอย่างปลอดภัย
  let dateString = 'อัปเดตล่าสุด';
  if (newsData.createdAt) {
    if (newsData.createdAt.seconds) {
      dateString = new Date(newsData.createdAt.seconds * 1000).toLocaleDateString('th-TH');
    } else if (newsData.createdAt.toDate) {
      dateString = newsData.createdAt.toDate().toLocaleDateString('th-TH');
    }
  }

  // ลิงก์สำหรับแชร์โซเชียล (อัปเดตระบบ LINE ให้แชร์ง่ายขึ้น)
  const fbShare = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  const xShare = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(newsData.title)}`;
  const lineShare = `https://social-plugins.line.me/lineit/share?url=${currentUrl}`;

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        
        <Link href="/news" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold mb-8 transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-100 shadow-sm">
          <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
        </Link>

        <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest mb-6">
          <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full shadow-md">
            {newsData.category || 'ข่าวสาร'}
          </span>
          <span className="text-slate-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {dateString}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-green-950 leading-tight mb-8 tracking-tighter">
          {newsData.title}
        </h1>

        <div className="w-full h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl border border-slate-100 group relative">
          <img 
            src={newsData.img || 'https://via.placeholder.com/800x600'} 
            alt={newsData.altText || newsData.title} // 🌟 นำ Alt Text จาก Firebase มาแสดง (ถ้าไม่มีจะใช้ชื่อเรื่องแทน)
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        </div>

        {/* 🌟 ปุ่มแชร์โซเชียล (Facebook, X, LINE) */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-10 border-b border-slate-100">
           <span className="font-black text-slate-400 uppercase tracking-widest text-xs w-full md:w-auto mb-2 md:mb-0">แชร์บทความ:</span>
           
           {/* Facebook */}
           <a href={fbShare} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#1877F2]/90 rounded-2xl text-white transition-all shadow-lg shadow-blue-500/20 active:scale-95">
             <Facebook className="w-4 h-4" /> <span className="text-sm font-bold">Facebook</span>
           </a>
           
           {/* X (Twitter) */}
           <a href={xShare} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-slate-800 rounded-2xl text-white transition-all shadow-lg active:scale-95">
             <span className="font-black text-sm">𝕏</span> <span className="text-sm font-bold">Post</span>
           </a>
           
           {/* LINE */}
           <a href={lineShare} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#00B900] hover:bg-[#00B900]/90 rounded-2xl text-white transition-all shadow-lg shadow-green-500/20 active:scale-95">
             <MessageCircle className="w-4 h-4" /> <span className="text-sm font-bold">LINE</span>
           </a>
        </div>

        {/* แสดงเนื้อหาข่าวแบบ Rich Text HTML */}
        <div 
          className="prose prose-lg prose-orange max-w-none 
          prose-headings:font-black prose-headings:text-green-950 prose-headings:tracking-tight
          prose-h2:text-3xl prose-h3:text-2xl
          prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8 
          prose-a:text-orange-500 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl prose-img:shadow-lg
          prose-strong:text-slate-800 prose-strong:font-black"
          dangerouslySetInnerHTML={{ __html: newsData.content || `<p>${newsData.excerpt}</p>` }}
        />

        {/* Footer บทความ */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-950 rounded-full flex items-center justify-center text-white font-black">SC</div>
              <div>
                 <p className="font-black text-slate-800">ทีมงานสื่อสารองค์กร</p>
                 <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี</p>
              </div>
           </div>
           <Link href="/news" className="bg-orange-500 text-white px-8 py-4 rounded-full font-black shadow-xl hover:bg-orange-600 transition-all active:scale-95">
             อ่านข่าวอื่นๆ ต่อ
           </Link>
        </div>

      </div>
    </div>
  );
}