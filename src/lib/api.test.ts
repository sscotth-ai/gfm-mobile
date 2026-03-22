import { describe, it, expect } from "vitest";
import mockData from "@/data/mock.json";

describe("mock data integrity", () => {
  it("campaign has required fields", () => {
    const { campaign } = mockData;
    expect(campaign.slug).toBeTruthy();
    expect(campaign.title).toBeTruthy();
    expect(campaign.description).toBeTruthy();
    expect(campaign.goalAmount).toBeGreaterThan(0);
    expect(campaign.raisedAmount).toBeGreaterThanOrEqual(0);
    expect(campaign.images.length).toBeGreaterThan(0);
    expect(campaign.donations.length).toBeGreaterThan(0);
    expect(campaign.comments.length).toBeGreaterThan(0);
  });

  it("campaign description is markdown, not HTML", () => {
    expect(mockData.campaign.description).not.toMatch(/<[a-z]+>/);
    expect(mockData.community.description).not.toMatch(/<[a-z]+>/);
  });

  it("profile has required fields", () => {
    const { profile } = mockData;
    expect(profile.username).toBeTruthy();
    expect(profile.displayName).toBeTruthy();
    expect(profile.avatarUrl).toMatch(/^https?:\/\//);
    expect(profile.activity.length).toBeGreaterThan(0);
  });

  it("community has required fields", () => {
    const { community } = mockData;
    expect(community.slug).toBeTruthy();
    expect(community.name).toBeTruthy();
    expect(community.campaigns.length).toBeGreaterThan(0);
  });

  it("all non-anonymous donations have avatar URLs", () => {
    for (const donation of mockData.campaign.donations) {
      if (!donation.isAnonymous) {
        expect(donation.donorAvatarUrl).toMatch(/^https?:\/\//);
      }
    }
  });

  it("all comments have avatar URLs", () => {
    for (const comment of mockData.campaign.comments) {
      expect(comment.authorAvatarUrl).toMatch(/^https?:\/\//);
    }
  });
});
