"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, MapPin, Users } from "lucide-react";
import type { Community } from "@/types";
import { fadeUp } from "@/lib/animations";
import { formatNumber } from "@/lib/format";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CommunityHeroProps {
  community: Community;
}

export default function CommunityHero({ community }: CommunityHeroProps) {
  const [bannerError, setBannerError] = useState(false);
  const showBannerFallback = !community.bannerUrl || bannerError;

  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate}>
      {/* Banner */}
      <div className="overflow-hidden rounded-xl">
        {showBannerFallback ? (
          <div className="aspect-[3/1] w-full bg-gradient-to-br from-teal-400 to-emerald-500" />
        ) : (
          <img
            src={community.bannerUrl}
            alt={`${community.name} banner`}
            onError={() => setBannerError(true)}
            className="aspect-[3/1] w-full object-cover"
          />
        )}
      </div>

      {/* Info row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Logo avatar */}
          <Avatar className="size-16 -mt-8 rounded-full border-4 border-background">
            {community.logoUrl ? (
              <AvatarImage src={community.logoUrl} alt={community.name} />
            ) : null}
            <AvatarFallback className="bg-gradient-to-br from-teal-400 to-emerald-500 text-white text-xl font-bold">
              {community.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Name, tagline, location, verified */}
          <div className="flex flex-col gap-1 pt-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{community.name}</h1>
              {community.isVerified && (
                <Badge>
                  <Check className="size-3" />
                  Verified
                </Badge>
              )}
            </div>

            {community.tagline && (
              <p className="text-muted-foreground">{community.tagline}</p>
            )}

            {community.location && (
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="size-3.5" />
                {community.location}
              </p>
            )}
          </div>
        </div>

        {/* Follow button */}
        <div className="flex flex-col items-center gap-1 pt-2">
          <Button variant="outline">
            <Users className="size-4" />
            Follow
          </Button>
          <span className="text-xs text-muted-foreground">
            {formatNumber(community.stats.followerCount)} followers
          </span>
        </div>
      </div>
    </motion.div>
  );
}
