import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Shield, Globe, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const team = [
  { name: "Dr. Aylin Demir", role: "CEO & Co-Founder", bio: "Former NHS surgeon with 15 years in international healthcare." },
  { name: "Raj Patel", role: "CTO", bio: "Previously led engineering at a leading digital health platform." },
  { name: "Sarah Mitchell", role: "Head of Operations", bio: "10+ years managing medical tourism logistics across 3 continents." },
  { name: "Dr. Kenji Tanaka", role: "Chief Medical Officer", bio: "Board-certified physician specialising in global health standards." },
];

const values = [
  { icon: Shield, title: "Trust & Safety", description: "Every provider is verified, accredited, and continuously monitored for quality." },
  { icon: Globe, title: "Global Access", description: "We make world-class healthcare accessible regardless of geography or budget." },
  { icon: Heart, title: "Patient First", description: "Every decision we make starts with the patient experience." },
  { icon: Users, title: "End-to-End Care", description: "From consultation to recovery, we coordinate every detail of your journey." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

function Glass3DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6,
    });
  };

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => { setHovering(false); setRot({ x: 0, y: 0 }); }}
        animate={{ rotateX: rot.x, rotateY: rot.y, scale: hovering ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className={`relative overflow-hidden rounded-2xl border border-white/20 shadow-xl ${className}`}
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        }}
      >
        {hovering && (
          <div className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(circle at ${50 + rot.y * 4}% ${50 + rot.x * 4}%, rgba(255,255,255,0.5) 0%, transparent 50%)` }} />
        )}
        <div style={{ transform: "translateZ(15px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

const About = () => {
  return (
    <div>
      <HeroSection title="About MedXTrawell" subtitle="We're on a mission to make world-class healthcare accessible to everyone, everywhere." compact />

      {/* Mission */}
      <section className="py-28 relative overflow-hidden">
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-20 right-10 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Glass3DCard className="p-10">
              <h2 className="font-serif text-3xl font-bold">Our Mission</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                MedXTrawell was founded on a simple belief: everyone deserves access to the best healthcare,
                no matter where they live. We connect patients with verified, accredited hospitals and wellness
                providers across the globe — making medical travel safe, transparent, and affordable.
              </p>
            </Glass3DCard>
          </motion.div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3" />
        <Container className="relative">
          <SectionHeader title="How the Platform Works" subtitle="A seamless journey from discovery to recovery" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }, i) => (
              <motion.div key={title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Glass3DCard className="p-6 text-center h-full">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, hsl(38 55% 52% / 0.15) 0%, hsl(38 55% 52% / 0.05) 100%)" }}
                  >
                    <Icon className="h-6 w-6 text-accent" />
                  </motion.div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                </Glass3DCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-28 relative overflow-hidden">
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-accent/5 blur-3xl" />
        <Container className="relative">
          <SectionHeader title="Meet the Team" subtitle="Healthcare and technology leaders building the future of medical travel" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div key={member.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Glass3DCard className="p-6 text-center h-full">
                  <motion.div
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20"
                    style={{
                      background: "linear-gradient(135deg, hsl(174 65% 28% / 0.25) 0%, hsl(174 65% 28% / 0.1) 100%)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <span className="font-serif text-xl font-bold text-primary">{member.name.split(" ").map((n) => n[0]).join("")}</span>
                  </motion.div>
                  <h4 className="mt-4 font-serif text-base font-semibold">{member.name}</h4>
                  <p className="text-sm text-accent font-medium">{member.role}</p>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                </Glass3DCard>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsl(174 65% 22%) 0%, hsl(174 65% 15%) 100%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(38_55%_52%/0.15),transparent_70%)]" />
        <Container className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-white drop-shadow-lg">Trust & Accreditation</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/60">
              All providers on MedXTrawell undergo rigorous vetting. We only work with JCI-accredited,
              ISO-certified, or nationally recognised healthcare facilities.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {["JCI Accredited", "ISO 9001", "WHO Standards", "TEMOS Certified"].map((badge, i) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="rounded-xl px-6 py-3 border border-white/20 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <p className="text-sm font-medium text-white">{badge}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default About;
