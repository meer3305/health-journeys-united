import { motion } from "framer-motion";
import { ShieldCheck, Award, BadgeCheck, Heart } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "JCI Accredited", desc: "International hospital standards" },
  { icon: Award, label: "ISO Certified", desc: "Quality management verified" },
  { icon: BadgeCheck, label: "Verified Provider", desc: "Background-checked & audited" },
  { icon: Heart, label: "Patient Safety", desc: "Guaranteed care protocols" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -2, boxShadow: "0 0 20px rgba(34,211,238,0.2)" }}
          className="flex items-center gap-3 rounded-2xl border border-accent/15 bg-card px-5 py-3 shadow-sm transition-all"
        >
          <b.icon className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">{b.label}</p>
            <p className="text-xs text-muted-foreground">{b.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
