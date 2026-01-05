'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  tier: 'free' | 'ascension' | 'elite' | 'coaching';
  isPopular?: boolean;
  userPlan?: string;
  isAuthenticated: boolean;
}

export default function PricingCard({
  title,
  price,
  features,
  tier,
  isPopular,
  userPlan,
  isAuthenticated,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const hasAccess =
    userPlan === tier ||
    (tier === 'ascension' && userPlan === 'elite') ||
    (tier === 'free' && isAuthenticated);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/tiers');
      return;
    }

    if (tier === 'free' || tier === 'coaching') return;

    setLoading(true);
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      const { url, error } = await res.json();

      if (error) {
        alert(error);
        return;
      }

      if (url) window.location.href = url;
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const getCTA = () => {
    if (hasAccess && tier !== 'free' && tier !== 'coaching') {
      const courseUrl =
        tier === 'ascension' ? '/course/ascension' : '/course/elite';
      return (
        <button
          onClick={() => router.push(courseUrl)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
        >
          Go to {title}
        </button>
      );
    }

    if (tier === 'free') {
      return (
        <button className="w-full bg-gray-600 text-white font-bold py-3 rounded-lg cursor-not-allowed">
          Current Plan
        </button>
      );
    }

    if (tier === 'coaching') {
      return (
        <button className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg">
          Contact for Availability
        </button>
      );
    }

    return (
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full ${
          isPopular
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-800 hover:bg-gray-700'
        } text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? 'Processing...' : 'Subscribe Now'}
      </button>
    );
  };

  return (
    <div
      className={`bg-gray-900 rounded-xl p-8 relative ${
        isPopular ? 'ring-2 ring-blue-500' : 'border border-gray-800'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          MOST POPULAR
        </div>
      )}

      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-4xl font-bold text-white mb-6">
        {price}
        {(tier === 'ascension' || tier === 'elite') && (
          <span className="text-lg text-gray-400 font-normal">/month</span>
        )}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start text-gray-300">
            <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {getCTA()}

      {!hasAccess && tier !== 'free' && tier !== 'coaching' && (
        <p className="text-xs text-gray-500 text-center mt-3">
          {isAuthenticated
            ? 'Login required to purchase'
            : 'Subscribe to unlock'}
        </p>
      )}

      {hasAccess && tier !== 'free' && tier !== 'coaching' && (
        <p className="text-xs text-green-500 text-center mt-3 font-medium">
          ✓ Active Subscription
        </p>
      )}
    </div>
  );
}
