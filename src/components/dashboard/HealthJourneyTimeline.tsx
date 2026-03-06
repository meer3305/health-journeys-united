import { Check, Circle } from "lucide-react";
import { journeySteps } from "@/data/mockData";

export function HealthJourneyTimeline() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-serif text-lg font-semibold">Your Health Journey</h3>
      <div className="mt-6 space-y-0">
        {journeySteps.map((step, i) => (
          <div key={step.id} className="flex gap-4">
            {/* Connector line + icon */}
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step.completed
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-border bg-background text-muted-foreground"
                }`}
              >
                {step.completed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              </div>
              {i < journeySteps.length - 1 && (
                <div className={`w-0.5 flex-1 min-h-[2rem] ${step.completed ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
            {/* Content */}
            <div className="pb-6">
              <p className={`text-sm font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}>
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
