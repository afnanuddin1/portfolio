# Personal Portfolio Website — Web Design Document

**Author:** Afnan Uddin

**Course:** CSCI355 — Project 1

**Live site:** https://afnanuddin1.github.io/portfolio/

**Repository:** https://github.com/afnanuddin1/portfolio


---

## Project Overview

This is a personal portfolio website built from scratch with plain HTML, CSS,
and JavaScript (no frameworks). It presents who I am as a developer, the
projects I've shipped, the technologies I work with, and how to reach me. It is
a single-page site: the Home, About, Projects, Experience, and Contact
"pages" are sections on one page connected by an anchor-based navigation bar,
which keeps hosting on GitHub Pages simple and the experience fast.

The goal is a site that looks professional enough to put on a job application,
loads quickly, works on phones, and is accessible to everyone.

---

## Target Audience

The primary audience is **technical recruiters and hiring managers** for
software-engineering and full-stack roles, since I graduate in December 2026 and am
job-seeking. Secondary audiences are **engineers reviewing my work** (who care
about the tech stack and the depth of the projects) and **peers/collaborators**.

Design implications: fast load, clear hierarchy, an obvious résumé download, a
prominent contact path, and project descriptions that lead with measurable
impact rather than buzzwords.

---

## Content Strategy

Content is organized so the most important information is reachable in seconds:

- **Hero** — name, one-line value proposition, and three calls to action
  (view work, contact, download résumé).
- **About** — short professional bio + quick facts (location, focus,
  graduation, availability).
- **Skills** — grouped by Languages / Frameworks / Databases / Tools so a
  recruiter can scan for a match.
- **Projects** — the strongest work first, each card leading with impact
  ("cut query time ~70%") then the stack.
- **Experience** — a concise timeline of roles and what I delivered.
- **Contact** — a validated form plus direct links (email, phone, GitHub).

Writing style is plain and results-first. Every project line names a concrete
outcome and the technologies behind it.

---

## Information Organization

```
Home (hero)
 ├── About
 ├── Skills
 ├── Projects ── [filter: All | Full-stack | Machine Learning]
 ├── Experience (timeline)
 └── Contact (form + direct links + résumé)
```

Navigation is a sticky top bar so visitors can jump between sections at any
scroll position. A scrollspy highlights the section currently in view. On
mobile the nav collapses into a hamburger menu.

---

## Visual Design

### Wireframe

**Desktop**
```
+-------------------------------------------------------------+
| AU  Afnan Uddin        About Skills Projects Exp Contact ◐  |  <- sticky nav
+-------------------------------------------------------------+
|                                                             |
|   FULL-STACK DEVELOPER · CS @ QUEENS                        |
|   I build software that                                     |
|   ships and scales.                                         |
|   [short bio paragraph]                                     |
|   [View work] [Get in touch] [Download résumé]              |
|                                            scroll ↓         |
+-------------------------------------------------------------+
| 01 — About                                                  |
| [heading]              [bio paragraphs + quick-fact grid]   |
+-------------------------------------------------------------+
| 02 — Skills                                                 |
| [Languages]   [Frameworks]   [Databases]   [Tools]          |
+-------------------------------------------------------------+
| 03 — Projects     [All][Full-stack][ML]                     |
| [ card ] [ card ]                                           |
| [ card ] [ card ]                                           |
+-------------------------------------------------------------+
| 04 — Experience (vertical timeline)                         |
+-------------------------------------------------------------+
| 05 — Contact     [ form ]      [ direct links ]             |
+-------------------------------------------------------------+
| © year                                   back to top ↑      |
+-------------------------------------------------------------+
```

**Mobile** — single column; nav becomes a hamburger that slides a panel in
from the right; skills/projects stack to one column.

### Design decisions

- **Style:** refined / editorial. Warm "paper" background, generous whitespace,
  one strong accent color. Clean but not generic.
- **Color scheme:** a warm off-white (`#f6f2ea`) base, near-black ink text
  (`#1c1814`), and a single terracotta accent (`#c8502b`) for links, buttons,
  and highlights. A dark theme mirrors the same palette inverted. Chosen
  because a restrained, high-contrast palette reads as professional and keeps
  attention on the content.
- **Typography:** *Fraunces* (a characterful serif) for headings, *Plus Jakarta
  Sans* for body text, and *Space Mono* for small labels/eyebrows — the mono
  labels give a subtle technical/engineering feel that fits a CS portfolio.
- **Layout:** asymmetric two-column About, a card grid for projects, and a
  vertical timeline for experience, all capped at ~1120px and centered.
- **Visual hierarchy:** numbered section labels → large serif titles → body
  text; the accent color is reserved for interactive/important elements so it
  always signals "this matters."
- **Consistency:** all colors, spacing, and fonts are CSS variables, so every
  section shares the same system.
- **Icons/images:** kept minimal and typographic (initials mark, arrows,
  the résumé is the main downloadable asset). This keeps the site fast and
  avoids stock-photo clutter.
- **Inspiration:** clean editorial developer portfolios in the Swiss tradition
  (Brittany Chiang's layout conventions, Bartosz Jarocki, Tania Rascia's
  content-first approach).

### Accessibility

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `footer`).
- A "skip to main content" link for keyboard/screen-reader users.
- Visible focus outlines on all interactive elements.
- Color contrast meets WCAG AA in both light and dark themes.
- `aria-expanded` on the menu button, `aria-live` on form status, `aria-invalid`
  on bad fields, labels tied to every input.
- `prefers-reduced-motion` disables animations for users who request it.
- Fluid type (`clamp()`) so text scales without breaking.

---

## Interaction / Functionality

JavaScript features implemented (see `script.js`):

1. **Mobile navigation toggle** — hamburger opens/closes a slide-in menu and
   keeps `aria-expanded` in sync.
2. **Light/dark theme toggle** — switches themes and remembers the choice via
   `localStorage` (wrapped in try/catch so it degrades gracefully).
3. **Scrollspy** — an `IntersectionObserver` highlights the nav link for the
   section currently in view.
4. **Scroll-reveal** — sections fade/slide in as they enter the viewport (once).
5. **Project filter** — buttons show/hide project cards by category.
6. **Contact form** — client-side validation with inline error messages and a
   live status message, submitted via Formspree.

**User feedback:** hover/focus states on every control, an animated nav
underline, inline validation errors, and an `aria-live` success/error message
after submitting. These confirm to the user that their action registered, which
is the core of good interactivity.

---

## Technical Overview

- **Languages:** HTML5, CSS3, vanilla JavaScript (ES6+). No build step, no
  frameworks — just three files plus the résumé.
- **Key APIs:** `IntersectionObserver` (scrollspy + reveal), `localStorage`
  (theme), `fetch` (form submission).
- **Responsiveness:** mobile-first CSS with a breakpoint at 760px; fluid
  spacing/typography via `clamp()`.
- **Hosting:** GitHub Pages (static hosting straight from the repo).
- **Files:**
  - `index.html` — structure/content
  - `styles.css` — all styling + theming + responsive rules
  - `script.js` — all interactivity
  - `Afnan_Uddin_Resume.pdf` — downloadable résumé
  - `README.md` — this document

---

## Timeline / Project Milestones

|      Milestone     |     Task     |     Target       |
|-----------|------|--------|
| 1 | Answer all content/design/interactivity questions (this README) | Day 1–2 |
| 2 | Build HTML structure + content | Day 3 |
| 3 | Style with CSS (light + dark, responsive) | Day 4–5 |
| 4 | Add JavaScript interactivity | Day 6 |
| 5 | Accessibility pass + cross-device testing | Day 7 |
| 6 | Deploy to GitHub Pages, submit links | Day 8 |

---

## Q&A — Full Assignment Responses

### Part 1 — Content
1. **Name displayed professionally:** Afnan Uddin

2. **Purpose of the site:** showcase my work and skills to land a software /
   full-stack role, and serve as a single link I can share on applications.

3. **Target audience:** recruiters/hiring managers, engineers reviewing my
   work, and peers.

4. **Skills to highlight:** full-stack development (Next.js/React/TypeScript),
   backend + databases (PostgreSQL/Supabase/Redis), machine learning
   (Python/scikit-learn), and security-aware engineering.

5. **Projects to showcase:** Rellia real-estate transaction platform,
   Intelligent SQL Copilot, Airbnb Price Prediction App, Spam Email Detector.

6. **Short bio:** Full-stack developer and CS student at CUNY Queens College
   (B.A., May 2026) who builds reliable, compliant systems across the stack.

7. **Pages/sections:** Home, About, Skills, Projects, Experience, Contact.

8. **Career goal / desired role:** software engineer / full-stack developer.

9. **Technologies/tools:** Java, Python, TypeScript, JavaScript, C/C++, SQL,
   React, Next.js, Node.js, FastAPI, Spring Boot, scikit-learn, PostgreSQL,
   Supabase, Redis, Docker, Git, Stripe, REST APIs, nginx.

10. **Achievements/experiences:** built a payment-compliant transaction platform
    with a 9-state workflow; resolved 16 security audit findings; built an AI
    SQL assistant cutting query time ~70%; led a 4-person retail front-end team.

11. **Call to action:** view projects, contact me, and download my résumé.

12. **Resume:** yes — included as a downloadable PDF linked from the hero and
    contact section.

13. **Social/professional links:** GitHub (github.com/afnanuddin1), email, phone.

### Part 2 — Design
1. **Overall style:** professional / refined editorial — minimal but with
   character.

2. **Color scheme & why:** warm paper + ink + a single terracotta accent;
   high contrast and restraint keep focus on the content and read as
   professional. Dark mode provided as well.

3. **Fonts:** Fraunces (headings), Plus Jakarta Sans (body), Space Mono
   (labels) — distinctive yet readable; the mono labels nod to engineering.

4. **Reflecting personality/field:** the technical mono labels and
   metrics-first project copy reflect an engineering mindset; the warm palette
   keeps it human, not sterile.

5. **Homepage layout:** full-height hero with name, value proposition, and CTAs,
   then scrollable sections below.

6. **Project section organization:** responsive card grid with a category
   filter; each card leads with impact, then stack, then links.

7. **Mobile-friendly:** yes — mobile-first CSS, a 760px breakpoint, a hamburger
   menu, fluid type/spacing, and single-column stacking.

8. **Visual hierarchy:** numbered labels → large serif titles → body; accent
   color reserved for interactive/important items.

9. **Consistency:** a CSS-variable design system (one set of colors, fonts,
   spacing) used across every section.

10. **Accessibility:** semantic landmarks, skip link, focus outlines, AA
    contrast, ARIA attributes, labeled inputs, reduced-motion support.

11. **Icons/images:** kept minimal and typographic to stay fast and uncluttered;
    the résumé PDF is the main asset.

12. **Inspiration:** clean editorial developer portfolios (Brittany Chiang,
    Tania Rascia).

### Part 3 — Interactivity
1. **Interactive elements:** sticky nav with scrollspy, hamburger menu, theme
   toggle, project filter, scroll-reveal animations, contact form.

2. **Contact form:** yes — JavaScript validates each field and shows inline
   errors and a status message, submitted via Formspree.

3. **JavaScript features:** see the six features listed under "Interaction /
   Functionality" above.

4. **User feedback:** hover/focus states, animated nav underline, inline
   validation errors, and an `aria-live` success/error message.

5. **How interactivity improves UX:** it makes the site feel responsive and
   trustworthy — visitors get immediate confirmation that their actions worked,
   can navigate quickly, filter to what they care about, and choose a theme.

---

## External Resources Used
- [MDN Web Docs](https://developer.mozilla.org/) — HTML/CSS/JS reference.
- [Google Fonts](https://fonts.google.com/) — Fraunces, Plus Jakarta Sans, Space Mono.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) — accessibility.
- [GitHub Pages docs](https://docs.github.com/en/pages) — hosting.
- [Formspree](https://formspree.io/) — contact-form backend.
- [IntersectionObserver API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) — scrollspy & reveal.
