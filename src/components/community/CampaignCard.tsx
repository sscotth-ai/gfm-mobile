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
  const percentage = Math.min(
    (campaign.raisedAmount / campaign.goalAmount) * 100,
    100,
  );

  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate}>
      <Link to={`/f/${campaign.slug}`} className="block">
        <Card className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
            {imgError ? (
              <div className="size-full bg-gradient-to-br from-amber-400 to-orange-500" />
            ) : (
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="size-full object-cover"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          <CardContent className="py-3 px-4">
            <h3 className="font-medium text-sm line-clamp-2">
              {campaign.title}
            </h3>

            <p className="text-xs text-muted-foreground mt-1">
              by {campaign.organizerName}
            </p>

            <div className="mt-2 h-1.5 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-success"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="text-xs mt-1">
              {formatCurrency(campaign.raisedAmount)} raised of{" "}
              {formatCurrency(campaign.goalAmount)}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
