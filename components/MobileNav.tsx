"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignOutClient from "./SignOutClient";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileNavProps {
  userId: string | null;
}

export const MobileNav = ({ userId }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Toggle */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation */}
      {isOpen && (
        <nav className="flex flex-col gap-4 absolute top-full left-0 w-full bg-background shadow-md p-4">
          <Link href="/" className="font-medium hover:underline">
            Home
          </Link>
          <Link href="/profile" className="font-medium hover:underline">
            Profile
          </Link>

          {/* Authentication in Mobile Menu */}
          {userId ? (
            <SignOutClient />
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="default" className="w-full">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      )}
    </div>
  );
};
