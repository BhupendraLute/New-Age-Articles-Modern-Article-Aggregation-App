"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure this only runs on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid mismatches during SSR

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </Button>
  );
};
