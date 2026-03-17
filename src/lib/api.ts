import { useQuery } from "@tanstack/react-query";
import type { Campaign, Community, Profile } from "@/types";

export function useCampaign(slug: string) {
  return useQuery<Campaign>({
    queryKey: ["campaign", slug],
    queryFn: async () => {
      const res = await fetch(`/api/campaigns/${slug}`);
      if (!res.ok) throw new Error("Campaign not found");
      return res.json();
    },
    enabled: !!slug,
  });
}

export function useCommunity(slug: string) {
  return useQuery<Community>({
    queryKey: ["community", slug],
    queryFn: async () => {
      const res = await fetch(`/api/communities/${slug}`);
      if (!res.ok) throw new Error("Community not found");
      return res.json();
    },
    enabled: !!slug,
  });
}

export function useProfile(username: string) {
  return useQuery<Profile>({
    queryKey: ["profile", username],
    queryFn: async () => {
      const res = await fetch(`/api/users/${username}`);
      if (!res.ok) throw new Error("Profile not found");
      return res.json();
    },
    enabled: !!username,
  });
}
