"use client";

import { useParams, Link } from "react-router-dom";
import {
  ChevronDown,
  Ellipsis,
  Heart,
  Info,
  Leaf,
  MessageCircle,
  Palette,
  PawPrint,
  Share2,
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
    <section className="relative overflow-hidden rounded-[28px] bg-white pt-10">
      <div className="relative h-[170px] overflow-hidden rounded-t-[28px] bg-[#e8ffca] sm:h-[188px]">
        <div className="absolute left-0 top-0 h-full w-[24%] rounded-r-[30px] bg-[#d4f89d]" />
        <div className="absolute right-[-8%] top-0 h-[70%] w-[46%] rounded-bl-[80px] bg-[#ccf88e]" />
        <div className="absolute left-1/2 top-0 h-full w-[20%] -translate-x-1/2 rounded-b-[80px] bg-[#d4f89d]" />
        <div className="absolute bottom-[-66px] left-1/2 h-[130px] w-[125%] -translate-x-1/2 rounded-[50%] bg-white" />
      </div>

      <div className="relative -mt-18 px-4 pb-2 text-center sm:px-6">
        <Avatar className="mx-auto size-[106px] border-4 border-white shadow-[0_10px_24px_rgba(39,74,52,0.08)]">
          <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
          <AvatarFallback className="bg-[#f7f5f2] text-[#274a34]">
            {profile.displayName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <h1 className="mt-4 text-balance text-[24px] font-semibold text-[#232323] sm:text-[28px]">
          {profile.displayName}
        </h1>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#dff7b5] px-4 py-2 text-[15px] font-semibold text-[#274a34]">
          Inspired {profile.inspiredCount} people to help
          <Info className="size-4" />
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-[16px] font-semibold text-[#232323]">
          <span>{profile.followers} followers</span>
          <span className="h-5 w-px bg-[#d9d7d2]" />
          <span>{profile.following} following</span>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <Button className="h-10 min-w-[104px] bg-[#274a34] text-[#ccf88e] hover:bg-[#1f3b29] sm:min-w-[112px]">
            Follow
          </Button>
          <Button variant="outline" size="icon-sm" className="size-10">
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
        <h2 className="text-[18px] font-semibold text-[#232323]">Discover more people</h2>
        <div className="flex items-center gap-4">
          <AvatarGroup className="*:data-[slot=avatar]:size-10 *:data-[slot=avatar]:border *:data-[slot=avatar]:border-white">
            {profile.discoverPeople.map((person) => (
              <Avatar key={person.id}>
                <AvatarImage src={person.avatarUrl} alt="" />
                <AvatarFallback className="bg-[#f7f5f2] text-[#6f7069]">?</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <button className="text-[#6f7069] hover:text-[#232323]">
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
      <h2 className="text-[22px] font-semibold text-[#232323]">Top causes</h2>
      <div className="grid grid-cols-3 gap-3">
        {profile.topCauses.map((cause) => {
          const Icon = causeIcons[cause.icon];

          return (
            <div
              key={cause.id}
              className="flex flex-col items-center gap-3 rounded-[24px] bg-[#fbfaf8] px-3 py-4 text-center"
            >
              <span
                className="inline-flex size-14 items-center justify-center rounded-full"
                style={{ backgroundColor: cause.background, color: cause.foreground }}
              >
                <Icon className="size-6" />
              </span>
              <span className="text-[14px] font-medium text-[#232323]">{cause.label}</span>
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
      <h2 className="text-[22px] font-semibold text-[#232323]">Highlights</h2>
      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {profile.highlights.map((highlight) => (
          <a
            key={highlight.id}
            href={highlight.href}
            target="_blank"
            rel="noreferrer"
            className="gfm-card w-[170px] shrink-0 overflow-hidden p-0"
          >
            <img
              src={highlight.imageUrl}
              alt={`${highlight.title} photo`}
              className="aspect-square w-full object-cover"
            />
            <div className="space-y-3 p-4">
              <h3 className="line-clamp-2 text-[16px] font-semibold leading-6 text-[#232323]">
                {highlight.title}
              </h3>
              <div className="h-1.5 rounded-full bg-[#ece9e4]">
                <div className="h-full w-[78%] rounded-full bg-[#69c65b]" />
              </div>
              <p className="text-[14px] text-[#4f504a]">
                {formatCurrency(highlight.raisedAmount)} raised
              </p>
              <p className="text-[13px] text-[#6f7069]">{highlight.supporterCount} supporters</p>
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
    <article className="space-y-4 rounded-[26px] border border-[#e3e2dd] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-11 border border-[#e3e2dd]">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback className="bg-[#f7f5f2] text-[#274a34]">
              {displayName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[15px] font-semibold text-[#232323]">{displayName}</p>
            <p className="text-[14px] text-[#6f7069]">{formatRelativeTime(activity.createdAt)}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm" className="size-9">
          <Ellipsis className="size-4" />
        </Button>
      </div>

      {activity.description ? (
        <p className="text-[15px] leading-7 text-[#4f504a]">{activity.description}</p>
      ) : null}

      <div className="space-y-3">
        <p className="text-[15px] font-medium text-[#232323]">{activity.action}</p>
        <div className="flex items-center gap-2 text-[14px] text-[#6f7069]">
          <img
            src={activity.campaign.beneficiaryLogoUrl}
            alt={activity.campaign.beneficiaryName}
            className="size-6 rounded-full border border-[#e3e2dd] object-cover"
          />
          <span>Benefiting {activity.campaign.beneficiaryName}</span>
        </div>

        <Link
          to={`/f/${activity.campaign.slug}`}
          className="block rounded-[22px] border border-[#e3e2dd] bg-[#fbfaf8] p-3 hover:border-[#cfcac2]"
        >
          <div className="flex gap-3">
            <img
              src={activity.campaign.imageUrl}
              alt={activity.campaign.title}
              className="size-[72px] rounded-[18px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-[16px] font-semibold leading-6 text-[#232323]">
                {activity.campaign.title}
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-[#ece9e4]">
                <div
                  className="h-full rounded-full bg-[#69c65b]"
                  style={{ width: `${activity.campaign.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-5 text-[#6f7069]">
        <button className="inline-flex items-center gap-2 hover:text-[#232323]">
          <Heart className="size-4" />
          {activity.reactions > 0 ? (
            <span className="text-[14px]">{activity.reactions}</span>
          ) : null}
        </button>
        <button className="inline-flex items-center gap-2 hover:text-[#232323]">
          <MessageCircle className="size-4" />
        </button>
        <button className="inline-flex items-center gap-2 hover:text-[#232323]">
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
    return <div className="py-12 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-col gap-9 px-4 pb-16 sm:px-0">
      <ProfileHero profile={profile} />
      <DiscoverPeople profile={profile} />
      <TopCauses profile={profile} />
      <Highlights profile={profile} />

      <section className="space-y-4">
        <h2 className="text-[22px] font-semibold text-[#232323]">Activity</h2>
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
