"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      {theme === "light" ? (
        <div className="flex cursor-pointer">
          <BiMoon onClick={() => setTheme("dark")} />
        </div>
      ) : (
        <div className="flex cursor-pointer ">
          <BiSun onClick={() => setTheme("light")} className="text-white" />
        </div>
      )}
    </>
  );
};
