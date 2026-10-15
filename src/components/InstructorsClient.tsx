"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { UserCheck, Loader2, Award, ArrowLeft, X, GraduationCap } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

type Cert = { url: string; title?: string };
type Instructor = {
  id: string;
  name: string;
  pos?: string;
  group?: string;
  img?: string;
  certs?: Cert[];
};

export default function InstructorsClient() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<Instructor | null>(null);
  const [zoomed, setZoomed] = useState<Cert | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'instructors'));
        if (snap.exists()) setInstructors(snap.data().instructors || []);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // ปิดหน้าต่างด้วยปุ่ม Esc (ปิดภาพขยายก่อน แล้วค่อยปิดหน้าต่างวุฒิบัตร) และล็อกการเลื่อนหน้าเบื้องหลัง
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (zoomed) setZoomed(null);
      else setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected, zoomed]);

  const sections = useMemo(() => {
    const map = new Map<string, Instructor[]>();
    for (const p of instructors) {
      const key = (p.group || '').trim();
      map.set(key, [...(map.get(key) || []), p]);
    }
    const hasNamedGroup = [...map.keys()].some((k) => k !== '');
    return [...map.entries()].map(([key, list]) => ({
      title: key || (hasNamedGroup ? 'วิทยากร' : ''),
      list,
    }));
  }, [instructors]);

  const closeAll = () => { setZoomed(null); setSelected(null); };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm animate-pulse">Loading Instructors...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 pb-24">
      {/* 1. Hero */}
      <section className="relative pt-32 pb-24 bg-green-950 overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800 rounded-full blur-[120px] opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="w-20 h-20 bg-orange-500 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl rotate-3">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-orange-400 border border-white/20 text-xs font-bold mb-4 backdrop-blur-md uppercase tracking-[0.2em]">
            Certified Instructors
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight italic">
            ทำเนียบวิทยากร <br /> <span className="text-orange-500 underline decoration-white/20 underline-offset-8">และวุฒิการอบรม</span>
          </h1>
          <p className="text-green-100/80 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            วิทยากรทุกท่านผ่านการอบรมตามหลักสูตร คลิกที่รายชื่อเพื่อตรวจสอบวุฒิการอบรมได้ด้วยตนเอง
          </p>
        </div>
      </section>

      {/* 2. รายชื่อวิทยากร */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 space-y-14">
        {instructors.length === 0 && (
          <div className="bg-white rounded-[2.5rem] shadow-xl p-12 text-center text-slate-500 font-bold">
            กำลังจัดเตรียมข้อมูลวิทยากร
          </div>
        )}

        {sections.map((section) => (
          <div key={section.title || 'all'}>
            {section.title && (
              <h2 className="text-2xl font-black text-green-950 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-7 bg-orange-500 rounded-full"></span> {section.title}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {section.list.map((person) => {
                const certCount = person.certs?.length || 0;
                return (
                  <button
                    key={person.id}
                    type="button"
                    onClick={() => setSelected(person)}
                    className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white hover:border-orange-500 transition-all duration-300 group relative overflow-hidden flex flex-col items-center text-left focus-visible:outline-2 focus-visible:outline-orange-500"
                  >
                    <div className="w-28 h-28 bg-green-50 rounded-[2rem] mb-6 flex items-center justify-center text-green-700 border border-green-100 overflow-hidden shadow-inner shrink-0">
                      {person.img ? (
                        <img src={person.img} alt={person.name} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <UserCheck className="w-12 h-12" />
                      )}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-slate-800 mb-2 text-center leading-tight min-h-14 flex items-center justify-center w-full">{person.name}</h3>
                    {person.pos && (
                      <p className="text-orange-600 text-xs font-black tracking-[0.1em] text-center bg-orange-50 px-4 py-2 rounded-xl w-full border border-orange-100 mb-4">
                        {person.pos}
                      </p>
                    )}
                    <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${certCount ? 'text-green-700 group-hover:text-orange-600' : 'text-slate-400'}`}>
                      <Award className="w-4 h-4" /> {certCount ? `วุฒิการอบรม ${certCount} ใบ` : 'ยังไม่มีวุฒิบัตร'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center pt-6">
          <Link href="/#home" className="inline-flex items-center gap-3 text-slate-500 hover:text-orange-500 font-bold text-sm bg-white px-8 py-4 rounded-full shadow-sm hover:shadow-xl transition-all border border-slate-200 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> กลับสู่หน้าหลัก
          </Link>
        </div>
      </section>

      {/* 3. หน้าต่างแสดงวุฒิบัตร */}
      {selected && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true" aria-label={`วุฒิการอบรมของ ${selected.name}`}>
          <div className="absolute inset-0 bg-green-950/70 backdrop-blur-sm" onClick={closeAll}></div>
          <div className="relative bg-white w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl p-6 md:p-10">
            <button onClick={closeAll} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-orange-500 hover:text-white rounded-full transition-colors" aria-label="ปิด">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-5 mb-8 pr-10">
              <div className="w-20 h-20 rounded-2xl bg-green-50 border border-green-100 overflow-hidden flex items-center justify-center shrink-0">
                {selected.img ? <img src={selected.img} alt="" className="w-full h-full object-cover" /> : <UserCheck className="w-9 h-9 text-green-700" />}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-green-950 leading-tight">{selected.name}</h3>
                {selected.pos && <p className="text-orange-600 font-bold text-sm mt-1">{selected.pos}</p>}
              </div>
            </div>

            {selected.certs && selected.certs.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selected.certs.map((cert, i) => (
                  <button key={cert.url} type="button" onClick={() => setZoomed(cert)} className="text-left group/cert">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group-hover/cert:border-orange-500 transition-colors">
                      <img src={cert.url} alt={cert.title || `วุฒิบัตรใบที่ ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    {cert.title && <p className="mt-2 text-sm font-bold text-slate-700 leading-snug">{cert.title}</p>}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-400 font-bold py-10">ยังไม่มีวุฒิบัตรแสดงในขณะนี้</p>
            )}
          </div>
        </div>
      )}

      {/* 4. ภาพวุฒิบัตรขยายเต็มจอ */}
      {zoomed && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setZoomed(null)}>
          <button className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-orange-500 text-white rounded-full transition-colors" aria-label="ปิดภาพขยาย">
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-full max-h-full flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <img src={zoomed.url} alt={zoomed.title || 'วุฒิบัตร'} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
            {zoomed.title && <p className="text-white font-bold text-center">{zoomed.title}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
