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
      className="relative overflow-hidden rounded-[24px]"
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

      {/* Bottom gradient overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

      {/* Image indicators */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-7 pb-5">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-5 rounded-full bg-[#0df29e]" />
          <span className="size-1.5 rounded-full bg-white/40" />
          <span className="size-1.5 rounded-full bg-white/40" />
        </div>
      </div>
    </motion.div>
  );
}
