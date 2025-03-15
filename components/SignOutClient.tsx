"use client";

import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function SignOutClient() {
  return (
    <SignOutButton>
      <Button variant="default">Sign Out</Button>
    </SignOutButton>
  );
}