"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Home, Tent, Package, CalendarDays, 
  Image as ImageIcon, Settings, Menu, X, Bell, Plus, 
  Trash2, Search, TrendingUp, Users, Upload, Eye, 
  Lock, Mail, ArrowRight, ShieldCheck, Loader2
} from 'lucide-react';

// 📌 อัปเดต Path: วิ่งจาก app/admin ถอยหลัง 2 ก้าวไปหา src/lib/firebase
import { db, storage } from '../../src/lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const [activeTab, setActiveTab] = useState('gallery'); 
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

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsAuthenticated(true);
    }, 1000);
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-50 flex items-center justify-center p-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-96 bg-[#064e3b] transform -skew-y-6 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]"></div>
        <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-500 border border-slate-100">
          <div className="w-full md:w-5/12 bg-[#064e3b] p-10 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
             <div className="absolute inset-0 bg-black/20 opacity-20 bg-cover bg-center mix-blend-overlay"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-12 opacity-80">
                  <Tent className="w-8 h-8 text-orange-500" />
                  <span className="font-bold text-xl tracking-tight">Suppamas<span className="text-orange-500">Camp</span></span>
                </div>
                <h2 className="text-4xl font-black mb-4 leading-tight">Admin<br/>Workspace</h2>
                <p className="text-green-100/70 font-light leading-relaxed">ระบบจัดการเนื้อหาและการจองสำหรับเจ้าหน้าที่ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี</p>
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'ยอดจองที่รออนุมัติ', value: '0', icon: CalendarDays, color: 'text-orange-500', bg: 'bg-orange-100' },
          { title: 'จำนวนรูปภาพทั้งหมด', value: 'Loading..', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-100' },
          { title: 'โรงเรียนเดือนนี้', value: '0', icon: Users, color: 'text-green-500', bg: 'bg-green-100' },
          { title: 'ผู้เข้าชมเว็บไซต์', value: '0', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100' },
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

  const GalleryView = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [filter, setFilter] = useState('ทั้งหมด');
    
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

      if (file.size > 5 * 1024 * 1024) {
        alert("ขนาดไฟล์ใหญ่เกินไป กรุณาอัปโหลดรูปที่ไม่เกิน 5MB");
        return;
      }

      setIsUploading(true);
      
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        }, 
        (error) => {
          console.error("Upload failed", error);
          alert("อัปโหลดไม่สำเร็จ กรุณาลองใหม่");
          setIsUploading(false);
        }, 
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          const newImageData = {
            src: downloadURL,
            name: file.name,
            category: filter === 'ทั้งหมด' ? 'กิจกรรม' : filter,
            createdAt: serverTimestamp(),
            storagePath: uploadTask.snapshot.ref.fullPath
          };

          try {
            const docRef = await addDoc(collection(db, "gallery"), newImageData);
            setImages(prev => [{ id: docRef.id, ...newImageData, createdAt: new Date() }, ...prev]);
          } catch (err) {
            console.error("Error adding document: ", err);
          }

          setIsUploading(false);
          setUploadProgress(0);
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

    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase italic underline decoration-orange-500 decoration-4 underline-offset-8">จัดการแกลลอรี่ภาพ</h2>
            <p className="text-slate-400 text-sm mt-3 font-medium">อัปโหลดและจัดระเบียบรูปลงฐานข้อมูล Firebase</p>
          </div>
          
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handleFileSelect} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current.click()}
            disabled={isUploading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />} 
            {isUploading ? `กำลังอัปโหลด ${Math.round(uploadProgress)}%` : "อัปโหลดรูปภาพใหม่"}
          </button>
        </div>

        <div className="flex flex-wrap gap-4 border-b border-slate-100 pb-6">
           {['ทั้งหมด', 'กิจกรรม', 'สถานที่', 'ห้องพัก', 'อาหาร', 'บุคลากร'].map((cat, i) => (
             <button 
               key={i} 
               onClick={() => setFilter(cat)}
               className={`px-8 py-3 rounded-2xl text-xs font-black transition-all uppercase tracking-widest ${filter === cat ? 'bg-green-950 text-white shadow-lg' : 'bg-white text-slate-400 hover:bg-slate-100 border border-slate-100'}`}>
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
                     <div className="absolute top-4 left-4 px-4 py-1.5 bg-green-950/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase text-white tracking-widest">
                        {img.category}
                     </div>
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <a href={img.src} target="_blank" rel="noreferrer" className="p-3 bg-white rounded-2xl text-slate-800 hover:bg-orange-500 hover:text-white transition-all shadow-xl" title="ดูรูปภาพ">
                           <Eye className="w-6 h-6" />
                        </a>
                        <button onClick={() => handleDelete(img.id, img.storagePath)} className="p-3 bg-white rounded-2xl text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-xl" title="ลบรูปภาพ">
                           <Trash2 className="w-6 h-6" />
                        </button>
                     </div>
                  </div>
                  <div className="p-6">
                     <h4 className="font-black text-slate-800 truncate mb-1" title={img.name}>{img.name}</h4>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">
                        {img.createdAt?.toDate ? img.createdAt.toDate().toLocaleDateString('th-TH') : "เพิ่งอัปโหลด"}
                     </p>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 h-24 flex items-center justify-between px-10 z-10 sticky top-0">
          <div className="flex items-center gap-6">
            <button className="md:hidden p-3 text-slate-500 bg-slate-100 rounded-2xl" onClick={() => setIsMobileMenuOpen(true)}>
               <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:block">
               <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase italic">
                 {menuItems.find(m => m.id === activeTab)?.label}
               </h1>
               <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Connected to Firebase</p>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center relative group">
               <Search className="w-4 h-4 absolute left-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
               <input type="text" placeholder="ค้นหาข้อมูลระบบ..." className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 focus:outline-none w-64 transition-all" />
            </div>
            <div className="w-12 h-12 rounded-[1.2rem] bg-green-950 flex items-center justify-center text-white font-black shadow-2xl shadow-green-900/40 transform hover:rotate-12 transition-transform cursor-pointer">A</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-20">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'gallery' && <GalleryView />}
            
            {['homepage', 'activities', 'packages', 'bookings', 'settings'].includes(activeTab) && (
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
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-green-950/40 z-40 md:hidden backdrop-blur-md animate-in fade-in duration-500" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
}