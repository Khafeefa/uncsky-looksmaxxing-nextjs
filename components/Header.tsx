'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="bg-black text-white border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          unc_sky
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/tiers" className="hover:text-gray-300 transition">
            Tiers
          </Link>
          {user ? (
            <>
              <Link href="/account" className="hover:text-gray-300 transition">
                Account
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
