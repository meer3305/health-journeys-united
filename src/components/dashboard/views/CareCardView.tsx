import { motion } from "framer-motion";
import { MedXTrawellCard3D } from "@/components/MedXTrawellCard3D";
import { virtualCardFeatures } from "@/data/mockData";
import { Check, Shield, CreditCard } from "lucide-react";

export function CareCardView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl font-bold">My Care Card</h2>
        <p className="text-sm text-muted-foreground">Your digital health passport for seamless medical travel</p>
      </div>

      <div className="flex justify-center">
        <MedXTrawellCard3D holderName="JAMES WILSON" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-lg font-semibold">Card Benefits</h3>
          </div>
          <ul className="space-y-3">
            {virtualCardFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-serif text-lg font-semibold">Card Details</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Card Number", value: "MV-2026-0847-JW" },
              { label: "Member Since", value: "January 2026" },
              { label: "Status", value: "Premium Active", badge: true },
              { label: "Valid Until", value: "December 2027" },
              { label: "Tier", value: "Gold" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                {item.badge ? (
                  <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">{item.value}</span>
                ) : (
                  <span className="text-sm font-medium">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
