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
      className="flex items-center gap-3 rounded-[20px] border border-[#e3e2dd] bg-white p-4"
    >
      <Avatar className="size-12 border border-[#e3e2dd]">
        <AvatarImage src={organizer.avatarUrl} alt={organizer.displayName} />
        <AvatarFallback className="bg-[#f7f5f2] text-[#274a34]">
          {organizer.displayName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <Link
          to={`/u/${organizer.username}`}
          className="text-[15px] font-semibold text-[#232323] hover:underline"
        >
          {organizer.displayName}
        </Link>

        <p className="mt-0.5 flex items-center gap-1 text-[14px] text-[#6f7069]">
          <MapPin className="size-3.5" />
          {organizer.location}
        </p>

        <p className="text-[14px] text-[#6f7069]">
          Organizer · {organizer.fundraisersOrganized} fundraisers
        </p>
      </div>

      <Button variant="outline" size="sm" className="shrink-0">
        Contact
      </Button>
    </motion.div>
  );
}
