"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { CampaignImage } from "@/types";
import { fadeUp } from "@/lib/animations";

interface CampaignHeroProps {
  images: CampaignImage[];
}

export default function CampaignHero({ images }: CampaignHeroProps) {
  const [imgError, setImgError] = useState(false);
  const primaryImage = images.find((img) => img.isPrimary) ?? images[0];
  const showPlaceholder = !primaryImage || imgError;

  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      className="relative overflow-hidden rounded-[24px] bg-[#f7f5f2]"
    >
      {showPlaceholder ? (
        <div className="aspect-[16/10] w-full bg-gradient-to-br from-[#7b2d14] via-[#d67519] to-[#f59e0b] lg:aspect-[16/10]" />
      ) : (
        <img
          src={primaryImage.url}
          alt={primaryImage.alt}
          onError={() => setImgError(true)}
          className="aspect-[16/10] w-full object-cover lg:aspect-[16/10]"
        />
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/35 via-black/5 to-transparent px-7 pb-7 pt-20">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-5 rounded-full bg-white" />
          <span className="size-1.5 rounded-full bg-white/60" />
          <span className="size-1.5 rounded-full bg-white/60" />
        </div>
      </div>
    </motion.div>
  );
}
