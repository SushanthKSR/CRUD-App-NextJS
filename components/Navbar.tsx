"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="navbar bg-transparent shadow-sm">
      <div className="container mx-auto bg-inherit">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost text-xl text- dark:text-white transition-colors duration-300"
          >
            Sushanth Kesamreddy
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/" className={pathname === "/" ? "active" : ""}>
                <Home className="h-5 w-5" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/posts"
                className={pathname === "/posts" ? "active" : ""}
              >
                <FileText className="h-5 w-5" />
                Posts
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
