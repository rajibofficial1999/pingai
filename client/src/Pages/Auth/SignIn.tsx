import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox";
import { LoaderCircle, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router";
import AuthInput from "./AuthInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import axiosInstance from "@/lib/axios";
import { setUser } from "@/lib/store/authSlice";
import GoogleAuth from "@/components/GoogleAuth";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email address is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .nonempty({ message: "Password address is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z.string().optional(),
  confirmPassword: z.string().optional(),
  terms: z.boolean().optional(),
});

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const { data: result } = await axiosInstance.post("/auth/sign-in", data);
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
        Don't have an account?
        <Link
          to="/sign-up"
          className="text-primary font-semibold hover:underline ml-1"
        >
          Create here
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
