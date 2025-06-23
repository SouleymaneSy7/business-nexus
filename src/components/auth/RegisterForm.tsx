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
import Container from "@components/common/Container";
import Title from "@components/common/Title";

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

const RegisterForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const id = React.useId();
  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;
  const confirmPasswordId = `${id}-confirm-password`;
  const roleId = `${id}-role`;
  const companyId = `${id}-company`;
  const bioId = `${id}-bio`;
  const termsId = `${id}-terms`;

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
    setErrorMessage(null);

    try {
      if (!data.terms) {
        setErrorMessage("You must accept the terms and conditions.");
        return;
      }

      router.push(`/dashboard/${data.role}`);
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <Title level="h1" ariaLevel={1} className="text-primary text-center text-2xl font-semibold">
        Business Nexus
      </Title>

      <Card className="py-8">
        <CardHeader>
          <CardTitle level="h2" ariaLevel={2} className="text-primary text-lg">
            Register
          </CardTitle>
          <CardDescription>Create your Business Nexus account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={nameId}>Full Name</Label>
              <Input
                id={nameId}
                placeholder="John Doe"
                {...register("name")}
                disabled={isLoading}
              />
              {errors.name && <small className="text-sm text-red-500">{errors.name.message}</small>}
            </div>

            <div className="space-y-2">
              <Label htmlFor={emailId}>Email</Label>
              <Input
                id={emailId}
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <small className="text-sm text-red-500">{errors.email.message}</small>
              )}
            </div>

            <div className="item-center flex w-full gap-4">
              <div className="w-1/2 space-y-2">
                <Label htmlFor={roleId}>I am a</Label>

                <Select
                  onValueChange={(value) => setValue("role", value as "investor" | "entrepreneur")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" id={roleId} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                  </SelectContent>
                </Select>

                {errors.role && (
                  <small className="text-sm text-red-500">{errors.role.message}</small>
                )}
              </div>

              <div className="w-1/2 space-y-2">
                <Label htmlFor={companyId}>Company</Label>
                <Input
                  id={companyId}
                  type="text"
                  placeholder="Company Name"
                  {...register("company")}
                  disabled={isLoading}
                />
                {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={bioId}>Bio</Label>
              <Textarea
                id={bioId}
                disabled={isLoading}
                {...register("bio")}
                placeholder="Your Bio here..."
              />
              {errors.bio && <small className="text-sm text-red-500">{errors.bio.message}</small>}
            </div>

            <div className="space-y-2">
              <Label htmlFor={passwordId}>Password</Label>
              <Input
                id={passwordId}
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <small className="text-sm text-red-500">{errors.password.message}</small>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={confirmPasswordId}>Confirm Password</Label>

              <Input
                id={confirmPasswordId}
                type="password"
                disabled={isLoading}
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <small className="text-sm text-red-500">{errors.confirmPassword.message}</small>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={termsId}
                  {...register("terms")}
                  onCheckedChange={(checked) => {
                    setValue("terms", checked === true);
                  }}
                  disabled={isLoading}
                />
                <Label htmlFor={termsId} className="font-semibold">
                  I agree to terms and conditions.
                </Label>
              </div>

              {errors.terms && (
                <small className="text-sm text-red-500">{errors.terms.message}</small>
              )}
            </div>

            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
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
              <Link
                href="/login"
                className="text-primary font-semibold underline underline-offset-4"
              >
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="#" className="text-primary font-semibold underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary font-semibold underline underline-offset-4">
          Privacy Policy
        </a>
        .
      </div>
    </Container>
  );
};

export default RegisterForm;
