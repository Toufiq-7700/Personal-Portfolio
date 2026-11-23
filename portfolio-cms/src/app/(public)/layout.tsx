import Nav from '@/components/public/Nav';
import Footer from '@/components/public/Footer';
import Splash from '@/components/public/Splash';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Splash />
      <Nav />
      {children}
      <Footer />
    </>
  );
}

