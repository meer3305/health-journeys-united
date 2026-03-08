import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { treatments, wellnessPrograms } from "@/data/mockData";

export function RecommendationsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold">AI Recommendations</h2>
          <p className="text-sm text-muted-foreground">Personalised matches based on your health profile and preferences</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Top Treatment Matches</h3>
        {treatments.slice(0, 4).map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <RecommendationCard
              title={t.name} provider={t.provider}
              location={`${t.city}, ${t.country}`} price={t.price} currency={t.currency}
              rating={t.rating} image={t.image} href={`/treatments/${t.slug}`}
              matchScore={Math.max(85, 99 - i * 3)}
            />
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Wellness Program Matches</h3>
        {wellnessPrograms.slice(0, 3).map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <RecommendationCard
              title={p.name} provider={p.location}
              location={p.country} price={p.price} currency={p.currency} rating={p.rating}
              image={p.image} href={`/wellness/${p.slug}`}
              matchScore={Math.max(80, 95 - i * 4)}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
