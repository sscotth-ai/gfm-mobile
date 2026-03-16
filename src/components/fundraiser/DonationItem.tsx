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

export default function DonationItem({
  donation,
  compact = false,
}: DonationItemProps) {
  const displayName = donation.isAnonymous ? "Anonymous" : donation.donorName;

  return (
    <motion.div
      initial={staggerItem.initial}
      animate={staggerItem.animate}
      className="flex items-start gap-3"
    >
      <Avatar className="size-8">
        {donation.donorAvatarUrl && !donation.isAnonymous ? (
          <AvatarImage src={donation.donorAvatarUrl} alt={displayName} />
        ) : null}
        <AvatarFallback>
          {donation.isAnonymous ? (
            <User className="size-4" />
          ) : (
            displayName.charAt(0).toUpperCase()
          )}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-foreground">
            {displayName}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {formatCurrency(donation.amount)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          {formatRelativeTime(donation.createdAt)}
        </p>

        {!compact && donation.message && (
          <p className="mt-1 text-sm italic text-muted-foreground">
            {donation.message}
          </p>
        )}
      </div>
    </motion.div>
  );
}
