import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, HeartHandshake } from "lucide-react";
import { formatCurrency } from "@/lib/format";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250] as const;

interface DonateDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DonateDrawer({ open, onOpenChange }: DonateDrawerProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setSelectedAmount(50);
      setCustomAmount("");
      setShowCustom(false);
      setSubmitted(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") onOpenChange(false);
      }
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, onOpenChange]);

  const effectiveAmount = showCustom ? parseFloat(customAmount) || 0 : selectedAmount;

  function handlePresetSelect(amount: number) {
    setShowCustom(false);
    setCustomAmount("");
    setSelectedAmount(amount);
  }

  function handleShowCustom() {
    setShowCustom(true);
    setSelectedAmount(0);
  }

  function handleContinue() {
    if (effectiveAmount > 0) {
      setSubmitted(true);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            onClick={() => onOpenChange(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[65%] max-h-[600px] flex-col rounded-t-3xl border-t border-white/10 bg-[#050505]/80 shadow-2xl backdrop-blur-[24px]"
          >
            {/* Drag Handle */}
            <div className="flex w-full justify-center pb-2 pt-4">
              <div className="h-1.5 w-12 rounded-full bg-white/20" />
            </div>

            {submitted ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-[#0df29e]/15">
                  <Check className="size-8 text-[#0df29e]" />
                </div>
                <h2 className="mt-4 font-display text-xl font-bold text-white">Thank you!</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Your donation of {formatCurrency(effectiveAmount)} will make a difference.
                </p>
                <button
                  onClick={() => onOpenChange(false)}
                  className="mt-6 h-14 w-full rounded-full bg-white font-display text-lg font-bold tracking-wide text-black shadow-lg transition-transform active:scale-[0.98]"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {/* Scrollable Content */}
                <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-24">
                  {/* Header */}
                  <div className="mb-8 text-center">
                    <h2 className="mb-2 font-display text-2xl font-bold tracking-tight text-white">
                      Make an impact
                    </h2>
                    <p className="font-display text-sm text-slate-400">
                      Select an amount to give directly to this cause.
                    </p>
                  </div>

                  {/* Amount Grid */}
                  <div className="mb-8 grid grid-cols-2 gap-4">
                    {PRESET_AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handlePresetSelect(amount)}
                        className={`relative flex h-16 items-center justify-center rounded-2xl transition-all active:scale-95 ${
                          !showCustom && selectedAmount === amount
                            ? "border-2 border-[#0df29e] bg-[#0df29e]/10 shadow-[0_0_20px_rgba(13,242,158,0.2)]"
                            : "border border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <span
                          className={`font-display text-xl font-bold ${
                            !showCustom && selectedAmount === amount
                              ? "text-[#0df29e]"
                              : "text-white"
                          }`}
                        >
                          ${amount}
                        </span>
                      </button>
                    ))}

                    {/* Custom Option */}
                    {!showCustom ? (
                      <button
                        type="button"
                        onClick={handleShowCustom}
                        className="relative flex h-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 active:scale-95"
                      >
                        <span className="font-display text-lg font-medium text-slate-300">
                          Custom
                        </span>
                      </button>
                    ) : (
                      <div className="relative flex h-16 items-center justify-center rounded-2xl border-2 border-[#0df29e] bg-[#0df29e]/10 px-4 shadow-[0_0_20px_rgba(13,242,158,0.2)]">
                        <span className="mr-1 font-display text-xl font-bold text-[#0df29e]">
                          $
                        </span>
                        <input
                          type="number"
                          min="1"
                          step="any"
                          placeholder="0"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          className="w-full bg-transparent font-display text-xl font-bold text-[#0df29e] outline-none placeholder:text-[#0df29e]/30"
                          autoFocus
                        />
                      </div>
                    )}
                  </div>

                  {/* Impact Label */}
                  {effectiveAmount > 0 && (
                    <div className="mb-6 mt-auto px-4 text-center">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                        <HeartHandshake className="size-4 text-[#0df29e]" />
                        <p className="font-display text-sm font-medium text-slate-200">
                          Your{" "}
                          <span className="font-bold text-[#0df29e]">
                            ${effectiveAmount}
                          </span>{" "}
                          {effectiveAmount >= 500
                            ? "sponsors monitoring in a new county"
                            : effectiveAmount >= 100
                              ? "funds server costs for a day"
                              : effectiveAmount >= 25
                                ? "covers a monitor's shift"
                                : "helps keep communities safe"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sticky Footer CTA */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent p-6 pt-12">
                  <button
                    onClick={handleContinue}
                    disabled={effectiveAmount <= 0}
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white font-display text-lg font-bold tracking-wide text-black shadow-lg transition-transform active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100"
                  >
                    Donate{effectiveAmount > 0 ? ` ${formatCurrency(effectiveAmount)}` : ""}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
