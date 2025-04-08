import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to Educare</h1>
      <Link href="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}
