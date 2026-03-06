import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { HeroSection } from "@/components/sections/HeroSection";
import { Button } from "@/components/ui/button";
import { Check, Upload } from "lucide-react";

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
            Thank you for applying to join the MediVoyage provider network. Our partnerships team will review your application and contact you within 5 business days.
          </p>
          <Button className="mt-8" asChild>
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
        subtitle="Partner with MediVoyage to reach thousands of international patients seeking world-class healthcare."
        compact
      />
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl">
            <form
              className="space-y-6"
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            >
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
                    <option>Hospital</option>
                    <option>Clinic</option>
                    <option>Wellness Centre</option>
                    <option>Dental Practice</option>
                    <option>Fertility Centre</option>
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
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 px-6 py-10 text-center">
                  <div>
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Upload accreditation certificates or brochures</p>
                    <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full">Submit Application</Button>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PartnersApply;
