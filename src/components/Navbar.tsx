
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-card shadow-sm border-b">
      <div className="container max-w-4xl py-4 px-4 sm:px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
        <Link to="/" className="text-xl font-bold text-primary">
          Transaction House
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
