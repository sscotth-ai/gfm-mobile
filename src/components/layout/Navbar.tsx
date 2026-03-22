import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <nav className="gfm-shell flex items-center justify-center">
        <Link to="/" aria-label="GoFundMe" className="flex items-center gap-2">
          <span className="font-display text-[18px] font-bold tracking-tighter text-[#0df29e] drop-shadow-[0_0_10px_rgba(13,242,158,0.4)] md:text-[22px]">
            GoFundMe
          </span>
        </Link>
      </nav>
    </header>
  );
}
