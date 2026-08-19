'use client';

import {useRouter} from 'next/navigation';

import {Header} from '@/src/shared/components/layout/Header';

function DashboardHeader() {
  const router = useRouter();

  const handleReset = () => {
    router.refresh();
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return <Header onReset={handleReset} onLogout={handleLogout} />;
}

export {DashboardHeader};
