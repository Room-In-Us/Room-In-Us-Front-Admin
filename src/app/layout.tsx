import type {Metadata} from 'next';
import localFont from 'next/font/local';

import '@/src/app/globals.css';
import {QueryProvider} from '@/src/shared/query';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
});

const consola = localFont({
  src: './fonts/consola.ttf',
  display: 'swap',
  variable: '--font-consola',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Roominus Admin',
  description: 'Roominus Admin Service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className={`${pretendard.variable} ${consola.variable}`}>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
