"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";

interface StickyDonateBarProps {
  raisedAmount: number;
  goalAmount: number;
  onDonateClick: () => void;
}

export default function StickyDonateBar({
  raisedAmount,
  goalAmount,
  onDonateClick,
}: StickyDonateBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("campaign-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
        >
          <div className="border-t border-[#e3e2dd] bg-white/96 px-4 py-3 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1152px] items-center justify-between gap-4">
              <div>
                <p className="text-[16px] font-semibold text-[#232323]">
                  {formatCurrency(raisedAmount)} raised
                </p>
                <p className="text-[14px] text-[#6f7069]">of {formatCurrency(goalAmount)} goal</p>
              </div>
              <Button
                className="bg-[#ccf88e] text-[#274a34] hover:bg-[#c2f27f]"
                onClick={onDonateClick}
              >
                <Heart className="size-4" />
                Donate
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
