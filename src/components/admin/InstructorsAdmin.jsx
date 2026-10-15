"use client";
import React, { useState, useEffect } from 'react';
import { Loader2, Save, Plus, Trash2, UserCheck, Upload, Award, AlertCircle, X } from 'lucide-react';
import { db, storage } from '../../lib/firebase';
import { compressImage } from '../../lib/compressImage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const newId = () => `i_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

export default function InstructorsAdmin() {
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'instructors'));
        if (snap.exists()) setInstructors(snap.data().instructors || []);
      } catch (error) {
        console.error('Error loading instructors:', error);
        alert('โหลดข้อมูลวิทยากรไม่สำเร็จ');
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const updateOne = (id, patch) =>
    setInstructors((list) => list.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const addInstructor = () =>
    setInstructors((list) => [...list, { id: newId(), name: '', pos: '', group: '', img: '', certs: [] }]);

  const deleteInstructor = (id) => {
    if (window.confirm('ลบวิทยากรท่านนี้พร้อมวุฒิการอบรมทั้งหมด?')) {
      setInstructors((list) => list.filter((p) => p.id !== id));
    }
  };

  const uploadImage = async (file, path, maxWidth, quality) => {
    const compressed = await compressImage(file, maxWidth, quality);
    const task = await uploadBytesResumable(ref(storage, path), compressed);
    return getDownloadURL(task.ref);
  };

  const handlePhoto = async (person, file) => {
    if (!file) return;
    setUploadingKey(person.id);
    try {
      const url = await uploadImage(file, `staff/instructor_${person.id}_${Date.now()}.jpg`, 600, 0.8);
      updateOne(person.id, { img: url });
    } catch {
      alert('อัปโหลดรูปวิทยากรไม่สำเร็จ');
    } finally {
      setUploadingKey(null);
    }
  };

  const handleCerts = async (person, files) => {
    // คัดลอกก่อน เพราะ input ถูกล้างค่าทันทีหลังเลือกไฟล์ ซึ่งจะทำให้ FileList ว่าง
    const fileList = Array.from(files || []);
    if (fileList.length === 0) return;
    setUploadingKey(`${person.id}_certs`);
    try {
      const uploaded = [];
      for (const file of fileList) {
        // ขนาดใหญ่และคุณภาพสูงกว่ารูปทั่วไป เพื่อให้ยังอ่านตัวหนังสือบนวุฒิบัตรได้
        const url = await uploadImage(file, `staff/certs/${person.id}_${Date.now()}_${uploaded.length}.jpg`, 1600, 0.85);
        uploaded.push({ url, title: '' });
      }
      setInstructors((list) =>
        list.map((p) => (p.id === person.id ? { ...p, certs: [...(p.certs || []), ...uploaded] } : p))
      );
    } catch {
      alert('อัปโหลดวุฒิบัตรไม่สำเร็จ (อัปโหลดสำเร็จบางใบอาจยังไม่ถูกเพิ่ม กรุณาลองใหม่)');
    } finally {
      setUploadingKey(null);
    }
  };

  const updateCertTitle = (personId, certIdx, title) =>
    setInstructors((list) =>
      list.map((p) =>
        p.id === personId ? { ...p, certs: p.certs.map((c, i) => (i === certIdx ? { ...c, title } : c)) } : p
      )
    );

  const removeCert = (personId, certIdx) => {
    if (!window.confirm('ลบวุฒิบัตรใบนี้?')) return;
    setInstructors((list) =>
      list.map((p) => (p.id === personId ? { ...p, certs: p.certs.filter((_, i) => i !== certIdx) } : p))
    );
  };

  const handleSave = async () => {
    if (instructors.some((p) => !p.name.trim())) {
      alert('กรุณากรอกชื่อวิทยากรให้ครบทุกท่าน');
      return;
    }
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'instructors'), { instructors }, { merge: true });
      alert('บันทึกข้อมูลวิทยากรเรียบร้อย');
    } catch (error) {
      console.error(error);
      alert('บันทึกไม่สำเร็จ');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500 w-12 h-12" /></div>;

  const busy = isSaving || uploadingKey !== null;

  return (
    <div className="space-y-10 animate-in fade-in pb-24">
      <div className="flex justify-between items-end gap-4 flex-wrap">
        <h2 className="text-3xl font-black italic underline decoration-orange-500 decoration-4">จัดการวิทยากร</h2>
        <button onClick={handleSave} disabled={busy} className="bg-green-950 text-white px-8 py-3 rounded-2xl font-black shadow-xl hover:bg-orange-500 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50">
          {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />} บันทึกข้อมูล
        </button>
      </div>

      <div className="flex gap-3 items-start bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-sm font-medium">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>วุฒิบัตรที่อัปโหลดจะแสดงให้ทุกคนเห็นบนเว็บไซต์ กรุณาปิดบังเลขบัตรประชาชน วันเดือนปีเกิด และข้อมูลส่วนตัวอื่น ๆ ก่อนอัปโหลด</p>
      </div>

      {instructors.length === 0 && (
        <p className="text-center text-slate-400 font-bold py-10">ยังไม่มีวิทยากร กดปุ่ม &quot;เพิ่มวิทยากร&quot; เพื่อเริ่มต้น</p>
      )}

      <div className="space-y-8">
        {instructors.map((person, idx) => (
          <div key={person.id} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <label className="relative w-28 h-28 shrink-0 rounded-[1.5rem] bg-green-50 border-2 border-dashed border-green-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-orange-500 transition-colors self-center md:self-start">
                {person.img ? (
                  <img src={person.img} alt={person.name || 'วิทยากร'} className="w-full h-full object-cover" />
                ) : (
                  <UserCheck className="w-10 h-10 text-green-300" />
                )}
                {uploadingKey === person.id && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center"><Loader2 className="animate-spin text-orange-500" /></div>
                )}
                <input type="file" accept="image/*" className="hidden" disabled={busy} onChange={(e) => { handlePhoto(person, e.target.files[0]); e.target.value = ''; }} />
              </label>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">ชื่อ-นามสกุล</label>
                  <input value={person.name} onChange={(e) => updateOne(person.id, { name: e.target.value })} placeholder="เช่น ครูสมชาย ใจดี" className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">ตำแหน่ง</label>
                  <input value={person.pos} onChange={(e) => updateOne(person.id, { pos: e.target.value })} placeholder="เช่น หัวหน้าวิทยากร" className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-orange-500" />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider">หมวด (ไม่บังคับ)</label>
                  <input value={person.group || ''} onChange={(e) => updateOne(person.id, { group: e.target.value })} placeholder="เช่น วิทยากรกระบวนการ" className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-orange-500" />
                </div>
              </div>

              <button onClick={() => deleteInstructor(person.id)} className="self-center md:self-start p-3 text-rose-400 hover:bg-rose-50 rounded-xl transition-colors" aria-label={`ลบ ${person.name || `วิทยากรคนที่ ${idx + 1}`}`}>
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
                <h4 className="font-black text-green-950 flex items-center gap-2"><Award className="w-5 h-5 text-orange-500" /> วุฒิการอบรม ({(person.certs || []).length} ใบ)</h4>
                <label className={`inline-flex items-center gap-2 bg-orange-50 text-orange-600 border border-orange-100 px-4 py-2 rounded-xl text-sm font-black cursor-pointer hover:bg-orange-500 hover:text-white transition-colors ${busy ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploadingKey === `${person.id}_certs` ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4" />} เพิ่มวุฒิบัตร (เลือกได้หลายไฟล์)
                  <input type="file" accept="image/*" multiple className="hidden" disabled={busy} onChange={(e) => { handleCerts(person, e.target.files); e.target.value = ''; }} />
                </label>
              </div>

              {(person.certs || []).length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {person.certs.map((cert, ci) => (
                    <div key={cert.url} className="space-y-2">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <img src={cert.url} alt={cert.title || 'วุฒิบัตร'} className="w-full h-full object-cover" />
                        <button onClick={() => removeCert(person.id, ci)} className="absolute top-1.5 right-1.5 bg-white/90 text-rose-500 rounded-full p-1 shadow hover:bg-rose-500 hover:text-white transition-colors" aria-label="ลบวุฒิบัตร"><X className="w-4 h-4" /></button>
                      </div>
                      <input value={cert.title || ''} onChange={(e) => updateCertTitle(person.id, ci, e.target.value)} placeholder="ชื่อหลักสูตร" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:border-orange-500" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button onClick={addInstructor} disabled={busy} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-[2rem] text-slate-500 font-black hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
        <Plus className="w-5 h-5" /> เพิ่มวิทยากร
      </button>
    </div>
  );
}
