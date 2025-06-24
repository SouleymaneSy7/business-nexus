"use client";

import * as z from "zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Alert, AlertDescription } from "@components/ui/alert";
import { GoogleIcon, GithubIcon } from "@/icons/Icons.component";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import Title from "@components/common/Title";
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

  const onSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const role = "entrepreneur";

    try {
      router.push(`/dashboard/${role}`);
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container as={"main"} className="flex w-full max-w-lg flex-col gap-6">
      <Title level="h1" ariaLevel={1} className="text-primary text-center text-2xl font-semibold">
        Business Nexus
      </Title>

      <Card className="py-8">
        <CardHeader className="mb-6 text-center">
          <CardTitle level="h2" ariaLevel={2} className="text-primary text-lg">
            Welcome back
          </CardTitle>
          <CardDescription>Login with your Google or Github account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex w-full flex-wrap items-center justify-center gap-3">
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
                    className="w-full"
                  />
                  {errors.email && (
                    <small className="text-sm text-red-500">{errors.email.message}</small>
                  )}
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center flex-wrap gap-2">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>

                  <Input
                    required
                    type="password"
                    id={passwordId}
                    disabled={isLoading}
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full"
                  />

                  {errors.password && (
                    <small className="text-sm text-red-500">{errors.password.message}</small>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id={rememberId} className="cursor-pointer" />
                  <Label htmlFor={rememberId} className="font-semibold">
                    Remember Me
                  </Label>
                </div>

                {errorMessage && (
                  <Alert variant="destructive">
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full cursor-pointer items-center gap-2"
                >
                  {isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
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
