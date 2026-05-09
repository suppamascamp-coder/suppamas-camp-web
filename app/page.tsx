import { Metadata } from 'next';
import { db } from '../src/lib/firebase';
import { collection, getDocs, getDoc, doc, query, orderBy, limit } from 'firebase/firestore';
import HomePageClient from '../src/components/HomePageClient';

// กำหนดให้หน้าเพจ Revalidate ข้อมูลทุกๆ 60 วินาที เพื่อให้เว็บโหลดเร็วและข้อมูลอัปเดต (ISR)
export const revalidate = 60;

// 1. สร้าง Dynamic SEO Metadata จาก Firebase Data
export async function generateMetadata(): Promise<Metadata> {
  let homepageData = null;
  try {
    const docRef = doc(db, "settings", "homepage");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      homepageData = docSnap.data();
    }
  } catch (error) {
    console.error("Error fetching homepage data for metadata:", error);
  }

  const title = homepageData?.texts?.title || "ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี";
  const description = homepageData?.texts?.subtitle || "ศูนย์ฝึกอบรมเยาวชนและค่ายลูกเสือมาตรฐาน พร้อมกิจกรรมเข้าค่ายครบวงจร";
  const images = homepageData?.slides?.[0]?.url 
    ? [{ url: homepageData.slides[0].url, width: 1200, height: 630 }] 
    : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: 'website',
      locale: 'th_TH',
      url: 'https://www.suppamascamp.me/',
    },
  };
}

export default async function Home() {
  // 2. Fetch Data สำหรับแสดงผลในหน้าแรก (Server-Side)
  let homepageData = null;
  try {
    const docRef = doc(db, "settings", "homepage");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      homepageData = docSnap.data();
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  let initialGalleryImages: any[] = [];
  try {
    const qGallery = query(collection(db, "gallery"), orderBy("createdAt", "desc"), limit(8));
    const querySnapshot = await getDocs(qGallery);
    querySnapshot.forEach((docSnap) => {
      initialGalleryImages.push({ id: docSnap.id, ...docSnap.data() });
    });
  } catch (error) {
    console.error("Error fetching gallery images:", error);
  }

  // 🌟 Schema Markup สำหรับ SEO Local Business 🌟
  const displaySlides = homepageData?.slides ? homepageData.slides.map((s: any) => s.url) : [];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี",
    "alternateName": "ค่ายอนุสรณ์ศุภมาศ",
    "description": "ศูนย์ฝึกอบรมเยาวชนและค่ายลูกเสือที่ได้มาตรฐานที่สุดในจังหวัดราชบุรี กิจกรรมผจญภัยครบครัน ปลอดภัย 100%",
    "url": "https://www.suppamascamp.me", 
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
      "latitude": "13.758768997131973", 
      "longitude": "99.57713877516328"  
    },
    "image": displaySlides.length > 0 ? displaySlides[0] : "",
    "priceRange": "$$"
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "หน้าแรกค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี",
    "url": "https://www.suppamascamp.me/",
    "description": "ศูนย์ฝึกอบรมเยาวชนและค่ายลูกเสือมาตรฐาน พร้อมกิจกรรมเข้าค่ายครบวงจร",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient 
        initialHomepageData={homepageData} 
        initialGalleryImages={initialGalleryImages} 
      />
    </>
  );
}