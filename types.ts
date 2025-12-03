export enum PlanType {
  FREE = 'Free',
  PREMIUM = 'Premium',
  ENTERPRISE = 'Enterprise'
}

export interface Plan {
  id: string;
  name: PlanType;
  price: number;
  creditsIncluded: number;
  costPerExtraCredit: number;
  features: string[];
  recommended?: boolean;
}

export interface User {
  id: string;
  email: string | null;
  name?: string | null;
  plan: PlanType;
  credits: number;
}

export type AuthState = 'unauthenticated' | 'authenticated' | 'loading';