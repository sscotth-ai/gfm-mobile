import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        "fixed top-0 right-0 left-0 z-50 flex h-16 items-center transition-colors duration-200",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
        {/* Left: Logo */}
        <Link to="/" className="text-lg font-bold tracking-tight">
          DonateWithFriends
        </Link>

        {/* Center: Search (hidden on mobile) */}
        <div className="mx-4 hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              disabled
              placeholder="Search fundraisers..."
              className="h-9 w-full rounded-lg border border-input bg-muted/50 pl-9 pr-4 text-sm text-muted-foreground placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" render={<Link to="/" />}>
            Start a GoFundMe
          </Button>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
