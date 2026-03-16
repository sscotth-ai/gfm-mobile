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
    <Tabs defaultValue="fundraisers">
      <TabsList>
        <TabsTrigger value="fundraisers">
          Fundraisers ({community.campaigns.length})
        </TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>

      <TabsContent value="fundraisers">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {!showAll && community.campaigns.length > INITIAL_VISIBLE && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={() => setShowAll(true)}>
              Show more
            </Button>
          </div>
        )}
      </TabsContent>

      <TabsContent value="about">
        <div
          className="leading-relaxed [&>p]:mb-4 [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>li]:mb-1"
          dangerouslySetInnerHTML={{ __html: community.description }}
        />

        {community.website && (
          <a
            href={community.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            <ExternalLink className="size-4" />
            {community.website}
          </a>
        )}

        {community.isNonprofit && (
          <div className="mt-4 flex gap-2">
            <Badge variant="secondary" className="gap-1">
              <Check className="size-3" />
              Nonprofit
            </Badge>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
