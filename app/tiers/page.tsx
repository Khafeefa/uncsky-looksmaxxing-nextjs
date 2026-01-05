'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function TiersPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      priceId: null,
      features: [
        'Access to basic looksmaxxing tips',
        'Community forum access',
        'Weekly newsletter',
      ],
    },
    {
      name: 'Ascension',
      price: '$34.99/month',
    priceId: 'price_1SgCeNLxwrmGnh3pOmKKVUmO',      features: [
        'All Free features',
        'Personalized improvement plans',
        'Access to premium courses',
        'Progress tracking tools',
        'Priority support',
      ],
      popular: true,
    },
    {
      name: 'Elite',
      price: '$49.99/month',
    priceId: 'price_1SgCdNLxwrmGnh3pOZ1ItlXq',      features: [
        'All Ascension features',
        'One-on-one coaching sessions',
        'Advanced analytics',
        'Exclusive community access',
        'Early access to new features',
      ],
    },
  ];

  const handleSubscribe = async (tier: typeof tiers[0]) => {
    if (!tier.priceId) {
      // Free tier - just redirect to signup
      window.location.href = '/login';
      return;
    }

    try {
      setLoading(tier.name);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: tier.priceId,
          tier: tier.name,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to start checkout. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-500">
            unc_sky
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-blue-500">Home</Link>
            <Link href="/tiers" className="text-blue-500">Tiers</Link>
            <Link href="/login" className="hover:text-blue-500">Login</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-center text-gray-400 mb-16 text-xl">
          Select the perfect tier for your transformation journey
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-xl p-8 border ${
                tier.popular
                  ? 'border-blue-500 bg-blue-900/20 ring-2 ring-blue-500'
                  : 'border-gray-800 bg-gray-900'
              } relative`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-4xl font-bold text-white mb-6">{tier.price}</p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300">
                    <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(tier)}
                disabled={loading === tier.name}
                className={`w-full py-3 rounded-lg font-bold transition ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === tier.name
                  ? 'Loading...'
                  : tier.price === '$0'
                  ? 'Get Started'
                  : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
