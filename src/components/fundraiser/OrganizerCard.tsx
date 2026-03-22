"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import type { Organizer } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

interface OrganizerCardProps {
  organizer: Organizer;
}

export default function OrganizerCard({ organizer }: OrganizerCardProps) {
  return (
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      className="flex items-center gap-3 rounded-[20px] border border-white/12 bg-white/5 p-4"
    >
      <Avatar className="size-12 border border-white/12">
        <AvatarImage src={organizer.avatarUrl} alt={organizer.displayName} />
        <AvatarFallback className="bg-white/8 text-[#0df29e]">
          {organizer.displayName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <Link
          to={`/u/${organizer.username}`}
          className="text-[15px] font-semibold text-white hover:text-[#0df29e]"
        >
          {organizer.displayName}
        </Link>

        <p className="mt-0.5 flex items-center gap-1 text-[14px] text-white/40">
          <MapPin className="size-3.5" />
          {organizer.location}
        </p>

        <p className="text-[14px] text-white/40">
          Organizer · {organizer.fundraisersOrganized} fundraisers
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="shrink-0 rounded-full border-white/12 text-white/70 hover:bg-white/8 hover:text-white"
      >
        Contact
      </Button>
    </motion.div>
  );
}
