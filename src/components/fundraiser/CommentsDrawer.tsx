import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send } from "lucide-react";
import type { Comment } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatRelativeTime } from "@/lib/format";

interface CommentsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comments: Comment[];
}

export default function CommentsDrawer({
  open,
  onOpenChange,
  comments: initialComments,
}: CommentsDrawerProps) {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      function onKey(e: KeyboardEvent) {
        if (e.key === "Escape") onOpenChange(false);
      }
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open, onOpenChange]);

  function handleSend() {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newComment: Comment = {
      id: `comment_demo_${Date.now()}`,
      authorName: "You",
      authorAvatarUrl: null,
      message: trimmed,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [newComment, ...prev]);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            onClick={() => onOpenChange(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[70%] max-h-[650px] flex-col rounded-t-3xl border-t border-white/10 bg-[#050505]/80 shadow-2xl backdrop-blur-[24px]"
          >
            {/* Drag Handle */}
            <div className="flex w-full justify-center pb-2 pt-4">
              <div className="h-1.5 w-12 rounded-full bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <h2 className="font-display text-lg font-bold text-white">
                Comments ({comments.length})
              </h2>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto px-6 pb-4">
              <div className="space-y-5">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <Avatar className="size-9 shrink-0 border border-white/12">
                      {comment.authorAvatarUrl ? (
                        <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorName} />
                      ) : null}
                      <AvatarFallback className="bg-white/8 text-xs text-white/50">
                        {comment.authorName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[14px] font-semibold text-white">
                          {comment.authorName}
                        </span>
                        <span className="text-[12px] text-white/30">
                          {formatRelativeTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[14px] leading-relaxed text-white/60">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-white/10 bg-[#050505]/60 px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-8 shrink-0 border border-white/12">
                  <AvatarFallback className="bg-[#0df29e]/10 text-xs font-semibold text-[#0df29e]">
                    Y
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-1 items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 focus-within:border-[#0df29e]/40">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Add a comment..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSend();
                    }}
                    className="flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/30"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!text.trim()}
                    className="ml-2 text-[#0df29e] transition-opacity disabled:opacity-30"
                  >
                    <Send className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
