"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Home, Tent, Package, CalendarDays, 
  Image as ImageIcon, Settings, Menu, X, Bell, Plus, 
  Trash2, Search, TrendingUp, Users, Upload, Eye, 
  Lock, Mail, ArrowRight, ShieldCheck, Loader2, Map, Edit, Save, Type, Compass, ExternalLink, BedDouble, Utensils, Info, UserCheck, Navigation
} from 'lucide-react';

import { db, storage, auth } from '../../src/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, getDoc, setDoc, deleteDoc, updateDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';

// ============================================================================
// 🗜️ ฟังก์ชันบีบอัดรูปภาพอัจฉริยะ (Image Compression Utility)
// ============================================================================
const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
          const compressedFile = new File([blob], newFileName, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        }, 'image/jpeg', quality);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const [activeTab, setActiveTab] = useState('homepage'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'แดชบอร์ดภาพรวม', icon: LayoutDashboard },
    { id: 'homepage', label: 'จัดการหน้าแรก', icon: Home },
    { id: 'activities', label: 'จัดการกิจกรรม', icon: Tent },
    { id: 'packages', label: 'จัดการแพ็กเกจ', icon: Package },
    { id: 'bookings', label: 'จัดการการจอง', icon: CalendarDays },
    { id: 'gallery', label: 'จัดการแกลลอรี่', icon: ImageIcon },
    { id: 'settings', label: 'ตั้งค่าระบบ', icon: Settings },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      setIsAuthenticated(true);
    } catch (error) {
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง!");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#064e3b] flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-96 bg-[#043d2e] transform -skew-y-6 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]"></div>
        <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-500 border border-slate-100">
          <div className="w-full md:w-5/12 bg-[#064e3b] p-10 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=800')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-12 opacity-80">
                  <Tent className="w-8 h-8 text-orange-500" />
                  <span className="font-bold text-xl tracking-tight">Suppamas<span className="text-orange-500">Camp</span></span>
                </div>
                <h2 className="text-4xl font-black mb-4 leading-tight">Admin<br/>Workspace</h2>
                <p className="text-green-100/70 font-light leading-relaxed">ระบบจัดการเนื้อหาและการจองสำหรับเจ้าหน้าที่ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี</p>
             </div>
             <div className="relative z-10 flex items-center gap-3 text-sm font-medium text-green-200 bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <ShieldCheck className="w-5 h-5 text-orange-400" /> Secure Connection
             </div>
          </div>
          <div className="w-full md:w-7/12 p-8 md:p-12 lg:p-16 bg-white">
             <div className="md:hidden flex items-center gap-2 mb-8">
                <Tent className="w-8 h-8 text-orange-500" />
                <span className="font-bold text-xl tracking-tight text-[#064e3b]">Suppamas<span className="text-orange-500">Camp</span></span>
             </div>
             <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">ยินดีต้อนรับกลับมา</h3>
             <p className="text-slate-500 mb-10 text-sm">กรุณาเข้าสู่ระบบเพื่อจัดการข้อมูลเว็บไซต์ของคุณ</p>
             <form onSubmit={handleLogin} className="space-y-6">
                <div>
                   <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">อีเมล (Email)</label>
                   <div className="relative">
                      <Mail className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input type="email" required placeholder="admin@suppamas.me" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all outline-none text-sm font-medium" value={loginForm.email} onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">รหัสผ่าน (Password)</label>
                   </div>
                   <div className="relative">
                      <Lock className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input type="password" required placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all outline-none text-sm font-medium" value={loginForm.password} onChange={(e) => setLoginForm({...loginForm, password: e.target.value})} />
                   </div>
                </div>
                <button type="submit" disabled={isLoggingIn} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-4">
                  {isLoggingIn ? <><Loader2 className="w-6 h-6 animate-spin" /> กำลังเข้าสู่ระบบ...</> : <>เข้าสู่ระบบ <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                </button>
             </form>
          </div>
        </div>
      </div>
    );
  }

  const Sidebar = () => (
    <div className={`bg-[#064e3b] text-white w-64 flex-shrink-0 h-full flex flex-col transition-transform duration-300 ease-in-out z-20 ${isMobileMenuOpen ? 'translate-x-0 absolute' : '-translate-x-full absolute'} md:relative md:translate-x-0`}>
      <div className="p-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <Tent className="w-8 h-8 text-orange-500" />
          <span className="font-bold text-xl tracking-tight">Admin<span className="text-orange-500">Panel</span></span>
        </div>
        <button className="md:hidden text-gray-300" onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
      </div>
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 ${isActive ? 'bg-orange-500 text-white shadow-lg' : 'text-green-100/60 hover:bg-green-900 hover:text-white'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-green-100/60'}`} />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-white/10">
         <button onClick={() => setIsAuthenticated(false)} className="w-full mt-4 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors">ออกจากระบบ</button>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'ยอดจองที่รออนุมัติ', value: '12', icon: CalendarDays, color: 'text-orange-500', bg: 'bg-orange-100' },
          { title: 'จำนวนรูปภาพทั้งหมด', value: '158', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-100' },
          { title: 'โรงเรียนเดือนนี้', value: '24', icon: Users, color: 'text-green-500', bg: 'bg-green-100' },
          { title: 'ผู้เข้าชมเว็บไซต์', value: '8.4k', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all group">
            <div className={`p-5 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}><stat.icon className={`w-8 h-8 ${stat.color}`} /></div>
            <div>
              <p className="text-xs text-slate-400 font-black uppercase tracking-widest">{stat.title}</p>
              <h3 className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const HomepageView = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const defaultTexts = {
      badge: 'WELCOME || เปิดให้จองแล้ววันนี้!!',
      title: 'ค่ายลูกเสือ อนุสรณ์ศุภมาศ ราชบุรี',
      subtitle: 'ศูนย์ฝึกอบรมเยาวชนที่เน้นความปลอดภัยและคุณภาพอาหาร...',
      staffSummaryTitle: 'ทีมงานวิทยากรและสตาฟกว่า 30 ท่าน',
      staffSummaryDesc: 'พร้อมดูแลนักเรียนทุกคนอย่างใกล้ชิด ตลอด 24 ชั่วโมง'
    };

    const [texts, setTexts] = useState(defaultTexts);
    const [highlightCards, setHighlightCards] = useState([{}, {}, {}, {}]); 
    const [featureCards, setFeatureCards] = useState([]);
    
    const [staffList, setStaffList] = useState([
      { name: "นายมนตรี คงสกุลถาวร", pos: "ผู้อำนวยการค่ายอนุสรณ์ศุภมาศ", img: "", showOnHome: true },
      { name: "นายเฉลิมชัย คงสกุลถาวร", pos: "ฝ่ายหลักสูตรและการฝึกอบรม", img: "", showOnHome: true },
      { name: "นายสหัส บ่อขุนทด", pos: "หัวหน้าทีมกิจกรรมและวิทยากร", img: "", showOnHome: true },
      { name: "นายสุรินทร์ ครบเบญจะ", pos: "ฝ่ายพยาบาลและกู้ชีพ (สว่างราชบุรี)", img: "", showOnHome: true }
    ]);
    const [slides, setSlides] = useState([]);

    const fileInputRef = useRef(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const docRef = doc(db, "settings", "homepage");
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.texts) setTexts({ ...defaultTexts, ...data.texts });
            if (data.highlightCards) {
               let cards = data.highlightCards;
               while(cards.length < 4) cards.push({ title: '', desc: '', img: '' });
               setHighlightCards(cards.slice(0, 4));
            }
            if (data.featureCards) setFeatureCards(data.featureCards);
            if (data.staffList) setStaffList(data.staffList);
            if (data.slides) setSlides(data.slides);
          }
        } catch (error) {
          console.error("Error fetching homepage settings:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);

    const handleSave = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      try {
        await setDoc(doc(db, "settings", "homepage"), { 
          texts, 
          highlightCards, 
          featureCards,
          staffList,
          slides
        }, { merge: true });
        alert("บันทึกข้อมูลหน้าแรกเรียบร้อยแล้ว!");
      } catch (error) {
        alert("เกิดข้อผิดพลาดในการบันทึก");
      } finally {
        setIsSaving(false);
      }
    };

    const handleCardImageUpload = async (index, file) => {
      if (!file) return;
      setIsUploading(true);
      try {
         const compressedFile = await compressImage(file, 800, 0.8);
         const storageRef = ref(storage, `highlights/card_${index}_${Date.now()}.jpg`);
         const uploadTask = await uploadBytesResumable(storageRef, compressedFile);
         const downloadURL = await getDownloadURL(uploadTask.ref);

         const newCards = [...highlightCards];
         newCards[index].img = downloadURL;
         setHighlightCards(newCards);
         
         await setDoc(doc(db, "settings", "homepage"), { highlightCards: newCards }, { merge: true });
      } catch (error) {
         alert("อัปโหลดไม่สำเร็จ");
      } finally {
         setIsUploading(false);
      }
    };

    const handleSlideUpload = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setIsUploading(true);
      try {
        const compressedFile = await compressImage(file, 1920, 0.8);
        const storageRef = ref(storage, `hero_slides/${Date.now()}_${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, compressedFile);
        const downloadURL = await getDownloadURL(uploadTask.ref);

        const newSlide = { url: downloadURL, storagePath: uploadTask.ref.fullPath, createdAt: new Date().toISOString() };
        const updatedSlides = [...slides, newSlide];
        await setDoc(doc(db, "settings", "homepage"), { slides: updatedSlides }, { merge: true });
        setSlides(updatedSlides);
      } catch (error) {
        alert("อัปโหลดไม่สำเร็จ กรุณาลองใหม่");
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    const handleDeleteSlide = async (index, storagePath) => {
      if (window.confirm("ยืนยันการลบภาพสไลด์นี้?")) {
        try {
          const updatedSlides = slides.filter((_, i) => i !== index);
          await setDoc(doc(db, "settings", "homepage"), { slides: updatedSlides }, { merge: true });
          if (storagePath) {
            const fileRef = ref(storage, storagePath);
            await deleteObject(fileRef);
          }
          setSlides(updatedSlides);
        } catch (error) { alert("ลบไม่สำเร็จ"); }
      }
    };

    const addFeatureCard = () => setFeatureCards([...featureCards, { title: 'บริการใหม่', desc: 'รายละเอียดสั้นๆ...', icon: 'Info' }]);
    const deleteFeatureCard = (index) => {
      if(window.confirm("ยืนยันการลบการ์ดสิ่งอำนวยความสะดวกนี้?")) {
        setFeatureCards(featureCards.filter((_, i) => i !== index));
      }
    };

    const addStaff = () => setStaffList([...staffList, { name: "", pos: "", img: "", showOnHome: false }]);
    const deleteStaff = (idx) => {
        if(window.confirm("ลบรายชื่อท่านนี้?")) setStaffList(staffList.filter((_, i) => i !== idx));
    };
    const handleStaffChange = (idx, field, val) => {
        const newStaff = [...staffList];
        newStaff[idx][field] = val;
        setStaffList(newStaff);
    };
    const handleStaffImage = async (idx, file) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const compressed = await compressImage(file, 400, 0.8);
            const storageRef = ref(storage, `staff/person_${idx}_${Date.now()}.jpg`);
            const task = await uploadBytesResumable(storageRef, compressed);
            const url = await getDownloadURL(task.ref);
            handleStaffChange(idx, 'img', url);
        } catch (error) {
            alert("อัปโหลดภาพบุคลากรไม่สำเร็จ");
        } finally {
            setIsUploading(false);
        }
    };

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500 w-12 h-12" /></div>;

    return (
      <div className="space-y-12 animate-in fade-in pb-24">
        <div className="flex justify-between items-end">
           <div>
              <h2 className="text-3xl font-black italic underline decoration-orange-500 decoration-4">จัดการหน้าแรก</h2>
              <p className="text-slate-500 mt-2">ปรับแต่งเนื้อหาทั้งหมดที่จะแสดงบนเว็บไซต์หน้าหลัก</p>
           </div>
           <button onClick={handleSave} disabled={isSaving || isUploading} className="bg-green-950 text-white px-8 py-3 rounded-2xl font-black shadow-xl hover:bg-orange-500 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50">
              {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />} บันทึกการตั้งค่า
           </button>
        </div>
        
        <form onSubmit={handleSave} className="space-y-12">
          {/* --- จัดการข้อความหลัก --- */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-green-950"><Type className="text-orange-500" /> ข้อความหลักและตัวเลข</h3>
            <div className="grid gap-5">
              <div><label className="text-xs font-bold text-slate-500 uppercase">ป้ายกำกับด้านบน</label><input type="text" value={texts.badge} onChange={e => setTexts({...texts, badge: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 mt-1" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">หัวข้อหลัก</label><input type="text" value={texts.title} onChange={e => setTexts({...texts, title: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-orange-500 mt-1" /></div>
              <div><label className="text-xs font-bold text-slate-500 uppercase">คำบรรยายย่อย</label><textarea rows={2} value={texts.subtitle} onChange={e => setTexts({...texts, subtitle: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 mt-1" /></div>
            </div>
            <div className="border-t border-slate-100 pt-6 mt-6">
                <h3 className="text-lg font-black text-green-950 mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-orange-500" /> ตัวเลขสถิติ (Trust Bar)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <input type="text" value={texts[`stat${num}Val`]} onChange={e => setTexts({...texts, [`stat${num}Val`]: e.target.value})} className="w-full bg-transparent font-black text-xl text-center mb-1 text-green-800 outline-none focus:bg-white rounded" />
                      <input type="text" value={texts[`stat${num}Label`]} onChange={e => setTexts({...texts, [`stat${num}Label`]: e.target.value})} className="w-full bg-transparent text-[10px] font-bold text-center text-slate-400 uppercase outline-none focus:bg-white rounded" />
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* --- จัดการรูปภาพสไลด์พื้นหลัง --- */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-green-950 flex items-center gap-2"><ImageIcon className="w-5 h-5 text-orange-500" /> ภาพพื้นหลัง (Hero Slideshow)</h3>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleSlideUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50">
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} {isUploading ? 'กำลังอัปโหลด...' : 'เพิ่มรูปภาพ'}
              </button>
            </div>
            {slides.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400"><ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" /><p className="font-bold text-sm">ยังไม่มีรูปภาพสไลด์</p></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {slides.map((slide, index) => (
                  <div key={index} className="relative group rounded-2xl overflow-hidden shadow-sm border border-slate-200 aspect-[4/3] bg-slate-100">
                    <img src={slide.url} alt={`Slide ${index}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button" onClick={() => handleDeleteSlide(index, slide.storagePath)} className="bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 hover:scale-110 transition-all shadow-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- กิจกรรม 4 การ์ด --- */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-xl font-black flex items-center gap-2 text-green-950"><Compass className="text-orange-500" /> กิจกรรมไฮไลท์ (4 การ์ด)</h3>
                  <p className="text-sm text-slate-500 mt-1">ส่วนนี้จะแสดงผลอยู่ใต้แถบตัวเลขสถิติบนหน้าแรก</p>
                </div>
                <div className="flex flex-col gap-3 min-w-[300px]">
                   <div><label className="text-[10px] font-bold text-slate-400 uppercase">หัวข้อใหญ่</label><input type="text" value={texts.activityTitle} onChange={e => setTexts({...texts, activityTitle: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-black text-sm text-green-900" /></div>
                   <div><label className="text-[10px] font-bold text-slate-400 uppercase">คำบรรยายย่อย</label><input type="text" value={texts.activitySubtitle} onChange={e => setTexts({...texts, activitySubtitle: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm text-orange-500" /></div>
                </div>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlightCards.map((card, i) => (
                <div key={i} className="bg-slate-50 p-5 rounded-3xl border border-slate-200 flex flex-col gap-4">
                  <div className="relative h-40 bg-slate-200 rounded-2xl overflow-hidden group border border-slate-300">
                    <img src={card.img || "https://via.placeholder.com/400x300?text=No+Image"} className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                      <Upload className="text-white w-8 h-8" />
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleCardImageUpload(i, e.target.files[0])} />
                    </label>
                  </div>
                  <input type="text" value={card.title} onChange={e => { const n = [...highlightCards]; n[i].title = e.target.value; setHighlightCards(n); }} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-sm" placeholder="หัวข้อการ์ด" />
                  <textarea rows={3} value={card.desc} onChange={e => { const n = [...highlightCards]; n[i].desc = e.target.value; setHighlightCards(n); }} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs resize-none" placeholder="คำอธิบาย" />
                </div>
              ))}
            </div>
          </div>

          {/* --- จัดการสิ่งอำนวยความสะดวก --- */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-slate-100 pb-6 gap-6">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2 text-green-950"><ShieldCheck className="text-orange-500" /> สิ่งอำนวยความสะดวก</h3>
                <p className="text-sm text-slate-500 font-medium mt-1">คุณครูสามารถเพิ่มการ์ดนำเสนอความพร้อมของค่ายได้ไม่จำกัดที่นี่ครับ</p>
              </div>
              <div className="flex flex-col gap-3 min-w-[300px]">
                   <div><label className="text-[10px] font-bold text-slate-400 uppercase">หัวข้อใหญ่</label><input type="text" value={texts.facilityTitle} onChange={e => setTexts({...texts, facilityTitle: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-black text-sm text-green-900" /></div>
                   <div><label className="text-[10px] font-bold text-slate-400 uppercase">คำบรรยายย่อย</label><input type="text" value={texts.facilitySubtitle} onChange={e => setTexts({...texts, facilitySubtitle: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm text-green-600" /></div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featureCards.map((card, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-sm relative group">
                  <button type="button" onClick={() => deleteFeatureCard(i)} className="absolute -top-3 -right-3 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 z-10"><Trash2 className="w-4 h-4" /></button>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-orange-500 shrink-0">
                      {card.icon === 'ShieldCheck' && <ShieldCheck />}{card.icon === 'BedDouble' && <BedDouble />}{card.icon === 'Utensils' && <Utensils />}{card.icon === 'Info' && <Info />}
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">Icon Type</label>
                      <select value={card.icon} onChange={e => { const n = [...featureCards]; n[i].icon = e.target.value; setFeatureCards(n); }} className="w-full bg-white border border-slate-200 rounded-lg font-bold text-xs p-1 outline-none">
                        <option value="ShieldCheck">ความปลอดภัย</option><option value="BedDouble">ที่พัก/นอน</option><option value="Utensils">อาหาร/โรงครัว</option><option value="Info">อื่นๆ/ข้อมูล</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input type="text" value={card.title} onChange={e => { const n = [...featureCards]; n[i].title = e.target.value; setFeatureCards(n); }} className="w-full p-3 bg-white border border-slate-100 rounded-xl font-black text-sm text-slate-800" placeholder="หัวข้อการ์ด" />
                    <textarea rows={3} value={card.desc} onChange={e => { const n = [...featureCards]; n[i].desc = e.target.value; setFeatureCards(n); }} className="w-full p-3 bg-white border border-slate-100 rounded-xl text-xs resize-none text-slate-500" placeholder="คำอธิบายสั้นๆ..."></textarea>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addFeatureCard} className="bg-green-50 border-2 border-dashed border-green-200 text-green-700 rounded-3xl font-black flex flex-col items-center justify-center gap-2 hover:bg-green-100 hover:border-green-300 transition-all min-h-[200px]"><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm"><Plus className="w-6 h-6 text-green-600" /></div>เพิ่มการ์ดใหม่</button>
            </div>
          </div>

          {/* 🌟 จัดการคณะผู้บริหาร (Staff Section) 🌟 */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6 gap-6">
              <div>
                <h3 className="text-xl font-black flex items-center gap-2 text-green-950"><Users className="text-orange-500" /> คณะผู้บริหารและทีมงาน</h3>
                <p className="text-sm text-slate-500 mt-1">จัดการรายชื่อและเลือกว่าจะให้ใครปรากฏอยู่บนการ์ดใน "หน้าแรก" บ้าง</p>
              </div>
              <button type="button" onClick={addStaff} className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-green-200 transition-all">
                <Plus className="w-5 h-5" /> เพิ่มบุคลากร
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {staffList.map((person, i) => (
                <div key={i} className={`bg-slate-50 p-5 rounded-3xl border-2 transition-all relative group ${person.showOnHome !== false ? 'border-orange-500 shadow-md' : 'border-white shadow-sm'}`}>
                  <button type="button" onClick={() => deleteStaff(i)} className="absolute -top-3 -right-3 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10"><Trash2 className="w-4 h-4" /></button>
                  
                  <div className="relative w-20 h-20 mx-auto mb-4 group/img">
                    <div className="w-full h-full bg-green-100 rounded-2xl flex items-center justify-center text-green-700 overflow-hidden border border-green-200">
                      {person.img ? <img src={person.img} className="w-full h-full object-cover" /> : <UserCheck className="w-10 h-10" />}
                    </div>
                    <label className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover/img:opacity-100 cursor-pointer transition-opacity">
                      <Upload className="text-white w-5 h-5" />
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleStaffImage(i, e.target.files[0])} />
                    </label>
                  </div>

                  <div className="space-y-3">
                    <input type="text" value={person.name} onChange={e => handleStaffChange(i, 'name', e.target.value)} className="w-full p-2 bg-white border border-slate-100 rounded-lg font-bold text-xs text-center" placeholder="ชื่อ-นามสกุล" />
                    <input type="text" value={person.pos} onChange={e => handleStaffChange(i, 'pos', e.target.value)} className="w-full p-2 bg-white border border-slate-100 rounded-lg text-[10px] text-center text-slate-500" placeholder="ตำแหน่ง" />
                  </div>

                  {/* 📌 ระบบติ๊กเลือกแสดงผลหน้าแรก */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-center bg-white rounded-lg p-2">
                     <label className="flex items-center gap-2 cursor-pointer group/toggle w-full justify-center">
                       <input 
                         type="checkbox" 
                         checked={person.showOnHome !== false} 
                         onChange={e => handleStaffChange(i, 'showOnHome', e.target.checked)} 
                         className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500 border-slate-300 cursor-pointer" 
                       />
                       <span className={`text-[10px] font-black uppercase tracking-wider transition-colors ${person.showOnHome !== false ? 'text-orange-600' : 'text-slate-400'}`}>
                         โชว์บนหน้าแรก
                       </span>
                     </label>
                  </div>
                </div>
              ))}
            </div>

            {/* แถบสรุปทีมงานด้านล่าง */}
            <div className="mt-10 p-6 bg-green-900 rounded-[2rem] text-white">
               <h4 className="font-black text-sm mb-4 border-b border-white/10 pb-2 flex items-center gap-2 uppercase italic"><Info className="w-4 h-4 text-orange-400" /> แถบสรุปทีมงาน (Green Bar)</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-green-300 uppercase">หัวข้อสรุป</label>
                    <input type="text" value={texts.staffSummaryTitle} onChange={e => setTexts({...texts, staffSummaryTitle: e.target.value})} className="w-full p-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:bg-white/20 mt-1" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-green-300 uppercase">คำอธิบาย</label>
                    <input type="text" value={texts.staffSummaryDesc} onChange={e => setTexts({...texts, staffSummaryDesc: e.target.value})} className="w-full p-3 bg-white/10 border border-white/20 rounded-xl outline-none focus:bg-white/20 mt-1" />
                  </div>
               </div>
            </div>
          </div>

          <div className="fixed bottom-10 right-10 z-[110]">
            <button type="submit" disabled={isSaving || isUploading} className="bg-green-950 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl hover:bg-orange-500 hover:scale-105 transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50 border-4 border-white">
              {isSaving ? <Loader2 className="animate-spin" /> : <Save className="w-6 h-6" />} บันทึกข้อมูลหน้าแรกทั้งหมด
            </button>
          </div>
        </form>
      </div>
    );
  };

  // ==========================================
  // 🎯 VIEW: จัดการฐานกิจกรรม (Activities Map)
  // ==========================================
  const ActivitiesView = () => {
    const [bases, setBases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    
    const [formData, setFormData] = useState({
      id_number: '', name: '', desc: '', top: '50%', left: '50%', img: '', storagePath: ''
    });
    
    const [pendingFile, setPendingFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
      const fetchBases = async () => {
        try {
          const q = query(collection(db, "adventure_bases"), orderBy("id_number", "asc"));
          const querySnapshot = await getDocs(q);
          const fetchedBases = [];
          querySnapshot.forEach((doc) => {
            fetchedBases.push({ id: doc.id, ...doc.data() });
          });
          setBases(fetchedBases);
        } catch (error) {
          console.error("Error fetching bases: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchBases();
    }, []);

    const handleFileSelect = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const compressedFile = await compressImage(file, 1200, 0.8);
        if (compressedFile.size > 5 * 1024 * 1024) {
          alert("ขนาดไฟล์ยังคงเกิน 5MB แม้จะถูกบีบอัดแล้ว กรุณาเลือกรูปอื่น");
          return;
        }
        setPendingFile(compressedFile);
        setPreviewUrl(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Compression error:", error);
        alert("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ");
      }
    };

    const handleMapClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setFormData({...formData, left: `${x.toFixed(1)}%`, top: `${y.toFixed(1)}%`});
    };

    const openAddModal = () => {
      setEditingId(null);
      setFormData({ id_number: bases.length + 1, name: '', desc: '', top: '50%', left: '50%', img: '', storagePath: '' });
      setPendingFile(null);
      setPreviewUrl(null);
      setIsModalOpen(true);
    };

    const openEditModal = (base) => {
      setEditingId(base.id);
      setFormData(base);
      setPendingFile(null);
      setPreviewUrl(base.img);
      setIsModalOpen(true);
    };

    const handleDelete = async (id, storagePath) => {
      if(window.confirm('ยืนยันการลบฐานกิจกรรมนี้?')) {
        try {
          await deleteDoc(doc(db, "adventure_bases", id));
          if (storagePath) {
            const fileRef = ref(storage, storagePath);
            await deleteObject(fileRef);
          }
          setBases(bases.filter(b => b.id !== id));
        } catch (error) {
          console.error("Error deleting: ", error);
          alert("เกิดข้อผิดพลาดในการลบ");
        }
      }
    };

    const handleSave = async (e) => {
      e.preventDefault();
      setIsUploading(true);

      let finalImageUrl = formData.img;
      let finalStoragePath = formData.storagePath;

      if (pendingFile) {
        const storageRef = ref(storage, `bases/${Date.now()}_${pendingFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, pendingFile);
        try {
          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed', null, reject, resolve);
          });
          finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          finalStoragePath = uploadTask.snapshot.ref.fullPath;
        } catch (error) {
          console.error("Upload error:", error);
          alert("อัปโหลดไม่สำเร็จ");
          setIsUploading(false);
          return;
        }
      }

      const baseDataToSave = {
        id_number: Number(formData.id_number),
        name: formData.name,
        desc: formData.desc,
        top: formData.top,
        left: formData.left,
        img: finalImageUrl,
        storagePath: finalStoragePath,
        updatedAt: serverTimestamp()
      };

      try {
        if (editingId) {
          await updateDoc(doc(db, "adventure_bases", editingId), baseDataToSave);
          setBases(bases.map(b => b.id === editingId ? { ...b, ...baseDataToSave } : b).sort((a,b) => a.id_number - b.id_number));
        } else {
          baseDataToSave.createdAt = serverTimestamp();
          const docRef = await addDoc(collection(db, "adventure_bases"), baseDataToSave);
          setBases([...bases, { id: docRef.id, ...baseDataToSave }].sort((a,b) => a.id_number - b.id_number));
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error saving base: ", error);
        alert("บันทึกไม่สำเร็จ");
      } finally {
        setIsUploading(false);
      }
    };

    return (
      <div className="space-y-10 animate-in fade-in duration-500 relative pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-orange-500 decoration-4 underline-offset-8">จัดการฐานกิจกรรม</h2>
            <p className="text-slate-400 text-sm mt-3 font-medium">เพิ่ม/ลบ ฐานกิจกรรม และปักหมุดบนแผนที่ Interactive</p>
          </div>
          <button onClick={openAddModal} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-orange-500/20 transition-all active:scale-95">
            <Plus className="w-6 h-6" /> เพิ่มฐานใหม่
          </button>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
           <div className="w-full md:w-1/2 h-64 bg-slate-200 rounded-[1.5rem] relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')] bg-cover bg-center border-4 border-slate-100">
              <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]"></div>
              {bases.map(base => (
                <div key={base.id} className="absolute w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-xs shadow-lg transform -translate-x-1/2 -translate-y-1/2 border-2 border-white" style={{ top: base.top, left: base.left }}>
                  {base.id_number}
                </div>
              ))}
           </div>
           <div className="w-full md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-black text-green-950 mb-2">พรีวิวแผนที่ Interactive</h3>
              <p className="text-slate-500 mb-6">หมุดทั้งหมดจะถูกดึงไปแสดงที่หน้าแรกของเว็บไซต์ทันที เมื่อมีการกดบันทึก</p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-green-50 p-4 rounded-2xl border border-green-100"><p className="text-xs text-green-600 font-bold uppercase mb-1">จำนวนฐานทั้งหมด</p><p className="text-3xl font-black text-green-800">{bases.length}</p></div>
              </div>
           </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center h-32 items-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div>
        ) : bases.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-bold bg-white rounded-[3rem] border-4 border-dashed border-slate-100">ยังไม่มีข้อมูลฐานกิจกรรม เริ่มเพิ่มฐานแรกได้เลย!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bases.map((base) => (
              <div key={base.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex gap-4 items-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200 relative">
                  {base.img ? <img src={base.img} alt={base.name} className="w-full h-full object-cover" /> : <Map className="w-8 h-8 text-slate-300 absolute top-6 left-6" />}
                  <div className="absolute top-1 left-1 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-[10px] border border-white shadow-md">{base.id_number}</div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-black text-slate-800 truncate" title={base.name}>{base.name}</h4>
                  <p className="text-xs text-slate-400 mt-1 font-medium truncate">พิกัด: {base.top}, {base.left}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => openEditModal(base)} className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-orange-500 hover:text-white transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(base.id, base.storagePath)} className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-rose-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal สำหรับเพิ่ม/แก้ไขฐานกิจกรรม */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-green-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row gap-8">
              
              <div className="w-full md:w-1/2 space-y-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-black text-slate-800">{editingId ? 'แก้ไขข้อมูลฐาน' : 'เพิ่มฐานกิจกรรมใหม่'}</h3>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">หมายเลขฐาน</label>
                    <input type="number" required value={formData.id_number} onChange={e => setFormData({...formData, id_number: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 font-black text-center" />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">ชื่อฐานกิจกรรม</label>
                    <input type="text" required placeholder="เช่น ฐานกระโดดหอ" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 font-bold" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">รายละเอียด (Description)</label>
                  <textarea rows="3" required placeholder="อธิบายกิจกรรมสั้นๆ..." value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 font-medium resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">รูปภาพประจำฐาน (บีบอัดอัตโนมัติ)</label>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                  <div className="flex gap-4 items-center">
                    <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> เลือกรูปภาพ
                    </button>
                    {previewUrl && <img src={previewUrl} className="w-12 h-12 rounded-lg object-cover border border-slate-200" alt="preview" />}
                  </div>
                </div>

                <div className="flex gap-4 pt-6 mt-6 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-black text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">ยกเลิก</button>
                  <button onClick={handleSave} disabled={isUploading} className="flex-1 py-4 rounded-2xl font-black text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-xl flex justify-center items-center gap-2">
                    {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'บันทึกข้อมูล'}
                  </button>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col">
                <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 mb-4">
                  <h4 className="font-black text-orange-800 text-sm flex items-center gap-2 mb-1"><Map className="w-4 h-4" /> ระบบปักหมุดอัจฉริยะ</h4>
                  <p className="text-xs text-orange-600 font-medium">คลิกตำแหน่งบนรูปแผนที่ด้านล่าง เพื่อย้ายหมุดหมายเลขฐานโดยอัตโนมัติ</p>
                </div>
                
                <div className="w-full h-[300px] md:h-full bg-slate-200 rounded-[2rem] relative overflow-hidden cursor-crosshair border-4 border-slate-100 shadow-inner group bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')] bg-cover bg-center" onClick={handleMapClick}>
                   <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] group-hover:bg-white/40 transition-colors"></div>
                   <div className="absolute w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-xl shadow-2xl transform -translate-x-1/2 -translate-y-1/2 border-4 border-white transition-all duration-300 ease-out z-10" style={{ top: formData.top, left: formData.left }}>
                     {formData.id_number || '?'}
                   </div>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <div className="flex-1 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase">แกน Y (Top)</span> <span className="font-black text-slate-700">{formData.top}</span></div>
                  <div className="flex-1 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex justify-between items-center"><span className="text-[10px] font-bold text-slate-400 uppercase">แกน X (Left)</span> <span className="font-black text-slate-700">{formData.left}</span></div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // 🎯 VIEW: แกลลอรี่หลัก (Gallery)
  // ==========================================
  const GalleryView = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [filter, setFilter] = useState('ทั้งหมด');
    
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [pendingFile, setPendingFile] = useState(null);
    const [imageName, setImageName] = useState('');
    const [imageCategory, setImageCategory] = useState('กิจกรรม');
    const [previewUrl, setPreviewUrl] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
          const querySnapshot = await getDocs(q);
          const fetchedImages = [];
          querySnapshot.forEach((doc) => {
            fetchedImages.push({ id: doc.id, ...doc.data() });
          });
          setImages(fetchedImages);
        } catch (error) {
          console.error("Error fetching images: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchImages();
    }, []);

    const handleFileSelect = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const compressedFile = await compressImage(file, 1200, 0.8);
        if (compressedFile.size > 5 * 1024 * 1024) {
          alert("ขนาดไฟล์ใหญ่เกินไป กรุณาอัปโหลดรูปที่ไม่เกิน 5MB");
          return;
        }
        setPendingFile(compressedFile);
        setPreviewUrl(URL.createObjectURL(compressedFile)); 
        setImageName(''); 
        setImageCategory(filter === 'ทั้งหมด' ? 'กิจกรรม' : filter); 
        setShowUploadModal(true); 
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (error) {
        console.error("Compression error:", error);
        alert("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ");
      }
    };

    const confirmUpload = async () => {
      if (!imageName.trim()) {
        alert('กรุณาระบุ "ชื่อหรือคำอธิบายภาพ" ก่อนอัปโหลดครับ');
        return;
      }
      setShowUploadModal(false);
      setIsUploading(true);
      
      const file = pendingFile;
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100), 
        (error) => {
          console.error("Upload failed", error);
          alert("อัปโหลดไม่สำเร็จ กรุณาลองใหม่");
          setIsUploading(false);
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newImageData = { src: downloadURL, name: imageName, category: imageCategory, createdAt: serverTimestamp(), storagePath: uploadTask.snapshot.ref.fullPath };
          try {
            const docRef = await addDoc(collection(db, "gallery"), newImageData);
            setImages(prev => [{ id: docRef.id, ...newImageData, createdAt: new Date() }, ...prev]);
          } catch (err) {
            console.error("Error adding document: ", err);
          }
          setIsUploading(false);
          setUploadProgress(0);
          setPendingFile(null);
          if (previewUrl) URL.revokeObjectURL(previewUrl);
        }
      );
    };

    const handleDelete = async (id, storagePath) => {
      if(window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพนี้แบบถาวร?')) {
        try {
          await deleteDoc(doc(db, "gallery", id));
          if (storagePath) {
            const fileRef = ref(storage, storagePath);
            await deleteObject(fileRef);
          }
          setImages(images.filter(img => img.id !== id));
        } catch (error) {
          console.error("Error deleting image: ", error);
          alert("เกิดข้อผิดพลาดในการลบรูปภาพ");
        }
      }
    };

    const filteredImages = filter === 'ทั้งหมด' ? images : images.filter(img => img.category === filter);
    const renderDate = (createdAt) => {
      if (!createdAt) return "เพิ่งอัปโหลด";
      if (typeof createdAt.toDate === 'function') return createdAt.toDate().toLocaleDateString('th-TH');
      if (createdAt instanceof Date) return createdAt.toLocaleDateString('th-TH');
      return "เพิ่งอัปโหลด";
    };

    return (
      <div className="space-y-10 animate-in fade-in duration-500 relative pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-orange-500 decoration-4 underline-offset-8">จัดการแกลลอรี่ภาพ</h2>
            <p className="text-slate-400 text-sm mt-3 font-medium">อัปโหลดรูปภาพใหม่ ระบบจะทำการบีบอัดขนาดไฟล์ให้อัตโนมัติ</p>
          </div>
          
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
          <button onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-orange-50 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50">
            {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />} 
            {isUploading ? `กำลังอัปโหลด ${Math.round(uploadProgress)}%` : "อัปโหลดรูปภาพใหม่"}
          </button>
        </div>

        <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-6">
           {['ทั้งหมด', 'กิจกรรม', 'สถานที่', 'ห้องพัก', 'อาหาร', 'บุคลากร'].map((cat, i) => (
             <button key={i} onClick={() => setFilter(cat)} className={`px-8 py-3 rounded-2xl text-xs font-black transition-all uppercase tracking-widest ${filter === cat ? 'bg-green-950 text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-100 border border-slate-100'}`}>
               {cat}
             </button>
           ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64"><Loader2 className="w-10 h-10 animate-spin text-orange-500" /></div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-bold bg-white rounded-[3rem] border-4 border-dashed border-slate-100">ไม่มีรูปภาพในหมวดหมู่นี้ เริ่มอัปโหลดได้เลย!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
             {filteredImages.map((img) => (
               <div key={img.id} className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                     <img src={img.src} alt={img.name} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000" />
                     <div className="absolute top-4 left-4 px-4 py-1.5 bg-green-950/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase text-white tracking-widest shadow-lg">{img.category}</div>
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <a href={img.src} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-2xl text-slate-800 hover:bg-orange-500 hover:text-white transition-all shadow-xl" title="ดูรูปภาพ"><Eye className="w-6 h-6" /></a>
                        <button onClick={() => handleDelete(img.id, img.storagePath)} className="p-3 bg-white rounded-2xl text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-xl" title="ลบรูปภาพ"><Trash2 className="w-6 h-6" /></button>
                     </div>
                  </div>
                  <div className="p-6">
                     <h4 className="font-black text-slate-800 truncate mb-1 text-lg" title={img.name}>{img.name}</h4>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">{renderDate(img.createdAt)}</p>
                  </div>
               </div>
             ))}
          </div>
        )}

        {showUploadModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-slate-800">รายละเอียดรูปภาพ</h3>
                <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><X className="w-6 h-6" /></button>
              </div>
              <div className="w-full h-48 bg-slate-100 rounded-[1.5rem] mb-6 overflow-hidden border border-slate-200"><img src={previewUrl} alt="Preview" className="w-full h-full object-cover" /></div>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">ชื่อ/คำอธิบายภาพ <span className="text-rose-500">*</span></label>
                  <input type="text" placeholder="เช่น โรงอาหาร, ลานหน้าเสาธง, กระโดดหอ" value={imageName} onChange={(e) => setImageName(e.target.value)} autoFocus className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">หมวดหมู่</label>
                  <select value={imageCategory} onChange={(e) => setImageCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 font-bold text-slate-700">
                    {['กิจกรรม', 'สถานที่', 'ห้องพัก', 'อาหาร', 'บุคลากร'].map(cat => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setShowUploadModal(false)} className="flex-1 py-4 rounded-2xl font-black text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors">ยกเลิก</button>
                <button onClick={confirmUpload} className="flex-1 py-4 rounded-2xl font-black text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-xl">บันทึกและอัปโหลด</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-10 bg-slate-50/50 relative custom-scrollbar">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'homepage' && <HomepageView />}
          {activeTab === 'gallery' && <GalleryView />}
          {activeTab === 'activities' && <ActivitiesView />}
          
          {activeTab === 'bookings' && (
             <div className="space-y-8 h-full animate-in fade-in duration-500">
                <div className="flex justify-between items-center">
                  <div>
                     <h2 className="text-3xl font-black italic underline decoration-orange-500 decoration-4">ปฏิทินการจอง</h2>
                     <p className="text-slate-500 mt-2">จัดการการจองผ่าน Google Calendar เพื่อให้ซิงค์ข้อมูลกับทีมงานทุกคน</p>
                  </div>
                  <a href="https://calendar.google.com" target="_blank" className="bg-[#064e3b] text-white px-8 py-4 rounded-2xl font-black shadow-xl flex items-center gap-2 hover:bg-orange-500 transition-all">
                    <ExternalLink className="w-5 h-5" /> เปิด Google Calendar
                  </a>
                </div>
                {/* 📌 เปลี่ยนอีเมล Calendar ตรงนี้ให้เป็นของคุณครู */}
                <iframe src="https://calendar.google.com/calendar/embed?src=suppamascamp@gmail.com&ctz=Asia%2FBangkok" className="w-full h-[75vh] bg-white rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden" frameBorder="0" scrolling="no"></iframe>
             </div>
          )}

          {/* โชว์กรอบสำหรับเมนูที่ยังไม่ได้ทำ (Packages, Settings) */}
          {['packages', 'settings'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center min-h-[500px] border-4 border-dashed border-slate-100 rounded-[4rem] bg-white/50 text-slate-300 group hover:border-orange-500/20 transition-all">
                <div className="p-10 bg-white rounded-[2.5rem] shadow-2xl mb-8 group-hover:scale-110 transition-transform shadow-slate-200/50"><Settings className="w-16 h-16 text-slate-200 animate-spin-slow" /></div>
                <h3 className="text-3xl font-black text-slate-400 mb-2 uppercase italic tracking-tighter">Feature In Development</h3>
                <p className="max-w-md text-center font-bold text-slate-300/80 uppercase tracking-widest text-xs leading-loose">โมดูลกำลังถูกเชื่อมต่อกับระบบฐานข้อมูล</p>
                <button onClick={() => setActiveTab('dashboard')} className="mt-10 px-10 py-4 bg-green-950 text-white rounded-[1.5rem] font-black shadow-2xl flex items-center gap-3 hover:bg-orange-500 transition-all uppercase tracking-widest text-xs active:scale-95">
                   <Home className="w-5 h-5" /> กลับสู่หน้าแดชบอร์ด
                </button>
              </div>
          )}
        </div>
      </main>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-green-950/40 z-40 md:hidden backdrop-blur-md animate-in fade-in duration-500" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
}