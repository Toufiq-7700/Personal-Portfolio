import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Providers from './providers';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Md. Toufiq Imroz Khealid Khan — Portfolio',
  description: 'AI & ML enthusiast, Full-Stack Developer, CSE Student at United International University.',
  keywords: ['portfolio', 'AI', 'ML', 'full-stack', 'developer', 'Rust', 'Next.js'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
