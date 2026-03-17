"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { LeaderboardEntry } from "@/types";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatCurrency } from "@/lib/format";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  total?: number;
}

export default function Leaderboard({ entries, total }: LeaderboardProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[22px] font-semibold text-[#232323]">Leaderboard</h2>
        {total ? <span className="text-[16px] text-[#6f7069]">{total}</span> : null}
      </div>

      <motion.ol
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="mt-5 flex flex-col gap-4"
      >
        {entries.map((entry) => (
          <motion.li key={entry.rank} variants={staggerItem} className="flex items-center gap-3">
            <span className="w-6 text-center text-[18px] font-semibold text-[#6f7069]">
              {entry.rank}
            </span>

            <Avatar className="size-11 border border-[#e3e2dd]">
              {entry.organizerAvatarUrl ? (
                <AvatarImage src={entry.organizerAvatarUrl} alt={entry.organizerName} />
              ) : null}
              <AvatarFallback className="bg-[#f7f5f2] text-[#6f7069]">
                {entry.organizerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <Link
                to={`/u/${entry.organizerUsername}`}
                className="text-[15px] font-semibold text-[#232323] hover:underline"
              >
                {entry.organizerName}
              </Link>
              <Link
                to={`/f/${entry.campaignSlug}`}
                className="block text-[14px] leading-5 text-[#6f7069] line-clamp-2 hover:underline"
              >
                {entry.campaignTitle}
              </Link>
            </div>

            <span className="shrink-0 text-[16px] font-semibold text-[#232323]">
              {formatCurrency(entry.raisedAmount)}
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
