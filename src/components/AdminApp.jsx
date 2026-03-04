import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Home, 
  Tent, 
  Package, 
  CalendarDays, 
  Image as ImageIcon, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  User, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  MoreVertical,
  TrendingUp,
  Users,
  Upload,
  Filter,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('gallery'); // เริ่มต้นที่หน้า Gallery ตามคำขอ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ข้อมูลรายการเมนู
  const menuItems = [
    { id: 'dashboard', label: 'แดชบอร์ดภาพรวม', icon: LayoutDashboard },
    { id: 'homepage', label: 'จัดการหน้าแรก', icon: Home },
    { id: 'activities', label: 'จัดการกิจกรรม', icon: Tent },
    { id: 'packages', label: 'จัดการแพ็กเกจ', icon: Package },
    { id: 'bookings', label: 'จัดการการจอง', icon: CalendarDays },
    { id: 'gallery', label: 'จัดการแกลลอรี่', icon: ImageIcon },
    { id: 'settings', label: 'ตั้งค่าระบบ', icon: Settings },
  ];

  // Component: Sidebar
  const Sidebar = () => (
    <div className={`bg-green-950 text-white w-64 flex-shrink-0 h-full flex flex-col transition-transform duration-300 ease-in-out z-20 ${isMobileMenuOpen ? 'translate-x-0 absolute' : '-translate-x-full absolute'} md:relative md:translate-x-0`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tent className="w-8 h-8 text-orange-500" />
          <span className="font-bold text-xl tracking-tight">Admin<span className="text-orange-500">Panel</span></span>
        </div>
        <button className="md:hidden text-gray-300" onClick={() => setIsMobileMenuOpen(false)}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:bg-green-900 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-green-900 text-center">
         <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mb-2">Logged in as</p>
         <div className="flex items-center gap-3 px-4 py-2 bg-green-900/50 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold">A</div>
            <div className="text-left overflow-hidden">
               <p className="text-xs font-bold text-white truncate">Suppamas Admin</p>
               <p className="text-[10px] text-gray-400 truncate">manager@suppamas.me</p>
            </div>
         </div>
      </div>
    </div>
  );

  // --- VIEW: DASHBOARD ---
  const DashboardView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">ภาพรวมระบบ (Overview)</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'ยอดจองที่รออนุมัติ', value: '12', icon: CalendarDays, color: 'text-orange-500', bg: 'bg-orange-100' },
          { title: 'จำนวนรูปภาพทั้งหมด', value: '158', icon: ImageIcon, color: 'text-blue-500', bg: 'bg-blue-100' },
          { title: 'โรงเรียนเดือนนี้', value: '24', icon: Users, color: 'text-green-500', bg: 'bg-green-100' },
          { title: 'ผู้เข้าชมเว็บไซต์', value: '8.4k', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${stat.bg}`}><stat.icon className={`w-8 h-8 ${stat.color}`} /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // --- VIEW: GALLERY MANAGEMENT (NEW!) ---
  const GalleryView = () => {
    const [images, setImages] = useState([
      { id: 1, src: "https://images.unsplash.com/photo-1533240332313-0cb49f47c422?q=80&w=400", category: "กิจกรรม", name: "ไต่เชือกผจญภัย" },
      { id: 2, src: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=400", category: "สถานที่", name: "บรรยากาศหน้าค่าย" },
      { id: 3, src: "https://images.unsplash.com/photo-1504280655536-2605761a54dc?q=80&w=400", category: "กิจกรรม", name: "พิธีรอบกองไฟ" },
      { id: 4, src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400", category: "บุคลากร", name: "ทีมวิทยากรฝึกอบรม" },
      { id: 5, src: "https://images.unsplash.com/photo-1526491109672-7474065da441?q=80&w=400", category: "ห้องพัก", name: "เรือนนอนมาตรฐาน" },
      { id: 6, src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=400", category: "สถานที่", name: "ป่าธรรมชาติรอบค่าย" }
    ]);

    const handleDelete = (id) => {
      if(window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพนี้?')) {
        setImages(images.filter(img => img.id !== id));
      }
    };

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight uppercase">จัดการแกลลอรี่ภาพ</h2>
            <p className="text-gray-500 text-sm italic">อัปโหลดและจัดการรูปภาพบรรยากาศภายในค่าย</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all">
              <Upload className="w-5 h-5" /> อัปโหลดรูปภาพใหม่
            </button>
          </div>
        </div>

        {/* ระบบ Drag & Drop อัปโหลด (UI Simulation) */}
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center hover:border-orange-500 hover:bg-orange-50/30 transition-all cursor-pointer group">
           <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-orange-600" />
           </div>
           <h3 className="text-lg font-bold text-gray-800">ลากไฟล์มาวางเพื่ออัปโหลด</h3>
           <p className="text-gray-400 text-sm mt-1 font-medium italic">รองรับไฟล์ JPG, PNG และ WebP (ขนาดไม่เกิน 5MB)</p>
           <button className="mt-6 px-6 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-200">หรือเลือกไฟล์จากเครื่อง</button>
        </div>

        {/* ตัวกรองหมวดหมู่ */}
        <div className="flex flex-wrap gap-3">
           {['ทั้งหมด', 'กิจกรรม', 'สถานที่', 'ห้องพัก', 'อาหาร', 'บุคลากร'].map((cat, i) => (
             <button key={i} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-green-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}>
               {cat}
             </button>
           ))}
        </div>

        {/* ตารางแสดงรูปภาพ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {images.map((img) => (
             <div key={img.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="relative h-48 overflow-hidden bg-slate-100">
                   <img src={img.src} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase text-green-900 tracking-wider">
                      {img.category}
                   </div>
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button className="p-2 bg-white rounded-full text-slate-800 hover:bg-orange-500 hover:text-white transition-colors"><Eye className="w-5 h-5" /></button>
                      <button onClick={() => handleDelete(img.id)} className="p-2 bg-white rounded-full text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"><Trash2 className="w-5 h-5" /></button>
                   </div>
                </div>
                <div className="p-5 flex justify-between items-center">
                   <div>
                      <p className="text-sm font-bold text-gray-800 truncate w-32">{img.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Uploaded on 12 Mar 2024</p>
                   </div>
                   <button className="p-2 text-gray-400 hover:text-orange-500"><Edit className="w-4 h-4" /></button>
                </div>
             </div>
           ))}
           {/* กล่องเพิ่มรูปจิ๋ว */}
           <div className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer min-h-[250px]">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><Plus className="w-6 h-6" /></div>
              <p className="text-xs font-bold text-slate-400">เพิ่มรูปใหม่</p>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-slate-100 h-20 flex items-center justify-between px-6 sm:px-10 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-500 bg-slate-50 rounded-xl" onClick={() => setIsMobileMenuOpen(true)}><Menu className="w-6 h-6" /></button>
            <div className="hidden sm:block">
               <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                 {menuItems.find(m => m.id === activeTab)?.label}
               </h1>
               <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">System Online</p>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            {/* Search Bar PC */}
            <div className="hidden lg:flex items-center relative">
               <Search className="w-4 h-4 absolute left-3 text-slate-400" />
               <input type="text" placeholder="Quick search..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none w-48" />
            </div>

            <button className="relative p-2.5 bg-slate-50 text-slate-400 hover:text-orange-500 transition-colors rounded-xl border border-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-2xl bg-green-900 flex items-center justify-center text-white font-black shadow-lg shadow-green-900/20">A</div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'gallery' && <GalleryView />}
            
            {/* Placeholder สำหรับหน้าอื่นๆ */}
            {['homepage', 'activities', 'packages', 'bookings', 'settings'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center min-h-[500px] border-4 border-dashed border-slate-200 rounded-[3rem] bg-white/50 text-slate-400 group hover:border-orange-200 transition-colors">
                <div className="p-8 bg-white rounded-full shadow-xl mb-6 group-hover:scale-110 transition-transform"><Settings className="w-12 h-12 text-slate-300 animate-spin-slow" /></div>
                <h3 className="text-2xl font-black text-slate-600 mb-2 uppercase italic tracking-tighter">Feature Coming Soon</h3>
                <p className="max-w-xs text-center font-medium opacity-60">ระบบจัดการ "{menuItems.find(m => m.id === activeTab)?.label}" กำลังถูกพัฒนาและเชื่อมต่อกับฐานข้อมูล Firebase</p>
                <button onClick={() => setActiveTab('dashboard')} className="mt-8 px-8 py-3 bg-green-900 text-white rounded-2xl font-black shadow-lg flex items-center gap-2 hover:bg-orange-500 transition-all uppercase tracking-widest text-xs">
                   <Home className="w-4 h-4" /> กลับสู่หน้าแดชบอร์ด
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-10 md:hidden backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
}