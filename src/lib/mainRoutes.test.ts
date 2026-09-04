import { describe, it, expect } from "vitest";
import { MAIN_TABS, MAIN_TAB_PATHS, SECONDARY_PATHS } from "./mainRoutes";

// The bar is a product decision recorded in docs/PRODUCT-BRIEF.md §5. This
// test exists so a change to it is a deliberate, reviewed edit of both.
describe("primary navigation contract", () => {
  it("is exactly Feed · Explore · Review · You, in that order", () => {
    expect(MAIN_TABS.map((t) => t.label)).toEqual(["Feed", "Explore", "Review", "You"]);
    expect(MAIN_TAB_PATHS).toEqual(["/", "/explore", "/review", "/you"]);
  });

  it("puts the due badge on Review and nowhere else", () => {
    const badged = MAIN_TABS.filter((t) => "badge" in t && t.badge === "due").map((t) => t.label);
    expect(badged).toEqual(["Review"]);
  });

  it("routes every path to exactly one tab (or none), never two", () => {
    const paths = [
      "/",
      "/node/A1",
      "/explore",
      "/explore?cluster=A",
      "/skim",
      "/map",
      "/review",
      "/you",
      "/onboarding",
      "/read/A1-0",
    ];
    for (const p of paths) {
      const hits = MAIN_TABS.filter((t) => t.match(p)).map((t) => t.label);
      expect(hits.length, `${p} matched ${hits.join(",")}`).toBeLessThanOrEqual(1);
    }
    expect(MAIN_TABS.find((t) => t.match("/skim"))?.label).toBe("Explore");
    expect(MAIN_TABS.find((t) => t.match("/node/J5"))?.label).toBe("Feed");
    expect(MAIN_TABS.find((t) => t.match("/onboarding"))).toBeUndefined();
  });

  it("keeps Skim warm for offline as a secondary destination", () => {
    expect(SECONDARY_PATHS).toContain("/skim");
  });
});
