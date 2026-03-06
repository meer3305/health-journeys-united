import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Shield, Globe, Heart, Users } from "lucide-react";

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

const About = () => {
  return (
    <div>
      <HeroSection
        title="About MediVoyage"
        subtitle="We're on a mission to make world-class healthcare accessible to everyone, everywhere."
        compact
      />

      {/* Mission */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold">Our Mission</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              MediVoyage was founded on a simple belief: everyone deserves access to the best healthcare, 
              no matter where they live. We connect patients with verified, accredited hospitals and wellness 
              providers across the globe — making medical travel safe, transparent, and affordable.
            </p>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 py-20">
        <Container>
          <SectionHeader title="How the Platform Works" subtitle="A seamless journey from discovery to recovery" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="py-20">
        <Container>
          <SectionHeader title="Meet the Team" subtitle="Healthcare and technology leaders building the future of medical travel" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <span className="font-serif text-xl font-bold text-primary">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h4 className="mt-4 font-serif text-base font-semibold">{member.name}</h4>
                <p className="text-sm text-accent">{member.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust & accreditation */}
      <section className="bg-primary py-16">
        <Container>
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground">Trust & Accreditation</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/70">
              All providers on MediVoyage undergo rigorous vetting. We only work with JCI-accredited, 
              ISO-certified, or nationally recognised healthcare facilities.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              {["JCI Accredited", "ISO 9001", "WHO Standards", "TEMOS Certified"].map((badge) => (
                <div key={badge} className="rounded-lg border border-primary-foreground/20 px-6 py-3">
                  <p className="text-sm font-medium text-primary-foreground">{badge}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
