"use client";

import { useState } from "react";
import { ExternalLink, Check } from "lucide-react";
import type { Community } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <Tabs defaultValue="fundraisers" className="gap-6">
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
            <Button variant="outline" onClick={() => setShowAll(true)}>
              Show more
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="about" className="pt-2">
        <div
          className="gfm-copy [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:text-[24px] [&>h3]:font-semibold [&>li]:mb-2 [&>p]:mb-5 [&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: community.description }}
        />

        {community.website && (
          <a
            href={community.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#274a34] hover:underline"
          >
            <ExternalLink className="size-4" />
            {community.website}
          </a>
        )}

        {community.isNonprofit && (
          <div className="mt-4 flex gap-2">
            <Badge variant="secondary" className="gap-1 rounded-full bg-[#f7f5f2] text-[#232323]">
              <Check className="size-3" />
              Nonprofit
            </Badge>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
