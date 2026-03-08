import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { CareCardWidget } from "@/components/dashboard/CareCardWidget";
import { HealthJourneyTimeline } from "@/components/dashboard/HealthJourneyTimeline";
import { CoordinatorCard } from "@/components/dashboard/CoordinatorCard";
import { MedicalRecordsUpload } from "@/components/dashboard/MedicalRecordsUpload";
import { treatments, wellnessPrograms } from "@/data/mockData";
import { bookings } from "@/data/dashboardData";
import { Sparkles, Clock, TrendingUp, Calendar, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function OverviewView() {
  const upcomingBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "pending");

  return (
    <>
      {/* Welcome banner */}
      <motion.div {...fadeUp} className="rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-teal-600 p-6 sm:p-8 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">Welcome back, James! 👋</h1>
          <p className="mt-2 text-sm sm:text-base opacity-85">Your health journey is 60% complete. Let's keep going.</p>
          <div className="mt-5 flex flex-wrap gap-4">
            {[
              { icon: Calendar, label: "Upcoming", value: `${upcomingBookings.length} Bookings` },
              { icon: Heart, label: "Saved", value: "3 Items" },
              { icon: TrendingUp, label: "Match Score", value: "95%" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 rounded-xl bg-white/15 backdrop-blur-sm px-4 py-2">
                <stat.icon className="h-4 w-4" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider opacity-70">{stat.label}</p>
                  <p className="text-sm font-bold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Find Treatment", href: "/treatments", emoji: "🔍" },
          { label: "My Bookings", href: "/dashboard/bookings", emoji: "📅" },
          { label: "Upload Records", href: "#records", emoji: "📄" },
          { label: "Talk to Coordinator", href: "#coordinator", emoji: "💬" },
        ].map((action) => (
          <Link
            key={action.label}
            to={action.href}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <span className="text-xl">{action.emoji}</span>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">{action.label}</span>
          </Link>
        ))}
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recommendations */}
          <motion.div {...fadeUp} transition={{ delay: 0.15 }} className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold">AI-Powered Recommendations</h3>
                  <p className="text-xs text-muted-foreground">Based on your health profile</p>
                </div>
              </div>
              <Link to="/dashboard/recommendations" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                View All <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {treatments.slice(0, 2).map((t) => (
                <RecommendationCard key={t.id} title={t.name} provider={t.provider}
                  location={`${t.city}, ${t.country}`} price={t.price} currency={t.currency}
                  rating={t.rating} image={t.image} href={`/treatments/${t.slug}`}
                  matchScore={Math.floor(Math.random() * 10 + 90)} />
              ))}
            </div>
          </motion.div>

          {/* Upcoming Bookings */}
          {upcomingBookings.length > 0 && (
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg font-semibold">Upcoming Bookings</h3>
                <Link to="/dashboard/bookings" className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  View All <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              {upcomingBookings.map((b) => (
                <div key={b.id} className="flex items-center gap-4 rounded-xl border border-border p-3 mb-2 last:mb-0">
                  <img src={b.image} alt={b.treatment} className="h-16 w-16 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{b.treatment}</p>
                    <p className="text-xs text-muted-foreground">{b.provider} · {b.location}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(b.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${b.status === "confirmed" ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"}`}>
                    {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Medical Records Upload */}
          <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
            <MedicalRecordsUpload />
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <HealthJourneyTimeline />
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
            <CareCardWidget />
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.25 }}>
            <CoordinatorCard />
          </motion.div>
        </div>
      </div>
    </>
  );
}
