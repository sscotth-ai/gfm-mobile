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

  // Reset all state when the dialog closes
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
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="selecting"
              initial={fadeScale.initial}
              animate={fadeScale.animate}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            >
              <DialogHeader>
                <DialogTitle>Choose a donation amount</DialogTitle>
                <DialogDescription>
                  Select a preset amount or enter a custom value.
                </DialogDescription>
              </DialogHeader>

              {/* Preset amount grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {PRESET_AMOUNTS.map((amount) => (
                  <motion.button
                    key={amount}
                    type="button"
                    {...buttonPress}
                    onClick={() => handlePresetSelect(amount)}
                    className={`flex h-12 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                      !showCustom && selectedAmount === amount
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {formatCurrency(amount)}
                  </motion.button>
                ))}
              </div>

              {/* Other amount button / custom input */}
              <div className="mt-3">
                {!showCustom ? (
                  <Button variant="outline" className="w-full" onClick={handleShowCustom}>
                    Other amount
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
                    <span className="text-sm text-muted-foreground">$</span>
                    <input
                      type="number"
                      min="1"
                      step="any"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              {/* Tip toggle */}
              <label className="flex cursor-pointer items-center justify-between gap-3">
                <span className="text-sm">
                  Include a {formatCurrency(TIP_AMOUNT)} tip to help the platform
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={includeTip}
                  onClick={() => setIncludeTip(!includeTip)}
                  className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                    includeTip ? "bg-primary" : "bg-muted"
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
                  className="w-full bg-heart text-heart-foreground hover:bg-heart/90"
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
              {/* Success icon */}
              <div className="flex size-16 items-center justify-center rounded-full bg-success/10">
                <Check className="size-8 text-success" />
              </div>

              <h2 className="mt-4 text-lg font-semibold">Thank you!</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your donation of {totalAmount ? formatCurrency(totalAmount) : ""} will make a
                difference.
              </p>

              <DialogFooter className="mt-6 w-full">
                <Button className="w-full" onClick={handleDone}>
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
