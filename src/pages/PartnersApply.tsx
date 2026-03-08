import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { Check, Upload, Globe, BadgeCheck, Users, TrendingUp } from "lucide-react";
import { partnerBenefits, currentPartners } from "@/data/mockData";

const benefitIcons: Record<string, any> = { globe: Globe, badge: BadgeCheck, users: Users, trending: TrendingUp };

const PartnersApply = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold">Application Submitted!</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for applying to join the MedXTrawell provider network. Our partnerships team will review your application and contact you within 5 business days.
          </p>
          <Button className="mt-8 bg-accent text-accent-foreground" asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
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
      <section className="py-20 bg-muted/30">
        <Container>
          <h2 className="text-center font-serif text-3xl font-bold">Why Partner With MedXTrawell?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Join 500+ verified providers who trust us to connect them with international patients.</p>
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {partnerBenefits.map((b) => {
              const Icon = benefitIcons[b.icon] || Globe;
              return (
                <div key={b.title} className="rounded-xl border border-border bg-card p-6 text-center shadow-sm">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Current partners */}
      <section className="py-16">
        <Container>
          <h2 className="text-center font-serif text-2xl font-bold">Trusted by Leading Providers</h2>
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {currentPartners.map((p) => (
              <div key={p.name} className="flex flex-col items-center rounded-xl border border-border bg-card p-5 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-serif text-lg font-bold text-primary">{p.logo}</span>
                </div>
                <p className="mt-3 text-xs font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.country}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Application form — side layout */}
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Info side */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-3xl font-bold">Apply to Join</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Complete the form and our partnerships team will review your application. We accept hospitals, clinics, dental practices, fertility centres, and wellness providers worldwide.
              </p>
              <div className="mt-8 space-y-4">
                {["Review within 5 business days", "No listing fees for approved partners", "Dedicated account manager", "Access to patient pipeline immediately"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Organisation Name</label>
                    <input type="text" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Istanbul Health Centre" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Country</label>
                      <input type="text" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Turkey" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Type</label>
                      <select className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Hospital</option><option>Clinic</option><option>Wellness Centre</option><option>Dental Practice</option><option>Fertility Centre</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Website</label>
                    <input type="url" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="https://www.example.com" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Contact Name</label>
                      <input type="text" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Dr. Ali Yilmaz" />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">Email</label>
                      <input type="email" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="ali@hospital.com" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Phone</label>
                    <input type="tel" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+90 555 123 4567" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Specialties</label>
                    <input type="text" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Orthopaedics, Dental, Cosmetic..." />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded accent-primary" />
                      JCI or equivalent accreditation
                    </label>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Documents (optional)</label>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center">
                      <div>
                        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                        <p className="mt-2 text-xs text-muted-foreground">Upload accreditation certificates • PDF, PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Submit Application</Button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PartnersApply;
