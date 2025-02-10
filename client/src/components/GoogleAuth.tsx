import { Button } from "@/components/ui/button.tsx";
import { PLANS } from "@/config/stripe";
import axiosInstance from "@/lib/axios.ts";
import { auth, provider } from "@/lib/firebase.ts";
import { setUser } from "@/lib/store/authSlice.ts";
import { cn } from "@/lib/utils";
import { signInWithPopup } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

interface GoogleAuthProps {
  className?: string;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleSignIn = async (user: any) => {
    const { displayName, email, photoURL } = user;

    const defaultPlan = PLANS.find(
      (plan) => plan.name?.toLowerCase() === "free"
    );

    try {
      const { data } = await axiosInstance.post("/auth/google-sign-in", {
        name: displayName,
        email,
        avatar: photoURL,
        credits: defaultPlan?.credits ?? 0,
      });
      if (data.success) {
        dispatch(setUser(data.user));
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    const googleResponse = await signInWithPopup(auth, provider);
    await googleSignIn(googleResponse.user);
  };
  return (
    <Button
      type="button"
      className={cn("w-full h-12", className)}
      variant="outline"
      onClick={handleSignIn}
    >
      <img src="/images/google-icon.svg" className="size-5" alt="google" />
      Sign in with Google
    </Button>
  );
};

export default GoogleAuth;
