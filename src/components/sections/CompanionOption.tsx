import { useState } from "react";
import { motion } from "framer-motion";
import { Users, User, HelpCircle, Check } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CompanionOptionProps {
  treatmentCost: number;
  className?: string;
}

const companionOptions = [
  { id: "yes", label: "Yes", description: "I'll travel with a companion", icon: Users, extraCost: 600 },
  { id: "no", label: "No", description: "I'll travel alone", icon: User, extraCost: 0 },
  { id: "unsure", label: "Not sure yet", description: "I'll decide later", icon: HelpCircle, extraCost: 0 },
];

export function CompanionOption({ treatmentCost, className = "" }: CompanionOptionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const selectedOption = companionOptions.find((o) => o.id === selected);
  const companionHotel = 350;
  const companionFlight = 450;
  const companionTotal = selectedOption?.id === "yes" ? companionHotel + companionFlight : 0;
  const adjustedTotal = treatmentCost + 450 + 350 + companionTotal;

  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-base font-semibold text-card-foreground">Recovery Companion</h3>
          <p className="text-xs text-muted-foreground">Will someone travel with you?</p>
        </div>
      </div>

      <div className="space-y-2">
        {companionOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selected === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSelected(option.id)}
              className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
              {isSelected && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selected === "yes" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 overflow-hidden"
        >
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-2">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Companion Costs</p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Companion flight</span>
              <span className="font-medium text-foreground">{formatPrice(companionFlight)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Companion hotel (7 nights)</span>
              <span className="font-medium text-foreground">{formatPrice(companionHotel)}</span>
            </div>
            <div className="border-t border-primary/20 pt-2 flex justify-between">
              <span className="text-sm font-semibold text-foreground">Adjusted Total</span>
              <span className="font-serif text-lg font-bold text-primary">{formatPrice(adjustedTotal)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
