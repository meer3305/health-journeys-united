import { motion } from "framer-motion";
import { Activity } from "lucide-react";

interface RecoveryStage {
  period: string;
  label: string;
  description: string;
  progress: number; // 0-100
}

interface RecoveryTimelineProps {
  stages?: RecoveryStage[];
  className?: string;
}

const defaultStages: RecoveryStage[] = [
  { period: "Day 1–2", label: "Hospital Stay", description: "Post-op monitoring, pain management, and initial recovery under medical supervision.", progress: 15 },
  { period: "Week 1", label: "Limited Mobility", description: "Rest at hotel with daily medical check-ins. Light walking encouraged. Avoid strenuous activity.", progress: 30 },
  { period: "Week 2–3", label: "Gradual Improvement", description: "Reduced swelling and pain. Short walks and light stretching permitted. Follow-up examination.", progress: 55 },
  { period: "Week 3–4", label: "Light Activity", description: "Return to daily routines. Light exercise permitted. Most patients can return to desk work.", progress: 75 },
  { period: "Week 6", label: "Near Full Recovery", description: "Resume most activities including moderate exercise. Final follow-up with surgeon.", progress: 90 },
  { period: "Month 3", label: "Full Recovery", description: "Complete healing achieved. Full physical activity permitted. Long-term results visible.", progress: 100 },
];

const getProgressColor = (progress: number) => {
  if (progress <= 25) return "from-destructive/70 to-destructive/50";
  if (progress <= 50) return "from-secondary to-secondary/70";
  if (progress <= 75) return "from-accent to-accent/70";
  return "from-primary to-primary/70";
};

const getProgressBg = (progress: number) => {
  if (progress <= 25) return "bg-destructive/10 text-destructive";
  if (progress <= 50) return "bg-secondary/10 text-secondary";
  if (progress <= 75) return "bg-accent/10 text-accent";
  return "bg-primary/10 text-primary";
};

export function RecoveryTimeline({ stages = defaultStages, className = "" }: RecoveryTimelineProps) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Activity className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-card-foreground">Recovery Timeline</h3>
          <p className="text-xs text-muted-foreground">What to expect after your treatment</p>
        </div>
      </div>

      <div className="space-y-5">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.period}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-start gap-4">
              {/* Period badge */}
              <div className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold ${getProgressBg(stage.progress)}`}>
                {stage.period}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground">{stage.label}</h4>
                <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{stage.description}</p>
                {/* Progress bar */}
                <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(stage.progress)}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stage.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground text-right">{stage.progress}% recovered</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
