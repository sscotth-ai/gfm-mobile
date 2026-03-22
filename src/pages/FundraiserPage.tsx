import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageCircle, Share2, ChevronDown } from "lucide-react";
import { useCampaign } from "@/lib/api";
import { formatCurrency, formatNumber } from "@/lib/format";
import { easeOut } from "@/lib/animations";
import CampaignStory from "@/components/fundraiser/CampaignStory";
import OrganizerCard from "@/components/fundraiser/OrganizerCard";
import BeneficiaryCard from "@/components/fundraiser/BeneficiaryCard";
import DonationsList from "@/components/fundraiser/DonationsList";
import WordsOfSupport from "@/components/fundraiser/WordsOfSupport";
import DonateDrawer from "@/components/fundraiser/DonateDrawer";
import CommentsDrawer from "@/components/fundraiser/CommentsDrawer";

export default function FundraiserPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: campaign, isLoading, isError } = useCampaign(slug ?? "");
  const [donateOpen, setDonateOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [heroBarOpacity, setHeroBarOpacity] = useState(1);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      setScrolledPastHero(y > window.innerHeight * 0.5);
      // Fade progress bar over first 100px of scroll
      setHeroBarOpacity(Math.max(0, 1 - y / 100));
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize like count from campaign data
  useEffect(() => {
    if (campaign) setLikeCount(campaign.donationCount);
  }, [campaign]);

  if (isError) {
    return <Navigate to="/" replace />;
  }

  if (isLoading || !campaign) {
    return (
      <div className="flex h-dvh items-center justify-center bg-[#050505]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-[#0df29e] border-t-transparent" />
          <span className="text-sm text-white/40">Loading...</span>
        </div>
      </div>
    );
  }

  const primaryImage = campaign.images.find((img) => img.isPrimary) ?? campaign.images[0];
  const percentage = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);

  const descriptionText = campaign.description.replace(/[#*_[\]]/g, "").slice(0, 120);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* ===== IMMERSIVE HERO — full viewport ===== */}
      <section className="relative h-dvh w-full overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${primaryImage?.url}')` }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Top Bar */}
        <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="font-display text-[20px] font-bold tracking-tighter text-[#0df29e] drop-shadow-[0_0_10px_rgba(13,242,158,0.4)]"
          >
            GoFundMe
          </Link>
        </div>

        {/* Main UI Layer */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-4 pb-[76px]">
          <div className="mb-6 flex w-full items-end justify-between">
            {/* Narrative Block (left) */}
            <div className="flex-1 pr-14">
              {/* Organizer */}
              <div className="mb-2 flex items-center gap-2">
                <img
                  src={campaign.organizer.avatarUrl}
                  alt={campaign.organizer.displayName}
                  className="size-8 rounded-full border border-white/20 object-cover"
                />
                <Link
                  to={`/u/${campaign.organizer.username}`}
                  className="text-shadow font-display font-medium text-white"
                >
                  @{campaign.organizer.username}
                </Link>
                <span className="rounded-full border border-[#0df29e]/30 bg-[#0df29e]/20 px-2 py-0.5 text-xs font-medium text-[#0df29e]">
                  Verified
                </span>
              </div>

              {/* Title */}
              <h1 className="text-shadow mb-1 font-display text-2xl font-bold leading-tight text-white">
                {campaign.title}
              </h1>

              {/* Description snippet */}
              <p className="text-shadow line-clamp-2 text-sm leading-snug text-white/90">
                {descriptionText}...
              </p>

              <span className="text-shadow mt-2 inline-flex items-center gap-1 text-xs font-medium text-white/60">
                <ChevronDown className="size-3" />
                Scroll for more
              </span>
            </div>

            {/* Action Column (right) */}
            <div className="flex flex-col items-center gap-5 pb-4">
              {/* Profile */}
              <Link to={`/u/${campaign.organizer.username}`}>
                <img
                  src={campaign.organizer.avatarUrl}
                  alt=""
                  className="size-12 rounded-full border-2 border-white object-cover shadow-lg"
                />
              </Link>

              {/* Like — toggles on click */}
              <button
                className="group flex flex-col items-center gap-1"
                onClick={() => {
                  setLiked((prev) => !prev);
                  setLikeCount((prev) => prev + (liked ? -1 : 1));
                }}
              >
                <div
                  className={`flex size-12 items-center justify-center rounded-full transition-all active:scale-90 ${
                    liked ? "bg-[#FF2E93]/20 border border-[#FF2E93]/40" : "glass"
                  }`}
                >
                  <Heart
                    className={`size-7 transition-colors ${
                      liked ? "fill-[#FF2E93] text-[#FF2E93]" : "text-white"
                    }`}
                  />
                </div>
                <span
                  className={`text-shadow text-xs font-medium ${liked ? "text-[#FF2E93]" : "text-white"}`}
                >
                  {formatNumber(likeCount)}
                </span>
              </button>

              {/* Comments — opens drawer */}
              <button
                className="group flex flex-col items-center gap-1"
                onClick={() => setCommentsOpen(true)}
              >
                <div className="glass flex size-12 items-center justify-center rounded-full text-white transition-transform active:scale-90">
                  <MessageCircle className="size-7" />
                </div>
                <span className="text-shadow text-xs font-medium text-white">
                  {campaign.comments.length}
                </span>
              </button>

              {/* Share — Web Share API with clipboard fallback */}
              <button
                className="group flex flex-col items-center gap-1"
                onClick={async () => {
                  const shareData = {
                    title: campaign.title,
                    text: descriptionText,
                    url: window.location.href,
                  };
                  try {
                    if (navigator.share) {
                      await navigator.share(shareData);
                    } else {
                      await navigator.clipboard.writeText(window.location.href);
                    }
                  } catch {
                    // User cancelled share — ignore
                  }
                }}
              >
                <div className="glass flex size-12 items-center justify-center rounded-full text-white transition-transform active:scale-90">
                  <Share2 className="size-7" />
                </div>
                <span className="text-shadow text-xs font-medium text-white">Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Donate + Progress Bar */}
        <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col items-center">
          <div className="flex w-full justify-center bg-gradient-to-t from-black via-black/80 to-transparent px-4 pb-6 pt-4">
            <button
              onClick={() => setDonateOpen(true)}
              className="glass group relative flex h-[56px] w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-[#0df29e]/50 shadow-[0_0_15px_rgba(13,242,158,0.2)] transition-all active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-[#0df29e]/10 transition-colors group-active:bg-[#0df29e]/20" />
              <Heart className="relative z-10 size-6 text-[#0df29e]" />
              <span className="relative z-10 font-display text-[18px] font-bold uppercase tracking-wide text-white">
                Give $5
              </span>
            </button>
          </div>
          {/* Progress Bar — green fades out over first 100px of scroll, black track stays */}
          <div className="relative h-1 w-full bg-[#050505]">
            <div
              className="absolute left-0 top-0 h-full bg-[#0df29e] shadow-[0_0_8px_#0df29e]"
              style={{ width: `${percentage}%`, opacity: heroBarOpacity }}
            />
          </div>
        </div>
      </section>

      {/* ===== BELOW THE FOLD ===== */}
      <section className="px-4 pb-20 pt-8 sm:px-6">
        <div className="mx-auto max-w-2xl space-y-8">
          {/* Progress */}
          <div className="space-y-3">
            <p className="text-[17px] text-white/50">
              <span className="text-[28px] font-semibold text-[#0df29e]">
                {formatCurrency(campaign.raisedAmount)}
              </span>{" "}
              raised of {formatCurrency(campaign.goalAmount)} goal
            </p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="neon-bar h-full rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: easeOut }}
                viewport={{ once: true }}
              />
            </div>
            <p className="text-[15px] text-white/40">
              {formatNumber(campaign.donationCount)} donations
            </p>
          </div>

          <CampaignStory description={campaign.description} />
          <OrganizerCard organizer={campaign.organizer} />
          <BeneficiaryCard beneficiary={campaign.beneficiary} />

          <div className="gfm-card p-6">
            <DonationsList donations={campaign.donations} />
          </div>

          <WordsOfSupport comments={campaign.comments} />
        </div>
      </section>

      {/* Floating Donate FAB — appears after scrolling past hero */}
      <AnimatePresence>
        {scrolledPastHero && !donateOpen && (
          <motion.button
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            onClick={() => setDonateOpen(true)}
            className="fixed bottom-6 right-4 z-40 flex h-14 items-center gap-2 rounded-full bg-[#0df29e] px-6 font-display text-[15px] font-bold text-[#050505] shadow-[0_0_20px_rgba(13,242,158,0.3)] active:scale-[0.97]"
          >
            <Heart className="size-5" />
            Donate
          </motion.button>
        )}
      </AnimatePresence>

      {/* Donate Drawer */}
      <DonateDrawer open={donateOpen} onOpenChange={setDonateOpen} />

      {/* Comments Drawer */}
      <CommentsDrawer
        open={commentsOpen}
        onOpenChange={setCommentsOpen}
        comments={campaign.comments}
      />
    </div>
  );
}
