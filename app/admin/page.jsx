"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Home, Tent, Package, CalendarDays, 
  Image as ImageIcon, Settings, Menu, X, Bell, Plus, 
  Trash2, Search, TrendingUp, Users, Upload, Eye, 
  Lock, Mail, ArrowRight, ShieldCheck, Loader2, Map, Edit, Save, Type, Compass, ExternalLink, BedDouble, Utensils, Info, UserCheck, Newspaper, Flame, CheckCircle2, AlertCircle, Bold, Italic, Link as LinkIcon, CornerDownLeft,
  Coffee, Wifi, Car, Shield, Waves, Wind, Tv, Sparkles // 🌟 เพิ่ม Sparkles สำหรับปุ่มจัดรูปแบบอัตโนมัติ
} from 'lucide-react';

import { db, storage, auth } from '../../src/lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { getDoc, setDoc, doc, serverTimestamp, collection, query, orderBy, getDocs, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

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
          if (!blob) return reject(new Error('Canvas empty'));
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
          resolve(new File([blob], newFileName, { type: 'image/jpeg', lastModified: Date.now() }));
        }, 'image/jpeg', quality);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false); 
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('homepage'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: LayoutDashboard },
    { id: 'homepage', label: 'จัดการหน้าแรก', icon: Home },
    { id: 'news', label: 'จัดการข่าวสาร', icon: Newspaper },
    { id: 'activities', label: 'จัดการกิจกรรม', icon: Tent },
    { id: 'packages', label: 'จัดการแพ็กเกจ', icon: Package },
    { id: 'bookings', label: 'ปฏิทินการจอง', icon: CalendarDays },
    { id: 'gallery', label: 'จัดการแกลลอรี่', icon: ImageIcon },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false);
      }
      setIsAuthReady(true); 
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      setIsAuthenticated(true);
    } catch (error) { 
      alert("อีเมล หรือ รหัสผ่าน ไม่ถูกต้องครับ"); 
    } finally { 
      setIsLoggingIn(false); 
    }
  };

  if (!isAuthReady) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#064e3b] flex flex-col items-center justify-center p-4">
         <Loader2 className="w-12 h-12 animate-spin text-orange-500 mb-4" />
         <p className="text-green-100 font-bold animate-pulse">กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...</p>
      </div>
    );
  }

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
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">อีเมลผู้ดูแลระบบ</label>
                    <div className="relative">
                       <Mail className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                       <input type="email" required placeholder="admin@suppamas.me" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all outline-none text-sm font-medium" value={loginForm.email} onChange={(e) => setLoginForm({...loginForm, email: e.target.value})} />
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between items-center mb-2">
                       <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">รหัสผ่าน</label>
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

  // ==========================================
  // DASHBOARD VIEW
  // ==========================================
  const DashboardView = () => {
    const [stats, setStats] = useState({ pendingBookings: 0, totalGallery: 0, schoolsThisMonth: 0, totalNews: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchStats = async () => {
        try {
          const gallerySnap = await getDocs(collection(db, "gallery"));
          const newsSnap = await getDocs(collection(db, "news"));
          const bookingsSnap = await getDocs(collection(db, "bookings"));
          const allBookings = [];
          bookingsSnap.forEach(doc => allBookings.push(doc.data()));

          const now = new Date();
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          const monthlyBookings = allBookings.filter(booking => {
            if (!booking.checkInDate) return false;
            const bDate = booking.checkInDate.toDate(); 
            return bDate.getMonth() === currentMonth && bDate.getFullYear() === currentYear;
          });

          const pending = allBookings.filter(b => b.status === 'pending').length;

          setStats({
            pendingBookings: pending,
            totalGallery: gallerySnap.size,
            schoolsThisMonth: monthlyBookings.length, 
            totalNews: newsSnap.size
          });
        } catch (error) {
          console.error("Error fetching stats:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchStats();
    }, []);

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500 w-10 h-10" /></div>;

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'ยอดจองรออนุมัติ', value: stats.pendingBookings, icon: CalendarDays, color: 'text-orange-500', bg: 'bg-orange-100' },
            { title: 'รูปภาพทั้งหมด', value: stats.totalGallery, icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-100' },
            { title: 'โรงเรียนเดือนนี้', value: stats.schoolsThisMonth, icon: Users, color: 'text-green-500', bg: 'bg-green-100' },
            { title: 'ข่าวสารทั้งหมด', value: stats.totalNews, icon: Newspaper, color: 'text-purple-500', bg: 'bg-purple-100' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-xl transition-all group">
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
  };

  // ==========================================
  // HOMEPAGE VIEW (จัดการหน้าแรก)
  // ==========================================
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

    const iconList = [
      { name: 'Coffee', icon: Coffee }, { name: 'Utensils', icon: Utensils }, 
      { name: 'BedDouble', icon: BedDouble }, { name: 'Meeting', icon: Users },
      { name: 'Wifi', icon: Wifi }, { name: 'Parking', icon: Car },
      { name: 'Security', icon: Shield }, { name: 'Water', icon: Waves },
      { name: 'Air', icon: Wind }, { name: 'Tv', icon: Tv }, { name: 'Info', icon: Info },
      { name: 'ShieldCheck', icon: ShieldCheck }
    ];

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
        } catch (error) { console.error("Error fetching homepage settings:", error); } finally { setIsLoading(false); }
      };
      fetchData();
    }, []);

    const handleSave = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      try {
        await setDoc(doc(db, "settings", "homepage"), { texts, highlightCards, featureCards, staffList, slides }, { merge: true });
        alert("บันทึกข้อมูลหน้าแรกเรียบร้อยแล้ว!");
      } catch (error) { alert("เกิดข้อผิดพลาดในการบันทึก"); } finally { setIsSaving(false); }
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
      } catch (error) { alert("อัปโหลดไม่สำเร็จ"); } finally { setIsUploading(false); }
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
        setSlides([...slides, newSlide]);
      } catch (error) { alert("อัปโหลดไม่สำเร็จ กรุณาลองใหม่"); } finally {
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    const handleDeleteSlide = async (index, storagePath) => {
      if (window.confirm("ยืนยันการลบภาพสไลด์นี้?")) {
        try {
          const updatedSlides = slides.filter((_, i) => i !== index);
          setSlides(updatedSlides);
          if (storagePath) { await deleteObject(ref(storage, storagePath)); }
        } catch (error) { alert("ลบไม่สำเร็จ"); }
      }
    };

    const handleAddFacility = () => {
      setFeatureCards([...featureCards, { title: 'บริการใหม่', desc: 'รายละเอียดสั้นๆ...', icon: 'Info' }]);
    };

    const addStaff = () => setStaffList([...staffList, { name: "", pos: "", img: "", showOnHome: false }]);
    const deleteStaff = (idx) => { if(window.confirm("ลบรายชื่อท่านนี้?")) setStaffList(staffList.filter((_, i) => i !== idx)); };
    const handleStaffChange = (idx, field, val) => { const newStaff = [...staffList]; newStaff[idx][field] = val; setStaffList(newStaff); };
    const handleStaffImage = async (idx, file) => {
        if (!file) return;
        setIsUploading(true);
        try {
            const compressed = await compressImage(file, 400, 0.8);
            const storageRef = ref(storage, `staff/person_${idx}_${Date.now()}.jpg`);
            const task = await uploadBytesResumable(storageRef, compressed);
            const url = await getDownloadURL(task.ref);
            handleStaffChange(idx, 'img', url);
        } catch (error) { alert("อัปโหลดภาพบุคลากรไม่สำเร็จ"); } finally { setIsUploading(false); }
    };

    if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-orange-500 w-12 h-12" /></div>;

    return (
      <div className="space-y-12 animate-in fade-in pb-24">
        <div className="flex justify-between items-end">
           <div><h2 className="text-3xl font-black italic underline decoration-orange-500 decoration-4">จัดการหน้าแรก</h2></div>
           <button onClick={handleSave} disabled={isSaving || isUploading} className="bg-green-950 text-white px-8 py-3 rounded-2xl font-black shadow-xl hover:bg-orange-500 transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50">
              {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />} บันทึกการตั้งค่า
           </button>
        </div>
        
        <form className="space-y-12">
          {/* ข้อความหลัก */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6 text-green-950">ข้อความหลักและตัวเลข</h3>
            <div className="grid gap-5">
              <div><label className="text-xs font-bold">ป้ายกำกับด้านบน</label><input type="text" value={texts.badge} onChange={e => setTexts({...texts, badge: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" /></div>
              <div><label className="text-xs font-bold">หัวข้อหลัก</label><input type="text" value={texts.title} onChange={e => setTexts({...texts, title: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold" /></div>
              <div><label className="text-xs font-bold">คำบรรยายย่อย</label><textarea rows="2" value={texts.subtitle} onChange={e => setTexts({...texts, subtitle: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl" /></div>
            </div>
            <div className="border-t border-slate-100 pt-6 mt-6">
                <h3 className="text-lg font-black text-green-950 mb-4">ตัวเลขสถิติ</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(num => (
                    <div key={num} className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <input type="text" value={texts[`stat${num}Val`]} onChange={e => setTexts({...texts, [`stat${num}Val`]: e.target.value})} className="w-full bg-transparent font-black text-xl text-center mb-1 text-green-800" />
                      <input type="text" value={texts[`stat${num}Label`]} onChange={e => setTexts({...texts, [`stat${num}Label`]: e.target.value})} className="w-full bg-transparent text-[10px] font-bold text-center text-slate-400 uppercase" />
                    </div>
                  ))}
                </div>
            </div>
          </div>

          {/* 🌟 2. จัดการสิ่งอำนวยความสะดวก (#facilities) */}
          <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black flex items-center gap-2 text-green-950">
                  <Info className="w-5 h-5 text-orange-500" /> จัดการสิ่งอำนวยความสะดวก (Facilities)
                </h3>
                <button type="button" onClick={handleAddFacility} className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all">
                  <Plus className="w-4 h-4" /> เพิ่มรายการ
                </button>
             </div>
             
             {featureCards.length === 0 ? (
               <div className="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <Info className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p className="text-slate-500 font-bold text-sm">ยังไม่มีข้อมูลสิ่งอำนวยความสะดวก</p>
                  <p className="text-slate-400 text-xs mt-1">กดปุ่ม "เพิ่มรายการ" ด้านบนเพื่อเริ่มต้น</p>
               </div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featureCards.map((card, idx) => {
                    const SelectedIcon = iconList.find(i => i.name === card.icon)?.icon || Info;
                    return (
                    <div key={idx} className="p-6 bg-slate-50 rounded-3xl border border-slate-200 relative group hover:border-orange-300 transition-colors shadow-sm">
                       <button type="button" onClick={() => setFeatureCards(featureCards.filter((_,i)=>i!==idx))} className="absolute -top-3 -right-3 bg-white text-rose-500 p-2 rounded-full shadow-md hover:bg-rose-500 hover:text-white transition-all border border-slate-100 z-10" title="ลบรายการนี้">
                         <Trash2 className="w-4 h-4" />
                       </button>
                       <div className="flex gap-4 mb-4">
                          <div className="w-1/3">
                             <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">เลือกไอคอน</label>
                             <div className="relative">
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
                                   <SelectedIcon className="w-4 h-4" />
                                </div>
                                <select value={card.icon} onChange={e=>{const n=[...featureCards]; n[idx].icon=e.target.value; setFeatureCards(n)}} className="w-full pl-8 p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-bold outline-none focus:border-orange-500 appearance-none cursor-pointer">
                                   {iconList.map(i => <option key={i.name} value={i.name}>{i.name}</option>)}
                                </select>
                             </div>
                          </div>
                          <div className="w-2/3">
                             <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">ชื่อเรียก</label>
                             <input type="text" value={card.title} onChange={e=>{const n=[...featureCards]; n[idx].title=e.target.value; setFeatureCards(n)}} placeholder="เช่น ห้องน้ำสะอาด" className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-xl font-bold outline-none focus:border-orange-500" />
                          </div>
                       </div>
                       <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">คำอธิบาย</label>
                       <textarea rows="3" value={card.desc} onChange={e=>{const n=[...featureCards]; n[idx].desc=e.target.value; setFeatureCards(n)}} placeholder="อธิบายรายละเอียดเพิ่มเติมให้ลูกค้ารับทราบ..." className="w-full p-3 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-orange-500 resize-none" />
                    </div>
                  )})}
               </div>
             )}
          </section>

          {/* รูปภาพสไลด์พื้นหลัง */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-green-950">ภาพพื้นหลัง (Hero Slideshow)</h3>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleSlideUpload} className="hidden" />
              <button type="button" onClick={() => fileInputRef.current.click()} disabled={isUploading} className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2">
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} เพิ่มรูปภาพ
              </button>
            </div>
            {slides.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200"><p className="font-bold text-sm">ยังไม่มีรูปภาพสไลด์</p></div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {slides.map((slide, index) => (
                  <div key={index} className="relative group rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-slate-100">
                    <img src={slide.url} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                      <button type="button" onClick={() => handleDeleteSlide(index, slide.storagePath)} className="bg-rose-500 text-white p-2 rounded-full"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* กิจกรรม 4 การ์ด */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-6 text-green-950">กิจกรรมไฮไลท์ (4 การ์ด)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlightCards.map((card, i) => (
                <div key={i} className="bg-slate-50 p-5 rounded-3xl border border-slate-200 flex flex-col gap-4">
                  <div className="relative h-40 bg-slate-200 rounded-2xl overflow-hidden group">
                    <img src={card.img || "https://via.placeholder.com/400x300"} className="w-full h-full object-cover" />
                    <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                      <Upload className="text-white w-8 h-8" />
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleCardImageUpload(i, e.target.files[0])} />
                    </label>
                  </div>
                  <input type="text" value={card.title} onChange={e => { const n = [...highlightCards]; n[i].title = e.target.value; setHighlightCards(n); }} className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold text-sm" placeholder="หัวข้อ" />
                  <textarea rows="3" value={card.desc} onChange={e => { const n = [...highlightCards]; n[i].desc = e.target.value; setHighlightCards(n); }} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs resize-none" placeholder="คำอธิบาย" />
                </div>
              ))}
            </div>
          </div>

          {/* จัดการบุคลากร */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
              <h3 className="text-xl font-black text-green-950">คณะผู้บริหารและทีมงาน</h3>
              <button type="button" onClick={addStaff} className="bg-green-100 text-green-700 px-6 py-3 rounded-2xl font-black flex items-center gap-2"><Plus className="w-5 h-5" /> เพิ่มบุคลากร</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {staffList.map((person, i) => (
                <div key={i} className={`bg-slate-50 p-5 rounded-3xl border-2 relative group ${person.showOnHome !== false ? 'border-orange-500' : 'border-white'}`}>
                  <button type="button" onClick={() => deleteStaff(i)} className="absolute -top-3 -right-3 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                  <div className="relative w-20 h-20 mx-auto mb-4 group/img">
                    <div className="w-full h-full bg-green-100 rounded-2xl flex items-center justify-center text-green-700 overflow-hidden">
                      {person.img ? <img src={person.img} className="w-full h-full object-cover" /> : <UserCheck className="w-10 h-10" />}
                    </div>
                    <label className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover/img:opacity-100 cursor-pointer">
                      <Upload className="text-white w-5 h-5" />
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleStaffImage(i, e.target.files[0])} />
                    </label>
                  </div>
                  <input type="text" value={person.name} onChange={e => handleStaffChange(i, 'name', e.target.value)} className="w-full p-2 bg-white border border-slate-100 rounded-lg font-bold text-xs text-center mb-2" placeholder="ชื่อ-นามสกุล" />
                  <input type="text" value={person.pos} onChange={e => handleStaffChange(i, 'pos', e.target.value)} className="w-full p-2 bg-white border border-slate-100 rounded-lg text-[10px] text-center text-slate-500" placeholder="ตำแหน่ง" />
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-center">
                     <label className="flex items-center gap-2 cursor-pointer">
                       <input type="checkbox" checked={person.showOnHome !== false} onChange={e => handleStaffChange(i, 'showOnHome', e.target.checked)} className="w-4 h-4 accent-orange-500" />
                       <span className="text-[10px] font-black uppercase">โชว์บนหน้าแรก</span>
                     </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    );
  };

  // ==========================================
  // 🌟 NEWS VIEW (จัดการข่าวสาร พร้อมฟังก์ชันอัปเกรดใหม่)
  // ==========================================
  const NewsView = () => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    
    const initialForm = { title: '', category: 'ข่าวสารทั่วไป', excerpt: '', content: '', img: '', storagePath: '', altText: '' };
    const [formData, setFormData] = useState(initialForm);
    const [pendingFile, setPendingFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    const fileInputRef = useRef(null);
    
    // 🌟 เพิ่ม Ref และ State สำหรับ "แทรกรูปภาพในเนื้อหา"
    const contentFileInputRef = useRef(null);
    const [isContentImageUploading, setIsContentImageUploading] = useState(false);

    useEffect(() => {
      const fetchNews = async () => {
        try {
          const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
          const snap = await getDocs(q);
          const fetchedNews = [];
          snap.forEach(doc => fetchedNews.push({ id: doc.id, ...doc.data() }));
          setNews(fetchedNews);
        } catch (error) { console.error(error); } finally { setIsLoading(false); }
      };
      fetchNews();
    }, []);

    const handleFileSelect = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const compressedFile = await compressImage(file, 1200, 0.8);
        setPendingFile(compressedFile);
        setPreviewUrl(URL.createObjectURL(compressedFile));
      } catch (error) { alert("เกิดข้อผิดพลาด"); }
    };

    // 🌟 ฟังก์ชันจัดการปุ่ม "แทรกรูปภาพลงในเนื้อหา"
    const handleContentImageSelect = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setIsContentImageUploading(true);
      try {
        const compressedFile = await compressImage(file, 1000, 0.8);
        const storageRef = ref(storage, `news_content/${Date.now()}_${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, compressedFile);
        const downloadURL = await getDownloadURL(uploadTask.ref);

        // แทรกโค้ด HTML รูปภาพลงไปใน Textarea
        const imgTag = `\n<img src="${downloadURL}" alt="content-image" class="w-full rounded-2xl shadow-lg my-6 object-cover" />\n`;
        insertHTMLTag(imgTag, '');
      } catch (error) {
        alert("อัปโหลดรูปภาพแทรกเนื้อหาไม่สำเร็จ");
      } finally {
        setIsContentImageUploading(false);
        if (contentFileInputRef.current) contentFileInputRef.current.value = '';
      }
    };

    // 🌟 ฟังก์ชันจัดการปุ่ม "จัดย่อหน้าอัตโนมัติ" (แปลง Enter เป็น <br/>)
    const handleFormatNewlines = () => {
      const text = formData.content;
      if (!text) return;
      // แปลง Enter (\n) ที่ยังไม่มี <br/> ให้กลายเป็น <br/>\n
      const formattedText = text.replace(/(?:\r\n|\r|\n)(?!<br\s*\/?>)/g, '<br/>\n');
      setFormData({ ...formData, content: formattedText });
      alert("✅ จัดระเบียบการเว้นบรรทัดเรียบร้อยแล้ว!");
    };

    const openAddModal = () => { setEditingId(null); setFormData(initialForm); setPendingFile(null); setPreviewUrl(null); setIsModalOpen(true); };
    const openEditModal = (item) => { setEditingId(item.id); setFormData({ content: '', ...item }); setPendingFile(null); setPreviewUrl(item.img); setIsModalOpen(true); };

    const handleDelete = async (id, storagePath) => {
      if(window.confirm('ยืนยันการลบข่าวสารนี้?')) {
        try {
          await deleteDoc(doc(db, "news", id));
          if (storagePath) { await deleteObject(ref(storage, storagePath)); }
          setNews(news.filter(n => n.id !== id));
        } catch (error) { alert("ลบไม่สำเร็จ"); }
      }
    };
    
    const generateSlug = (text) => {
    return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // เปลี่ยนช่องว่างเป็นขีด
    .replace(/[^\w\-]+/g, '')       // เก็บเฉพาะภาษาอังกฤษและตัวเลข (ลบภาษาไทยออกจาก URL)
    .replace(/\-\-+/g, '-')         // ลบขีดซ้ำ
    .replace(/^-+/, '').replace(/-+$/, '');
};

    const handleSave = async (e) => {
      e.preventDefault();
      setIsUploading(true);
      let finalImageUrl = formData.img;
      let finalStoragePath = formData.storagePath;

      if (pendingFile) {
        const storageRef = ref(storage, `news/${Date.now()}_${pendingFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, pendingFile);
        try {
          await new Promise((resolve, reject) => { uploadTask.on('state_changed', null, reject, resolve); });
          finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          finalStoragePath = uploadTask.snapshot.ref.fullPath;
        } catch (error) { alert("อัปโหลดไม่สำเร็จ"); setIsUploading(false); return; }
      }

      const newsDataToSave = { ...formData, img: finalImageUrl, storagePath: finalStoragePath, updatedAt: serverTimestamp() };

try {
        if (editingId) {
          // กรณีแก้ไขข่าวเดิม (ใช้ ID เดิม)
          await updateDoc(doc(db, "news", editingId), newsDataToSave);
          setNews(news.map(n => n.id === editingId ? { ...n, ...newsDataToSave } : n));
          
        } else {
          // 🌟 กรณีสร้างข่าวใหม่ (อัปเกรดระบบ Slug ภาษาอังกฤษ)
          
          // 1. ถ้าครูกรอก slug มาให้ใช้ตัวนั้น ถ้าไม่กรอกให้ระบบสร้างให้จากชื่อ (เอาเฉพาะ Eng)
          let customSlug = formData.slug ? formData.slug : generateShortSlug(formData.title);
          
          // 2. ป้องกันกรณีตั้งชื่อ "ภาษาไทยล้วน" แล้วระบบแปลงเป็น Eng ไม่ได้เลย (มันจะว่างเปล่า) ให้สุ่มรหัสสั้นๆ ให้แทน
          if (!customSlug) {
            customSlug = "news-" + Math.random().toString(36).substring(7); 
          }

          // 3. เช็คว่าชื่อลิงก์นี้ซ้ำกับข่าวอื่นในฐานข้อมูลไหม ถ้าซ้ำให้เติมตัวเลขต่อท้าย
          const checkDoc = await getDoc(doc(db, "news", customSlug));
          if (checkDoc.exists()) {
            customSlug = `${customSlug}-${Date.now().toString().slice(-4)}`;
          }

          newsDataToSave.createdAt = serverTimestamp();
          
          // 4. บันทึกโดยใช้ customSlug เป็น ID
          await setDoc(doc(db, "news", customSlug), newsDataToSave);
          setNews([{ id: customSlug, ...newsDataToSave }, ...news]);
        }
        setIsModalOpen(false);
      } catch (error) { 
        alert("บันทึกไม่สำเร็จ"); 
      } finally { 
        setIsUploading(false); 
      }
    };

    const insertHTMLTag = (openTag, closeTag) => {
      const textarea = document.getElementById('news-content-textarea');
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData.content || '';
      
      const before = text.substring(0, start);
      const selected = text.substring(start, end);
      const after = text.substring(end);
      
      setFormData({
        ...formData,
        content: before + openTag + selected + closeTag + after
      });
      setTimeout(() => textarea.focus(), 10);
    };

    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-orange-500 decoration-4 underline-offset-8">จัดการข่าวสาร</h2>
            <p className="text-slate-400 text-sm mt-3 font-medium">อัปเดตข่าวสาร กิจกรรม และความเคลื่อนไหวของค่าย</p>
          </div>
          <button onClick={openAddModal} className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl active:scale-95"><Plus /> เพิ่มข่าวใหม่</button>
        </div>

        {isLoading ? <div className="flex justify-center h-32 items-center"><Loader2 className="w-8 h-8 animate-spin text-orange-500" /></div> : news.length === 0 ? (
          <div className="text-center py-20 text-slate-400 font-bold bg-white rounded-[3rem] border-4 border-dashed border-slate-100">ยังไม่มีข่าวสาร เริ่มเพิ่มข่าวแรกได้เลย!</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all">
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img src={item.img || 'https://via.placeholder.com/400x300'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase">{item.category}</div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="font-black text-slate-800 text-lg mb-2 line-clamp-2">{item.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-2 mb-6 flex-1">{item.excerpt}</p>
                  <div className="flex justify-end gap-2 mt-auto border-t border-slate-100 pt-4">
                    <button onClick={() => openEditModal(item)} className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-orange-500 hover:text-white transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id, item.storagePath)} className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-rose-500 hover:text-white transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
              <div className="w-full space-y-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-2xl font-black text-slate-800">{editingId ? 'แก้ไขข่าวสาร' : 'เพิ่มข่าวสารใหม่'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500"><X /></button>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-2/3">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">หัวข้อข่าว</label>
                    <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold" />
                  </div>
                  <div>
  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">URL Slug (ลิงก์ภาษาอังกฤษ)</label>
  <input 
    type="text" 
    placeholder="เช่น camp-3days (ถ้าไม่กรอก ระบบจะดึงจากหัวข้อข่าว)"
    value={formData.slug || ''} 
    onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-orange-500" 
  />
</div>
                  <div className="w-full sm:w-1/3">
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">หมวดหมู่</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold">
                      <option value="ข่าวสารทั่วไป">ข่าวสารทั่วไป</option>
                      <option value="กิจกรรมโรงเรียน">กิจกรรมโรงเรียน</option>
                      <option value="อัปเดตสถานที่">อัปเดตสถานที่</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">คำอธิบายสั้นๆ (แสดงบนการ์ด)</label>
                  <textarea rows="2" required placeholder="พิมพ์ข้อความธรรมดาเท่านั้น..." value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium resize-none"></textarea>
                </div>

                {/* 🌟 เครื่องมือแต่งบทความที่ได้รับการอัปเกรดแล้ว */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2 flex justify-between">
                     <span>เนื้อหาข่าวฉบับเต็ม</span>
                     <span className="text-orange-500 font-medium normal-case">สามารถก๊อปปี้จาก Word มาวางได้เลยครับ</span>
                  </label>
                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    
                    <div className="bg-slate-100 p-2 flex gap-3 border-b border-slate-200 overflow-x-auto whitespace-nowrap items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase mr-2 shrink-0">ตัวช่วยแต่งบทความ :</span>
                      
                      {/* จัดรูปแบบข้อความ */}
                      <div className="flex items-center gap-1 border-r border-slate-300 pr-3 shrink-0">
                         <button type="button" onClick={() => insertHTMLTag('<strong>', '</strong>')} className="p-2 hover:bg-white rounded shadow-sm text-slate-700" title="ตัวหนา"><Bold className="w-4 h-4"/></button>
                         <button type="button" onClick={() => insertHTMLTag('<em>', '</em>')} className="p-2 hover:bg-white rounded shadow-sm text-slate-700" title="ตัวเอียง"><Italic className="w-4 h-4"/></button>
                         <button type="button" onClick={() => insertHTMLTag('<h2>', '</h2>')} className="p-2 hover:bg-white rounded font-black shadow-sm text-slate-700 text-xs">H2</button>
                         <button type="button" onClick={() => insertHTMLTag('<h3>', '</h3>')} className="p-2 hover:bg-white rounded font-bold shadow-sm text-slate-700 text-xs">H3</button>
                      </div>

                      {/* แทรกสื่อ */}
                      <div className="flex items-center gap-1 border-r border-slate-300 pr-3 shrink-0">
                         <button type="button" onClick={() => insertHTMLTag('<a href="ใส่ลิงก์ที่นี่" target="_blank" class="text-orange-500 underline font-bold">', '</a>')} className="p-2 hover:bg-white rounded shadow-sm text-slate-700" title="แทรกลิงก์"><LinkIcon className="w-4 h-4"/></button>
                         
                         {/* 🌟 ปุ่มแทรกรูปภาพลงเนื้อหา */}
                         <input type="file" accept="image/*" ref={contentFileInputRef} onChange={handleContentImageSelect} className="hidden" />
                         <button type="button" onClick={() => contentFileInputRef.current.click()} disabled={isContentImageUploading} className="p-2 hover:bg-white rounded shadow-sm text-orange-600 font-bold text-xs flex items-center gap-1" title="แทรกรูปภาพลงในเนื้อหาข่าว">
                           {isContentImageUploading ? <Loader2 className="animate-spin w-4 h-4" /> : <ImageIcon className="w-4 h-4" />} แทรกรูปภาพ
                         </button>
                         {/* 🌟 ปุ่มแทรก Embed (อัปเกรดแก้ปัญหาความสูงและ Warning) 🌟 */}
<button 
  type="button" 
  onClick={() => { 
    let code = prompt("วางโค้ด Embed (iframe) ที่นี่:"); 
    if(code) {
      // 1. คลีนโค้ดเพื่อแก้ Warning สีเหลืองในหน้าเว็บ
      code = code.replace(/allowfullscreen="allowfullscreen"/g, 'allowFullScreen');
      
      // 2. ห่อหุ้มด้วย div ที่บังคับสัดส่วน 16:9 (Responsive Iframe) ทำให้ Canva แสดงผลพอดี 100%
      const wrapper = `\n<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;" class="my-8 rounded-[2rem] shadow-2xl border border-slate-100 w-full">${code}</div>\n`;
      
      insertHTMLTag(wrapper, ''); 
    }
  }} 
  className="p-2 px-3 bg-purple-50 text-purple-600 rounded-lg text-xs font-black flex items-center gap-1 shadow-sm"
>
  แทรกโค้ด Embed
</button>
                      </div>

                      {/* จัดบรรทัด */}
                      <div className="flex items-center gap-1 shrink-0">
                         <button type="button" onClick={() => insertHTMLTag('<br/>\n', '')} className="p-2 hover:bg-white rounded shadow-sm text-slate-700" title="ขึ้นบรรทัดใหม่ 1 บรรทัด"><CornerDownLeft className="w-4 h-4"/></button>
                         
                         {/* 🌟 ปุ่มแปลง Enter เป็น <br/> อัตโนมัติ */}
                         <button type="button" onClick={handleFormatNewlines} className="p-2 hover:bg-white rounded shadow-sm text-green-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1 bg-green-50 border border-green-200 ml-2" title="กดปุ่มนี้หลังจากก๊อปปี้ข้อความมาวาง เพื่อให้มันเว้นบรรทัดให้เอง">
                            <Sparkles className="w-3 h-3" /> แปลงการเว้นบรรทัดอัตโนมัติ
                         </button>
                      </div>
                    </div>

                    <textarea 
                      id="news-content-textarea"
                      rows="12" 
                      placeholder="พิมพ์เนื้อหาข่าว หรือก๊อปปี้บทความมาวางที่นี่... จากนั้นกดปุ่ม [แปลงการเว้นบรรทัดอัตโนมัติ] ด้านบนครับ"
                      value={formData.content} 
                      onChange={e => setFormData({...formData, content: e.target.value})} 
                      className="w-full px-4 py-3 bg-white font-medium resize-y outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500/20"
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">รูปภาพหน้าปก</label>
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                  <div className="flex gap-4 items-center">
                    <button type="button" onClick={() => fileInputRef.current.click()} className="px-6 py-4 bg-orange-50 text-orange-600 rounded-xl font-bold text-sm"><ImageIcon className="w-5 h-5 inline mr-2" /> เลือกรูปหน้าปก</button>
                    {previewUrl && <img src={previewUrl} className="w-20 h-20 rounded-xl object-cover border border-slate-200" alt="preview" />}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Alt Text (คำอธิบายรูปภาพสำหรับ Google)</label>
                  <input 
                    type="text" 
                    placeholder="เช่น รูปเด็กนักเรียนกำลังทำกิจกรรมรอบกองไฟ" 
                    value={formData.altText || ''} 
                    onChange={e => setFormData({...formData, altText: e.target.value})} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none focus:border-orange-500" 
                  />
                </div>

                <div className="flex gap-4 pt-6 mt-6 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-xl font-bold">ยกเลิก</button>
                  <button onClick={handleSave} disabled={isUploading} className="flex-1 py-4 bg-orange-500 text-white rounded-xl font-black shadow-lg hover:bg-orange-600">{isUploading ? <Loader2 className="animate-spin inline" /> : 'บันทึกข่าวสาร'}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // ACTIVITIES VIEW (จัดการกิจกรรม/แผนที่)
  // ==========================================
  const ActivitiesView = () => {
    const [bases, setBases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ id_number: '', name: '', desc: '', top: '50%', left: '50%', img: '', storagePath: '' });
    const [pendingFile, setPendingFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
      const fetchBases = async () => {
        try {
          const q = query(collection(db, "adventure_bases"), orderBy("id_number", "asc"));
          const querySnapshot = await getDocs(q);
          const fetchedBases = [];
          querySnapshot.forEach((doc) => fetchedBases.push({ id: doc.id, ...doc.data() }));
          setBases(fetchedBases);
        } catch (error) { console.error(error); } finally { setIsLoading(false); }
      };
      fetchBases();
    }, []);

    const handleFileSelect = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const compressedFile = await compressImage(file, 1200, 0.8);
        setPendingFile(compressedFile);
        setPreviewUrl(URL.createObjectURL(compressedFile));
      } catch (error) { alert("เกิดข้อผิดพลาด"); }
    };

    const handleMapClick = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setFormData({...formData, left: `${x.toFixed(1)}%`, top: `${y.toFixed(1)}%`});
    };

    const openAddModal = () => { setEditingId(null); setFormData({ id_number: bases.length + 1, name: '', desc: '', top: '50%', left: '50%', img: '', storagePath: '' }); setPendingFile(null); setPreviewUrl(null); setIsModalOpen(true); };
    const openEditModal = (base) => { setEditingId(base.id); setFormData(base); setPendingFile(null); setPreviewUrl(base.img); setIsModalOpen(true); };
    const handleDelete = async (id, storagePath) => {
      if(window.confirm('ยืนยันการลบฐานกิจกรรมนี้?')) {
        await deleteDoc(doc(db, "adventure_bases", id));
        if (storagePath) await deleteObject(ref(storage, storagePath));
        setBases(bases.filter(b => b.id !== id));
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
          await new Promise((resolve, reject) => { uploadTask.on('state_changed', null, reject, resolve); });
          finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          finalStoragePath = uploadTask.snapshot.ref.fullPath;
        } catch (error) { alert("อัปโหลดไม่สำเร็จ"); setIsUploading(false); return; }
      }

      const baseDataToSave = { id_number: Number(formData.id_number), name: formData.name, desc: formData.desc, top: formData.top, left: formData.left, img: finalImageUrl, storagePath: finalStoragePath, updatedAt: serverTimestamp() };

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
      } catch (error) { alert("บันทึกไม่สำเร็จ"); } finally { setIsUploading(false); }
    };

    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-orange-500 decoration-4">จัดการฐานกิจกรรม</h2>
            <p className="text-slate-400 text-sm mt-3">จัดการจุดปักหมุดบนแผนที่ Interactive</p>
          </div>
          <button onClick={openAddModal} className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black"><Plus className="inline mr-2" /> เพิ่มฐานใหม่</button>
        </div>

        {/* ตาราง/การ์ดแสดงฐาน */}
        {isLoading ? <div className="flex justify-center"><Loader2 className="animate-spin text-orange-500 w-10 h-10" /></div> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bases.map((base) => (
              <div key={base.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex gap-4 items-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 relative overflow-hidden">
                  {base.img ? <img src={base.img} className="w-full h-full object-cover" /> : <Map className="w-8 h-8 m-4 text-slate-300" />}
                  <div className="absolute top-0 left-0 bg-orange-500 text-white w-6 h-6 flex justify-center items-center font-bold text-xs">{base.id_number}</div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-bold truncate">{base.name}</h4>
                  <p className="text-xs text-slate-400">พิกัด: {base.top}, {base.left}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => openEditModal(base)} className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-orange-500 hover:text-white"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(base.id, base.storagePath)} className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-rose-500 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal เพิ่มฐาน */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 space-y-5">
                <h3 className="text-2xl font-black">{editingId ? 'แก้ไขฐาน' : 'เพิ่มฐานใหม่'}</h3>
                <div className="flex gap-4">
                  <input type="number" placeholder="หมายเลข" value={formData.id_number} onChange={e => setFormData({...formData, id_number: e.target.value})} className="w-1/3 p-3 bg-slate-50 border rounded-xl" />
                  <input type="text" placeholder="ชื่อฐาน" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-2/3 p-3 bg-slate-50 border rounded-xl" />
                </div>
                <textarea rows="3" placeholder="รายละเอียด" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl"></textarea>
                <div className="flex items-center gap-4">
                  <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-3 bg-slate-100 rounded-xl font-bold text-sm">เลือกรูปภาพ</button>
                  {previewUrl && <img src={previewUrl} className="w-12 h-12 rounded-lg object-cover" />}
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">ยกเลิก</button>
                  <button onClick={handleSave} disabled={isUploading} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-black">{isUploading ? 'กำลังบันทึก...' : 'บันทึก'}</button>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col">
                <p className="text-sm font-bold text-orange-600 mb-2">คลิกเพื่อปักหมุด</p>
                <div className="w-full h-[300px] bg-slate-200 rounded-[2rem] relative bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800')] bg-cover bg-center cursor-crosshair" onClick={handleMapClick}>
                   <div className="absolute w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-black shadow-lg transform -translate-x-1/2 -translate-y-1/2 border-2 border-white" style={{ top: formData.top, left: formData.left }}>{formData.id_number || '?'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // PACKAGES VIEW (จัดการแพ็กเกจ)
  // ==========================================
  const PackagesView = () => {
    const [packages, setPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const initialForm = { title: '',slug: '', price: '', unit: '/ ท่าน', subtitle: '', note: '', features: [''], isPopular: false, order: 1 };
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
      const fetchPackages = async () => {
        try {
          const q = query(collection(db, "packages"), orderBy("order", "asc"));
          const snap = await getDocs(q);
          const pkgs = [];
          snap.forEach(doc => pkgs.push({ id: doc.id, ...doc.data() }));
          setPackages(pkgs);
        } catch (error) { console.error(error); } finally { setIsLoading(false); }
      };
      fetchPackages();
    }, []);

    const openAddModal = () => { setEditingId(null); setFormData(initialForm); setIsModalOpen(true); };
    const openEditModal = (pkg) => { setEditingId(pkg.id); setFormData(pkg); setIsModalOpen(true); };
    const handleDelete = async (id) => {
      if(window.confirm('ยืนยันการลบแพ็กเกจนี้?')) {
        await deleteDoc(doc(db, "packages", id));
        setPackages(packages.filter(p => p.id !== id));
      }
    };

    const handleSave = async (e) => {
      e.preventDefault();
      setIsSaving(true);
      try {
        const dataToSave = { ...formData, features: formData.features.filter(f => f.trim() !== '') };
        if (editingId) {
          await updateDoc(doc(db, "packages", editingId), dataToSave);
          setPackages(packages.map(p => p.id === editingId ? { ...p, ...dataToSave } : p).sort((a,b) => a.order - b.order));
        } else {
          const docRef = await addDoc(collection(db, "packages"), dataToSave);
          setPackages([...packages, { id: docRef.id, ...dataToSave }].sort((a,b) => a.order - b.order));
        }
        setIsModalOpen(false);
      } catch (error) { alert('บันทึกไม่สำเร็จ'); } finally { setIsSaving(false); }
    };

    const updateFeatureField = (index, val) => { const newF = [...formData.features]; newF[index] = val; setFormData({ ...formData, features: newF }); };
    const removeFeatureField = (index) => { const newF = [...formData.features]; newF.splice(index, 1); setFormData({ ...formData, features: newF }); };

    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black tracking-tight uppercase italic underline decoration-orange-500 decoration-4">จัดการแพ็กเกจ</h2>
          <button onClick={openAddModal} className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black"><Plus className="inline mr-2" /> เพิ่มแพ็กเกจ</button>
        </div>

        {isLoading ? <div className="flex justify-center py-20"><Loader2 className="animate-spin text-orange-500" /></div> : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`p-8 rounded-[2.5rem] border relative ${pkg.isPopular ? 'bg-green-900 border-orange-500 text-white' : 'bg-white border-slate-200'}`}>
                {pkg.isPopular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-6 py-1 rounded-full text-xs font-black">ยอดนิยม</div>}
                <div className="flex justify-between mb-4">
                  <h3 className="text-2xl font-black">{pkg.title}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(pkg)} className="text-slate-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(pkg.id)} className="text-rose-400 hover:text-white"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="text-4xl font-black mb-4">{pkg.price} <span className="text-sm font-normal">{pkg.unit}</span></div>
                <ul className="space-y-2 text-sm opacity-80">
                  {pkg.features.map((f, i) => <li key={i}>✓ {f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Modal Packages */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8">
              <h3 className="text-2xl font-black mb-6">{editingId ? 'แก้ไขแพ็กเกจ' : 'เพิ่มแพ็กเกจ'}</h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="flex gap-4">
                  <input type="text" placeholder="ชื่อ" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-1/2 p-3 bg-slate-50 border rounded-xl" />
                  <input type="text" placeholder="ราคา" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-1/4 p-3 bg-slate-50 border rounded-xl" />
                  <input type="text" placeholder="หน่วย" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-1/4 p-3 bg-slate-50 border rounded-xl" />
                </div>
                <input type="text" placeholder="คำอธิบายสั้นๆ" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-3 bg-slate-50 border rounded-xl" />
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block font-bold mb-2">รายการในแพ็กเกจ</label>
                  {formData.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="text" value={feat} onChange={e => updateFeatureField(idx, e.target.value)} className="flex-1 p-2 border rounded-lg" />
                      <button type="button" onClick={() => removeFeatureField(idx)} className="p-2 text-rose-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setFormData({ ...formData, features: [...formData.features, ''] })} className="text-orange-500 font-bold text-sm mt-2">+ เพิ่มรายการ</button>
                </div>
                <label className="flex items-center gap-2 cursor-pointer mt-4">
                  <input type="checkbox" checked={formData.isPopular} onChange={e => setFormData({...formData, isPopular: e.target.checked})} className="w-5 h-5 accent-orange-500" />
                  <span className="font-bold">ตั้งเป็นแพ็กเกจ "ยอดนิยม"</span>
                </label>
                <div className="flex gap-4 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">ยกเลิก</button>
                  <button type="submit" disabled={isSaving} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold">{isSaving ? 'กำลังบันทึก...' : 'บันทึก'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // GALLERY VIEW (จัดการแกลลอรี่ พร้อม Edit)
  // ==========================================
  const GalleryView = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [filter, setFilter] = useState('ทั้งหมด');
    
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editingId, setEditingId] = useState(null); 
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
          querySnapshot.forEach((doc) => fetchedImages.push({ id: doc.id, ...doc.data() }));
          setImages(fetchedImages);
        } catch (error) { console.error(error); } finally { setIsLoading(false); }
      };
      fetchImages();
    }, []);

    const handleFileSelect = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const compressedFile = await compressImage(file, 1200, 0.8);
        setPendingFile(compressedFile);
        setPreviewUrl(URL.createObjectURL(compressedFile)); 
        
        if (!editingId) {
          setImageName(''); 
          setImageCategory(filter === 'ทั้งหมด' ? 'กิจกรรม' : filter); 
          setShowUploadModal(true); 
        }
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (error) { alert("เกิดข้อผิดพลาด"); }
    };

    const openAddModal = () => {
      setEditingId(null);
      setPendingFile(null);
      setPreviewUrl(null);
      setImageName('');
      setImageCategory('กิจกรรม');
      fileInputRef.current.click(); 
    };

    const openEditModal = (img) => {
      setEditingId(img.id);
      setImageName(img.name);
      setImageCategory(img.category);
      setPreviewUrl(img.src);
      setPendingFile(null); 
      setShowUploadModal(true);
    };

    const confirmUpload = async () => {
      if (!imageName.trim()) return alert('กรุณาระบุชื่อภาพ');
      setIsUploading(true);
      
      let finalImageUrl = previewUrl;
      let finalStoragePath = '';

      if (editingId) {
         const existingImg = images.find(i => i.id === editingId);
         if (existingImg) finalStoragePath = existingImg.storagePath || '';
      }

      if (pendingFile) {
        const file = pendingFile;
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        try {
          await new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
              (snapshot) => setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100), 
              reject, resolve);
          });
          finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          finalStoragePath = uploadTask.snapshot.ref.fullPath;
        } catch (error) {
          alert("อัปโหลดไฟล์ไม่สำเร็จ");
          setIsUploading(false);
          return;
        }
      }

      const imgData = { 
        name: imageName, 
        category: imageCategory, 
        src: finalImageUrl, 
        storagePath: finalStoragePath, 
        updatedAt: serverTimestamp() 
      };

      try {
        if (editingId) {
          await updateDoc(doc(db, "gallery", editingId), imgData);
          setImages(images.map(img => img.id === editingId ? { ...img, ...imgData } : img));
        } else {
          imgData.createdAt = serverTimestamp();
          const docRef = await addDoc(collection(db, "gallery"), imgData);
          setImages([{ id: docRef.id, ...imgData }, ...images]);
        }
      } catch (err) {
        console.error(err);
        alert("บันทึกข้อมูลไม่สำเร็จ");
      }

      setShowUploadModal(false);
      setIsUploading(false);
      setUploadProgress(0);
    };

    const handleDelete = async (id, storagePath) => {
      if(window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพนี้แบบถาวร?')) {
        try {
          await deleteDoc(doc(db, "gallery", id));
          if (storagePath) await deleteObject(ref(storage, storagePath));
          setImages(images.filter(img => img.id !== id));
        } catch (err) {
          console.error("Delete Error: ", err);
          setImages(images.filter(img => img.id !== id)); 
        }
      }
    };

    const filteredImages = filter === 'ทั้งหมด' ? images : images.filter(img => img.category === filter);

    return (
      <div className="space-y-10 animate-in fade-in duration-500 pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-black uppercase italic underline decoration-orange-500 decoration-4">จัดการแกลลอรี่ภาพ</h2>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
          <button onClick={openAddModal} disabled={isUploading} className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-black">
            {isUploading ? `กำลังอัปโหลด ${Math.round(uploadProgress)}%` : "อัปโหลดรูปภาพ"}
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
           {['ทั้งหมด', 'กิจกรรม', 'สถานที่', 'ห้องพัก', 'อาหาร', 'บุคลากร'].map((cat, i) => (
             <button key={i} onClick={() => setFilter(cat)} className={`px-6 py-2 rounded-xl text-xs font-bold ${filter === cat ? 'bg-green-950 text-white' : 'bg-white text-slate-500'}`}>
               {cat}
             </button>
           ))}
        </div>

        {isLoading ? <div className="flex justify-center"><Loader2 className="animate-spin text-orange-500" /></div> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {filteredImages.map((img) => (
               <div key={img.id} className="bg-white rounded-3xl overflow-hidden shadow-sm group border border-slate-100 flex flex-col">
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                     <img src={img.src} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                     <div className="absolute top-2 left-2 bg-green-900/80 px-3 py-1 rounded-lg text-[10px] text-white font-bold">{img.category}</div>
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                        <button onClick={() => openEditModal(img)} className="p-3 bg-white rounded-xl text-slate-700 hover:text-orange-500 transition-colors shadow-lg"><Edit className="w-5 h-5" /></button>
                        <button onClick={() => handleDelete(img.id, img.storagePath)} className="p-3 bg-white rounded-xl text-rose-500 hover:text-white hover:bg-rose-500 transition-colors shadow-lg"><Trash2 className="w-5 h-5" /></button>
                     </div>
                  </div>
                  <div className="p-4 flex-1">
                    <h4 className="font-bold text-sm truncate text-slate-800">{img.name}</h4>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* Modal เพิ่ม/แก้ไข ข้อมูลรูป */}
        {showUploadModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative">
              <h3 className="text-xl font-black mb-4 text-slate-800">{editingId ? 'แก้ไขข้อมูลรูปภาพ' : 'รายละเอียดรูปภาพ'}</h3>
              
              <div className="relative group rounded-xl overflow-hidden mb-4 border border-slate-200">
                <img src={previewUrl} className="w-full h-48 object-cover" alt="Preview" />
                <button onClick={() => fileInputRef.current.click()} className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center font-bold transition-opacity">
                  เปลี่ยนรูป
                </button>
              </div>
              
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">ชื่อภาพ</label>
              <input type="text" placeholder="ชื่อภาพ" value={imageName} onChange={e => setImageName(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 rounded-xl mb-4 font-bold" />
              
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">หมวดหมู่</label>
              <select value={imageCategory} onChange={e => setImageCategory(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 outline-none focus:border-orange-500 rounded-xl mb-6 font-bold">
                {['กิจกรรม', 'สถานที่', 'ห้องพัก', 'อาหาร', 'บุคลากร'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>

              <div className="flex gap-4">
                <button onClick={() => setShowUploadModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">ยกเลิก</button>
                <button onClick={confirmUpload} disabled={isUploading} className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 shadow-md">
                  {isUploading ? <Loader2 className="animate-spin mx-auto w-5 h-5" /> : (editingId ? 'บันทึกการแก้ไข' : 'อัปโหลด')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ==========================================
  // RENDER CONTENT (ฟังก์ชันรวม)
  // ==========================================
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'homepage': return <HomepageView />;
      case 'news': return <NewsView />;
      case 'gallery': return <GalleryView />;
      case 'activities': return <ActivitiesView />;
      case 'packages': return <PackagesView />;
      case 'bookings': return (
        <div className="space-y-8 h-full animate-in fade-in duration-500">
          <div className="flex justify-between items-center">
            <div>
               <h2 className="text-3xl font-black italic underline decoration-orange-500 decoration-4">ปฏิทินการจอง</h2>
            </div>
            <a href="https://calendar.google.com" target="_blank" className="bg-[#064e3b] text-white px-8 py-4 rounded-2xl font-black shadow-xl flex items-center gap-2 hover:bg-orange-500">
              <ExternalLink className="w-5 h-5" /> เปิด Calendar
            </a>
          </div>
          <iframe src="https://calendar.google.com/calendar/embed?src=suppamascamp@gmail.com&ctz=Asia%2FBangkok" className="w-full h-[75vh] bg-white rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden"></iframe>
        </div>
      );
      default: return <div className="py-20 text-center font-bold">กำลังพัฒนาระบบ...</div>;
    }
  };

  // ==========================================
  // MAIN RENDER (โครงสร้างหลักของหน้า)
  // ==========================================
  return (
    <div className="fixed inset-0 flex bg-slate-50 font-sans text-slate-900 overflow-hidden z-[100]">
      <nav className="w-64 bg-[#064e3b] text-white flex flex-col p-6 gap-2 shrink-0 relative z-20 hidden md:flex">
         <div className="flex items-center gap-3 mb-10 mt-2 px-2">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center rotate-3 shadow-lg"><Tent className="text-white w-6 h-6" /></div>
            <span className="font-black text-xl tracking-tight italic">AdminPanel</span>
         </div>
         {menuItems.map(item => (
           <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-orange-500 shadow-lg' : 'hover:bg-green-900'}`}>
             <item.icon className="w-5 h-5" /> {item.label}
           </button>
         ))}
         <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5">
            {/* 🌟 ใช้งาน handleLogout ตรงนี้ด้วย */}
            <button onClick={handleLogout} className="w-full py-2 text-xs font-black text-rose-300 hover:bg-rose-500/10 rounded-xl uppercase tracking-widest">Logout</button>
         </div>
      </nav>
      
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center px-6 shrink-0 justify-between">
          <span className="font-black text-xl text-green-950 italic">AdminPanel</span>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-slate-100 rounded-xl"><Menu /></button>
        </header>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-green-950/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative w-64 bg-[#064e3b] h-full p-6 flex flex-col gap-2">
              <button className="absolute top-6 right-6 text-white" onClick={() => setIsMobileMenuOpen(false)}><X /></button>
              <div className="text-white font-black text-2xl mb-8 mt-2 italic">Menu</div>
              {menuItems.map(item => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all text-left ${activeTab === item.id ? 'bg-orange-500 text-white' : 'text-green-100 hover:bg-green-900'}`}>
                  <item.icon className="w-5 h-5" /> {item.label}
                </button>
              ))}
              {/* 🌟 ใช้งาน handleLogout บนมือถือด้วย */}
              <button onClick={handleLogout} className="mt-auto flex items-center gap-3 p-4 rounded-2xl font-bold text-rose-300 hover:bg-rose-500/10 text-left">
                Logout
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-10 bg-slate-50/50 relative custom-scrollbar">
          <div className="max-w-6xl mx-auto pb-20">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}