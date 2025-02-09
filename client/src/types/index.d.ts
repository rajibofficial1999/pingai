declare global {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    avatar?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    stripeCurrentPeriodEnd?: Date;
  }

  type Recurring = "month" | "year";

  interface Price {
    id: string;
    unit_amount: number;
    recurring: Recurring;
    currency: string;
  }

  interface PlanFeature {
    text: string;
    negative?: boolean;
  }

  interface Plan {
    description?: string | null;
    credits: number;
    id?: string;
    name?: string;
    prices?: Price[];
    features: PlanFeature[];
    interval?: string | null;
  }

  interface UserPlanDetails extends Plan {
    isSubscribed: boolean;
    stripeCurrentPeriodEnd?: string | null;
    stripeSubscriptionId?: string | null;
    stripePriceId?: string;
  }
}

export {};
