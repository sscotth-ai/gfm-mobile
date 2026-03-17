import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCommunity } from "@/lib/api";
import { metrics } from "@/lib/metrics";
import { useTrackVisibility, useScrollDepth } from "@/hooks/useMetrics";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityTabs from "@/components/community/CommunityTabs";
import CommunitySidebar from "@/components/community/CommunitySidebar";

export default function CommunityPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: community, isLoading } = useCommunity(slug ?? "");

  const campaignsRef = useTrackVisibility("community_campaigns");
  useScrollDepth();

  useEffect(() => {
    metrics.trackWebVitals();
  }, []);

  if (isLoading || !community) {
    return <div className="py-12 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="gfm-shell flex flex-col gap-10">
      <CommunityHero community={community} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
        <div className="lg:sticky lg:top-[104px]">
          <CommunitySidebar community={community} />
        </div>
        <div ref={campaignsRef}>
          <CommunityTabs community={community} />
        </div>
      </div>
    </div>
  );
}
