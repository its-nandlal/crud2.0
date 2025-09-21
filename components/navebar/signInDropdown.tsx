"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, Mail } from "lucide-react";
import { useStackApp } from "@stackframe/stack";

export default function SignInDropdown() {
  const app = useStackApp();

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      await app.signInWithOAuth(provider);
    } catch (error) {
      console.error("OAuth sign-in error:", error);
    }
  };

  const handleMagicLinkSignIn = async () => {
    try {
      // This would typically open a modal or redirect to email input
      await app.signInWithMagicLink;
    } catch (error) {
      console.error("Magic link sign-in error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer">Get Started</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className=" translate-y-2">
        <DropdownMenuLabel>Get Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleOAuthSignIn('google')} 
          className="border mt-1 cursor-pointer"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 488 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Sign in with Google
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleOAuthSignIn('github')}
          className="border mt-1 cursor-pointer"
        >
          <Github className="h-5 w-5 mr-2" />
          Sign in with GitHub
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleMagicLinkSignIn}
          className="border mt-1 cursor-pointer"
        >
          <Mail className="h-5 w-5 mr-2" />
          Sign in with Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
