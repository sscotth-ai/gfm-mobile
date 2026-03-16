import { motion } from "motion/react";
import { Heart } from "lucide-react";
import type { Campaign } from "@/types";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import DonationProgress from "@/components/fundraiser/DonationProgress";
import OrganizerCard from "@/components/fundraiser/OrganizerCard";
import BeneficiaryCard from "@/components/fundraiser/BeneficiaryCard";
import DonationsList from "@/components/fundraiser/DonationsList";
import ShareOptions from "@/components/fundraiser/ShareOptions";

interface FundraiserSidebarProps {
  campaign: Campaign;
  onDonateClick: () => void;
}

export default function FundraiserSidebar({
  campaign,
  onDonateClick,
}: FundraiserSidebarProps) {
  return (
    <motion.div
      initial="initial"
      animate={staggerContainer.animate}
      className="flex flex-col gap-4"
    >
      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <DonationProgress
          raisedAmount={campaign.raisedAmount}
          goalAmount={campaign.goalAmount}
          donationCount={campaign.donationCount}
        />
      </motion.div>

      <motion.div
        initial={staggerItem.initial}
        animate={staggerItem.animate}
        className="flex gap-3"
      >
        <Button
          className="flex-1 bg-heart text-heart-foreground hover:bg-heart/90"
          onClick={onDonateClick}
        >
          <Heart className="size-4" />
          Donate now
        </Button>
        <ShareOptions campaignTitle={campaign.title} />
      </motion.div>

      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <OrganizerCard organizer={campaign.organizer} />
      </motion.div>

      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <BeneficiaryCard beneficiary={campaign.beneficiary} />
      </motion.div>

      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <DonationsList donations={campaign.donations} compact />
      </motion.div>
    </motion.div>
  );
}
