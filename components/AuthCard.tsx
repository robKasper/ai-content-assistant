"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";

interface AuthCardProps {
  mode: "login" | "signup";
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error?: string;
}

export default function AuthCard({ mode, onSubmit, loading, error }: AuthCardProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  const title = isLogin ? "Welcome Back" : "Create Account";
  const description = isLogin
    ? "Sign in to your account"
    : "Sign up to start generating content";
  const buttonText = isLogin
    ? loading ? "Signing in..." : "Sign In"
    : loading ? "Creating account..." : "Sign Up";
  const linkText = isLogin ? "Sign up" : "Sign in";
  const linkHref = isLogin ? "/auth/signup" : "/auth/login";
  const linkPrompt = isLogin
    ? "Don't have an account?"
    : "Already have an account?";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder={isLogin ? "Password" : "Password (min 6 characters)"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 py-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {buttonText}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              {linkPrompt}{" "}
              <Link href={linkHref} className="text-blue-600 hover:underline">
                {linkText}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
