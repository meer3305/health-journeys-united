import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Award, Calendar, Stethoscope, GraduationCap, ArrowLeft, Phone } from "lucide-react";

const doctors: Record<string, any> = {
  "mehmet-kaya": {
    name: "Dr. Mehmet Kaya",
    specialty: "Orthopedic Surgeon",
    hospital: "Istanbul Health Centre",
    hospitalSlug: "istanbul-health-centre",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800",
    experience: 20,
    surgeries: 2300,
    bio: "Dr. Mehmet Kaya is one of Turkey's leading orthopedic surgeons, specialising in joint replacement and sports medicine. With over 20 years of experience and 2,300+ successful surgeries, he is internationally recognised for his expertise in minimally invasive techniques.",
    education: ["MD — Istanbul University Medical School", "Fellowship — Johns Hopkins Hospital, USA", "MSc Orthopaedic Surgery — Imperial College London"],
    certifications: ["Turkish Board of Orthopaedics", "European Board of Orthopaedics & Traumatology", "AO Trauma Fellowship"],
    specialties: ["Total Knee Replacement", "Hip Replacement", "ACL Reconstruction", "Sports Medicine", "Minimally Invasive Surgery"],
  },
};

const defaultDoc = doctors["mehmet-kaya"];

const DoctorProfile = () => {
  const { slug } = useParams();
  const doc = doctors[slug || ""] || defaultDoc;

  return (
    <div>
      <Container className="py-12">
        <Link to={`/providers/${doc.hospitalSlug}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to {doc.hospital}
        </Link>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-6">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary font-serif text-3xl font-bold">
                {doc.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold">{doc.name}</h1>
                <p className="text-lg text-accent">{doc.specialty}</p>
                <p className="text-sm text-muted-foreground">{doc.hospital}</p>
              </div>
            </div>

            <section>
              <h2 className="font-serif text-xl font-bold">About</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{doc.bio}</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold">Specialties</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {doc.specialties.map((s: string) => (
                  <span key={s} className="rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium">{s}</span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold">Education</h2>
              <div className="mt-3 space-y-3">
                {doc.education.map((e: string) => (
                  <div key={e} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <GraduationCap className="h-4 w-4 text-primary shrink-0" /> {e}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold">Certifications</h2>
              <div className="mt-3 space-y-3">
                {doc.certifications.map((c: string) => (
                  <div key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Award className="h-4 w-4 text-accent shrink-0" /> {c}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-20 space-y-6">
              <div className="rounded-2xl border border-accent/20 bg-card p-6 shadow-md" style={{ boxShadow: "0 0 20px rgba(34,211,238,0.1)" }}>
                <h3 className="font-serif text-lg font-bold">Book a Consultation</h3>
                <p className="mt-2 text-sm text-muted-foreground">Schedule a video or in-person consultation with {doc.name}.</p>
                <Button className="mt-4 w-full gap-2 bg-primary hover:bg-primary/90">
                  <Phone className="h-4 w-4" /> Book Now
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div className="text-sm"><span className="font-semibold">{doc.experience} years</span> <span className="text-muted-foreground">experience</span></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    <div className="text-sm"><span className="font-semibold">{doc.surgeries.toLocaleString()}</span> <span className="text-muted-foreground">surgeries</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DoctorProfile;
