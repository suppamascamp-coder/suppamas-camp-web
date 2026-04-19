import type { Metadata } from 'next';
import Home from '../page';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'โปรแกรมและราคา | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
  description:
    'ดูแพ็กเกจเข้าค่าย One Day, 2 วัน 1 คืน และ 3 วัน 2 คืน พร้อมรายละเอียดกิจกรรมและค่าบริการ',
  alternates: {
    canonical: 'https://www.suppamascamp.me/packages',
  },
  openGraph: {
    title: 'โปรแกรมและราคา | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
    description:
      'สรุปแพ็กเกจและค่าบริการเข้าค่ายลูกเสือแบบครบถ้วน เหมาะสำหรับโรงเรียนและคณะครู',
    url: 'https://www.suppamascamp.me/packages',
    siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
    type: 'website',
  },
};

export default function PackagesPage() {
  return (
    <>
      <Script
        id="packages-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'โปรแกรมและราคา',
            url: 'https://www.suppamascamp.me/packages',
            description: 'ดูแพ็กเกจเข้าค่าย One Day, 2 วัน 1 คืน และ 3 วัน 2 คืน พร้อมรายละเอียดกิจกรรมและค่าบริการ',
          }),
        }}
      />
      <Home />
    </>
  );
}
