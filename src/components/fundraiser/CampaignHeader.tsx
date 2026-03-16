"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin, Calendar } from "lucide-react";
import type { Organizer } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    <motion.div
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      className="space-y-3"
    >
      <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link
          to={`/u/${organizer.username}`}
          className="flex items-center gap-2 hover:text-foreground"
        >
          <Avatar className="size-8">
            <AvatarImage src={organizer.avatarUrl} alt={organizer.displayName} />
            <AvatarFallback>
              {organizer.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">
            {organizer.displayName}
          </span>
        </Link>

        <span className="text-muted-foreground/50">&middot;</span>

        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3.5" />
          {organizer.location}
        </span>

        <span className="text-muted-foreground/50">&middot;</span>

        <span className="inline-flex items-center gap-1">
          <Calendar className="size-3.5" />
          {formatRelativeTime(createdAt)}
        </span>
      </div>

      <Badge variant="secondary">{category}</Badge>
    </motion.div>
  );
}
