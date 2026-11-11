import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export type Cert = { url: string; title?: string };

export type Instructor = {
  id: string;
  name: string;
  pos?: string;
  group?: string;
  img?: string;
  certs?: Cert[];
};

// ข้อมูลดิบจาก Firestore (อาจไม่ครบทุกฟิลด์)
type RawCert = { url?: string; title?: string };
type RawInstructor = { id?: string; name?: string; pos?: string; group?: string; img?: string; certs?: RawCert[] };

// ดึงรายชื่อวิทยากรจาก settings/instructors (ใช้ฝั่งเซิร์ฟเวอร์ พร้อมแคชที่ระดับหน้า)
export async function getInstructors(): Promise<Instructor[]> {
  const snap = await getDoc(doc(db, 'settings', 'instructors'));
  if (!snap.exists()) return [];
  const list: RawInstructor[] | undefined = snap.data().instructors;
  if (!Array.isArray(list)) return [];
  // เลือกเฉพาะฟิลด์ที่ใช้ เพื่อให้ส่งต่อให้ Client Component ได้อย่างปลอดภัย (plain object เท่านั้น)
  return list.map((p, i) => ({
    id: String(p.id ?? i),
    name: String(p.name ?? ''),
    pos: p.pos || undefined,
    group: p.group || undefined,
    img: p.img || undefined,
    certs: Array.isArray(p.certs)
      ? p.certs.filter((c) => c?.url).map((c) => ({ url: String(c.url), title: c.title || undefined }))
      : [],
  }));
}
