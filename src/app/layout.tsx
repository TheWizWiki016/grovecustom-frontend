import './globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import { Providers } from './providers';

export const metadata = {
  title: 'Grove Custom - Autos de Lujo',
  description: 'Venta de autos de lujo personalizados',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[var(--dark)] text-white">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
