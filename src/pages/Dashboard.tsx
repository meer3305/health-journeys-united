import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { CareCardWidget } from "@/components/dashboard/CareCardWidget";
import { HealthJourneyTimeline } from "@/components/dashboard/HealthJourneyTimeline";
import { CoordinatorCard } from "@/components/dashboard/CoordinatorCard";
import { treatments, wellnessPrograms } from "@/data/mockData";
import { Sparkles, Clock } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 bg-muted/30 p-6">
          {/* Welcome banner */}
          <div className="rounded-xl bg-gradient-to-r from-primary to-teal-dark p-6 text-primary-foreground">
            <h1 className="font-serif text-2xl font-bold">Welcome back, James!</h1>
            <p className="mt-2 opacity-80">Your health journey is 60% complete. Let's keep going.</p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Left column */}
            <div className="space-y-6 lg:col-span-2">
              {/* AI Matching */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h3 className="font-serif text-lg font-semibold">AI-Powered Recommendations</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Based on your health profile, we've found these top matches for you.</p>
                <div className="mt-4 space-y-4">
                  {treatments.slice(0, 2).map((t) => (
                    <RecommendationCard
                      key={t.id}
                      title={t.name}
                      provider={t.provider}
                      location={`${t.city}, ${t.country}`}
                      price={t.price}
                      currency={t.currency}
                      rating={t.rating}
                      image={t.image}
                      href={`/treatments/${t.slug}`}
                      matchScore={Math.floor(Math.random() * 10 + 90)}
                    />
                  ))}
                  {wellnessPrograms.slice(0, 1).map((p) => (
                    <RecommendationCard
                      key={p.id}
                      title={p.name}
                      provider={p.location}
                      location={p.country}
                      price={p.price}
                      currency={p.currency}
                      rating={p.rating}
                      image={p.image}
                      href={`/wellness/${p.slug}`}
                      matchScore={Math.floor(Math.random() * 10 + 85)}
                    />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-serif text-lg font-semibold">Recent Activity</h3>
                <div className="mt-6 flex flex-col items-center py-8 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground/30" />
                  <p className="mt-3 text-sm text-muted-foreground">No recent activity yet.</p>
                  <p className="text-xs text-muted-foreground">Start exploring treatments and programs to see your activity here.</p>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <HealthJourneyTimeline />
              <CareCardWidget />
              <CoordinatorCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
