import './globals.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export const metadata = {
  title: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี | ศูนย์ฝึกอบรมและค่ายพักแรมมาตรฐาน',
  description: 'สถานที่จัดกิจกรรมอยู่ค่ายพักแรมลูกเสือ,เนตรนารี,ยุวกาชาด ที่ครบวงจรที่สุดในจังหวัดราชบุรี ตั้งอยู่ขอบเขตระหว่างจังหวัดราชบุรีและกาญจนบุรี ในราคามิตรภาพ พร้อมวิทยากรลูกเสือมืออาชีพของแทร่ กินอิ่ม นอนหลับ พักสบาย คลายอารมณ์ เสพสมชาวค่าย ',
  keywords: 'ค่ายลูกเสือ, ค่ายลูกเสือราชบุรี, ค่ายลูกเสืออนุสรณ์ศุภมาศ, เข้าค่ายพักแรม, ค่ายลูกเสือใกล้กรุงเทพ, ศูนย์ฝึกอบรมเยาวชน,ค่ายลูกเสือใกล้ฉัน'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className="font-sans antialiased text-gray-800 bg-gray-50">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}