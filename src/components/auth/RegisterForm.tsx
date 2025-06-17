"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@components/ui/alert";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@components/ui/checkbox";
import { Textarea } from "@components/ui/textarea";
import { auth } from "@/lib/auth";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
    role: z.enum(["entrepreneur", "investor"], {
      required_error: "Please select a role",
    }),
    company: z.string().min(2, "Company name must be at least 2 characters long"),
    bio: z
      .string()
      .min(10, "Bio must be at least 10 characters long")
      .max(500, "Bio must be less than 500 characters"),
    terms: z.boolean().refine((value) => value === true, {
      message: "You must accept the terms and conditions Orign",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;
type SignUpParams = {
  email: string;
  password: string;
  name: string;
  role: "entrepreneur" | "investor";
  company: string;
  bio: string;
  isAgreedToTerms: boolean;
};

const RegisterForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "entrepreneur",
      company: "",
      bio: "",
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!data.terms) {
        setError("You must accept the terms and conditions.");
        return;
      }

      const signUpData: SignUpParams = {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
        company: data.company,
        bio: data.bio,
        isAgreedToTerms: data.terms,
      };

      const result = await auth.api.signInEmail({
        body: signUpData
      });

      console.log(result)

      if (error) {
        setError("Error when creating account");
        return;
      }

      // Redirect to the dashboard corresponding to the role
      router.push(`/dashboard/${data.role}`);
    } catch (error) {
      setError("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create your Business Nexus account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" {...register("name")} disabled={isLoading} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="item-center flex w-full gap-4">
              <div className="w-1/2 space-y-2">
                <Label htmlFor="role">I am a</Label>
                <Select
                  onValueChange={(value) => setValue("role", value as "investor" | "entrepreneur")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
              </div>

              <div className="w-1/2 space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Company Name"
                  {...register("company")}
                  disabled={isLoading}
                />

                {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>

              <Textarea
                placeholder="Your Bio here..."
                id="bio"
                {...register("bio")}
                disabled={isLoading}
              />

              {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  {...register("terms")}
                  onCheckedChange={(checked) => {
                    setValue("terms", checked === true);
                  }}
                  disabled={isLoading}
                />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>

              {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default RegisterForm;
