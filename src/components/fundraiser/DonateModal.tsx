import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fadeScale, buttonPress } from "@/lib/animations";
import { formatCurrency } from "@/lib/format";

const PRESET_AMOUNTS = [25, 50, 100, 250] as const;
const TIP_AMOUNT = 5;

interface DonateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DonateModal({ open, onOpenChange }: DonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [includeTip, setIncludeTip] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedAmount(null);
      setCustomAmount("");
      setShowCustom(false);
      setIncludeTip(false);
      setSubmitted(false);
    }
  }, [open]);

  const effectiveAmount = showCustom ? parseFloat(customAmount) || null : selectedAmount;
  const totalAmount = effectiveAmount ? effectiveAmount + (includeTip ? TIP_AMOUNT : 0) : null;

  function handlePresetSelect(amount: number) {
    setShowCustom(false);
    setCustomAmount("");
    setSelectedAmount(amount);
  }

  function handleShowCustom() {
    setShowCustom(true);
    setSelectedAmount(null);
  }

  function handleContinue() {
    if (effectiveAmount && effectiveAmount > 0) {
      setSubmitted(true);
    }
  }

  function handleDone() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/12 bg-[#111] text-white sm:max-w-md">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="selecting"
              initial={fadeScale.initial}
              animate={fadeScale.animate}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            >
              <DialogHeader>
                <DialogTitle className="text-white">Choose a donation amount</DialogTitle>
                <DialogDescription className="text-white/50">
                  Select a preset amount or enter a custom value.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {PRESET_AMOUNTS.map((amount) => (
                  <motion.button
                    key={amount}
                    type="button"
                    {...buttonPress}
                    onClick={() => handlePresetSelect(amount)}
                    className={`flex h-12 items-center justify-center rounded-2xl border text-sm font-medium transition-colors ${
                      !showCustom && selectedAmount === amount
                        ? "border-[#0df29e] bg-[#0df29e]/10 text-[#0df29e] shadow-[0_0_15px_rgba(13,242,158,0.15)]"
                        : "border-white/12 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {formatCurrency(amount)}
                  </motion.button>
                ))}
              </div>

              <div className="mt-3">
                {!showCustom ? (
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-white/12 text-white/70 hover:bg-white/8 hover:text-white"
                    onClick={handleShowCustom}
                  >
                    Other amount
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 rounded-2xl border border-[#0df29e]/40 bg-white/5 px-3 py-2 focus-within:border-[#0df29e] focus-within:shadow-[0_0_10px_rgba(13,242,158,0.15)]">
                    <span className="text-sm text-white/50">$</span>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <Separator className="my-4 bg-white/10" />

              <label className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-sm text-white/70">
                  Include a {formatCurrency(TIP_AMOUNT)} tip to help the platform
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includeTip}
                  onClick={() => setIncludeTip(!includeTip)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                    includeTip ? "bg-[#0df29e]" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform ${
                      includeTip ? "translate-x-[18px]" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </label>

              <DialogFooter className="mt-4">
                <Button
                  className="w-full rounded-full bg-[#0df29e] text-[#050505] font-semibold hover:bg-[#0df29e]/90 neon-glow"
                  disabled={!effectiveAmount || effectiveAmount <= 0}
                  onClick={handleContinue}
                >
                  <Heart className="size-4" />
                  Continue
                  {totalAmount ? ` \u2014 ${formatCurrency(totalAmount)}` : ""}
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={fadeScale.initial}
              animate={fadeScale.animate}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              className="flex flex-col items-center py-6 text-center"
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-[#0df29e]/15">
                <Check className="size-8 text-[#0df29e]" />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-white">Thank you!</h2>
              <p className="mt-2 text-sm text-white/50">
                Your donation of {totalAmount ? formatCurrency(totalAmount) : ""} will make a
                difference.
              </p>

              <DialogFooter className="mt-6 w-full">
                <Button
                  className="w-full rounded-full bg-[#0df29e] text-[#050505] font-semibold hover:bg-[#0df29e]/90"
                  onClick={handleDone}
                >
                  Done
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
