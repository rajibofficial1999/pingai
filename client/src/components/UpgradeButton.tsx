import { RootState } from "@/lib/store";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Loader2, MoveRight } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

interface UpgradeButtonProps {
  priceId: string;
  isUserCurrentPlan: boolean;
  credits: number | null;
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  priceId,
  isUserCurrentPlan,
  credits,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/stripe/create-checkout-session`,
        {
          price: priceId,
          userId: user?.id,
          credits: credits ?? 0,
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

  return (
    <Button
      onClick={() => !isUserCurrentPlan && handleCheckout()}
      className="w-full py-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600"
      disabled={isLoading || isUserCurrentPlan}
    >
      {isLoading ? <Loader2 className="mr-4 h-4 w-4 animate-spin" /> : null}
      {isUserCurrentPlan ? (
        "Current Plan"
      ) : (
        <>
          Upgrade now <MoveRight className="h-5 w-5 ml-1.5" />
        </>
      )}
    </Button>
  );
};

export default UpgradeButton;
