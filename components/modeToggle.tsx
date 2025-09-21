"use client";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


const ModeToggle = ({title}: {title?: string}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  // Prevent SSR flicker and hydration mismatch
  if (!mounted) {
    return <Button size="icon" className="rounded-full" />;
  }
  return (
    <Button  className="rounded-md cursor-pointer" onClick={toggleTheme}>
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
      {title && <span>{title}</span>}
    </Button>
  );
};
export default ModeToggle;