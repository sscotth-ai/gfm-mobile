"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, MapPin, Share2, Users } from "lucide-react";
import type { Community } from "@/types";
import { fadeUp } from "@/lib/animations";
import { formatNumber } from "@/lib/format";
import { metrics } from "@/lib/metrics";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CommunityStats from "@/components/community/CommunityStats";

interface CommunityHeroProps {
  community: Community;
}

export default function CommunityHero({ community }: CommunityHeroProps) {
  const [bannerError, setBannerError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(community.stats.followerCount);
  const showBannerFallback = !community.bannerUrl || bannerError;
  const description = community.description
    .replace(/[#*_[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const avatars = community.topFundraisers.slice(0, 3);

  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate}>
      {/* Full-bleed hero banner */}
      <div className="relative -mx-4 -mt-[88px] sm:-mx-6 sm:-mt-[96px] overflow-hidden">
        <div className="relative h-[420px] sm:h-[500px]">
          {showBannerFallback ? (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0df29e]/20 via-[#050505] to-[#FF2E93]/10" />
          ) : (
            <img
              src={community.bannerUrl}
              alt="Community Header"
              onError={() => {
                setBannerError(true);
                metrics.track("image_load_error", "error", {
                  component: "CommunityHero",
                  type: "banner",
                });
              }}
              className="absolute inset-0 size-full object-cover"
            />
          )}
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        {/* Content overlay at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 sm:px-6">
          <div className="gfm-shell">
            <div className="flex items-center gap-2 mb-4">
              <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold uppercase tracking-widest text-[#0df29e]">
                <Users className="size-3.5" />
                Community
              </span>
              {community.isVerified && (
                <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold uppercase tracking-widest text-white">
                  <Check className="size-3" />
                  Verified
                </span>
              )}
            </div>

            <h1 className="font-display text-[48px] font-bold leading-[0.95] tracking-tight text-white text-shadow sm:text-[64px]">
              {community.name}
            </h1>

            {community.tagline && (
              <p className="mt-3 text-[18px] text-[#0df29e] font-medium">{community.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {/* Below-hero content */}
      <div className="mt-8 space-y-6">
        {/* Description */}
        <div className="max-w-2xl">
          <p
            className={
              expanded
                ? "text-[18px] leading-8 text-white/60"
                : "line-clamp-3 text-[18px] leading-8 text-white/60"
            }
          >
            {description}
          </p>
          <button
            className="mt-2 text-[15px] font-medium text-[#0df29e] hover:text-[#0df29e]/80"
            onClick={() => {
              const newState = !expanded;
              setExpanded(newState);
              metrics.track("read_more_toggle", "engagement", {
                page: "community",
                action: newState ? "expand" : "collapse",
              });
            }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        </div>

        {/* Follower row + actions */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {avatars.map((entry) => (
                <Avatar
                  key={entry.rank}
                  className="size-10 border-2 border-[#050505] shadow-[0_0_0_1px_rgba(255,255,255,0.12)]"
                >
                  {entry.organizerAvatarUrl ? (
                    <AvatarImage src={entry.organizerAvatarUrl} alt={entry.organizerName} />
                  ) : null}
                  <AvatarFallback className="bg-white/8 text-white/50">
                    {entry.organizerName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="ml-4 font-medium text-white/60">
              {formatNumber(followerCount)} followers
            </span>
          </div>

          <Button
            className={
              following
                ? "h-10 rounded-full border border-white/12 bg-white/8 font-semibold text-white hover:bg-white/12"
                : "h-10 rounded-full bg-[#0df29e] font-semibold text-[#050505] hover:bg-[#0df29e]/90 neon-glow"
            }
            onClick={() => {
              const newState = !following;
              setFollowing(newState);
              setFollowerCount((prev) => prev + (newState ? 1 : -1));
              metrics.track("follow_toggle", "engagement", {
                page: "community",
                action: newState ? "follow" : "unfollow",
                target: community.name,
              });
            }}
          >
            {following ? "Following" : "Follow"}
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-full border-white/12 px-4 text-white/70 hover:bg-white/8 hover:text-white"
            onClick={async () => {
              const shareData = {
                title: community.name,
                text: community.tagline ?? community.name,
                url: window.location.href,
              };
              try {
                if (navigator.share) {
                  await navigator.share(shareData);
                  metrics.track("share", "engagement", { page: "community", method: "native" });
                } else {
                  await navigator.clipboard.writeText(window.location.href);
                  metrics.track("share", "engagement", { page: "community", method: "clipboard" });
                }
              } catch {
                metrics.track("share_cancelled", "engagement", { page: "community" });
              }
            }}
          >
            <Share2 className="size-4" />
            Share
          </Button>
        </div>

        {community.location && (
          <p className="flex items-center gap-2 text-[16px] text-white/40">
            <MapPin className="size-4" />
            {community.location}
          </p>
        )}

        <CommunityStats stats={community.stats} />
      </div>
    </motion.div>
  );
}
