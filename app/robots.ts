import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      // User-Agent: '*' หมายถึงอนุญาตให้บอทของทุกค่าย (Google, Bing, ฯลฯ) เข้ามาอ่านเว็บได้
      userAgent: '*',
      
      // Allow: '/' หมายถึงอนุญาตให้อ่านข้อมูลในหน้าเว็บหลักและหน้าทั่วไปได้ทั้งหมด
      allow: '/',
      
      // Disallow: บอกบอทว่า "ห้าม" เข้ามาเก็บข้อมูลในหน้าเหล่านี้ (เช่น หน้าแอดมิน เพื่อความปลอดภัย)
      disallow: ['/admin', '/api/'],
    },
    // ระบุตำแหน่งของไฟล์ Sitemap เพื่อให้บอทหาเจอได้ง่ายขึ้น
    sitemap: 'https://www.suppamascamp.me/sitemap.xml', 
    // ⚠️ อย่าลืมเปลี่ยน suppamascamp.me เป็นโดเมนจริงของคุณครูนะครับ
  }
}