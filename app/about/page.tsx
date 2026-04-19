import type { Metadata } from 'next';
import Home from '../page';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
  description:
    'รู้จักประวัติ แนวคิด และมาตรฐานการดูแลความปลอดภัยของค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
  alternates: {
    canonical: 'https://www.suppamascamp.me/about',
  },
  openGraph: {
    title: 'เกี่ยวกับเรา | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
    description:
      'ข้อมูลค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี ทั้งประวัติ วิสัยทัศน์ และความพร้อมด้านความปลอดภัย',
    url: 'https://www.suppamascamp.me/about',
    siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Script
        id="about-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'เกี่ยวกับเรา',
            url: 'https://www.suppamascamp.me/about',
            description: 'รู้จักประวัติ แนวคิด และมาตรฐานการดูแลความปลอดภัยของค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
          }),
        }}
      />
      <Home />
    </>
  );
}
