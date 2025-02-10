import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface AuthInputProps {
  id: string;
  label: string;
  className?: string;
  icon: LucideIcon;
  placeholder?: string;
  type?: "text" | "password" | "email";
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isLoading: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({
  id,
  label,
  className,
  icon: Icon,
  placeholder = "",
  type = "text",
  register,
  errors,
  isLoading = false,
}) => {
  return (
    <>
      <div>
        <Label className="block text-left mb-2 text-gray-700">{label}</Label>
        <div className="relative flex items-center">
          <Input
            id={id}
            type={type}
            autoComplete={id}
            className={cn("text-sm pl-4 pr-8 h-12 rounded-md", className, {
              "border-0 ring-1 !ring-red-500": errors[id],
            })}
            placeholder={placeholder}
            {...register(id as any)}
            disabled={isLoading}
          />

          <Icon className="size-5 absolute right-4 text-gray-400" />
        </div>
        {errors[id] && (
          <p className="text-red-600 text-sm italic mt-1">
            {errors[id].message as string}
          </p>
        )}
      </div>
    </>
  );
};

export default AuthInput;
