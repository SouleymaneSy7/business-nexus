"use client";

import * as z from "zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import { Alert, AlertDescription } from "@components/ui/alert";
import { GoogleIcon, GithubIcon } from "@/icons/Icons.component";
import { Checkbox } from "@components/ui/checkbox";

import Container from "@components/common/Container";

type LoginFormType = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const id = React.useId();
  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;
  const rememberId = `${id}-remember`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true);
    setErrorMessage(null);

    const role = "entrepreneur";

    try {
      router.push(`/dashboard/${role}`);
    } catch (error) {
      setErrorMessage("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container as={"main"} className="w-full max-w-lg">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-primary text-2xl">Welcome back</CardTitle>
          <CardDescription>Login with your Google or Github account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex w-full items-center justify-center gap-3">
                <Button variant="outline" className="grow cursor-pointer">
                  <GoogleIcon />
                  Login with Google
                </Button>

                <Button variant={"outline"} className="grow cursor-pointer">
                  <GithubIcon />
                  Login with GitHub
                </Button>
              </div>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor={emailId}>Email</Label>

                  <Input
                    required
                    type="email"
                    id={emailId}
                    disabled={isLoading}
                    {...register("email")}
                    placeholder="email@example.com"
                  />
                  {errors.email && (
                    <small className="text-sm text-red-500">{errors.email.message}</small>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor={passwordId}>Password</Label>

                  <Input
                    required
                    type="password"
                    id={passwordId}
                    disabled={isLoading}
                    placeholder="••••••••"
                    {...register("password")}
                  />

                  {errors.password && (
                    <small className="text-sm text-red-500">{errors.password.message}</small>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id={rememberId} className="cursor-pointer" />
                  <Label htmlFor={rememberId}>Remember Me</Label>
                </div>

                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
                  {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                  Login
                </Button>
              </div>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href={"/register"} className="text-primary underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginForm;
