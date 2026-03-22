"use client";

import { useState } from "react";
import { Link, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface ShareOptionsProps {
  campaignTitle: string;
  className?: string;
}

export default function ShareOptions({ campaignTitle, className }: ShareOptionsProps) {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleShareX() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(campaignTitle)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  }

  function handleShareFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  }

  function handleShareEmail() {
    window.location.href = `mailto:?subject=${encodeURIComponent(campaignTitle)}&body=${encodeURIComponent(window.location.href)}`;
  }

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="secondary"
            className={cn(
              "rounded-full border border-white/12 bg-white/8 text-white hover:bg-white/12 hover:text-white",
              className,
            )}
          />
        }
      >
        <Link className="size-4" />
        Share
      </SheetTrigger>
      <SheetContent side="bottom" className="border-white/12 bg-[#111] text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Share this fundraiser</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4 pb-4">
          <Button variant="ghost" className="w-full justify-start py-3 text-white/70 hover:bg-white/8 hover:text-white" onClick={handleCopyLink}>
            <Link className="size-4" />
            {copied ? "Copied!" : "Copy link"}
          </Button>
          <Button variant="ghost" className="w-full justify-start py-3 text-white/70 hover:bg-white/8 hover:text-white" onClick={handleShareX}>
            <Twitter className="size-4" />
            Share on X
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start py-3 text-white/70 hover:bg-white/8 hover:text-white"
            onClick={handleShareFacebook}
          >
            <Facebook className="size-4" />
            Share on Facebook
          </Button>
          <Button variant="ghost" className="w-full justify-start py-3 text-white/70 hover:bg-white/8 hover:text-white" onClick={handleShareEmail}>
            <Mail className="size-4" />
            Share via Email
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
