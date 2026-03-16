import { http, HttpResponse, delay } from "msw";
import mockData from "@/data/mock.json";

export const handlers = [
  // Get campaign by slug
  http.get("/api/campaigns/:slug", async ({ params }) => {
    await delay(300);

    const { slug } = params;
    if (slug !== mockData.campaign.slug) {
      return HttpResponse.json(
        { error: "Campaign not found" },
        { status: 404 },
      );
    }

    return HttpResponse.json(mockData.campaign);
  }),

  // Get paginated donations for a campaign
  http.get("/api/campaigns/:slug/donations", async ({ request }) => {
    await delay(200);

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1", 10);
    const limit = parseInt(url.searchParams.get("limit") ?? "5", 10);

    const donations = mockData.campaign.donations;
    const start = (page - 1) * limit;
    const paginated = donations.slice(start, start + limit);

    return HttpResponse.json({
      donations: paginated,
      total: donations.length,
      page,
      totalPages: Math.ceil(donations.length / limit),
    });
  }),

  // Submit a donation
  http.post("/api/campaigns/:slug/donate", async ({ request }) => {
    await delay(1000);

    const body = (await request.json()) as {
      amount: number;
      donorName: string;
      message?: string;
    };

    return HttpResponse.json({
      id: `don_${Date.now()}`,
      donorName: body.donorName,
      donorAvatarUrl: null,
      amount: body.amount,
      message: body.message ?? null,
      createdAt: new Date().toISOString(),
      isAnonymous: false,
    });
  }),

  // Get user profile
  http.get("/api/users/:username", async () => {
    await delay(300);
    return HttpResponse.json(mockData.campaign.organizer);
  }),

  // Get community
  http.get("/api/communities/:slug", async () => {
    await delay(300);
    return HttpResponse.json(mockData.campaign.beneficiary);
  }),
];
