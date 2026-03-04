import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, Tent, ClipboardList, Settings, 
  TrendingUp, Wallet, Landmark, Stethoscope, FileText, BookOpen,
  PieChart
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const menuGroups = [
    {
      title: 'ระบบค่ายลูกเสือ',
      items: [
        // 1. บันทึกการเข้าค่าย (เดิมคือ School Directory)
        { path: '/school', icon: BookOpen, label: 'บันทึกการเข้าค่าย' },
        // 2. สถิติการเข้าค่าย (เดิมคือ Projects)
        { path: '/projects', icon: PieChart, label: 'สถิติการเข้าค่าย' },
        // 3. เงินสดและธนาคาร
        { path: '/cash-bank', icon: Wallet, label: 'เงินสดและธนาคาร' },
        // 4. บัญชีค่าย (สรุปยอด)
        { path: '/ledger', icon: ClipboardList, label: 'บัญชีค่าย (สรุปยอด)' },
      ]
    },
    {
      title: 'ระบบร้านค้า',
      items: [
        { path: '/', icon: LayoutDashboard, label: 'ภาพรวมระบบ' },
        { path: '/shop', icon: ShoppingCart, label: 'ร้านค้าสวัสดิการ' },
      ]
    },
    {
      title: 'เครื่องมืออื่นๆ',
      items: [
        { path: '/fixed-costs', icon: Landmark, label: 'ค่าใช้จ่ายคงที่' },
        { path: '/infirmary', icon: Stethoscope, label: 'ห้องพยาบาล' },
        { path: '/reports', icon: FileText, label: 'รายงาน' },
        { path: '/settings', icon: Settings, label: 'ตั้งค่าระบบ' },
      ]
    }
  ];

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#2E5A27] text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#13ec13] rounded-lg flex items-center justify-center text-[#2E5A27] shadow-lg">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-lg leading-tight">Camp Scout</h2>
          <p className="text-[10px] text-white/40 uppercase tracking-widest font-light">Finance v7.0</p>
        </div>
      </div>

      <nav className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
        {menuGroups.map((group, gIdx) => (
          <div key={gIdx}>
            <p className="px-4 text-[10px] uppercase tracking-wider text-white/30 font-bold mb-3">{group.title}</p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center px-4 py-2.5 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-[#13ec13] text-[#2E5A27] font-bold shadow-md' 
                      : 'hover:bg-white/5 text-white/70 hover:text-white'}
                  `}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;