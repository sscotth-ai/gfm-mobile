"use client";

import { motion } from "motion/react";
import { ExternalLink, Plus, Check } from "lucide-react";
import type { Community } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { staggerContainer, staggerItem } from "@/lib/animations";
import CommunityStats from "@/components/community/CommunityStats";
import Leaderboard from "@/components/community/Leaderboard";

interface CommunitySidebarProps {
  community: Community;
}

export default function CommunitySidebar({ community }: CommunitySidebarProps) {
  return (
    <motion.div
      initial="initial"
      animate={staggerContainer.animate}
      className="flex flex-col gap-4"
    >
      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <CommunityStats stats={community.stats} />
      </motion.div>

      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <Button className="w-full" size="default">
          <Plus className="size-4" />
          Start a fundraiser
        </Button>
      </motion.div>

      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <Card>
          <CardContent className="py-4">
            <p className="text-sm leading-relaxed line-clamp-4">
              {community.description.replace(/<[^>]*>/g, "")}
            </p>

            {community.website && (
              <a
                href={community.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ExternalLink className="size-4" />
                Website
              </a>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {community.isNonprofit && (
                <Badge variant="secondary" className="gap-1">
                  <Check className="size-3" />
                  Nonprofit
                </Badge>
              )}
              {community.isVerified && (
                <Badge variant="secondary" className="gap-1">
                  <Check className="size-3" />
                  Verified
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={staggerItem.initial} animate={staggerItem.animate}>
        <Leaderboard entries={community.topFundraisers} />
      </motion.div>
    </motion.div>
  );
}
