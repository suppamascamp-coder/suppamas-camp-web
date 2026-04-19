import './globals.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
// 🌟 1. นำเข้า Script จาก next/script
import Script from 'next/script';

export const metadata = {
  title: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี | ศูนย์ฝึกอบรมและค่ายพักแรมมาตรฐาน',
  description: 'สถานที่จัดกิจกรรมอยู่ค่ายพักแรมลูกเสือ,เนตรนารี,ยุวกาชาด ที่ครบวงจรที่สุดในจังหวัดราชบุรี ตั้งอยู่ขอบเขตระหว่างจังหวัดราชบุรีและกาญจนบุรี ในราคามิตรภาพ พร้อมวิทยากรลูกเสือมืออาชีพของแทร่ กินอิ่ม นอนหลับ พักสบาย คลายอารมณ์ เสพสมชาวค่าย ',
  keywords: 'ค่ายลูกเสือ, ค่ายลูกเสือราชบุรี, ค่ายลูกเสืออนุสรณ์ศุภมาศ, เข้าค่ายพักแรม, ค่ายลูกเสือใกล้กรุงเทพ, ศูนย์ฝึกอบรมเยาวชน,ค่ายลูกเสือใกล้ฉัน',
  openGraph: {
    title: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
    description: 'ศูนย์ฝึกอบรมเยาวชนและค่ายลูกเสือมาตรฐาน ที่หนึ่งในใจของคุณครูและนักเรียนทั่วประเทศ',
    url: 'https://www.suppamascamp.me',
    siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
    images: [
      {
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

        {/* 🌟 2. ติดตั้ง Google Analytics ด้วย next/script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-4S09Y4YD9C`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4S09Y4YD9C', {
                page_path: window.location.pathname,
              });
            `,
          }}
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