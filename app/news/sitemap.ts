import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.suppamascamp.me'
  
  // ในอนาคตดึง ID ข่าวมาจาก Firebase แล้ว Map URL ที่นี่ครับ
  return [
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    }
  ]
}