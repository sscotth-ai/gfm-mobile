import { useQuery } from "@tanstack/react-query";
import type { Campaign } from "@/types";

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
