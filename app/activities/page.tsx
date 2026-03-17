"use client";
import React from 'react';
import Home from '../page'; // ดึงหน้าหลัก (app/page.tsx) 

export default function ActivitiesPage() {
  // เมื่อเข้าลิงก์ www.suppamascamp.me/activities
  // ระบบจะดึงเนื้อหาจากหน้าหลักมาโชว์ทันที แต่ URL จะเป็นชื่อนี้เพื่อให้ Google ชอบครับ
  return <Home />;
}