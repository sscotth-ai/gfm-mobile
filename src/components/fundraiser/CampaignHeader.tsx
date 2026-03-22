"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin, Calendar } from "lucide-react";
import type { Organizer } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fadeUp } from "@/lib/animations";
import { formatRelativeTime } from "@/lib/format";

interface CampaignHeaderProps {
  title: string;
  organizer: Organizer;
  createdAt: string;
  category: string;
}

export default function CampaignHeader({
  title,
  organizer,
  createdAt,
  category,
}: CampaignHeaderProps) {
  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate} className="space-y-5">
      <h1 className="gfm-display max-w-4xl text-[44px] leading-[0.96] sm:text-[56px]">{title}</h1>

      <div className="flex flex-wrap items-center gap-3 text-[15px] text-white/50">
        <Link
          to={`/u/${organizer.username}`}
          className="flex items-center gap-3 hover:text-white"
        >
          <Avatar className="size-11 border border-white/12">
            <AvatarImage src={organizer.avatarUrl} alt={organizer.displayName} />
            <AvatarFallback className="bg-white/8 text-[#0df29e]">
              {organizer.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-white">{organizer.displayName}</span>
        </Link>

        <span className="text-white/20">&middot;</span>

        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-4" />
          {organizer.location}
        </span>

        <span className="text-white/20">&middot;</span>

        <span className="inline-flex items-center gap-1.5">
          <Calendar className="size-4" />
          {formatRelativeTime(createdAt)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="gfm-chip">{category}</span>
        <span className="gfm-chip">Tax deductible</span>
      </div>
    </motion.div>
  );
}
