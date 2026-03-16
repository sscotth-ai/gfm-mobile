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
      className="grid grid-cols-2 gap-4 lg:grid-cols-4"
    >
      {statItems.map((item) => (
        <motion.div
          key={item.key}
          variants={staggerItem}
          className="text-center"
        >
          <p className="text-2xl font-bold">{item.format(stats[item.key])}</p>
          <p className="text-sm text-muted-foreground">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
