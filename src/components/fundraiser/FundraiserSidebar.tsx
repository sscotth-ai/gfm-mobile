import { motion } from "motion/react";
import { ArrowRight, Heart, Trophy } from "lucide-react";
import type { Campaign } from "@/types";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import OrganizerCard from "@/components/fundraiser/OrganizerCard";
import BeneficiaryCard from "@/components/fundraiser/BeneficiaryCard";
import DonationsList from "@/components/fundraiser/DonationsList";
import ShareOptions from "@/components/fundraiser/ShareOptions";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";

interface FundraiserSidebarProps {
  campaign: Campaign;
  onDonateClick: () => void;
}

export default function FundraiserSidebar({ campaign, onDonateClick }: FundraiserSidebarProps) {
  const percentage = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);

  return (
    <motion.div
      initial="initial"
      animate={staggerContainer.animate}
      className="flex flex-col gap-5"
    >
      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <div className="gfm-card overflow-hidden">
          {/* Neon accent banner */}
          <div className="flex items-center justify-center gap-2 border-b border-[#0df29e]/20 bg-[#0df29e]/8 px-5 py-4 text-center text-[15px] font-semibold text-[#0df29e]">
            <Trophy className="size-4" />
            See how this fundraiser ranks
            <ArrowRight className="size-4" />
          </div>

          <div className="space-y-5 px-6 py-6">
            {/* Progress ring */}
            <div className="grid grid-cols-[72px_1fr] items-center gap-4">
              <div
                className="grid size-[72px] place-items-center rounded-full"
                style={{
                  background: `conic-gradient(#0df29e ${percentage}%, rgba(255,255,255,0.1) ${percentage}% 100%)`,
                }}
              >
                <div className="grid size-[58px] place-items-center rounded-full bg-[#050505] text-[20px] font-semibold text-white">
                  {Math.round(percentage)}%
                </div>
              </div>

              <div>
                <p className="text-[19px] leading-tight text-white/50">
                  <span className="text-[30px] font-semibold text-[#0df29e]">
                    {formatCurrency(campaign.raisedAmount)}
                  </span>{" "}
                  raised of{" "}
                  <span className="underline decoration-white/20 underline-offset-2">
                    {formatCompactCurrency(campaign.goalAmount)}
                  </span>
                </p>
                <p className="mt-1 text-[15px] text-white/40">
                  {campaign.donationCount} donations
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5">
              <Button
                className="h-12 w-full rounded-full bg-[#0df29e] text-[#050505] font-semibold hover:bg-[#0df29e]/90 neon-glow"
                onClick={onDonateClick}
              >
                <Heart className="size-4" />
                Donate now
              </Button>
              <ShareOptions campaignTitle={campaign.title} className="w-full" />
            </div>

            <OrganizerCard organizer={campaign.organizer} />
          </div>
        </div>
      </motion.div>

      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <BeneficiaryCard beneficiary={campaign.beneficiary} />
      </motion.div>

      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <div className="gfm-card p-6">
          <DonationsList donations={campaign.donations} compact />
        </div>
      </motion.div>
    </motion.div>
  );
}
