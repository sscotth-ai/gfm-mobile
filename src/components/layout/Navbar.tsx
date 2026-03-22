import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex h-[48px] items-center border-b transition-all duration-300 md:h-[72px]",
        scrolled
          ? "border-white/10 bg-[#050505]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "border-transparent bg-transparent",
      )}
    >
      <nav className="gfm-shell flex items-center justify-between gap-4">
        <div className="hidden items-center gap-7 text-[16px] text-white/70 md:flex">
          <Link to="/" className="inline-flex items-center gap-2 hover:text-white">
            <Search className="size-4.5 stroke-[2]" />
          </Link>
          <button className="inline-flex items-center gap-1.5 hover:text-white">
            Donate
            <ChevronDown className="size-4" />
          </button>
          <button className="inline-flex items-center gap-1.5 hover:text-white">
            Fundraise
            <ChevronDown className="size-4" />
          </button>
        </div>

        <Link
          to="/"
          aria-label="GoFundMe"
          className="mx-auto flex items-center gap-2 md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          <span className="font-display text-[18px] font-bold tracking-tighter text-[#0df29e] drop-shadow-[0_0_10px_rgba(13,242,158,0.4)] md:text-[22px]">
            GoFundMe
          </span>
        </Link>

        <div className="flex items-center gap-4 text-[16px] text-white/70">
          <button className="hidden items-center gap-1.5 hover:text-white md:inline-flex">
            About
            <ChevronDown className="size-4" />
          </button>
          <button className="relative hidden hover:text-white md:inline-flex">
            <Bell className="size-4.5 stroke-[2]" />
            <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-[#FF2E93] text-[10px] font-semibold text-white">
              2
            </span>
          </button>
          <Link
            to="/"
            className="hidden font-medium text-white/70 hover:text-white md:inline-flex"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
