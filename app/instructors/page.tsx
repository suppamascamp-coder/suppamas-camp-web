import type { Metadata } from 'next';
import InstructorsClient from '../../src/components/InstructorsClient';
import { getInstructors, type Instructor } from '../../src/lib/server/instructors';

// แคชหน้านี้ไว้ 1 นาที: ผู้เยี่ยมชมได้หน้าพร้อมข้อมูลทันที และแอดมินแก้ข้อมูลแล้วเห็นผลภายในประมาณ 1 นาที
export const revalidate = 60;

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

export default async function InstructorsPage() {
  let instructors: Instructor[] = [];

  try {
    instructors = await getInstructors();
  } catch (error) {
    console.error('Error fetching instructors:', error);
  }

  return <InstructorsClient instructors={instructors} />;
}
