import type { Metadata } from 'next';
import Home from '../page';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'กิจกรรมเข้าค่าย | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
  description:
    'รายละเอียดกิจกรรมลูกเสือและกิจกรรมผจญภัยที่ออกแบบตามช่วงวัย พร้อมทีมวิทยากรมืออาชีพ',
  alternates: {
    canonical: 'https://www.suppamascamp.me/activities',
  },
  openGraph: {
    title: 'กิจกรรมเข้าค่าย | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
    description:
      'รวมกิจกรรมไฮไลต์ของค่ายลูกเสืออนุสรณ์ศุภมาศ ทั้งบุกเบิก เดินทางไกล และฐานผจญภัย',
    url: 'https://www.suppamascamp.me/activities',
    siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
    type: 'website',
  },
};

export default function ActivitiesPage() {
  return (
    <>
      <Script
        id="activities-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'กิจกรรมเข้าค่าย',
            url: 'https://www.suppamascamp.me/activities',
            description: 'รายละเอียดกิจกรรมลูกเสือและกิจกรรมผจญภัยที่ออกแบบตามช่วงวัย พร้อมทีมวิทยากรมืออาชีพ',
          }),
        }}
      />
      <Home />
    </>
  );
}
