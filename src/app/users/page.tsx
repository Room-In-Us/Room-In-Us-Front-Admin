import Link from 'next/link';

const users = [
  { id: 1, name: '사용자 1' },
  { id: 2, name: '사용자 2' },
];

export default function UsersPage() {
  return (
    <main>
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}