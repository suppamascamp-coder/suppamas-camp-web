"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Tent, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 📌 แก้ไข: เติม "/" นำหน้า "#" เพื่อให้ทุกลิงก์กระโดดกลับไปอ้างอิงจากหน้าแรกเสมอ
  const menuItems = [
    { name: 'หน้าแรก', href: '/#home' },
    { name: 'รู้จักกับเรา', href: '/#about' },
    { name: 'บุคลากร', href: '/#staff' },
    { name: 'กิจกรรม', href: '/#activities' },
    { name: 'สิ่งอำนวยความสะดวก', href: '/#facilities' },
    { name: 'แพ็กเกจ', href: '/#packages' },
    { name: 'ภาพบรรยากาศ', href: '/#gallery' },
    { name: 'ติดต่อเรา', href: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/#home" className="flex items-center gap-2 cursor-pointer">
            <Tent className={`w-8 h-8 ${isScrolled ? 'text-green-800' : 'text-orange-500'}`} />
            <span className={`font-bold text-lg md:text-xl tracking-tight ${isScrolled ? 'text-green-900' : 'text-white'}`}>อนุสรณ์ศุภมาศ</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden xl:flex space-x-5">
            {menuItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`font-medium text-[13px] uppercase tracking-wide transition-colors hover:text-orange-500 ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
             <Link href="/#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md flex items-center gap-2 text-sm">
               จองค่าย <ChevronRight className="w-4 h-4" />
             </Link>
          </div>

          <div className="xl:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isScrolled ? 'text-gray-800' : 'text-white'}>
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 space-y-4 border-t border-gray-100 max-h-screen overflow-y-auto">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-800 font-medium w-full text-center py-2 hover:text-orange-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold w-10/12 mt-4 text-center">
            จองค่ายทันที
          </Link>
        </div>
      )}
    </header>
  );
}