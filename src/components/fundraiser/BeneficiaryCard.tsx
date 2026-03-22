"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Check, ExternalLink } from "lucide-react";
import type { Beneficiary } from "@/types";
import { fadeUp } from "@/lib/animations";

interface BeneficiaryCardProps {
  beneficiary: Beneficiary;
}

export default function BeneficiaryCard({ beneficiary }: BeneficiaryCardProps) {
  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate}>
      <div className="gfm-card p-6 space-y-4">
        <div className="flex items-center gap-3">
          {beneficiary.logoUrl ? (
            <img
              src={beneficiary.logoUrl}
              alt={beneficiary.name}
              className="size-12 rounded-2xl border border-white/12 object-cover"
            />
          ) : (
            <div className="grid size-12 place-items-center rounded-2xl border border-white/12 bg-white/8 text-lg font-semibold text-[#0df29e]">
              {beneficiary.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-[24px] font-display font-semibold text-white">{beneficiary.name}</span>
          {beneficiary.isVerified && (
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#0df29e] text-[#050505]">
              <Check className="size-3" />
            </span>
          )}
        </div>

        <p className="text-[16px] leading-7 text-white/50">{beneficiary.description}</p>

        <div className="flex flex-wrap gap-2">
          {beneficiary.isNonprofit && (
            <span className="gfm-chip">Verified nonprofit</span>
          )}
          <span className="gfm-chip">Tax-deductible</span>
        </div>

        <Link
          to={`/communities/${beneficiary.slug}`}
          className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0df29e] hover:text-[#0df29e]/80"
        >
          View community page
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
