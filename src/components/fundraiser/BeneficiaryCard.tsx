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
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            {beneficiary.logoUrl ? (
              <img
                src={beneficiary.logoUrl}
                alt={beneficiary.name}
                className="size-12 rounded-2xl border border-[#e3e2dd] object-cover"
              />
            ) : (
              <div className="grid size-12 place-items-center rounded-2xl border border-[#e3e2dd] bg-[#f7f5f2] text-lg font-semibold text-[#274a34]">
                {beneficiary.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-[24px] font-semibold text-[#232323]">{beneficiary.name}</span>
            {beneficiary.isVerified && (
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#16a34a] text-white">
                <Check className="size-3" />
              </span>
            )}
          </div>

          <p className="text-[16px] leading-7 text-[#6f7069]">{beneficiary.description}</p>

          <div className="flex flex-wrap gap-2">
            {beneficiary.isNonprofit && (
              <Badge variant="secondary" className="rounded-full bg-[#f7f5f2] text-[#232323]">
                Verified nonprofit
              </Badge>
            )}
            <Badge variant="secondary" className="rounded-full bg-[#f7f5f2] text-[#232323]">
              Tax-deductible
            </Badge>
          </div>

          <Link
            to={`/communities/${beneficiary.slug}`}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#274a34] hover:underline"
          >
            View community page
            <ExternalLink className="size-3.5" />
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
