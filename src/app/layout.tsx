import type {Metadata} from 'next';
import '@/src/app/globals.css';

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
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
