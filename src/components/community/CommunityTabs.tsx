"use client";

import { useState } from "react";
import { ExternalLink, Check } from "lucide-react";
import Markdown from "react-markdown";
import type { Community } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { metrics } from "@/lib/metrics";
import CampaignCard from "@/components/community/CampaignCard";

interface CommunityTabsProps {
  community: Community;
}

const INITIAL_VISIBLE = 6;

export default function CommunityTabs({ community }: CommunityTabsProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleCampaigns = showAll
    ? community.campaigns
    : community.campaigns.slice(0, INITIAL_VISIBLE);

  return (
    <Tabs
      defaultValue="fundraisers"
      className="gap-6"
      onValueChange={(value) => {
        metrics.track("tab_switch", "engagement", { page: "community", tab: value });
      }}
    >
      <TabsList variant="line">
        <TabsTrigger value="fundraisers">Fundraisers ({community.campaigns.length})</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>

      <TabsContent value="fundraisers" className="pt-2">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {visibleCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {!showAll && community.campaigns.length > INITIAL_VISIBLE && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setShowAll(true);
                metrics.track("show_more_campaigns", "engagement", {
                  total: community.campaigns.length,
                });
              }}
              className="rounded-full border-white/12 text-white/70 hover:bg-white/8 hover:text-white"
            >
              Show more
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="about" className="pt-2">
        <div className="gfm-copy [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-[24px] [&>h3]:font-semibold [&>h3]:text-white [&>li]:mb-2 [&>li]:text-white/70 [&>p]:mb-5 [&>p]:text-white/70 [&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-6 [&_strong]:text-white">
          <Markdown>{community.description}</Markdown>
        </div>

        {community.website && (
          <a
            href={community.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#0df29e] hover:text-[#0df29e]/80"
          >
            <ExternalLink className="size-4" />
            {community.website}
          </a>
        )}

        {community.isNonprofit && (
          <div className="mt-4 flex gap-2">
            <span className="gfm-chip gap-1">
              <Check className="size-3" />
              Nonprofit
            </span>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
