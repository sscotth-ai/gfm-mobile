"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Donation } from "@/types";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/animations";
import DonationItem from "@/components/fundraiser/DonationItem";

interface DonationsListProps {
  donations: Donation[];
  compact?: boolean;
}

export default function DonationsList({
  donations,
  compact = false,
}: DonationsListProps) {
  const [expanded, setExpanded] = useState(false);
  const total = donations.length;

  const defaultCount = compact ? 3 : 5;
  const visibleDonations = expanded
    ? donations
    : donations.slice(0, defaultCount);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Donations ({total})</h3>

      <motion.div
        initial="initial"
        animate={staggerContainer.animate}
        className="space-y-4"
      >
        {visibleDonations.map((donation) => (
          <DonationItem
            key={donation.id}
            donation={donation}
            compact={compact}
          />
        ))}
      </motion.div>

      {!compact && total > defaultCount && (
        <Button
          variant="link"
          onClick={() => setExpanded((prev) => !prev)}
          className="px-0"
        >
          {expanded ? "Show less" : `See all ${total}`}
        </Button>
      )}
    </div>
  );
}
