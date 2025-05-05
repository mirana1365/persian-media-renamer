
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user } = useAuth();
  
  return (
    <nav className="bg-card shadow-sm border-b">
      <div className="container max-w-4xl py-4 px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/profile">پروفایل</Link>
              </Button>
            </>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/login">ورود / ثبت‌نام</Link>
            </Button>
          )}
        </div>
        <Link to="/" className="text-xl font-bold text-primary">
          Transaction House
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
