import { motion } from "framer-motion";
import { Plane, BedDouble, Car, Stethoscope, ShieldCheck, Calculator } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CostItem {
  label: string;
  amount: number;
  icon: React.ElementType;
  included?: boolean;
}

interface CostBreakdownProps {
  treatmentName: string;
  treatmentCost: number;
  className?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

export function CostBreakdown({ treatmentName, treatmentCost, className = "" }: CostBreakdownProps) {
  const { formatPrice } = useCurrency();

  const costs: CostItem[] = [
    { label: treatmentName, amount: treatmentCost, icon: Stethoscope },
    { label: "Return flights (estimate)", amount: 450, icon: Plane },
    { label: "Hotel (7 nights)", amount: 350, icon: BedDouble },
    { label: "Airport transfers", amount: 0, icon: Car, included: true },
    { label: "Travel insurance", amount: 0, icon: ShieldCheck, included: true },
  ];

  const total = costs.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Calculator className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-serif text-lg font-semibold text-card-foreground">Estimated Total Cost</h3>
      </div>

      <div className="space-y-3">
        {costs.map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-foreground">{item.label}</span>
            </div>
            {item.included ? (
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                Included
              </span>
            ) : (
              <span className="text-sm font-medium text-foreground">{formatPrice(item.amount)}</span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex items-center justify-between">
          <span className="font-serif text-base font-bold text-foreground">Estimated Total</span>
          <span className="font-serif text-2xl font-bold text-primary">{formatPrice(total)}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          * Flights and hotel costs are estimates based on average prices. Actual costs may vary.
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-3 border border-primary/10">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">No hidden fees.</span>{" "}
          Your quoted treatment price is fixed and guaranteed.
        </p>
      </div>
    </div>
  );
}
