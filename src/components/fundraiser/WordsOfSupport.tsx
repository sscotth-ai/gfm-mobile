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
    <div className="space-y-4">
      <h3 className="font-display text-[26px] font-semibold text-white">Words of support ({total})</h3>

      <motion.div initial="initial" animate={staggerContainer.animate} className="space-y-6">
        {visibleComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={staggerItem.initial}
            animate={staggerItem.animate}
            className="flex items-start gap-4 rounded-[24px] border border-white/12 bg-white/5 p-5"
          >
            <Avatar className="size-10 border border-white/12">
              {comment.authorAvatarUrl ? (
                <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorName} />
              ) : null}
              <AvatarFallback className="bg-white/8 text-white/50">
                {comment.authorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <span className="text-[16px] font-semibold text-white">{comment.authorName}</span>

              <p className="mt-1 text-[15px] leading-7 text-white/60">{comment.message}</p>

              <p className="mt-2 text-[14px] text-white/30">
                {formatRelativeTime(comment.createdAt)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {total > 3 && (
        <Button
          variant="outline"
          onClick={() => setExpanded((prev) => !prev)}
          className="h-11 rounded-full border-white/12 px-5 text-[15px] text-white/70 hover:bg-white/8 hover:text-white"
        >
          {expanded ? "Show less" : "See all"}
        </Button>
      )}
    </div>
  );
}
