'use client';

import {useRouter} from 'next/navigation';

import {Header} from '@/src/shared/components/layout/Header';

function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/login');
  };

  return <Header onLogout={handleLogout} />;
}

export {DashboardHeader};
