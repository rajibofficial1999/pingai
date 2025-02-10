import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle, Lock, Mail, UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import AuthInput from "./AuthInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import axiosInstance from "@/lib/axios";
import { setUser } from "@/lib/store/authSlice";
import { useEffect } from "react";
import GoogleAuth from "@/components/GoogleAuth";
import { PLANS } from "@/config/stripe";

const formSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z
      .string()
      .nonempty({ message: "Email address is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .nonempty({ message: "Password address is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password address is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const termsChecked = watch("terms");

  useEffect(() => {
    setValue("terms", !!termsChecked);
  }, [termsChecked, setValue]);

  const onSubmit = async (data: FieldValues) => {
    delete data.confirmPassword;
    delete data.terms;

    const defaultPlan = PLANS.find(
      (plan) => plan.name?.toLowerCase() === "free"
    );

    try {
      const { data: result } = await axiosInstance.post("/auth/sign-up", {
        ...data,
        credits: defaultPlan?.credits ?? 0,
      });
      if (result.success) {
        dispatch(setUser(result.user));
      }

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <GoogleAuth />
      <div className="my-4 flex items-center gap-4">
        <hr className="w-full border-gray-300" />
        <p className="text-sm text-gray-800 text-center">or</p>
        <hr className="w-full border-gray-300" />
      </div>

      <div className="space-y-4">
        <AuthInput
          id="name"
          label="Name"
          icon={UserIcon}
          placeholder="Enter name"
          register={register}
          errors={errors}
          isLoading={isSubmitting}
        />
        <AuthInput
          id="email"
          label="Email address"
          type="email"
          icon={Mail}
          placeholder="Enter email address"
          register={register}
          errors={errors}
          isLoading={isSubmitting}
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          icon={Lock}
          placeholder="Enter password"
          register={register}
          errors={errors}
          isLoading={isSubmitting}
        />
        <AuthInput
          id="confirmPassword"
          label="Confirm password"
          type="password"
          icon={Lock}
          placeholder="Enter confirm password"
          register={register}
          errors={errors}
          isLoading={isSubmitting}
        />

        <div>
          <div className="flex items-center space-x-2">
            <Checkbox
              required
              id="terms"
              disabled={isSubmitting}
              checked={termsChecked}
              onCheckedChange={(checked) => setValue("terms", checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>

      <div className="!mt-8">
        <Button
          type="submit"
          className="w-full py-5 px-4 text-sm tracking-wider font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting && <LoaderCircle className="size-5 animate-spin" />}
          Create an account
        </Button>
      </div>
      <p className="text-gray-800 text-sm mt-6 text-center">
        Already have an account?
        <Link
          to="/sign-in"
          className="text-primary font-semibold hover:underline ml-1"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
