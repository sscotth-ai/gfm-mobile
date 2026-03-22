import { http, HttpResponse, delay } from "msw";
import mockData from "@/data/mock.json";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function fixPaths<T>(obj: T): T {
  const json = JSON.stringify(obj);
  return JSON.parse(json.replace(/"\/images\//g, `"${BASE}/images/`));
}

export const handlers = [
  // Get campaign by slug
  http.get("/api/campaigns/:slug", async ({ params }) => {
    await delay(300);

    const { slug } = params;
    if (slug !== mockData.campaign.slug) {
      return HttpResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return HttpResponse.json(fixPaths(mockData.campaign));
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

    return HttpResponse.json(fixPaths({
      donations: paginated,
      total: donations.length,
      page,
      totalPages: Math.ceil(donations.length / limit),
    }));
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
  http.get("/api/users/:username", async ({ params }) => {
    await delay(300);

    const { username } = params;
    if (username !== mockData.profile.username) {
      return HttpResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return HttpResponse.json(fixPaths(mockData.profile));
  }),

  // Get community
  http.get("/api/communities/:slug", async ({ params }) => {
    await delay(300);

    const { slug } = params;
    if (slug !== mockData.community.slug) {
      return HttpResponse.json({ error: "Community not found" }, { status: 404 });
    }

    return HttpResponse.json(fixPaths(mockData.community));
  }),
];
