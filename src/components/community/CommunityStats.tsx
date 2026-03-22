"use client";

import { motion } from "motion/react";
import type { CommunityStats as CommunityStatsType } from "@/types";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatCurrency, formatNumber } from "@/lib/format";

interface CommunityStatsProps {
  stats: CommunityStatsType;
}

const statItems = [
  { key: "totalRaised", label: "raised", format: formatCurrency },
  { key: "totalDonations", label: "donations", format: formatNumber },
  { key: "fundraiserCount", label: "fundraisers", format: formatNumber },
  { key: "followerCount", label: "followers", format: formatNumber },
] as const;

export default function CommunityStats({ stats }: CommunityStatsProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="glass grid grid-cols-2 gap-5 rounded-[24px] p-5 sm:grid-cols-4"
    >
      {statItems.map((item) => (
        <motion.div key={item.key} variants={staggerItem} className="text-left sm:text-center">
          <p className="font-display text-[22px] font-bold text-[#0df29e] sm:text-[28px]">
            {item.format(stats[item.key])}
          </p>
          <p className="text-[14px] text-white/40 sm:text-[15px]">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
