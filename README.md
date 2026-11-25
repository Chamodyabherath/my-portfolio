# Chamodya Bandara · Software engineering portfolio

A cinematic editorial portfolio built with the Next.js App Router. The homepage presents a portrait-led introduction, About, a statement, career and education, engineering capabilities, and contact. Existing case studies are available through the career section and at `/work`.

## Run locally

Use Node.js 22.13 or later.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). The portfolio and the mailto fallback work without credentials.

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
npm start
npx playwright install chromium
npm test
```

Playwright starts its own test server unless `PLAYWRIGHT_BASE_URL` points to a running instance. Set `PLAYWRIGHT_CHANNEL=chrome` to use installed Chrome. For metadata tests against a running instance, build with `SITE_URL` set to that same origin. The functional contact test uses a build with the mailto fallback.

## Deploy to Vercel

1. Commit the source to a repository and import the project into Vercel with the Next.js preset.
2. Set `SITE_URL` to the public origin, such as `https://portfolio.example.com`. When Vercel system variables are exposed, `VERCEL_PROJECT_PRODUCTION_URL` is the fallback. See [Vercel system environment variables](https://vercel.com/docs/environment-variables/system-environment-variables).
3. Optionally configure server-side contact delivery below.
4. Deploy and verify canonical URLs, `/robots.txt`, `/sitemap.xml`, social sharing, résumé download, and contact on the public hostname.

Builds without a known public origin and Vercel previews ask search engines to stay out.

### Optional contact delivery

Copy `.env.example` to `.env.local` for local configuration, or set all four variables in Vercel and redeploy.

- `RESEND_API_KEY` — server-side Resend key with sending access.
- `CONTACT_FROM_EMAIL` — sender address or display name and address on a verified Resend domain.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — shared Redis credentials for rate limiting across Vercel instances.

The server action validates bounded fields, rejects a filled honeypot, and limits submissions per visitor and across the inbox. On Vercel it uses the platform forwarding header. Other hosts share the visitor limit. The form keeps a direct email link and uses a mailto draft when any setting is absent. Provider acceptance is shown only after Resend returns a message ID. See [Resend’s send email API](https://resend.com/docs/api-reference/emails/send-email).

## Edit content

| File                          | What to update                                            |
| ----------------------------- | --------------------------------------------------------- |
| `src/data/profile.ts`         | Name, title, contact links, education                     |
| `src/data/experience.ts`      | Roles, dates, responsibilities                            |
| `src/data/editorial.ts`       | Timeline entries and six capabilities                     |
| `src/data/projects.ts`        | Case studies, evidence, approved external links           |
| `public/images/portrait.webp` | Optimized supplied portrait used in the hero and About    |
| `public/resume.pdf`           | Public résumé                                             |
| `public/social.png`           | Share image                                               |
| `src/app/editorial.css`       | Editorial palette, typography, layout, responsive styling |

The public résumé excludes street address, personal phone number, and references’ contact details. The supplied portrait is used with two different crops. The homepage links to the case studies without a featured gallery because approved project screenshots are pending. The LinkedIn URL is from the résumé. Direct verification previously returned a rate limit.

## Reference and motion

[Sakuja Shamal’s portfolio](https://www.sakujashamal.me/) was reviewed on desktop and mobile. Its sticky anchor navigation, oversized type, alternating tonal sections, numbered timeline, and sparse contact layout informed the design. The visual system uses Chamodya’s photography, a warm charcoal and sage palette, and an original portrait composition. Native anchor scrolling, a brief session-only progress reveal, CSS interactions, and deferred GSAP ScrollTrigger effects respect reduced motion. The homepage content and mobile navigation are usable with JavaScript disabled.

## Verification

The local production build, ESLint, formatting, and all eight Playwright tests passed. The browser tests covered widths from 320 to 1600 pixels, both themes, keyboard and JavaScript-disabled navigation, contact fallback, metadata, and case study routes. Configured contact delivery and rate limiting were also exercised against mocked services.

The final local homepage Lighthouse runs scored 100 in all four desktop categories. Mobile scored 78 for performance and 100 for accessibility, best practices, and SEO. Mobile LCP was 3.8 seconds with no measured layout shift.
