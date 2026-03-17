"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { CampaignSummary } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { fadeUp } from "@/lib/animations";

interface CampaignCardProps {
  campaign: CampaignSummary;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const [imgError, setImgError] = useState(false);
  const percentage = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);

  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate}>
      <Link to={`/f/${campaign.slug}`} className="block">
        <Card className="overflow-hidden border-[#e3e2dd] transition-shadow hover:shadow-[0_12px_30px_rgba(39,74,52,0.08)]">
          <div className="aspect-[16/9] overflow-hidden rounded-t-[24px] bg-[#f7f5f2]">
            {imgError ? (
              <div className="size-full bg-gradient-to-br from-[#f2c54f] to-[#ff8d1c]" />
            ) : (
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="size-full object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          <CardContent className="space-y-3 py-4">
            <h3 className="text-[20px] leading-7 font-semibold text-[#232323] line-clamp-2">
              {campaign.title}
            </h3>

            <p className="text-[14px] text-[#6f7069]">by {campaign.organizerName}</p>

            <div className="h-1.5 rounded-full bg-[#ece9e4]">
              <div
                className="h-full rounded-full bg-[#69c65b]"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="text-[14px] text-[#4f504a]">
              {formatCurrency(campaign.raisedAmount)} raised of{" "}
              {formatCurrency(campaign.goalAmount)}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
