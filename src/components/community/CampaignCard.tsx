"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import type { CampaignSummary } from "@/types";
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
      <Link to={`/f/${campaign.slug}`} className="group block">
        <div className="gfm-card overflow-hidden transition-all hover:shadow-[0_8px_40px_rgba(13,242,158,0.08)] hover:border-white/20">
          <div className="aspect-[16/9] overflow-hidden bg-white/5">
            {imgError ? (
              <div className="size-full bg-gradient-to-br from-[#0df29e]/20 to-[#FF2E93]/10" />
            ) : (
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          <div className="space-y-3 p-5">
            <h3 className="text-[20px] leading-7 font-semibold text-white line-clamp-2">
              {campaign.title}
            </h3>

            <p className="text-[14px] text-white/40">by {campaign.organizerName}</p>

            <div className="h-1.5 rounded-full bg-white/10">
              <div
                className="neon-bar h-full rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="text-[14px] text-white/50">
              <span className="text-[#0df29e] font-medium">{formatCurrency(campaign.raisedAmount)}</span> raised of{" "}
              {formatCurrency(campaign.goalAmount)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
