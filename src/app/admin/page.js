// ไฟล์นี้ทำหน้าที่เป็น Route /admin เพื่อแสดงหน้า AdminApp
import AdminApp from '@/components/AdminApp';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminApp />
    </div>
  );
}