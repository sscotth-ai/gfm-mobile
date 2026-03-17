"use client";

import { motion } from "motion/react";
import type { Community } from "@/types";
import { Button } from "@/components/ui/button";
import { staggerContainer } from "@/lib/animations";
import Leaderboard from "@/components/community/Leaderboard";

interface CommunitySidebarProps {
  community: Community;
}

export default function CommunitySidebar({ community }: CommunitySidebarProps) {
  return (
    <motion.div initial="initial" animate={staggerContainer.animate} className="gfm-card p-6">
      <Leaderboard entries={community.topFundraisers} total={community.stats.fundraiserCount} />
      <Button variant="outline" className="mt-5 w-full">
        See all
      </Button>
    </motion.div>
  );
}
