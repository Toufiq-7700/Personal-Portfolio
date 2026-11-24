import Nav from '@/components/public/Nav';
import Footer from '@/components/public/Footer';
import Splash from '@/components/public/Splash';
import SideDecor from '@/components/public/SideDecor';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Splash />
      <SideDecor />
      <div className="site-wrapper">
        <Nav />
        {children}
        <Footer />
      </div>
    </>
  );
}

