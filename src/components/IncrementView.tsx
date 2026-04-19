"use client";
import { useEffect, useRef } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function IncrementView({ id }: { id: string }) {
  const hasIncremented = useRef(false);

  useEffect(() => {
    // ป้องกันการนับเบิ้ล 2 ครั้งในโหมดพัฒนาของ React
    if (hasIncremented.current) return;
    hasIncremented.current = true;

    const incrementViewCount = async () => {
      try {
        const docRef = doc(db, 'news', id);
        // สั่งให้ Firebase บวกค่า views ขึ้น 1 อัตโนมัติ
        await updateDoc(docRef, { views: increment(1) });
      } catch (error) {
        const errorCode =
          typeof error === 'object' && error !== null && 'code' in error
            ? String((error as { code?: string }).code)
            : '';

        // ผู้ใช้ทั่วไปอาจไม่มีสิทธิ์เขียนตาม Firestore Rules ได้ จึงข้ามอย่างเงียบๆ
        if (errorCode === 'permission-denied') return;

        if (process.env.NODE_ENV === 'development') {
          console.error("Error updating views", error);
        }
      }
    };

    incrementViewCount();
  }, [id]);

  return null; // ไม่ต้องแสดงผลอะไรบนหน้าเว็บ
}