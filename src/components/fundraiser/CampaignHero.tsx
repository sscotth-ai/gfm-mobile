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
      className="overflow-hidden rounded-xl"
    >
      {showPlaceholder ? (
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-orange-400 via-amber-500 to-red-500 lg:aspect-[2/1]" />
      ) : (
        <img
          src={primaryImage.url}
          alt={primaryImage.alt}
          onError={() => setImgError(true)}
          className="aspect-[16/9] w-full object-cover lg:aspect-[2/1]"
        />
      )}
    </motion.div>
  );
}
