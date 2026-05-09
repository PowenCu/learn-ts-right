## Learn TS Right — Build Plan

A polished, interactive TypeScript learning platform with auth, DB-synced progress, lessons, and a playground. The existing scaffold (TS Guide pages) will be replaced by this new structure.

### 1. Foundation: design system, layout, routing
- Update `src/index.css` + `tailwind.config.ts` with a blue→purple gradient primary token, dark/light HSL tokens, and a `--gradient-primary` semantic token.
- Add a `ThemeProvider` (localStorage-backed) and a `ModeToggle` in the navbar.
- New `Layout` shell: `Navbar` (logo + center nav + auth) and `Footer` (GitHub, About, tech stack). Mobile hamburger via `Sheet`.
- Wire `App.tsx` routes: `/`, `/lessons`, `/lessons/:slug`, `/playground`, `/progress`, `/auth` (catch-all 404 last). Remove old TS-guide routes.

### 2. Database & auth (Lovable Cloud)
- Migration creating:
  - `profiles` (user_id FK to auth.users, display_name, avatar_url) with RLS (user reads/updates own; public read).
  - `lesson_progress` (user_id, lesson_slug, completed_at) with RLS (user reads/writes own) and a unique index on (user_id, lesson_slug).
  - `handle_new_user` trigger to auto-create a profile row on signup.
  - `update_updated_at_column` helper + triggers.
- Configure auth: auto-confirm email enabled, signups enabled, no anonymous users, HIBP password check on.
- `/auth` page with email + password Sign In / Sign Up tabs. `useAuth` hook (subscribes via `onAuthStateChange` BEFORE `getSession()`). Protected route wrapper for `/progress` that redirects to `/` with a toast.

### 3. Data layer
- `src/data/lessons.ts` — typed `Lesson` interface + 6 seeded lessons (What is TS, Primitive Types, Interfaces vs Type Aliases, Typing Functions, Intro to Generics, TS with React Props). Each: 2–3 paragraphs of real content + at least one TS code example, plus `category`, `readTimeMinutes`, `order`, `slug`.
- `useLessons`, `useLesson(slug)` hooks for lookup + prev/next.
- `useProgress` hook: when signed in, syncs `lesson_progress` table; when signed out, falls back to `localStorage`. Exposes `completedSlugs`, `markComplete`, `reset`.

### 4. Pages

**Home (`/`)**
- Hero with gradient headline, subheading, two CTAs.
- "What you'll learn" grid: 4 shadcn `Card`s (Type System Fundamentals, Generics & Advanced Types, Real-World Patterns, TS with React).
- Curriculum roadmap: visual horizontal path Beginner → Intermediate → Advanced with lesson counts per tier.

**Lessons list (`/lessons`)**
- Left sidebar with category filter chips (Basics, Types, Functions, Generics, React, Advanced) + "All".
- Grid of lesson cards: title, category badge, read time, completion check or lock icon (lock when unauthenticated and lesson not completed locally).

**Lesson viewer (`/lessons/:slug`)**
- Prose container, title + badge + read time header.
- Renders content blocks; `<CodeBlock>` component (dark theme, syntax-highlight via `react-syntax-highlighter` or simple Prism CSS, Copy button using `navigator.clipboard` + sonner toast).
- Bottom: Prev / Next nav based on `order`, "Mark as Complete" button using `useProgress`.

**Playground (`/playground`)**
- Resizable two-pane (`Tabs` on mobile). Left = `Textarea` editor pre-filled with a typed function snippet. Right = output panel.
- "Run" button: parses simple `console.log(...)` calls from the source via a tiny safe evaluator (string extraction, not `eval`), prints to right pane. Note in UI that real TS execution requires a sandbox.
- Three "Quick Example" buttons: Interfaces, Generics, Type Guards — load preset snippets.

**Progress (`/progress`, gated)**
- Summary card: "X of Y lessons completed" + shadcn `Progress` bar.
- List of completed lessons with checkmark + completion date.
- "Reset Progress" button → `AlertDialog` confirmation → clears DB rows + localStorage.

### 5. Navbar auth UX
- Signed out: "Sign In" button → `/auth`.
- Signed in: avatar + email in a `DropdownMenu` with "My Progress" and "Sign Out".

### 6. Quality bar
- All components in `src/components/`, pages in `src/pages/`, hooks in `src/hooks/`.
- Strict typing, no `any`. Semantic Tailwind tokens only — no raw colors in JSX.
- Fully responsive (hamburger sheet < md).

### Technical notes
- Code highlighting: lightweight Prism via `react-syntax-highlighter/dist/esm/prism` to avoid heavy bundles.
- Auth state: single `AuthProvider` at app root; `onAuthStateChange` listener registered before `getSession()` to avoid race.
- Progress sync: on login, merge any localStorage completions into the DB (idempotent upsert), then clear local cache.
- Old TypeScript Guide pages (`Concepts*`, `GettingStarted`, `Advanced`, `Resources`) and related components will be removed since they are being replaced.
