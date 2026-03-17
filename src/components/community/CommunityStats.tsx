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
      className="grid grid-cols-2 gap-5 border-y border-[#e3e2dd] py-5 sm:grid-cols-4"
    >
      {statItems.map((item) => (
        <motion.div key={item.key} variants={staggerItem} className="text-left sm:text-center">
          <p className="text-[20px] font-semibold text-[#232323] sm:text-[28px]">
            {item.format(stats[item.key])}
          </p>
          <p className="text-[14px] text-[#6f7069] sm:text-[15px]">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
