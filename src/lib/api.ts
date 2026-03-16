import { useQuery } from "@tanstack/react-query";
import type { Campaign } from "@/types";
import mockData from "@/data/mock.json";

export function useCampaign(_slug: string) {
  return useQuery<Campaign>({
    queryKey: ["campaign", _slug],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockData.campaign as Campaign;
    },
  });
}
