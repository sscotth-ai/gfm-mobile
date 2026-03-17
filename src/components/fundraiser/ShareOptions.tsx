"use client";

import { useState } from "react";
import { Link, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface ShareOptionsProps {
  campaignTitle: string;
}

export default function ShareOptions({ campaignTitle }: ShareOptionsProps) {
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
            className="w-full bg-[#274a34] text-[#ccf88e] hover:bg-[#1f3b29] hover:text-[#ccf88e]"
          />
        }
      >
        <Link className="size-4" />
        Share
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Share this fundraiser</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4 pb-4">
          <Button variant="ghost" className="w-full justify-start py-3" onClick={handleCopyLink}>
            <Link className="size-4" />
            {copied ? "Copied!" : "Copy link"}
          </Button>
          <Button variant="ghost" className="w-full justify-start py-3" onClick={handleShareX}>
            <Twitter className="size-4" />
            Share on X
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start py-3"
            onClick={handleShareFacebook}
          >
            <Facebook className="size-4" />
            Share on Facebook
          </Button>
          <Button variant="ghost" className="w-full justify-start py-3" onClick={handleShareEmail}>
            <Mail className="size-4" />
            Share via Email
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
