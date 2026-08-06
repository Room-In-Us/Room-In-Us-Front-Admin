import type {Metadata} from 'next';
import localFont from 'next/font/local';

import '@/src/app/globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
  weight: '100 900',
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
    <html lang='ko' className={pretendard.variable}>
      <body>{children}</body>
    </html>
  );
}
