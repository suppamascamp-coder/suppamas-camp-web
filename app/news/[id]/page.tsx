import React from 'react';
import { db } from '../../../src/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowLeft, Calendar, Eye } from 'lucide-react'; // 🌟 เพิ่ม Eye
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import ShareButtons from '../../../src/components/ShareButtons';
import IncrementView from '../../../src/components/IncrementView'; // 🌟 นำเข้า IncrementView

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const id = decodeURIComponent(resolvedParams.id);
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return { title: 'ไม่พบข่าวสาร | ค่ายอนุสรณ์ศุภมาศ ราชบุรี' };

    const newsData = docSnap.data();
    const currentUrl = `https://www.suppamascamp.me/news/${resolvedParams.id}`;
    const coverImage = newsData.img || 'https://www.suppamascamp.me/og-image.jpg';
    const imageAltText = newsData.altText || newsData.title;

    return {
      title: `${newsData.title} | ค่ายอนุสรณ์ศุภมาศ ราชบุรี`,
      description: newsData.excerpt || 'ข่าวสารกิจกรรมจากค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
      alternates: {
        canonical: currentUrl,
      },
      openGraph: {
        title: newsData.title,
        description: newsData.excerpt || 'ข่าวสารกิจกรรมจากค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
        url: currentUrl,
        siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
        images: [{ url: coverImage, width: 1200, height: 630, alt: imageAltText }],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: newsData.title,
        description: newsData.excerpt,
        images: [coverImage],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return { title: 'ข่าวสารและกิจกรรม | ค่ายอนุสรณ์ศุภมาศ ราชบุรี' };
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = decodeURIComponent(resolvedParams.id);

  let newsData: any = null;

  try {
    const docRef = doc(db, "news", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      newsData = docSnap.data();
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }

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

  let dateString = 'อัปเดตล่าสุด';
  if (newsData.createdAt) {
    if (newsData.createdAt.seconds) {
      dateString = new Date(newsData.createdAt.seconds * 1000).toLocaleDateString('th-TH', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } else if (newsData.createdAt.toDate) {
      dateString = newsData.createdAt.toDate().toLocaleDateString('th-TH', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    }
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen font-sans text-slate-800">
      <div className="max-w-4xl mx-auto px-4">

        {/* 🌟 เรียกใช้ระบบนับยอดวิวตรงนี้ */}
        <IncrementView id={id} />

        <Link href="/news" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold mb-8 transition-colors bg-slate-50 px-4 py-2 rounded-full border border-slate-100 shadow-sm">
          <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-sm font-black uppercase tracking-widest mb-6">
          <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full shadow-md">
            {newsData.category || 'ข่าวสาร'}
          </span>
          <span className="text-slate-400 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {dateString}
          </span>
          {/* 🌟 แสดงยอดเข้าชมตรงนี้ */}
          <span className="text-slate-400 flex items-center gap-2">
            <Eye className="w-4 h-4" /> {newsData.views || 0} ครั้ง
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-green-950 leading-tight mb-8 tracking-tighter">
          {newsData.title}
        </h1>

        <div className="w-full h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl border border-slate-100 group relative">
          <Image
            src={newsData.img || 'https://via.placeholder.com/800x600'}
            alt={newsData.altText || newsData.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <ShareButtons currentUrl={currentUrl} title={newsData.title} />

        <div
          className="prose prose-lg prose-orange max-w-none 
          prose-headings:font-black prose-headings:text-green-950 prose-headings:tracking-tight
          prose-h2:text-3xl prose-h3:text-2xl
          prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8 
          prose-a:text-orange-500 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-3xl prose-img:shadow-lg prose-img:w-full prose-img:my-8
          prose-strong:text-slate-800 prose-strong:font-black"
          dangerouslySetInnerHTML={{ __html: newsData.content || `<p>${newsData.excerpt}</p>` }}
        />

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