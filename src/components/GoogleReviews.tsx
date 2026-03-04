import React from 'react';
import Script from 'next/script'; // นำเข้าเครื่องมือจัดการ Script ของ Next.js

export default function GoogleReviews() {
  return (
    <section className="py-24 bg-green-950 text-white text-center relative overflow-hidden">
      {/* วงกลมตกแต่งฉากหลังให้ดูมีมิติ */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-800 rounded-full blur-3xl opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">เสียงตอบรับจากผู้ใช้งานจริง</h2>
        <p className="text-green-200 mb-12 text-lg">
          ความประทับใจจากคณะครูและนักเรียนที่เคยมาเปิดประสบการณ์กับเรา
        </p>
        
        {/* โหลด Script ของ Elfsight อย่างปลอดภัยด้วย next/script */}
        <Script 
          src="https://elfsightcdn.com/platform.js" 
          strategy="lazyOnload" 
        />
        
        {/* กล่องแสดงผลรีวิว (เปลี่ยน class เป็น className แล้ว) */}
        <div 
          className="elfsight-app-0ff7c74a-14a4-482a-8965-faecdc34a7bf" 
          data-elfsight-app-lazy
        ></div>
        
      </div>
    </section>
  );
}