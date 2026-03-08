import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Star, MapPin, Award, Users, Calendar, ArrowLeft, Phone,
  MessageCircle, Building2, Stethoscope, ShieldCheck, Wifi,
  Bed, HeartPulse, Clock, CheckCircle2, Globe
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.2 } }),
};

const providers: Record<string, any> = {
  "istanbul-health-centre": {
    name: "Istanbul Health Centre",
    country: "Turkey",
    city: "Istanbul",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200",
    logo: "IHC",
    rating: 4.8,
    reviewCount: 580,
    established: 2005,
    beds: 500,
    internationalPatients: 15000,
    overview: "Istanbul Health Centre is a JCI-accredited multi-specialty hospital serving over 15,000 international patients annually. Located in the heart of Istanbul's prestigious Şişli district, it offers cutting-edge orthopaedic, cosmetic, dental, and bariatric procedures with state-of-the-art robotic surgery systems and dedicated international patient coordination.",
    accreditations: [
      { name: "JCI Accredited", icon: "shield" },
      { name: "ISO 9001:2015", icon: "shield" },
      { name: "Turkish Ministry of Health Certified", icon: "shield" },
      { name: "International Patient Department", icon: "globe" },
      { name: "TEMOS International Healthcare", icon: "shield" },
    ],
    specialties: ["Orthopaedics", "Cosmetic Surgery", "Dentistry", "Bariatric Surgery", "Cardiology", "Ophthalmology"],
    facilities: [
      { name: "500-bed capacity", icon: Bed },
      { name: "12 operating theatres", icon: Building2 },
      { name: "Advanced MRI & CT imaging", icon: HeartPulse },
      { name: "Private patient suites", icon: Bed },
      { name: "International patient lounge", icon: Globe },
      { name: "On-site pharmacy", icon: ShieldCheck },
      { name: "Free Wi-Fi throughout", icon: Wifi },
      { name: "24/7 multilingual staff", icon: Clock },
    ],
    doctors: [
      { slug: "mehmet-kaya", name: "Dr. Mehmet Kaya", specialty: "Orthopedic Surgeon", experience: 20, surgeries: 2300, education: "Istanbul University Medical School", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400" },
      { slug: "ayse-demir", name: "Dr. Ayse Demir", specialty: "Cosmetic Surgeon", experience: 15, surgeries: 1800, education: "Ankara University Medical School", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400" },
      { slug: "ali-yilmaz", name: "Dr. Ali Yilmaz", specialty: "Dental Surgeon", experience: 12, surgeries: 3500, education: "Hacettepe University", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400" },
      { slug: "elif-ozturk", name: "Dr. Elif Öztürk", specialty: "Bariatric Surgeon", experience: 18, surgeries: 2100, education: "Marmara University Medical School", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400" },
    ],
    reviews: [
      { name: "James W.", country: "🇬🇧 UK", rating: 5, text: "Outstanding care from start to finish. The orthopaedic team was world-class. My knee replacement was flawless and I saved over £10,000 compared to private treatment in the UK.", treatment: "Knee Replacement", date: "November 2024" },
      { name: "Sarah T.", country: "🇬🇧 UK", rating: 5, text: "I was nervous about travelling for surgery but the care coordinator made everything seamless. The hospital facilities are incredible — better than many private hospitals I've visited in London.", treatment: "Cosmetic Surgery", date: "October 2024" },
      { name: "Michael R.", country: "🇩🇪 Germany", rating: 5, text: "Very professional, modern facilities. Dr. Kaya explained everything clearly and the nursing staff were attentive 24/7. Would highly recommend to anyone considering treatment abroad.", treatment: "Hip Replacement", date: "September 2024" },
      { name: "Emma L.", country: "🇮🇪 Ireland", rating: 4, text: "Great experience overall. The international patient department handled all the logistics — transfers, hotel, follow-up appointments. My dental implants look amazing.", treatment: "Dental Implants", date: "August 2024" },
    ],
    coordinates: { lat: 41.0472, lng: 28.9872 },
  },
  "apollo-hospital-delhi": {
    name: "Apollo Hospital Delhi",
    country: "India",
    city: "New Delhi",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200",
    logo: "AHD",
    rating: 4.7,
    reviewCount: 420,
    established: 1996,
    beds: 710,
    internationalPatients: 22000,
    overview: "Apollo Hospital Delhi is one of India's premier multi-specialty hospitals and a flagship of the Apollo Hospitals Group. Renowned for cardiac surgery, oncology, and organ transplants, it attracts over 22,000 international patients annually with world-class medical infrastructure and competitive pricing.",
    accreditations: [
      { name: "JCI Accredited", icon: "shield" },
      { name: "NABH Accredited", icon: "shield" },
      { name: "ISO 9001:2015", icon: "shield" },
      { name: "Green OT Certification", icon: "shield" },
    ],
    specialties: ["Cardiology", "Oncology", "Orthopaedics", "Neurology", "Organ Transplant", "Nephrology"],
    facilities: [
      { name: "710-bed capacity", icon: Bed },
      { name: "16 operating theatres", icon: Building2 },
      { name: "Robotic surgery (Da Vinci)", icon: HeartPulse },
      { name: "PET-CT & CyberKnife", icon: HeartPulse },
      { name: "International lounge", icon: Globe },
      { name: "24/7 emergency", icon: Clock },
      { name: "Transplant centre", icon: ShieldCheck },
      { name: "Rehabilitation wing", icon: Bed },
    ],
    doctors: [
      { slug: "priya-sharma", name: "Dr. Priya Sharma", specialty: "Cardiac Surgeon", experience: 25, surgeries: 4200, education: "AIIMS New Delhi", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400" },
      { slug: "rajesh-gupta", name: "Dr. Rajesh Gupta", specialty: "Oncologist", experience: 22, surgeries: 3100, education: "CMC Vellore", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400" },
      { slug: "ananya-iyer", name: "Dr. Ananya Iyer", specialty: "Neurologist", experience: 18, surgeries: 1900, education: "JIPMER Pondicherry", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400" },
    ],
    reviews: [
      { name: "David H.", country: "🇬🇧 UK", rating: 5, text: "My cardiac bypass at Apollo was exceptional. Dr. Sharma and her team saved my life. The aftercare was thorough and compassionate.", treatment: "Cardiac Bypass", date: "October 2024" },
      { name: "Ahmed K.", country: "🇦🇪 UAE", rating: 5, text: "World-class oncology department. The treatment plan was comprehensive and the staff were incredibly supportive throughout my journey.", treatment: "Oncology", date: "September 2024" },
      { name: "Lisa M.", country: "🇺🇸 USA", rating: 4, text: "Excellent facilities and very competent doctors. The international patient department made travel arrangements seamless.", treatment: "Orthopaedics", date: "August 2024" },
    ],
    coordinates: { lat: 28.5672, lng: 77.2100 },
  },
  "bangkok-international-hospital": {
    name: "Bangkok International Hospital",
    country: "Thailand",
    city: "Bangkok",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200",
    logo: "BIH",
    rating: 4.6,
    reviewCount: 310,
    established: 2003,
    beds: 380,
    internationalPatients: 18000,
    overview: "Bangkok International Hospital is a leading medical tourism destination in Southeast Asia, offering premium healthcare services with Thai hospitality. Specialising in oncology, cosmetic procedures, and wellness programmes, it combines cutting-edge technology with a patient-centred approach.",
    accreditations: [
      { name: "JCI Accredited", icon: "shield" },
      { name: "Thai FDA Certified", icon: "shield" },
      { name: "HA Thailand", icon: "shield" },
      { name: "Medical Tourism Association", icon: "globe" },
    ],
    specialties: ["Oncology", "Cosmetic Surgery", "Wellness", "Dental", "Fertility", "Dermatology"],
    facilities: [
      { name: "380-bed capacity", icon: Bed },
      { name: "10 operating theatres", icon: Building2 },
      { name: "Proton therapy centre", icon: HeartPulse },
      { name: "VIP suites with city views", icon: Bed },
      { name: "Wellness spa centre", icon: Globe },
      { name: "Halal kitchen available", icon: ShieldCheck },
    ],
    doctors: [
      { slug: "somchai-lee", name: "Dr. Somchai Lee", specialty: "Oncologist", experience: 20, surgeries: 2800, education: "Chulalongkorn University", image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400" },
      { slug: "nari-wong", name: "Dr. Nari Wong", specialty: "Cosmetic Surgeon", experience: 16, surgeries: 2200, education: "Mahidol University", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400" },
    ],
    reviews: [
      { name: "Sophie B.", country: "🇦🇺 Australia", rating: 5, text: "The level of care and hospitality was extraordinary. My cosmetic procedure results exceeded all expectations.", treatment: "Cosmetic Surgery", date: "November 2024" },
      { name: "Chen W.", country: "🇨🇳 China", rating: 5, text: "Modern facilities and exceptional oncology team. Dr. Lee provided a comprehensive treatment plan.", treatment: "Oncology", date: "October 2024" },
    ],
    coordinates: { lat: 13.7563, lng: 100.5018 },
  },
};

const defaultProvider = providers["istanbul-health-centre"];

const ProviderProfile = () => {
  const { slug } = useParams();
  const provider = providers[slug || ""] || defaultProvider;

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <Container className="absolute bottom-0 left-0 right-0 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Link to="/treatments" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to treatments
            </Link>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-serif text-xl font-bold shadow-lg">
                {provider.logo}
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{provider.name}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {provider.city}, {provider.country}</span>
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {provider.rating} ({provider.reviewCount} reviews)</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Est. {provider.established}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Quick Stats Bar */}
      <section className="relative -mt-8 z-10 pb-6">
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: provider.beds, label: "Beds", icon: Bed },
              { value: `${provider.doctors.length}+`, label: "Specialists", icon: Stethoscope },
              { value: `${(provider.internationalPatients / 1000).toFixed(0)}K+`, label: "Int'l Patients/yr", icon: Users },
              { value: provider.rating, label: "Patient Rating", icon: Star },
            ].map((s, i) => (
              <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-4 text-center shadow-md">
                <s.icon className="mx-auto h-5 w-5 text-primary mb-2" />
                <p className="font-serif text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Hospital Overview</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-[15px]">{provider.overview}</p>
            </motion.section>

            {/* Accreditations */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Accreditations & Certifications</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {provider.accreditations.map((a: any) => (
                  <span key={a.name} className="inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:shadow-sm">
                    <ShieldCheck className="h-4 w-4" /> {a.name}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Treatment Specialties */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Treatment Specialties</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {provider.specialties.map((s: string, i: number) => (
                  <motion.div key={s} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <HeartPulse className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-sm font-medium">{s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Doctors */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Our Medical Team</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {provider.doctors.map((doc: any, i: number) => (
                  <motion.div
                    key={doc.name}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="h-16 w-16 rounded-xl object-cover shadow-sm"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground">{doc.name}</h3>
                        <p className="text-sm text-accent font-medium">{doc.specialty}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {doc.experience} yrs exp</span>
                          <span className="flex items-center gap-1"><Stethoscope className="h-3 w-3" /> {doc.surgeries.toLocaleString()} surgeries</span>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{doc.education}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="mt-4 w-full text-xs gap-1.5 hover:bg-primary/5 hover:text-primary hover:border-primary/30" asChild>
                      <Link to={`/doctors/${doc.slug}`}>View Full Profile <ArrowLeft className="h-3 w-3 rotate-180" /></Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Facilities */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Facilities & Amenities</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {provider.facilities.map((f: any) => (
                  <div key={f.name} className="flex items-center gap-3 rounded-xl bg-muted/40 p-3.5 text-sm text-muted-foreground">
                    <f.icon className="h-4 w-4 text-primary shrink-0" />
                    {f.name}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Reviews */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Patient Reviews</h2>
              <div className="mt-6 space-y-4">
                {provider.reviews.map((r: any, i: number) => (
                  <motion.div key={r.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">"{r.text}"</p>
                    <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                      <div>
                        <p className="text-sm font-semibold">{r.name}</p>
                        <p className="text-xs text-muted-foreground">{r.country}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{r.treatment}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Location Map */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Location</h2>
              <div className="mt-4 flex h-72 items-center justify-center rounded-2xl bg-gradient-to-br from-muted/60 to-muted/30 border border-border overflow-hidden relative">
                <div className="text-center text-muted-foreground">
                  <MapPin className="mx-auto h-10 w-10 mb-3 text-primary/40" />
                  <p className="font-medium">{provider.city}, {provider.country}</p>
                  <p className="text-xs mt-1">Interactive map coming soon</p>
                </div>
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className="rounded-2xl border border-accent/20 bg-card p-6 shadow-lg"
                style={{ boxShadow: "0 0 20px rgba(34,211,238,0.08)" }}
              >
                <h3 className="font-serif text-lg font-bold">Get a Free Quote</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Speak to our care team about treatment options at {provider.name}.
                </p>
                <div className="mt-5 space-y-3">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90 shadow-md transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                    <Phone className="h-4 w-4" /> Talk to Care Coordinator
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" /> Send Message
                  </Button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  Free consultation • No obligation
                </div>
              </motion.div>

              {/* Specialties */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Specialties</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {provider.specialties.map((s: string) => (
                    <span key={s} className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">{s}</span>
                  ))}
                </div>
              </div>

              {/* At a Glance */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">At a Glance</h3>
                <div className="mt-3 space-y-3 text-sm">
                  {[
                    { label: "Rating", value: `${provider.rating} ⭐` },
                    { label: "Reviews", value: provider.reviewCount.toLocaleString() },
                    { label: "Location", value: `${provider.city}, ${provider.country}` },
                    { label: "Established", value: provider.established },
                    { label: "Beds", value: provider.beds },
                    { label: "Doctors", value: `${provider.doctors.length}+` },
                    { label: "Int'l Patients/yr", value: `${(provider.internationalPatients / 1000).toFixed(0)}K+` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Signals */}
              <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Why Trust Us</h3>
                <div className="mt-3 space-y-2.5">
                  {["JCI accredited facility", "Dedicated international dept", "English-speaking staff", "Post-treatment follow-up", "Money-back guarantee"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
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
