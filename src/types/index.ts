export type Campaign = {
  id: string;
  slug: string;
  title: string;
  description: string; // HTML string
  category: string;
  goalAmount: number;
  raisedAmount: number;
  donationCount: number;
  createdAt: string; // ISO date
  images: CampaignImage[];
  organizer: Organizer;
  beneficiary: Beneficiary;
  donations: Donation[];
  comments: Comment[];
};

export type CampaignImage = {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
};

export type Organizer = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  location: string;
  bio: string;
  fundraisersOrganized: number;
  followers: number;
  following: number;
  createdAt: string;
};

export type Beneficiary = {
  id: string;
  slug: string;
  name: string;
  description: string;
  isVerified: boolean;
  isNonprofit: boolean;
  logoUrl: string;
  website: string;
};

export type Donation = {
  id: string;
  donorName: string;
  donorAvatarUrl: string | null;
  amount: number;
  message: string | null;
  createdAt: string;
  isAnonymous: boolean;
};

export type Comment = {
  id: string;
  authorName: string;
  authorAvatarUrl: string | null;
  message: string;
  createdAt: string;
};

export type Community = {
  id: string;
  slug: string;
  name: string;
  description: string; // HTML
  tagline: string;
  logoUrl: string;
  bannerUrl: string;
  website: string;
  isVerified: boolean;
  isNonprofit: boolean;
  location: string;
  createdAt: string;
  stats: CommunityStats;
  campaigns: CampaignSummary[];
  topFundraisers: LeaderboardEntry[];
};

export type CommunityStats = {
  totalRaised: number;
  totalDonations: number;
  fundraiserCount: number;
  followerCount: number;
};

export type CampaignSummary = {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  organizerName: string;
  raisedAmount: number;
  goalAmount: number;
  donationCount: number;
  createdAt: string;
};

export type LeaderboardEntry = {
  rank: number;
  organizerName: string;
  organizerAvatarUrl: string | null;
  organizerUsername: string;
  campaignTitle: string;
  campaignSlug: string;
  raisedAmount: number;
};

export type Profile = {
  username: string;
  displayName: string;
  avatarUrl: string;
  inspiredCount: number;
  followers: number;
  following: number;
  discoverPeople: ProfileSuggestion[];
  topCauses: ProfileCause[];
  highlights: ProfileHighlight[];
  activity: ProfileActivity[];
};

export type ProfileSuggestion = {
  id: string;
  avatarUrl: string;
};

export type ProfileCause = {
  id: string;
  label: string;
  icon: "paw" | "palette" | "leaf";
  background: string;
  foreground: string;
};

export type ProfileHighlight = {
  id: string;
  title: string;
  imageUrl: string;
  raisedAmount: number;
  supporterCount: number;
  href: string;
};

export type ProfileActivity = {
  id: string;
  createdAt: string;
  action: string;
  description?: string;
  campaign: {
    title: string;
    beneficiaryName: string;
    beneficiaryLogoUrl: string;
    imageUrl: string;
    slug: string;
    progressPercent: number;
  };
  reactions: number;
};
