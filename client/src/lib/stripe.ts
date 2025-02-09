import { getUserPlan } from "@/actions/stripe";
import { getUser } from "@/actions/user";
import { PLANS } from "@/config/stripe";

export async function getUserSubscriptionDetails(): Promise<UserPlanDetails> {
  const user = await getUser();

  let selectedPlan = PLANS.find(
    (plan) => plan.name?.toLowerCase() === "free"
  ) as Plan;

  if (!user || !user.stripeSubscriptionId) {
    return {
      ...selectedPlan,
      isSubscribed: false,
      stripeCurrentPeriodEnd: null,
      stripeSubscriptionId: null,
    };
  }

  const isValidDate =
    new Date(user.stripeCurrentPeriodEnd).getTime() > Date.now();

  const isSubscribed = Boolean(
    user.stripePriceId && user.stripeCurrentPeriodEnd && isValidDate
  );

  const stripePlan = isSubscribed
    ? await getUserPlan(user.stripeSubscriptionId)
    : null;

  if (stripePlan && stripePlan.length > 0) {
    let currentPlan = stripePlan[0];

    selectedPlan = PLANS.find(
      (plan) => plan.name?.toLowerCase() === currentPlan?.name?.toLowerCase()
    ) as Plan;

    selectedPlan.interval = currentPlan.interval || null;
  }

  return {
    ...selectedPlan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    stripePriceId: user.stripePriceId,
    isSubscribed,
  };
}
