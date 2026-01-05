import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-gray-900 rounded-xl border border-gray-800">
        <Link href="/" className="text-2xl font-bold text-blue-500 mb-8 block text-center">
          unc_sky
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-center">Login / Sign Up</h1>
        <p className="text-gray-400 text-center mb-8">
          Authentication coming soon! This page will integrate with Supabase Auth.
        </p>
        <div className="space-y-4">
          <Link
            href="/tiers"
            className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-center transition"
          >
            View Pricing Plans
          </Link>
          <Link
            href="/"
            className="block w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-bold text-center transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
