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
      <h3 className="text-[26px] font-semibold text-[#232323]">Words of support ({total})</h3>

      <motion.div initial="initial" animate={staggerContainer.animate} className="space-y-6">
        {visibleComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={staggerItem.initial}
            animate={staggerItem.animate}
            className="flex items-start gap-4 rounded-[24px] border border-[#e3e2dd] bg-white p-5"
          >
            <Avatar className="size-10 border border-[#e3e2dd]">
              {comment.authorAvatarUrl ? (
                <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorName} />
              ) : null}
              <AvatarFallback className="bg-[#f7f5f2] text-[#6f7069]">
                {comment.authorName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <span className="text-[16px] font-semibold text-[#232323]">{comment.authorName}</span>

              <p className="mt-1 text-[15px] leading-7 text-[#4f504a]">{comment.message}</p>

              <p className="mt-2 text-[14px] text-[#6f7069]">
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
          className="h-11 px-5 text-[15px]"
        >
          {expanded ? "Show less" : "See all"}
        </Button>
      )}
    </div>
  );
}
