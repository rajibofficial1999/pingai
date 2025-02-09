import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const UpgradeButton = ({
  priceId,
  isUserCurrentPlan,
}: {
  priceId: string;
  isUserCurrentPlan: boolean;
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
      className="w-full py-5 rounded-xl bg-gradient-to-r from-primary to-primary/70"
      disabled={isLoading || isUserCurrentPlan}
    >
      {isLoading ? <Loader2 className="mr-4 h-4 w-4 animate-spin" /> : null}
      {isUserCurrentPlan ? (
        "Current Plan"
      ) : (
        <>
          Upgrade now <ArrowRight className="h-5 w-5 ml-1.5" />
        </>
      )}
    </Button>
  );
};

export default UpgradeButton;
