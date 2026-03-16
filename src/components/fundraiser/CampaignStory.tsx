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
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      className="space-y-2"
    >
      <div className="relative">
        <div
          className={
            expanded
              ? "leading-relaxed [&>p]:mb-4"
              : "max-h-[300px] overflow-hidden leading-relaxed [&>p]:mb-4"
          }
          dangerouslySetInnerHTML={{ __html: description }}
        />

        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>

      <Button
        variant="link"
        onClick={() => setExpanded((prev) => !prev)}
        className="px-0"
      >
        {expanded ? "Show less" : "Read more"}
      </Button>
    </motion.div>
  );
}
