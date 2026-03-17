"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, MapPin, Share2, Users } from "lucide-react";
import type { Community } from "@/types";
import { fadeUp } from "@/lib/animations";
import { formatNumber } from "@/lib/format";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CommunityStats from "@/components/community/CommunityStats";

interface CommunityHeroProps {
  community: Community;
}

export default function CommunityHero({ community }: CommunityHeroProps) {
  const [bannerError, setBannerError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const showBannerFallback = !community.bannerUrl || bannerError;
  const description = community.description
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const avatars = community.topFundraisers.slice(0, 3);

  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate}>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,533px)_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[24px] bg-gradient-to-b from-[#ffc736] via-[#f9a414] to-[#c97a0b]">
            {showBannerFallback ? (
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#1dbf9f] to-[#10b981]" />
            ) : (
              <img
                src={community.bannerUrl}
                alt="Community Header Photo"
                onError={() => setBannerError(true)}
                className="aspect-[4/3] w-full scale-[1.08] object-cover object-top"
              />
            )}
          </div>

          <div className="flex items-center justify-between lg:hidden">
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {avatars.map((entry) => (
                  <Avatar
                    key={entry.rank}
                    className="size-10 border-2 border-white shadow-[0_0_0_1px_#e3e2dd]"
                  >
                    {entry.organizerAvatarUrl ? (
                      <AvatarImage src={entry.organizerAvatarUrl} alt={entry.organizerName} />
                    ) : null}
                    <AvatarFallback className="bg-[#f7f5f2] text-[#6f7069]">
                      {entry.organizerName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="ml-4 font-medium text-[#232323]">
                {formatNumber(community.stats.followerCount)} followers
              </span>
            </div>

            <Button variant="outline" className="h-10">
              Follow
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div className="gfm-chip w-fit">
            <Users className="size-3.5" />
            Community
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="gfm-display text-[44px] leading-[0.98] sm:text-[56px]">
              {community.name}
            </h1>
            {community.isVerified && (
              <Badge className="rounded-full bg-[#232323] px-3 py-1 text-[14px] text-white hover:bg-[#232323]">
                <Check className="size-3.5" />
                Verified
              </Badge>
            )}
          </div>

          <div className="max-w-2xl">
            <p
              className={
                expanded
                  ? "text-[18px] leading-8 text-[#4f504a]"
                  : "line-clamp-5 text-[18px] leading-8 text-[#4f504a]"
              }
            >
              {description}
            </p>
            <button
              className="mt-2 text-[15px] font-medium text-[#274a34] hover:underline"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? "Show less" : "read more"}
            </button>
          </div>

          <div className="hidden flex-wrap items-center gap-3 text-[16px] text-[#6f7069] lg:flex">
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {avatars.map((entry) => (
                  <Avatar
                    key={entry.rank}
                    className="size-10 border-2 border-white shadow-[0_0_0_1px_#e3e2dd]"
                  >
                    {entry.organizerAvatarUrl ? (
                      <AvatarImage src={entry.organizerAvatarUrl} alt={entry.organizerName} />
                    ) : null}
                    <AvatarFallback className="bg-[#f7f5f2] text-[#6f7069]">
                      {entry.organizerName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="ml-4 font-medium text-[#232323]">
                {formatNumber(community.stats.followerCount)} followers
              </span>
            </div>

            <Button variant="outline" className="h-10">
              Follow
            </Button>
            <Button variant="outline" className="h-10 px-4">
              <Share2 className="size-4" />
              Share
            </Button>
          </div>

          <Button variant="outline" className="h-10 w-fit px-4 lg:hidden">
            <Share2 className="size-4" />
            Share
          </Button>

          {community.location && (
            <p className="flex items-center gap-2 text-[16px] text-[#6f7069]">
              <MapPin className="size-4" />
              {community.location}
            </p>
          )}

          <CommunityStats stats={community.stats} />

          <Button className="h-12 w-full max-w-[220px] bg-[#274a34] text-white hover:bg-[#1f3b29]">
            Start a GoFundMe
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
