import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { projects } from "../src/data/projects";

test("homepage anchors, active section, timeline, and capability disclosures", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Chamodya\s*Bandara/i,
  );
  await expect(
    page.getByRole("img", { name: "Portrait of Chamodya Bandara" }),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  await page.getByRole("link", { name: "View experience" }).click();
  await expect(page).toHaveURL(/#experience$/);
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await expect(nav.getByRole("link", { name: "Experience" })).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(page.locator(".editorial-timeline > li")).toHaveCount(6);
  await nav.getByRole("link", { name: "Capabilities" }).click();
  const capability = page
    .locator("summary")
    .filter({ hasText: "REST APIs & integration" });
  await capability.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("REST endpoints and third-party integrations", {
      exact: false,
    }),
  ).toBeVisible();
  await expect(page.locator("#capabilities details")).toHaveCount(6);
});

test("mobile menu supports keyboard, Escape, and anchor navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page
    .getByText("Mobile menu", { exact: true })
    .or(page.locator("summary[aria-label='Mobile menu']"));
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(nav).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "About" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(nav).toBeHidden();
  await menu.click();
  await nav.getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(nav).toBeHidden();
});

test("copy feedback and contact fallback compose a draft", async ({
  page,
  context,
  baseURL,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: baseURL,
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByText("Email address copied.")).toBeAttached();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "chamodyabherath@gmail.com",
  );
  await expect(
    page.getByRole("link", { name: "chamodyabherath@gmail.com" }),
  ).toHaveAttribute("href", "mailto:chamodyabherath@gmail.com");
  await page.getByLabel("Company").fill("Example");
  await page.getByLabel("Name", { exact: true }).fill("Test sender");
  await page
    .getByLabel("Email", { exact: true })
    .fill("portfolio-test@example.com");
  await page.getByLabel("Subject").fill("Test & subject");
  await page.getByLabel("Message", { exact: true }).fill("Draft only.");
  await page.getByRole("button", { name: "Open email draft" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "If a draft did not open" }),
  ).toBeVisible();
});

test("theme persists and the résumé downloads", async ({ page, request }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Light theme" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Download résumé" }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    "Chamodya-Bandara-Resume.pdf",
  );
  const resume = await request.get("/resume.pdf");
  expect(resume.headers()["content-type"]).toContain("application/pdf");
  expect((await resume.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("individual case studies, canonical metadata, sitemap, and missing routes", async ({
  page,
  request,
  baseURL,
}) => {
  await page.goto("/work");
  for (const project of projects) {
    await expect(
      page.getByRole("link", { name: project.title, exact: true }),
    ).toHaveAttribute("href", `/work/${project.slug}`);
    await page.getByRole("link", { name: project.title, exact: true }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      project.title,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `${baseURL}/work/${project.slug}`,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      `${baseURL}/social.png`,
    );
    await page
      .getByRole("link", { name: "All projects", exact: true })
      .first()
      .click();
  }
  expect(
    (await request.get("/social.png")).headers()["content-type"],
  ).toContain("image/png");
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    `${baseURL}/work/enterprise-business-systems`,
  );
  expect(await (await request.get("/robots.txt")).text()).toContain(
    `${baseURL}/sitemap.xml`,
  );
  const response = await page.goto("/work/unknown-case-study");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Page not found." }),
  ).toBeVisible();
});

test("automated accessibility checks in both themes", async ({ page }) => {
  test.setTimeout(75_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [path, theme] of [
    ["/", "dark"],
    ["/", "light"],
    ["/work", "light"],
    ["/about", "dark"],
    ["/contact", "dark"],
  ]) {
    await page.goto(path);
    const toggle = page.getByRole("button", { name: "Light theme" });
    if (
      (await toggle.getAttribute("aria-pressed")) !== String(theme === "light")
    )
      await toggle.click();
    const result = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22aa",
        "best-practice",
      ])
      .analyze();
    expect(result.violations, `${path} (${theme})`).toEqual([]);
  }
});

test("responsive layout stays within viewport and honours reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 375, 430, 768, 1280, 1600]) {
    await page.setViewportSize({ width, height: 880 });
    await page.goto("/");
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    const bounds = await heading.boundingBox();
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBe(width);
    await expect(page.locator(".editorial-intro")).toBeHidden();
  }
});

test("content, navigation, and contact details work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 820 },
  });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await page.locator("summary[aria-label='Mobile menu']").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Contact" })
    .click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("link", { name: "chamodyabherath@gmail.com" }),
  ).toBeVisible();
  await expect(
    page.getByText("Use the email address above to compose your message."),
  ).toBeVisible();
  await context.close();
});
