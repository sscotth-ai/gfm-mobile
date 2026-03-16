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
