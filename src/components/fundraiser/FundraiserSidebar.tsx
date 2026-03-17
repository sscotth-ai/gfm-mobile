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
          <div className="flex items-center justify-center gap-2 border-b border-[#d7efaa] bg-[#ccf88e] px-5 py-4 text-center text-[15px] font-semibold text-[#274a34]">
            <Trophy className="size-4" />
            See how this fundraiser ranks
            <ArrowRight className="size-4" />
          </div>

          <div className="space-y-5 px-6 py-6">
            <div className="grid grid-cols-[72px_1fr] items-center gap-4">
              <div
                className="grid size-[72px] place-items-center rounded-full"
                style={{
                  background: `conic-gradient(#69c65b ${percentage}%, #ece9e4 ${percentage}% 100%)`,
                }}
              >
                <div className="grid size-[58px] place-items-center rounded-full bg-white text-[20px] font-semibold text-[#232323]">
                  {Math.round(percentage)}%
                </div>
              </div>

              <div>
                <p className="text-[19px] leading-tight text-[#6f7069]">
                  <span className="text-[30px] font-semibold text-[#232323]">
                    {formatCurrency(campaign.raisedAmount)}
                  </span>{" "}
                  raised of{" "}
                  <span className="underline decoration-[#6f7069]/35 underline-offset-2">
                    {formatCompactCurrency(campaign.goalAmount)}
                  </span>
                </p>
                <p className="mt-1 text-[15px] text-[#6f7069]">
                  {campaign.donationCount} donations
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              <Button
                className="h-12 w-full bg-[#ccf88e] text-[#274a34] hover:bg-[#c2f27f]"
                onClick={onDonateClick}
              >
                <Heart className="size-4" />
                Donate now
              </Button>
              <ShareOptions campaignTitle={campaign.title} />
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
