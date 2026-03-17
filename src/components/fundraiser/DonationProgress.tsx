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
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate} className="space-y-3">
      <p className="text-[17px] text-[#6f7069]">
        <span className="text-[24px] font-semibold text-[#232323]">
          {formatCurrency(raisedAmount)}
        </span>{" "}
        raised of {formatCurrency(goalAmount)} goal
      </p>

      <div className="h-2 w-full overflow-hidden rounded-full bg-[#ece9e4]">
        <motion.div
          className="h-full rounded-full bg-[#69c65b]"
          initial={{ width: "0%" }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: easeOut }}
          viewport={{ once: true }}
        />
      </div>

      <p className="text-[15px] text-[#6f7069]">{formatNumber(donationCount)} donations</p>
    </motion.div>
  );
}
