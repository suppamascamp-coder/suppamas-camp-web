import type { Metadata } from 'next';
import InstructorsClient from '../../src/components/InstructorsClient';

export const metadata: Metadata = {
  title: 'ทำเนียบวิทยากรและวุฒิการอบรม | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
  description:
    'รายชื่อวิทยากรของค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี พร้อมวุฒิการอบรมที่ตรวจสอบได้ เพื่อความมั่นใจด้านคุณภาพและความปลอดภัย',
  alternates: {
    canonical: 'https://www.suppamascamp.me/instructors',
  },
  openGraph: {
    title: 'ทำเนียบวิทยากรและวุฒิการอบรม | ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
    description: 'ตรวจสอบรายชื่อวิทยากรและวุฒิการอบรมของค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
    url: 'https://www.suppamascamp.me/instructors',
    siteName: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ',
    type: 'website',
  },
};

export default function InstructorsPage() {
  return <InstructorsClient />;
}
