import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCommunity } from "@/lib/api";
import { metrics } from "@/lib/metrics";
import { useTrackVisibility, useScrollDepth } from "@/hooks/useMetrics";
import FundraiserLayout from "@/components/fundraiser/FundraiserLayout";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityTabs from "@/components/community/CommunityTabs";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import { Separator } from "@/components/ui/separator";

export default function CommunityPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: community, isLoading } = useCommunity(slug ?? "");

  const campaignsRef = useTrackVisibility("community_campaigns");
  useScrollDepth();

  useEffect(() => {
    metrics.trackWebVitals();
  }, []);

  if (isLoading || !community) {
    return (
      <div className="py-12 text-center text-muted-foreground">Loading...</div>
    );
  }

  return (
    <FundraiserLayout
      main={
        <div className="flex flex-col gap-6">
          <CommunityHero community={community} />
          <Separator />
          <div ref={campaignsRef}>
            <CommunityTabs community={community} />
          </div>
        </div>
      }
      sidebar={<CommunitySidebar community={community} />}
    />
  );
}
