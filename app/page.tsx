import React from 'react';

export default function Home() {
  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=2000" alt="บรรยากาศค่ายลูกเสือ" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-green-950/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-semibold mb-6 backdrop-blur-sm">
            เปิดรับจองรอบปีการศึกษา {new Date().getFullYear()} แล้ว
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
            สร้างผู้นำ เรียนรู้วิถีธรรมชาติ <br/><span className="text-orange-400">ณ ค่ายศุภมาศ ราชบุรี</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow-md max-w-2xl mx-auto">
            มาตรฐานความปลอดภัยสูงสุด ฐานกิจกรรมระดับสากล ท่ามกลางบรรยากาศธรรมชาติที่สมบูรณ์แบบ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1 shadow-xl">ดูโปรแกรมค่าย</button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform transform hover:-translate-y-1">ชมวิดีโอบรรยากาศ</button>
          </div>
        </div>
      </section>
      <section className="py-20 text-center bg-gray-50 h-[800px]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">เนื้อหาส่วนอื่นๆ จะมาใส่ตรงนี้ครับ</h2>
        <p className="text-gray-500">ลองเลื่อนหน้าจอ (Scroll) ดูการทำงานของเมนูด้านบนได้เลยครับ</p>
      </section>
    </>
  );
}