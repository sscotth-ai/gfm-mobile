"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

interface CampaignStoryProps {
  description: string;
}

export default function CampaignStory({ description }: CampaignStoryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate} className="space-y-4">
      <h2 className="font-display text-[26px] font-semibold text-white">Story</h2>
      <div className="relative">
        <div
          className={
            expanded
              ? "gfm-copy [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-[24px] [&>h3]:font-semibold [&>h3]:text-white [&>li]:mb-2 [&>li]:text-white/70 [&>p]:mb-5 [&>p]:text-white/70 [&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-6 [&_strong]:text-white [&_em]:text-[#0df29e]/80"
              : "gfm-copy max-h-[380px] overflow-hidden [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-[24px] [&>h3]:font-semibold [&>h3]:text-white [&>li]:mb-2 [&>li]:text-white/70 [&>p]:mb-5 [&>p]:text-white/70 [&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-6 [&_strong]:text-white [&_em]:text-[#0df29e]/80"
          }
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
        )}
      </div>

      <Button
        variant="outline"
        onClick={() => setExpanded((prev) => !prev)}
        className="h-11 rounded-full border-white/12 px-5 text-[15px] text-white/70 hover:bg-white/8 hover:text-white"
      >
        {expanded ? "Show less" : "Read more"}
      </Button>
    </motion.div>
  );
}
