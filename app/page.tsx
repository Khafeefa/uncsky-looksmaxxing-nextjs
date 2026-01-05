import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Transform Your Look with unc_sky
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands who have already transformed their appearance through
            our proven looksmaxxing courses
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/tiers"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition"
            >
              View Courses
            </Link>
            <Link
              href="/login"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Before/After Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <h3 className="text-2xl font-bold mb-4 text-gray-400">Before</h3>
            <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 text-lg">
                Transformation Journey Starts
              </p>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-8 border border-blue-500">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">After</h3>
            <div className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-blue-400 text-lg">Confidence Unlocked ✓</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Expert Guidance</h3>
            <p className="text-gray-400">
              Learn from proven techniques used by thousands of successful
              transformations
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Community Support</h3>
            <p className="text-gray-400">
              Join an active community of people on the same journey as you
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Proven Results</h3>
            <p className="text-gray-400">
              Follow our step-by-step system that has worked for thousands
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        <p>&copy; 2026 unc_sky. All rights reserved.</p>
      </footer>
    </div>
  );
}
