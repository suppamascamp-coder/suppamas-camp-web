import type { Metadata } from 'next';
import Home from '../page';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'แกลลอรี่ภาพกิจกรรม | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
  description:
    'ชมภาพบรรยากาศจริงจากกิจกรรมค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี อัปเดตอย่างต่อเนื่อง',
  alternates: {
    canonical: 'https://www.suppamascamp.me/gallery',
  },
  openGraph: {
    title: 'แกลลอรี่ภาพกิจกรรม | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
    description:
      'รวมภาพกิจกรรมจริงจากการเข้าค่ายพักแรมลูกเสือ เนตรนารี และยุวกาชาด',
    url: 'https://www.suppamascamp.me/gallery',
    siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <>
      <Script
        id="gallery-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'แกลลอรี่ภาพกิจกรรม',
            url: 'https://www.suppamascamp.me/gallery',
            description: 'ชมภาพบรรยากาศจริงจากกิจกรรมค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี อัปเดตอย่างต่อเนื่อง',
          }),
        }}
      />
      <Home />
    </>
  );
}
