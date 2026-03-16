"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, ExternalLink } from "lucide-react";
import type { Beneficiary } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeUp } from "@/lib/animations";

interface BeneficiaryCardProps {
  beneficiary: Beneficiary;
}

export default function BeneficiaryCard({ beneficiary }: BeneficiaryCardProps) {
  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate}>
      <Card>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">
              {beneficiary.name}
            </span>
            {beneficiary.isVerified && (
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-green-500 text-white">
                <Check className="size-3" />
              </span>
            )}
          </div>

          <p className="line-clamp-2 text-sm text-muted-foreground">
            {beneficiary.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {beneficiary.isNonprofit && (
              <Badge variant="secondary">Verified nonprofit</Badge>
            )}
            <Badge variant="secondary">Tax-deductible</Badge>
          </div>

          <Link
            to={`/communities/${beneficiary.id}`}
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View community page
            <ExternalLink className="size-3.5" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
