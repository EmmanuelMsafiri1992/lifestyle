import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'LifeStyle Boutique | Cannabis & Adult Products — 18+',
  description: 'Premium cannabis products and adult lifestyle goods. Discreet packaging, secure checkout. Strictly 18 years and older.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { borderRadius: '12px', fontWeight: '600', fontSize: '14px' },
          }}
        />
      </body>
    </html>
  );
}
