"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { useTheme } from "next-themes";
import Navbar from "@/components/Navbar"; // Import Navbar

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Adjust overlay opacity based on theme
  const overlayOpacity =
    mounted && theme === "dark"
      ? "bg-black bg-opacity-50"
      : "bg-black bg-opacity-30";

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center overflow-hidden pt-[64px]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://cdn.pixabay.com/video/2017/06/05/9584-220312371_large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for better contrast */}
        <div className={`absolute inset-0 ${overlayOpacity}`} />

        {/* Hero Content */}
        <div
          className="relative z-10 text-center text-white px-4"
          style={{
            transform: `translateY(${scrollY * -0.2}px)`,
          }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            CRUD Application
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Create, Read, Update, and Delete – All in One!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/posts" className="btn btn-primary btn-lg">
              <FileText className="h-5 w-5 mr-2" />
              View Posts
            </Link>
            <Link
              href="#features"
              className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-black"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
