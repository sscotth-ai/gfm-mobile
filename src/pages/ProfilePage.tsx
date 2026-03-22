"use client";

import { useParams, Link } from "react-router-dom";
import {
  ChevronDown,
  Ellipsis,
  Heart,
  Leaf,
  MessageCircle,
  Palette,
  PawPrint,
  Share2,
  Sparkles,
} from "lucide-react";
import { useProfile } from "@/lib/api";
import type { Profile, ProfileActivity, ProfileCause } from "@/types";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatRelativeTime } from "@/lib/format";

const causeIcons = {
  paw: PawPrint,
  palette: Palette,
  leaf: Leaf,
} as const satisfies Record<ProfileCause["icon"], typeof PawPrint>;

function ProfileHero({ profile }: { profile: Profile }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] glass">
      {/* Dynamic gradient background */}
      <div className="relative h-[200px] overflow-hidden sm:h-[220px]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0df29e]/30 via-[#050505] to-[#FF2E93]/20" />
        <div className="absolute left-0 top-0 h-full w-[24%] rounded-r-[30px] bg-[#0df29e]/10" />
        <div className="absolute right-[-8%] top-0 h-[70%] w-[46%] rounded-bl-[80px] bg-[#FF2E93]/8" />
        <div className="absolute left-1/2 top-0 h-full w-[20%] -translate-x-1/2 rounded-b-[80px] bg-[#0df29e]/8" />
        {/* Smooth transition to content area */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/[0.08] to-transparent" />
      </div>

      <div className="relative -mt-18 px-4 pb-6 text-center sm:px-6">
        <Avatar className="mx-auto size-[106px] border-4 border-[#0a0a0a] shadow-[0_0_30px_rgba(13,242,158,0.15)]">
          <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
          <AvatarFallback className="bg-white/8 text-[#0df29e] text-2xl">
            {profile.displayName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <h1 className="mt-4 text-balance font-display text-[24px] font-bold text-white sm:text-[28px]">
          {profile.displayName}
        </h1>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0df29e]/10 border border-[#0df29e]/20 px-4 py-2 text-[15px] font-semibold text-[#0df29e]">
          <Sparkles className="size-4" />
          Inspired {profile.inspiredCount} people to help
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-[16px] font-semibold text-white/60">
          <span>{profile.followers} followers</span>
          <span className="h-5 w-px bg-white/12" />
          <span>{profile.following} following</span>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <Button className="h-10 min-w-[104px] rounded-full bg-[#0df29e] text-[#050505] font-semibold hover:bg-[#0df29e]/90 neon-glow sm:min-w-[112px]">
            Follow
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="size-10 rounded-full border-white/12 text-white/50 hover:bg-white/8 hover:text-white"
          >
            <Ellipsis className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function DiscoverPeople({ profile }: { profile: Profile }) {
  return (
    <section className="pt-2">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-[18px] font-semibold text-white">Discover more people</h2>
        <div className="flex items-center gap-4">
          <AvatarGroup className="*:data-[slot=avatar]:size-10 *:data-[slot=avatar]:border-2 *:data-[slot=avatar]:border-[#050505]">
            {profile.discoverPeople.map((person) => (
              <Avatar key={person.id}>
                <AvatarImage src={person.avatarUrl} alt="" />
                <AvatarFallback className="bg-white/8 text-white/50">?</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <button className="text-white/30 hover:text-white">
            <ChevronDown className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TopCauses({ profile }: { profile: Profile }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-[22px] font-semibold text-white">Top causes</h2>
      <div className="grid grid-cols-3 gap-3">
        {profile.topCauses.map((cause) => {
          const Icon = causeIcons[cause.icon];

          return (
            <div
              key={cause.id}
              className="flex flex-col items-center gap-3 rounded-[24px] border border-white/8 bg-white/5 px-3 py-4 text-center"
            >
              <span
                className="inline-flex size-14 items-center justify-center rounded-full"
                style={{ backgroundColor: `${cause.background}20`, color: cause.foreground }}
              >
                <Icon className="size-6" />
              </span>
              <span className="text-[14px] font-medium text-white/70">{cause.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Highlights({ profile }: { profile: Profile }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-[22px] font-semibold text-white">Highlights</h2>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {profile.highlights.map((highlight) => (
          <a
            key={highlight.id}
            href={highlight.href}
            target="_blank"
            rel="noreferrer"
            className="gfm-card w-[170px] shrink-0 overflow-hidden p-0 transition-all hover:border-white/20 hover:shadow-[0_8px_30px_rgba(13,242,158,0.06)]"
          >
            <img
              src={highlight.imageUrl}
              alt={`${highlight.title} photo`}
              className="aspect-square w-full object-cover"
            />
            <div className="space-y-3 p-4">
              <h3 className="line-clamp-2 text-[16px] font-semibold leading-6 text-white">
                {highlight.title}
              </h3>
              <div className="h-1.5 rounded-full bg-white/10">
                <div className="neon-bar h-full w-[78%] rounded-full" />
              </div>
              <p className="text-[14px] text-[#0df29e]">
                {formatCurrency(highlight.raisedAmount)} raised
              </p>
              <p className="text-[13px] text-white/30">{highlight.supporterCount} supporters</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ActivityItem({
  activity,
  avatarUrl,
  displayName,
}: {
  activity: ProfileActivity;
  avatarUrl: string;
  displayName: string;
}) {
  return (
    <article className="space-y-4 rounded-[26px] border border-white/12 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-11 border border-white/12">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-white/8 text-[#0df29e]">
              {displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[15px] font-semibold text-white">{displayName}</p>
            <p className="text-[14px] text-white/30">{formatRelativeTime(activity.createdAt)}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          className="size-9 text-white/30 hover:bg-white/8 hover:text-white"
        >
          <Ellipsis className="size-4" />
        </Button>
      </div>

      {activity.description ? (
        <p className="text-[15px] leading-7 text-white/60">{activity.description}</p>
      ) : null}

      <div className="space-y-3">
        <p className="text-[15px] font-medium text-white">{activity.action}</p>
        <div className="flex items-center gap-2 text-[14px] text-white/40">
          <img
            src={activity.campaign.beneficiaryLogoUrl}
            alt={activity.campaign.beneficiaryName}
            className="size-6 rounded-full border border-white/12 object-cover"
          />
          <span>
            Benefiting{" "}
            <Link to="/communities/watch-duty" className="text-[#0df29e] hover:underline">
              {activity.campaign.beneficiaryName}
            </Link>
          </span>
        </div>

        <Link
          to={`/f/${activity.campaign.slug}`}
          className="group block rounded-[22px] border border-white/12 bg-white/5 p-3 hover:border-white/20 hover:bg-white/8"
        >
          <div className="flex gap-3">
            <img
              src={activity.campaign.imageUrl}
              alt={activity.campaign.title}
              className="size-[72px] rounded-[18px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[16px] font-semibold leading-6 text-white group-hover:text-[#0df29e]">
                {activity.campaign.title}
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-white/10">
                <div
                  className="neon-bar h-full rounded-full"
                  style={{ width: `${activity.campaign.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-5 text-white/30">
        <button className="inline-flex items-center gap-2 hover:text-[#FF2E93]">
          <Heart className="size-4" />
          {activity.reactions > 0 ? (
            <span className="text-[14px]">{activity.reactions}</span>
          ) : null}
        </button>
        <button className="inline-flex items-center gap-2 hover:text-white">
          <MessageCircle className="size-4" />
        </button>
        <button className="inline-flex items-center gap-2 hover:text-white">
          <Share2 className="size-4" />
        </button>
      </div>
    </article>
  );
}

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { data: profile, isLoading } = useProfile(username ?? "");

  if (isLoading || !profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 animate-spin rounded-full border-2 border-[#0df29e] border-t-transparent" />
          <span className="text-sm text-white/40">Loading profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-9 px-4 pb-16 sm:px-0">
      <ProfileHero profile={profile} />
      <DiscoverPeople profile={profile} />
      <TopCauses profile={profile} />
      <Highlights profile={profile} />

      <section className="space-y-4">
        <h2 className="font-display text-[22px] font-semibold text-white">Activity</h2>
        <div className="space-y-4">
          {profile.activity.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              avatarUrl={profile.avatarUrl}
              displayName={profile.displayName}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
