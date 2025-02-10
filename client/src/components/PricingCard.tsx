import { PLANS } from "@/config/stripe";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Check, Minus, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { buttonVariants } from "./ui/button";
import UpgradeButton from "./UpgradeButton";

interface PricingCardProps {
  stripePlan: Plan;
  selectedRecurring: Recurring;
  userCurrentPlan: UserPlanDetails | null;
}

export const PricingCard = ({
  stripePlan,
  selectedRecurring,
  userCurrentPlan,
}: PricingCardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [priceData, setPriceData] = useState<Price | null>(null);

  const currentPlan = PLANS.find(
    (plan) => plan.name?.toLowerCase() === stripePlan?.name?.toLowerCase()
  );

  useEffect(() => {
    const currentPrice = stripePlan?.prices?.find(
      ({ recurring }) =>
        recurring.toLowerCase() === selectedRecurring.toLowerCase()
    );

    setPriceData(currentPrice || null);
  }, [selectedRecurring]);

  const isUserCurrentPlan =
    userCurrentPlan?.name?.toLowerCase() !== "free" &&
    stripePlan?.name?.toLowerCase() === userCurrentPlan?.name?.toLowerCase() &&
    userCurrentPlan?.interval === selectedRecurring;

  const isUpgradeToStandard =
    userCurrentPlan?.name?.toLowerCase() === "free" &&
    stripePlan?.name?.toLowerCase() === "standard";

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-white shadow-lg border border-gray-200",
        {
          "border-2 border-primary shadow-primary/30":
            isUpgradeToStandard || isUserCurrentPlan,
        }
      )}
    >
      {isUpgradeToStandard && (
        <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white">
          Upgrade now
        </div>
      )}

      <div className="p-5">
        <h3 className="my-2 text-center font-display text-2xl font-bold">
          {stripePlan?.name}
        </h3>
        {stripePlan?.description && (
          <p className="text-gray-500">{stripePlan.description}</p>
        )}

        <p className="my-3 font-display text-5xl font-semibold">
          ${priceData?.unit_amount}
        </p>
        <p className="text-gray-500">per {priceData?.recurring}</p>
      </div>

      <div className="px-5">
        {stripePlan?.name?.toLowerCase() === "free" ? (
          <Link
            to={user ? "/dashboard" : "/sign-in"}
            className={buttonVariants({
              className: "w-full py-5",
              variant: "secondary",
            })}
          >
            {user ? "Upgrade now" : "Sign up"}
            <MoveRight className="h-5 w-5 ml-1" />
          </Link>
        ) : user ? (
          <>
            <UpgradeButton
              priceId={priceData?.id ?? ""}
              isUserCurrentPlan={isUserCurrentPlan}
              credits={currentPlan?.credits}
            />
          </>
        ) : (
          <Link
            to="/sign-in"
            className={buttonVariants({
              className:
                "w-full py-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600",
            })}
          >
            {user ? "Upgrade now" : "Sign up"}
            <MoveRight className="h-5 w-5 ml-1" />
          </Link>
        )}
      </div>

      <ul className="my-6 space-y-4 px-8">
        {currentPlan?.features.map(({ text, negative }) => (
          <li key={text} className="flex space-x-3">
            <div className="flex-shrink-0">
              {negative ? (
                <Minus className="size-5 text-gray-300" />
              ) : (
                <Check className="size-5 text-blue-500" />
              )}
            </div>
            <p
              className={cn("text-gray-600", {
                "text-gray-400": negative,
              })}
            >
              {text.replace("{}", currentPlan?.credits?.toString())}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
