"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Comment } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { formatRelativeTime } from "@/lib/format";

interface WordsOfSupportProps {
  comments: Comment[];
}

export default function WordsOfSupport({ comments }: WordsOfSupportProps) {
  const [expanded, setExpanded] = useState(false);
  const total = comments.length;

  const visibleComments = expanded ? comments : comments.slice(0, 3);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Words of support ({total})</h3>

      <motion.div
        initial="initial"
        animate={staggerContainer.animate}
        className="space-y-4"
      >
        {visibleComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={staggerItem.initial}
            animate={staggerItem.animate}
            className="flex items-start gap-3"
          >
            <Avatar className="size-8">
              {comment.authorAvatarUrl ? (
                <AvatarImage
                  src={comment.authorAvatarUrl}
                  alt={comment.authorName}
                />
              ) : null}
              <AvatarFallback>
                {comment.authorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <span className="text-sm font-medium text-foreground">
                {comment.authorName}
              </span>

              <p className="text-sm text-muted-foreground">
                {comment.message}
              </p>

              <p className="text-xs text-muted-foreground">
                {formatRelativeTime(comment.createdAt)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {total > 3 && (
        <Button
          variant="link"
          onClick={() => setExpanded((prev) => !prev)}
          className="px-0"
        >
          {expanded ? "Show less" : "See all"}
        </Button>
      )}
    </div>
  );
}
