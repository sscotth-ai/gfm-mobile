"use client";

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import type { Organizer } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

interface OrganizerCardProps {
  organizer: Organizer;
}

export default function OrganizerCard({ organizer }: OrganizerCardProps) {
  return (
    <motion.div initial={fadeUp.initial} animate={fadeUp.animate}>
      <Card>
        <CardContent className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage
              src={organizer.avatarUrl}
              alt={organizer.displayName}
            />
            <AvatarFallback>
              {organizer.displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <Link
              to={`/u/${organizer.username}`}
              className="font-medium text-foreground hover:underline"
            >
              {organizer.displayName}
            </Link>

            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {organizer.location}
            </p>

            <p className="text-xs text-muted-foreground">
              Organizer &middot; {organizer.fundraisersOrganized} fundraisers
            </p>
          </div>

          <Button variant="outline" size="sm">
            Contact
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
