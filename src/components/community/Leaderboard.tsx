"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { LeaderboardEntry } from "@/types";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatCurrency } from "@/lib/format";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Top fundraisers</h2>

      <motion.ol
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="mt-4 flex flex-col gap-3"
      >
        {entries.map((entry) => (
          <motion.li
            key={entry.rank}
            variants={staggerItem}
            className="flex items-center gap-3"
          >
            {/* Rank */}
            <span className="w-8 text-center text-lg font-bold text-muted-foreground">
              {entry.rank}
            </span>

            {/* Avatar */}
            <Avatar className="size-10">
              {entry.organizerAvatarUrl ? (
                <AvatarImage
                  src={entry.organizerAvatarUrl}
                  alt={entry.organizerName}
                />
              ) : null}
              <AvatarFallback>
                {entry.organizerName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Name and campaign */}
            <div className="min-w-0 flex-1">
              <Link
                to={`/u/${entry.organizerUsername}`}
                className="font-medium text-foreground hover:underline"
              >
                {entry.organizerName}
              </Link>
              <Link
                to={`/f/${entry.campaignSlug}`}
                className="block text-sm text-muted-foreground line-clamp-1 hover:underline"
              >
                {entry.campaignTitle}
              </Link>
            </div>

            {/* Amount raised */}
            <span className="shrink-0 font-semibold">
              {formatCurrency(entry.raisedAmount)}
            </span>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}
