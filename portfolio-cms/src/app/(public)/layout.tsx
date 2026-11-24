import Nav from '@/components/public/Nav';
import Footer from '@/components/public/Footer';
import Splash from '@/components/public/Splash';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Splash />
      <div className="site-wrapper">
        <Nav />
        {children}
        <Footer />
      </div>
    </>
  );
}

