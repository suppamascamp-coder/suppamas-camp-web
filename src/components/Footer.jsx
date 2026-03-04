import React from 'react';
import { MapPin, Phone, Tent } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-950 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Tent className="w-8 h-8 text-orange-500" />
            <span className="font-bold text-2xl text-white">ค่ายศุภมาศ</span>
          </div>
          <p className="mb-6 leading-relaxed">ศูนย์ฝึกอบรมและค่ายลูกเสือที่ได้มาตรฐานที่สุดในจังหวัดราชบุรี มุ่งมั่นสร้างเยาวชนให้มีระเบียบวินัยและทักษะชีวิต ท่ามกลางธรรมชาติที่สมบูรณ์</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">ติดต่อเรา</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3"><MapPin className="w-6 h-6 text-orange-500 flex-shrink-0" /><span>ต.หนองกวาง อ.โพธาราม<br/>จ.ราชบุรี 70120</span></li>
            <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-orange-500 flex-shrink-0" /><span>081-234-5678</span></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">พร้อมพานักเรียนมาเปิดประสบการณ์?</h4>
          <p className="mb-6">ตรวจสอบคิวว่างและจองค่ายล่วงหน้าได้ระบบออนไลน์ตลอด 24 ชม.</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold w-full transition-colors shadow-lg">ระบบตรวจสอบคิวว่าง</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-green-900 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี. All rights reserved.
      </div>
    </footer>
  );
}