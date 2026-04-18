import './globals.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export const metadata = {
  // ข้อมูลพื้นฐานสำหรับ Google Search
title: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี | ศูนย์ฝึกอบรมและค่ายพักแรมมาตรฐาน',
  description: 'สถานที่จัดกิจกรรมอยู่ค่ายพักแรมลูกเสือ,เนตรนารี,ยุวกาชาด ที่ครบวงจรที่สุดในจังหวัดราชบุรี ตั้งอยู่ขอบเขตระหว่างจังหวัดราชบุรีและกาญจนบุรี ในราคามิตรภาพ พร้อมวิทยากรลูกเสือมืออาชีพของแทร่ กินอิ่ม นอนหลับ พักสบาย คลายอารมณ์ เสพสมชาวค่าย ',
  keywords: 'ค่ายลูกเสือ, ค่ายลูกเสือราชบุรี, ค่ายลูกเสืออนุสรณ์ศุภมาศ, เข้าค่ายพักแรม, ค่ายลูกเสือใกล้กรุงเทพ, ศูนย์ฝึกอบรมเยาวชน,ค่ายลูกเสือใกล้ฉัน',
  
  // 🌟 เพิ่มส่วน Open Graph สำหรับการแชร์ลง Facebook, LINE, Twitter 🌟
  openGraph: {
    title: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
    description: 'ศูนย์ฝึกอบรมเยาวชนและค่ายลูกเสือมาตรฐาน ที่หนึ่งในใจของคุณครูและนักเรียนทั่วประเทศ',
    url: 'https://www.suppamascamp.me',
    siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
    images: [
      {
        // 📌 ชื่อไฟล์รูปภาพที่คุณครูต้องนำไปใส่ในโฟลเดอร์ public
        url: 'https://www.suppamascamp.me/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // สร้าง JSON-LD สำหรับ Local Business
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี",
    "url": "https://www.suppamascamp.me",
    "logo": "https://www.suppamascamp.me/favicon.ico",
    "sameAs": [
      "https://www.facebook.com/camp.suppamas",
      "https://www.tiktok.com/@a.s.camp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-86-551-5110",
      "contactType": "customer service",
      "areaServed": "TH",
      "availableLanguage": "Thai"
    }
  };

  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased text-gray-800 bg-gray-50">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}