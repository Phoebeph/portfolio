import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// Assertions here target roles/landmarks/structure, not specific copy —
// the Home page's content comes from Sanity and will change as soon as
// someone fills in Studio. A test that hard-codes "Add a one-line tagline…"
// would break the moment the site does its job.

test("has a title and meta description", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/.+/);
  const description = page.locator('meta[name="description"]');
  await expect(description).toHaveAttribute("content", /.+/);
});

test("renders the primary page landmarks and sections", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const sectionIds = [
    "projects",
    "skills",
    "experience",
    "articles",
    "contact",
  ];
  for (const id of sectionIds) {
    await expect(page.locator(`#${id}`)).toBeAttached();
  }
});

test("only one h1 is on the page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
});

test("primary CTA links to the projects section", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View selected work" }).click();
  await expect(page).toHaveURL(/#projects$/);
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "desktop nav has no toggle button");

  test("opens, traps focus on close, and closes on Escape", async ({
    page,
  }) => {
    await page.goto("/");

    const openButton = page.getByRole("button", { name: "Open menu" });
    await openButton.click();

    const dialog = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(dialog).toBeVisible();

    const closeButton = page.getByRole("button", { name: "Close menu" });
    await expect(closeButton).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(openButton).toBeFocused();
  });

  test("clicking a link closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Contact" }).click();
    await expect(
      page.getByRole("dialog", { name: "Mobile navigation" }),
    ).not.toBeVisible();
  });
});

test("has no serious or critical automated accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();

  const seriousOrWorse = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );

  expect(seriousOrWorse, JSON.stringify(seriousOrWorse, null, 2)).toEqual([]);
});
