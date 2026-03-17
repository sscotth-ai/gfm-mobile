"use client";

import { motion } from "motion/react";
import { User } from "lucide-react";
import type { Donation } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { staggerItem } from "@/lib/animations";
import { formatCurrency, formatRelativeTime } from "@/lib/format";

interface DonationItemProps {
  donation: Donation;
  compact?: boolean;
}

export default function DonationItem({ donation, compact = false }: DonationItemProps) {
  const displayName = donation.isAnonymous ? "Anonymous" : donation.donorName;

  return (
    <motion.div
      initial={staggerItem.initial}
      animate={staggerItem.animate}
      className="flex items-start gap-3"
    >
      <Avatar className="size-10 border border-[#e3e2dd]">
        {donation.donorAvatarUrl && !donation.isAnonymous ? (
          <AvatarImage src={donation.donorAvatarUrl} alt={displayName} />
        ) : null}
        <AvatarFallback className="bg-[#f7f5f2] text-[#6f7069]">
          {donation.isAnonymous ? <User className="size-4" /> : displayName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-[15px] font-semibold text-[#232323]">{displayName}</span>
          <span className="text-[15px] font-semibold text-[#232323]">
            {formatCurrency(donation.amount)}
          </span>
        </div>

        <p className="text-[14px] text-[#6f7069]">{formatRelativeTime(donation.createdAt)}</p>

        {!compact && donation.message && (
          <p className="mt-2 text-[15px] leading-6 text-[#4f504a]">{donation.message}</p>
        )}
      </div>
    </motion.div>
  );
}
