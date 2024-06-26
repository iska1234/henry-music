"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { getSession, signIn, signOut } from "next-auth/react";

import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}


interface ILoginUser {
  email: string;
  password: string;
}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const [data, setData] = useState<ILoginUser>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });
    
    if (res?.error) {
      setErrors(res.error.split(","));
      alert('error al iniciar secion')
    }

    if (res?.ok) {
      const session = await getSession();
      const user = session?.user;
      // router.push("/home");
      
      if(user){
          const userName = user.name.replace(/\s/g, '');
        
          if(user.esta_verificado === false){
                signOut({ callbackUrl: `${window.location.origin}/verification/${userName}` });
      } else if (user.esta_verificado === true) {
            router.push("/home");
        }
      }
    }


    
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 5000);

    setData({
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* {JSON.stringify(data)} */}
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {errors.length > 0 && (
        <div className="alert alert-danger mt-2">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <Button
        onClick={() => signIn("google", { callbackUrl: "/home" })}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google  className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}