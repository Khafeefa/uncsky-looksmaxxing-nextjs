export type Plan = 'free' | 'ascension' | 'elite';
export type SubscriptionStatus =
  | 'active'
  | 'inactive'
  | 'canceled'
  | 'past_due';

export interface Profile {
  id: string;
  email: string;
  created_at: string;
}

export interface Entitlement {
  user_id: string;
  plan: Plan;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  status: SubscriptionStatus;
  updated_at: string;
}

export interface User {
  profile: Profile;
  entitlement: Entitlement;
}
