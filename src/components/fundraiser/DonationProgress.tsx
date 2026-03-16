"use client";

import { motion } from "motion/react";
import { fadeUp, easeOut } from "@/lib/animations";
import { formatCurrency, formatNumber } from "@/lib/format";

interface DonationProgressProps {
  raisedAmount: number;
  goalAmount: number;
  donationCount: number;
}

export default function DonationProgress({
  raisedAmount,
  goalAmount,
  donationCount,
}: DonationProgressProps) {
  const percentage = Math.min((raisedAmount / goalAmount) * 100, 100);

  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      className="space-y-2"
    >
      <p className="text-sm text-muted-foreground">
        <span className="text-lg font-bold text-foreground">
          {formatCurrency(raisedAmount)}
        </span>{" "}
        raised of {formatCurrency(goalAmount)} goal
      </p>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-success"
          initial={{ width: "0%" }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: easeOut }}
          viewport={{ once: true }}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {formatNumber(donationCount)} donations
      </p>
    </motion.div>
  );
}
