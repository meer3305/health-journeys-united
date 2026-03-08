import { useState, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { Check, Upload, Globe, BadgeCheck, Users, TrendingUp } from "lucide-react";
import { partnerBenefits, currentPartners } from "@/data/mockData";
import { motion } from "framer-motion";

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
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Glass3DCard className="p-12 max-w-md text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, hsl(174 65% 28% / 0.2), hsl(174 65% 28% / 0.05))" }}
            >
              <Check className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="mt-6 font-serif text-3xl font-bold">Application Submitted!</h1>
            <p className="mt-4 text-muted-foreground">
              Thank you for applying to join the MedXTrawell provider network. Our partnerships team will review your application and contact you within 5 business days.
            </p>
            <Button className="mt-8" style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))", color: "white" }} asChild>
              <a href="/">Return to Home</a>
            </Button>
          </Glass3DCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
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

      {/* Application form */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Info side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="font-serif text-3xl font-bold">Apply to Join</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Complete the form and our partnerships team will review your application. We accept hospitals, clinics, dental practices, fertility centres, and wellness providers worldwide.
              </p>
              <div className="mt-8 space-y-4">
                {["Review within 5 business days", "No listing fees for approved partners", "Dedicated account manager", "Access to patient pipeline immediately"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: "linear-gradient(135deg, hsl(174 65% 28% / 0.15), hsl(174 65% 28% / 0.05))" }}>
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Glass3DCard className="p-8">
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Organisation Name</label>
                    <input type="text" required className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Istanbul Health Centre" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Country</label>
                      <input type="text" required className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Turkey" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Type</label>
                      <select className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                        <option>Hospital</option><option>Clinic</option><option>Wellness Centre</option><option>Dental Practice</option><option>Fertility Centre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Website</label>
                    <input type="url" className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="https://www.example.com" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Contact Name</label>
                      <input type="text" required className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Dr. Ali Yilmaz" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Email</label>
                      <input type="email" required className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="ali@hospital.com" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Phone</label>
                    <input type="tel" className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="+90 555 123 4567" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Specialties</label>
                    <input type="text" className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Orthopaedics, Dental, Cosmetic..." />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded accent-primary" />
                      JCI or equivalent accreditation
                    </label>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Documents (optional)</label>
                    <motion.div
                      whileHover={{ scale: 1.01, borderColor: "rgba(13, 110, 110, 0.3)" }}
                      className="flex items-center justify-center rounded-xl border-2 border-dashed border-white/20 px-6 py-8 text-center transition-all cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div>
                        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                        <p className="mt-2 text-xs text-muted-foreground">Upload accreditation certificates • PDF, PNG, JPG up to 10MB</p>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full border border-white/20 shadow-lg"
                      style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))", color: "white" }}
                    >
                      Submit Application
                    </Button>
                  </motion.div>
                </form>
              </Glass3DCard>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PartnersApply;
