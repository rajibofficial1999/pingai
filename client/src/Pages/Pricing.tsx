import { getStripeProducts } from "@/actions/stripe";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import { PricingCard } from "@/components/PricingCard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getUserSubscriptionDetails } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const Pricing = () => {
  const [stripePlan, setStripePlan] = useState<Plan[]>([]);

  const [selectedRecurring, setSelectedRecurring] =
    useState<Recurring>("month");
  const [userCurrentPlan, setUserCurrentPlan] =
    useState<UserPlanDetails | null>(null);

  useEffect(() => {
    const fetchStripeProducts = async () => {
      const products = await getStripeProducts();
      setStripePlan(products);
    };

    fetchStripeProducts();
  }, []);

  useEffect(() => {
    const getSubscriptionPlan = async () => {
      const userPlan = await getUserSubscriptionDetails();
      setUserCurrentPlan(userPlan);
    };

    getSubscriptionPlan();
  }, []);

  return (
    <>
      <Navbar />
      <MaxWidthWrapper className="mb-8 mt-24 text-center ">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Pricing
          </h1>
          <p className="mt-5 text-gray-600 sm:text-lg">
            Whether you&apos;re just trying out our service or need more,
            we&apos;ve got you covered.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 items-center border border-primary rounded-full">
            <button
              onClick={() => setSelectedRecurring("month")}
              type="button"
              className={cn("px-5 py-3 rounded-l-full cursor-pointer", {
                "bg-gradient-to-r from-blue-600 to-cyan-600 text-white":
                  selectedRecurring === "month",
              })}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedRecurring("year")}
              type="button"
              className={cn("px-5 py-3 rounded-r-full cursor-pointer", {
                "bg-gradient-to-r from-blue-600 to-cyan-600 text-white":
                  selectedRecurring === "year",
              })}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-3 mx-auto">
          <TooltipProvider>
            {stripePlan.map((stripePlan) => {
              return (
                <PricingCard
                  key={stripePlan?.id}
                  stripePlan={stripePlan}
                  selectedRecurring={selectedRecurring}
                  userCurrentPlan={userCurrentPlan}
                />
              );
            })}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Pricing;
