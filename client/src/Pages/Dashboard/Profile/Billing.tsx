import { DashboardPage } from "@/components/DashboardPage.tsx";
import { Card } from "@/components/ui/card.tsx";
import { getUserSubscriptionDetails } from "@/lib/stripe.ts";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { format } from "date-fns";
import { BarChart, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const Billing = () => {
  const navigate = useNavigate();

  const [subscriptionPlan, setSubscriptionPlan] =
    useState<UserPlanDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  const handleCheckout = async () => {
    if (subscriptionPlan && subscriptionPlan?.name?.toLowerCase() === "free") {
      navigate("/pricing");
      return false;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/stripe/create-checkout-session`,
        {
          price: subscriptionPlan?.stripePriceId,
          userId: user?.id,
          credits: subscriptionPlan?.credits,
        }
      );

      const stripe = await stripePromise;

      if (stripe) {
        stripe.redirectToCheckout({ sessionId: data.id });
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getSubscriptionPlan = async () => {
      const userPlan = await getUserSubscriptionDetails();

      setUser(userPlan?.user);

      setSubscriptionPlan(userPlan);
    };

    getSubscriptionPlan();
  }, []);

  return (
    <DashboardPage title="Membership">
      <div className="max-w-3xl flex flex-col gap-8">
        <div>
          <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">
            {subscriptionPlan?.name?.toLowerCase() === "standard" &&
              "Plan: Standard"}
            {subscriptionPlan?.name?.toLowerCase() === "pro" && "Plan: Pro"}
            {subscriptionPlan?.name?.toLowerCase() === "free" && "Plan: Free"}
          </h1>
          <p className="text-sm/6 text-gray-600 max-w-prose">
            {subscriptionPlan?.name?.toLowerCase() === "pro" ||
            subscriptionPlan?.name?.toLowerCase() === "standard"
              ? "Thank you for supporting PingAI. Find your billing details."
              : "Get access to premium support."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-2 border-brand-700 p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm/6 font-medium">Available credits</p>
              <BarChart className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-2xl font-bold">{user?.availableCredits}</p>
              <p className="text-xs/5 text-muted-foreground">This period</p>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <p className="text-sm/6 font-medium">Total credits</p>
              <BarChart className="size-4 text-muted-foreground" />
            </div>

            <div>
              <p className="text-2xl font-bold">{subscriptionPlan?.credits}</p>
              <p className="text-xs/5 text-muted-foreground">
                per {subscriptionPlan?.interval}
              </p>
            </div>
          </Card>
        </div>

        <p className="text-sm text-gray-500">
          {subscriptionPlan?.isSubscribed && "Your plan renews on "}

          {subscriptionPlan?.isSubscribed &&
            subscriptionPlan?.stripeCurrentPeriodEnd &&
            format(subscriptionPlan?.stripeCurrentPeriodEnd, "MMM d, yyyy")}

          {subscriptionPlan?.isSubscribed === false ? (
            isLoading ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              <span
                onClick={() => handleCheckout()}
                className="inline cursor-pointer underline text-brand-600"
              >
                {subscriptionPlan &&
                subscriptionPlan?.name?.toLowerCase() === "free" ? (
                  <>Upgrate now &rarr;</>
                ) : (
                  <>Renew your plan &rarr;</>
                )}
              </span>
            )
          ) : null}
        </p>
      </div>
    </DashboardPage>
  );
};

export default Billing;
