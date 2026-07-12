import { motion } from "framer-motion";
import {
  Code2, Database, Sparkles, Shield, Cloud, Palette, Search,
  FileText, CreditCard, Bot, LayoutDashboard, Globe, Zap, Package,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

const stackLayers = [
  {
    icon: Palette,
    title: "Frontend",
    items: [
      { name: "React 18", note: "Component-based UI with hooks and concurrent rendering" },
      { name: "TypeScript 5", note: "Static typing across the whole codebase" },
      { name: "Vite 5", note: "Lightning-fast dev server and production bundling" },
      { name: "Tailwind CSS v3", note: "Utility-first styling driven by semantic design tokens" },
      { name: "shadcn/ui + Radix", note: "Accessible primitives themed via CSS variables" },
      { name: "Framer Motion", note: "Page transitions, spotlight nav, 3D card tilts" },
      { name: "React Router v6", note: "Nested routes, lazy-loaded pages, protected routes" },
      { name: "TanStack Query", note: "Server-state caching and background refetch" },
      { name: "Zod + react-hook-form", note: "Schema validation for auth, inquiries, bookings" },
    ],
  },
  {
    icon: Cloud,
    title: "Backend (Lovable Cloud)",
    items: [
      { name: "PostgreSQL", note: "Relational store for profiles, bookings, inquiries, medical_records" },
      { name: "Row Level Security", note: "Per-user data isolation enforced at the database layer" },
      { name: "Auth (JWT)", note: "Email + password sessions with auto-refresh" },
      { name: "Storage", note: "Private bucket `medical-records` scoped to auth.uid()" },
      { name: "Realtime", note: "Subscriptions push AI analysis results to the dashboard live" },
      { name: "Edge Functions (Deno)", note: "Server-side logic for AI analysis" },
    ],
  },
  {
    icon: Bot,
    title: "AI Layer",
    items: [
      { name: "Lovable AI Gateway", note: "Managed access to LLMs — no API keys to manage" },
      { name: "google/gemini-2.5-flash", note: "Multimodal model reading PDFs & images of medical records" },
      { name: "Structured output", note: "JSON schema for summary, findings, recommendations" },
    ],
  },
];

const features = [
  {
    icon: Shield,
    title: "Authentication & Sessions",
    stack: ["Supabase Auth", "React Context", "Zod", "React Router guards"],
    logic: [
      "Email/password sign-up hits `supabase.auth.signUp` with a Zod-validated payload; a Postgres trigger `handle_new_user` inserts a matching row into `public.profiles`.",
      "`AuthContext` subscribes to `onAuthStateChange` and keeps `session` + `user` in React state, exposing `signIn`, `signUp`, and `signOut`.",
      "`ProtectedRoute` reads the context; unauthenticated users are redirected to `/auth`. `/dashboard/*` is wrapped by it.",
      "Sessions are stored in localStorage (SPA client) with automatic JWT refresh.",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "User Dashboard",
    stack: ["React Router nested routes", "Framer Motion", "Supabase client", "TanStack Query"],
    logic: [
      "`/dashboard/*` renders a shared shell (`DashboardSidebar` + `DashboardHeader`) and swaps sub-views via nested `<Routes>`.",
      "Overview, Bookings, Profile, Messages, CareCard and Settings are separate view components under `src/components/dashboard/views/`.",
      "Data is fetched per view using the Supabase client, filtered by `auth.uid()` via RLS — no server-side filtering is needed in the query.",
    ],
  },
  {
    icon: FileText,
    title: "Medical Records + AI Analysis",
    stack: ["Supabase Storage", "Postgres", "Realtime", "Edge Function", "Gemini 2.5 Flash"],
    logic: [
      "User selects a file. The client uploads it to the private `medical-records` bucket at path `${user.id}/${uuid}.${ext}` and inserts a row into `public.medical_records` with status `processing`.",
      "The client invokes the `analyze-medical-record` edge function with the record id. The function creates a signed URL for the file and sends it to the Lovable AI Gateway using `google/gemini-2.5-flash` with a JSON schema (record_type, summary, key_findings[], recommendations[]).",
      "The function writes the structured result back and flips status to `complete` (or `failed` on error).",
      "The UI is subscribed via Supabase Realtime, so the record card updates automatically without a refresh — the most recent completed record auto-expands.",
    ],
  },
  {
    icon: Search,
    title: "Treatment Catalog, Search & Filters",
    stack: ["Static dataset", "Client-side filtering", "URL state", "Fuzzy match"],
    logic: [
      "The catalog lives in `src/data/mockData.ts` (25+ curated treatments). Filters (specialty, country, price range) are derived dynamically from the dataset so new entries appear automatically.",
      "`QuickSearchModal` runs a case-insensitive substring match across name, specialty, provider, city, country and description.",
      "The `/treatments` page composes filters with a `useMemo` reducer so filtering is O(n) per keystroke without extra renders.",
    ],
  },
  {
    icon: CreditCard,
    title: "Bookings & Inquiries",
    stack: ["Postgres", "RLS policies", "Zod", "sonner toasts"],
    logic: [
      "`Enquire Now` on a treatment detail page inserts into `public.bookings` with the current `auth.uid()`. RLS ensures users only see their own bookings.",
      "The homepage contact form inserts into `public.inquiries`. The RLS INSERT policy scopes rows: anonymous submissions must have `user_id = NULL`; authenticated ones must match `auth.uid()`.",
      "Both forms are Zod-validated client-side and surface success/error via toast.",
    ],
  },
  {
    icon: Sparkles,
    title: "AI Suggestion (Match Me)",
    stack: ["Lovable AI Gateway", "Structured prompts", "React Context"],
    logic: [
      "The quiz collects preferences (budget, interests, region, timing) into a single JSON object.",
      "That object is sent to Gemini 2.5 Flash with a system prompt asking it to score treatments from the catalog and return a ranked list with rationale.",
      "Results are rendered as recommendation cards linking directly into `/treatments/:slug`.",
    ],
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    stack: ["React Context", "localStorage", "Static FX table"],
    logic: [
      "`CurrencyContext` stores the selected currency and persists it to localStorage.",
      "Prices are stored in a base currency (GBP) and formatted on read using an FX rate map. Switching currency triggers a re-render but never a re-fetch.",
    ],
  },
  {
    icon: Zap,
    title: "Animations & 3D Effects",
    stack: ["Framer Motion", "CSS transforms", "pointer events"],
    logic: [
      "The MedXTrawell membership card uses pointer position to compute rotateX/rotateY on a `motion.div`, with a holographic gradient tied to the same values.",
      "The navbar 'spotlight pill' animates its `left`/`width` between hovered links using a spring transition.",
      "Page transitions use `AnimatePresence` keyed on `location.pathname`.",
    ],
  },
];

const dataFlow = [
  { step: "1", label: "User action", detail: "Click, upload, form submit in a React component" },
  { step: "2", label: "Client validation", detail: "Zod schema checks shape and constraints" },
  { step: "3", label: "Supabase client", detail: "Typed call to Postgres / Storage / Auth / Functions" },
  { step: "4", label: "RLS enforcement", detail: "Policies gate reads and writes by auth.uid()" },
  { step: "5", label: "Edge function (optional)", detail: "Server logic — e.g. call Gemini via AI Gateway" },
  { step: "6", label: "Realtime + query cache", detail: "UI updates via subscription or TanStack Query" },
];

export default function TechStack() {
  useEffect(() => {
    document.title = "Tech Stack & Architecture | MedXTrawell";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <Container>
          <div className="py-20 md:py-28 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-4">
                <Code2 className="h-3.5 w-3.5 mr-1.5" />
                Under the hood
              </Badge>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                How MedXTrawell is Built
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A transparent breakdown of the technology, logic, and architecture powering
                every feature — from authentication to AI-driven medical record analysis.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stack layers */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">The Stack</h2>
            <p className="text-muted-foreground">Three layers, one type-safe pipeline.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {stackLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground">{layer.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {layer.items.map((it) => (
                      <li key={it.name}>
                        <div className="flex items-center gap-2">
                          <Package className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-sm font-semibold text-foreground">{it.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-5.5 pl-4 leading-relaxed">
                          {it.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Feature-by-feature */}
      <section className="py-16 md:py-20 bg-muted/30 border-y border-border/40">
        <Container>
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Feature × Technology
            </h2>
            <p className="text-muted-foreground">
              Each capability, the exact tech behind it, and the logic that ties it together.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.article
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
                  className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground">{f.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {f.stack.map((s) => (
                      <Badge key={s} variant="secondary" className="text-[11px]">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <ol className="space-y-2.5">
                    {f.logic.map((line, idx) => (
                      <li key={idx} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ol>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Data flow */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              Anatomy of a Request
            </h2>
            <p className="text-muted-foreground">
              What happens from click to database, every time.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {dataFlow.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm relative"
              >
                <div className="text-[11px] font-bold text-primary mb-1">STEP {s.step}</div>
                <div className="font-semibold text-foreground text-sm mb-1.5">{s.label}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.detail}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Security note */}
      <section className="pb-20">
        <Container>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                  Security by default
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every table in the <code className="text-xs bg-muted px-1.5 py-0.5 rounded">public</code> schema
                  has Row Level Security enabled and explicit GRANTs. Roles are stored in a
                  separate table and checked via a <code className="text-xs bg-muted px-1.5 py-0.5 rounded">SECURITY DEFINER</code> function
                  to prevent recursive policy issues and privilege escalation. Medical records live
                  in a private storage bucket scoped to <code className="text-xs bg-muted px-1.5 py-0.5 rounded">auth.uid()</code>,
                  and inquiries validate ownership at insert time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
