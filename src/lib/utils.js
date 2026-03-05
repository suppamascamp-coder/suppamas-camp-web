// ฟังก์ชันจัดรูปแบบเงิน
export const formatCurrency = (amount) => {
  if (isNaN(amount) || amount === null || amount === undefined) return '฿0.00';
  return new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 2 }).format(amount);
};

// ฟังก์ชันจัดรูปแบบวันที่ (ภาษาไทย)
export const formatDate = (date) => {
  if (!date) return '-';
  const d = new Date(date);
  // แสดงผลแบบ: 14 กุมภาพันธ์ 2567
  return d.toLocaleDateString('th-TH', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// ฟังก์ชันคำนวณปีการศึกษา (ไทย)
// ตัดรอบที่เดือนพฤษภาคม (เดือน 5)
export const getAcademicYear = (dateStr) => {
  const date = new Date(dateStr);
  const yearAD = date.getFullYear();
  const month = date.getMonth() + 1; 
  // ถ้าเดือน >= 5 ถือเป็นปีการศึกษาใหม่, ถ้าก่อนหน้านั้นถือเป็นปีการศึกษาเก่า
  const academicYearAD = month >= 5 ? yearAD : yearAD - 1;
  return academicYearAD + 543; // แปลงเป็น พ.ศ.
};

export const COLORS = {
  primary: '#13ec13',
  scoutGreen: '#2E5A27',
  bgLight: '#f6f8f6',
  chart: ['#2E5A27', '#13ec13', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#6366f1']
};