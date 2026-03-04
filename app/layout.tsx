import './globals.css';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';

export const metadata = {
  title: 'ค่ายลูกเสืออนุสรณ์ศุภมาศ ราชบุรี',
  description: 'ศูนย์ฝึกอบรมและค่ายลูกเสือที่ได้มาตรฐานที่สุดในจังหวัดราชบุรี',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
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