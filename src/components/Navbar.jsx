"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Tent, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ข้อมูลเมนูที่เชื่อมโยงกับ ID ในหน้าแรก
  const menuItems = [
    { name: 'กิจกรรม', href: '#activities' },
    { name: 'สถานที่', href: '#location' },
    { name: 'โปรแกรม', href: '#packages' },
    { name: 'ภาพบรรยากาศ', href: '#gallery' },
    { name: 'ติดต่อเรา', href: '#contact' },
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
            <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-green-900' : 'text-white'}`}>ค่ายลูกเสืออนุสรณ์ศุภมาศ</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`font-medium transition-colors hover:text-orange-500 ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold transition-transform transform hover:scale-105 shadow-md flex items-center gap-2">
              จองค่าย <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={isScrolled ? 'text-gray-800' : 'text-white'}>
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 space-y-4 border-t border-gray-100">
          {menuItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="text-gray-800 font-medium w-full text-center py-2 hover:text-orange-500"
            >
              {item.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold w-10/12 mt-4 text-center">
            จองค่ายทันที
          </a>
        </div>
      )}
    </header>
  );
}