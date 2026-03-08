import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, MapPin, Award, Users, Calendar, ArrowLeft, Phone, MessageCircle } from "lucide-react";

const providers: Record<string, any> = {
  "istanbul-health-centre": {
    name: "Istanbul Health Centre",
    country: "Turkey",
    city: "Istanbul",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200",
    rating: 4.8,
    reviewCount: 580,
    overview: "Istanbul Health Centre is a JCI-accredited multi-specialty hospital serving over 15,000 international patients annually. Located in the heart of Istanbul, it offers cutting-edge orthopaedic, cosmetic, and dental procedures.",
    accreditations: ["JCI Accredited", "ISO 9001:2015", "Turkish Ministry of Health Certified", "International Patient Department"],
    specialties: ["Orthopaedics", "Cosmetic Surgery", "Dentistry", "Bariatric Surgery"],
    facilities: ["500-bed capacity", "12 operating theatres", "Advanced MRI & CT imaging", "Private patient suites", "International patient lounge", "On-site pharmacy"],
    doctors: [
      { name: "Dr. Mehmet Kaya", specialty: "Orthopedic Surgeon", experience: 20, surgeries: 2300, education: "Istanbul University Medical School" },
      { name: "Dr. Ayse Demir", specialty: "Cosmetic Surgeon", experience: 15, surgeries: 1800, education: "Ankara University Medical School" },
      { name: "Dr. Ali Yilmaz", specialty: "Dental Surgeon", experience: 12, surgeries: 3500, education: "Hacettepe University" },
    ],
    reviews: [
      { name: "James W.", rating: 5, text: "Outstanding care from start to finish. The orthopaedic team was world-class.", date: "2024-11" },
      { name: "Sarah T.", rating: 5, text: "My knee replacement was flawless. Saved £10,000 compared to the UK.", date: "2024-10" },
      { name: "Michael R.", rating: 4, text: "Very professional, modern facilities. Would highly recommend.", date: "2024-09" },
    ],
  },
};

const defaultProvider = providers["istanbul-health-centre"];

const ProviderProfile = () => {
  const { slug } = useParams();
  const provider = providers[slug || ""] || defaultProvider;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-8">
          <Link to="/treatments" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to treatments
          </Link>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl">{provider.name}</h1>
          <div className="mt-2 flex items-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {provider.city}, {provider.country}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {provider.rating} ({provider.reviewCount} reviews)</span>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <h2 className="font-serif text-2xl font-bold">Hospital Overview</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{provider.overview}</p>
            </section>

            {/* Accreditations */}
            <section>
              <h2 className="font-serif text-2xl font-bold">Accreditations & Certifications</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {provider.accreditations.map((a: string) => (
                  <span key={a} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                    <Award className="h-4 w-4" /> {a}
                  </span>
                ))}
              </div>
            </section>

            {/* Doctors */}
            <section>
              <h2 className="font-serif text-2xl font-bold">Our Doctors</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {provider.doctors.map((doc: any, i: number) => (
                  <motion.div
                    key={doc.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-serif text-xl font-bold">
                      {doc.name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <h3 className="mt-3 font-semibold">{doc.name}</h3>
                    <p className="text-sm text-accent">{doc.specialty}</p>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                      <p>{doc.experience} years experience</p>
                      <p>{doc.surgeries.toLocaleString()} surgeries</p>
                      <p>{doc.education}</p>
                    </div>
                    <Button size="sm" variant="outline" className="mt-4 w-full text-xs" asChild>
                      <Link to={`/doctors/${doc.name.toLowerCase().replace(/\s+/g, "-").replace("dr.-", "")}`}>View Profile</Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Facilities */}
            <section>
              <h2 className="font-serif text-2xl font-bold">Facilities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {provider.facilities.map((f: string) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-accent" />
                    {f}
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="font-serif text-2xl font-bold">Patient Reviews</h2>
              <div className="mt-6 space-y-4">
                {provider.reviews.map((r: any) => (
                  <div key={r.name} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{r.text}"</p>
                    <p className="mt-2 text-xs font-medium">{r.name} • {r.date}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Map placeholder */}
            <section>
              <h2 className="font-serif text-2xl font-bold">Location</h2>
              <div className="mt-4 flex h-64 items-center justify-center rounded-2xl bg-muted border border-border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="mx-auto h-8 w-8 mb-2" />
                  <p className="text-sm">{provider.city}, {provider.country}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-20 space-y-6">
              <div className="rounded-2xl border border-accent/20 bg-card p-6 shadow-md" style={{ boxShadow: "0 0 20px rgba(34,211,238,0.1)" }}>
                <h3 className="font-serif text-lg font-bold">Get a Free Quote</h3>
                <p className="mt-2 text-sm text-muted-foreground">Speak to our care team about treatment options at {provider.name}.</p>
                <div className="mt-4 space-y-3">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                    <Phone className="h-4 w-4" /> Talk to Care Coordinator
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" /> Send Message
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Specialties</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {provider.specialties.map((s: string) => (
                    <span key={s} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{s}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">At a Glance</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Rating</span><span className="font-semibold">{provider.rating} ⭐</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Reviews</span><span className="font-semibold">{provider.reviewCount}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Location</span><span className="font-semibold">{provider.city}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Doctors</span><span className="font-semibold">{provider.doctors.length}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProviderProfile;
