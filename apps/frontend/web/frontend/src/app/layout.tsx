import type { Metadata } from 'next';
import './globals.css';
import { sfPro } from '@/lib/fonts';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Chama Ai',
  description: 'Serviços rápidos e confiáveis ao seu alcance.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sfPro.variable} font-sans`}>
      <body className="min-h-screen flex flex-col bg-[#f7f8f9] dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
