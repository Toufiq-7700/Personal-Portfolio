import Nav from '@/components/public/Nav';
import Footer from '@/components/public/Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <Nav />
      <main className="flex-1" style={{ paddingTop: 'var(--nav-height)' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
