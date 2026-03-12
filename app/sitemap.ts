import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // โดเมนหลักของเว็บไซต์
  const baseUrl = 'https://www.suppamascamp.me' 
  // ⚠️ อย่าลืมเปลี่ยน suppamascamp.me เป็นโดเมนจริงของคุณครูนะครับ

  return [
    {
      // 1. หน้าแรก (หน้าหลักสำคัญที่สุด)
      url: `${baseUrl}`,
      lastModified: new Date(),
      // changeFrequency: ระบุความถี่ที่เนื้อหาหน้านี้จะถูกอัปเดต (หน้าแรกมักจะอัปเดตบ่อย)
      changeFrequency: 'weekly',
      // priority: ระบุความสำคัญของหน้านี้ (0.0 - 1.0) หน้าแรกควรเป็น 1.0
      priority: 1.0,
    },
    {
      // 2. หน้าตรวจสอบคิวว่าง (ปฏิทินในโฟลเดอร์ public)
      url: `${baseUrl}/campcalendar.html`,
      lastModified: new Date(),
      changeFrequency: 'daily', // ปฏิทินอัปเดตบ่อย (เมื่อมีการจองใหม่) ให้ Google เข้ามาดูทุกวัน
      priority: 0.8,
    }
  ]
}