import Link from 'next/link';

export default function HomePage() {
  return (
    <main className='min-h-screen p-8'>
      <h1>Home</h1>

      <nav>
        <Link href='/login'>Login</Link>
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/users'>Users</Link>
      </nav>
    </main>
  );
}
