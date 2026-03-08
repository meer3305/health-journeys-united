import { useState, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { Check, Upload, Globe, BadgeCheck, Users, TrendingUp, ArrowRight } from "lucide-react";
import { partnerBenefits, currentPartners } from "@/data/mockData";
import { motion } from "framer-motion";
import { PartnerApplicationModal } from "@/components/PartnerApplicationModal";

const benefitIcons: Record<string, any> = { globe: Globe, badge: BadgeCheck, users: Users, trending: TrendingUp };

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

function Glass3DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5,
    });
  };

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setRot({ x: 0, y: 0 }); }}
        animate={{ rotateX: rot.x, rotateY: rot.y, scale: hov ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className={`relative overflow-hidden rounded-2xl border border-white/20 shadow-xl ${className}`}
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        }}
      >
        {hov && (
          <div className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(circle at ${50 + rot.y * 4}% ${50 + rot.x * 4}%, rgba(255,255,255,0.5) 0%, transparent 50%)` }} />
        )}
        <div style={{ transform: "translateZ(12px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

const PartnersApply = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <PartnerApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <HeroSection
        title="Join Our Provider Network"
        subtitle="Partner with MedXTrawell to reach thousands of international patients seeking world-class healthcare."
        compact
      />

      {/* Partner benefits */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-10 right-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <Container className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-serif text-3xl font-bold"
          >
            Why Partner With MedXTrawell?
          </motion.h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Join 500+ verified providers who trust us to connect them with international patients.</p>
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {partnerBenefits.map((b, i) => {
              const Icon = benefitIcons[b.icon] || Globe;
              return (
                <motion.div key={b.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Glass3DCard className="p-6 text-center h-full">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{ background: "linear-gradient(135deg, hsl(38 55% 52% / 0.15), hsl(38 55% 52% / 0.05))" }}
                    >
                      <Icon className="h-6 w-6 text-accent" />
                    </motion.div>
                    <h3 className="mt-4 font-serif text-lg font-semibold">{b.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                  </Glass3DCard>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Current partners */}
      <section className="py-20">
        <Container>
          <h2 className="text-center font-serif text-2xl font-bold">Trusted by Leading Providers</h2>
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {currentPartners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Glass3DCard className="p-5 text-center">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/20"
                    style={{ background: "linear-gradient(135deg, hsl(174 65% 28% / 0.15), hsl(174 65% 28% / 0.05))" }}
                  >
                    <span className="font-serif text-lg font-bold text-primary">{p.logo}</span>
                  </motion.div>
                  <p className="mt-3 text-xs font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.country}</p>
                </Glass3DCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Apply CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl font-bold sm:text-4xl">Ready to Join?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
              Complete the application and our partnerships team will review it within 3 business days. No listing fees for approved partners.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap justify-center gap-3">
                {["Review within 3 business days", "No listing fees", "Dedicated account manager", "Instant patient pipeline access"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    <Check className="h-3.5 w-3.5" /> {item}
                  </span>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8 inline-block">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-shadow hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                  onClick={() => setModalOpen(true)}
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default PartnersApply;
