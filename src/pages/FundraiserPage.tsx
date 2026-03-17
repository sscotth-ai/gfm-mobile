import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCampaign } from "@/lib/api";
import { metrics } from "@/lib/metrics";
import { useTrackVisibility, useScrollDepth } from "@/hooks/useMetrics";
import FundraiserLayout from "@/components/fundraiser/FundraiserLayout";
import CampaignHero from "@/components/fundraiser/CampaignHero";
import CampaignHeader from "@/components/fundraiser/CampaignHeader";
import DonationProgress from "@/components/fundraiser/DonationProgress";
import CampaignStory from "@/components/fundraiser/CampaignStory";
import OrganizerCard from "@/components/fundraiser/OrganizerCard";
import DonationsList from "@/components/fundraiser/DonationsList";
import WordsOfSupport from "@/components/fundraiser/WordsOfSupport";
import FundraiserSidebar from "@/components/fundraiser/FundraiserSidebar";
import ShareOptions from "@/components/fundraiser/ShareOptions";
import DonateModal from "@/components/fundraiser/DonateModal";
import StickyDonateBar from "@/components/fundraiser/StickyDonateBar";
import { Button } from "@/components/ui/button";

export default function FundraiserPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: campaign, isLoading } = useCampaign(slug ?? "");
  const [donateOpen, setDonateOpen] = useState(false);

  // Metrics
  const storyRef = useTrackVisibility("campaign_story");
  const donationsRef = useTrackVisibility("donations_list");
  const supportRef = useTrackVisibility("words_of_support");
  useScrollDepth();

  useEffect(() => {
    metrics.trackWebVitals();
  }, []);

  function handleDonateClick(source: string) {
    metrics.track("donate_click", "conversion", { source });
    setDonateOpen(true);
  }

  if (isLoading || !campaign) {
    return <div className="py-12 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <>
      <FundraiserLayout
        main={
          <div className="flex flex-col gap-8">
            <CampaignHeader
              title={campaign.title}
              organizer={campaign.organizer}
              createdAt={campaign.createdAt}
              category={campaign.category}
            />
            <div id="campaign-hero">
              <CampaignHero images={campaign.images} />
            </div>

            {/* Mobile-only progress + donate */}
            <div className="lg:hidden">
              <DonationProgress
                raisedAmount={campaign.raisedAmount}
                goalAmount={campaign.goalAmount}
                donationCount={campaign.donationCount}
              />
              <div className="mt-4 flex gap-3">
                <Button
                  className="flex-1 bg-[#ccf88e] text-[#274a34] hover:bg-[#c2f27f]"
                  onClick={() => handleDonateClick("mobile_progress")}
                >
                  Donate now
                </Button>
                <ShareOptions campaignTitle={campaign.title} className="px-4" />
              </div>
            </div>

            <div ref={storyRef}>
              <CampaignStory description={campaign.description} />
            </div>
            <OrganizerCard organizer={campaign.organizer} />
            <div ref={donationsRef} className="gfm-card p-6">
              <DonationsList donations={campaign.donations} />
            </div>
            <div ref={supportRef}>
              <WordsOfSupport comments={campaign.comments} />
            </div>
          </div>
        }
        sidebar={
          <FundraiserSidebar
            campaign={campaign}
            onDonateClick={() => handleDonateClick("sidebar")}
          />
        }
      />

      <DonateModal open={donateOpen} onOpenChange={setDonateOpen} />

      <StickyDonateBar
        raisedAmount={campaign.raisedAmount}
        goalAmount={campaign.goalAmount}
        onDonateClick={() => handleDonateClick("sticky_bar")}
      />
    </>
  );
}
