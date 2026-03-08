import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Award, Calendar, Stethoscope, GraduationCap, ArrowLeft, Phone,
  MessageCircle, Star, CheckCircle2, BookOpen, ShieldCheck, HeartPulse,
  Video, Clock
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.2 } }),
};

const doctors: Record<string, any> = {
  "mehmet-kaya": {
    name: "Dr. Mehmet Kaya",
    specialty: "Orthopedic Surgeon",
    subspecialties: ["Joint Replacement", "Sports Medicine", "Minimally Invasive Surgery"],
    hospital: "Istanbul Health Centre",
    hospitalSlug: "istanbul-health-centre",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800",
    experience: 20,
    surgeries: 2300,
    rating: 4.9,
    reviewCount: 312,
    languages: ["English", "Turkish", "German"],
    consultationFee: 150,
    bio: "Dr. Mehmet Kaya is one of Turkey's most respected orthopedic surgeons, specialising in total joint replacement and sports medicine. With over 20 years of clinical experience and 2,300+ successful surgeries, he is internationally recognised for his expertise in minimally invasive robotic-assisted techniques. Dr. Kaya trained at Istanbul University and completed advanced fellowships at Johns Hopkins Hospital and Imperial College London, bringing a global perspective to patient care.",
    philosophy: "I believe every patient deserves personalised care tailored to their unique anatomy and lifestyle. My approach combines advanced robotic surgery with proven rehabilitation protocols to deliver the best possible outcomes — helping patients return to the activities they love.",
    education: [
      { degree: "MD", institution: "Istanbul University Medical School", year: "2004" },
      { degree: "Fellowship in Joint Replacement", institution: "Johns Hopkins Hospital, USA", year: "2008" },
      { degree: "MSc Orthopaedic Surgery", institution: "Imperial College London", year: "2006" },
    ],
    certifications: [
      "Turkish Board of Orthopaedics & Traumatology",
      "European Board of Orthopaedics & Traumatology (EBOT)",
      "AO Trauma Fellowship — Advanced Fracture Care",
      "Robotic Joint Replacement Certification (MAKO)",
    ],
    specialties: [
      "Total Knee Replacement",
      "Total Hip Replacement",
      "Partial Knee Replacement",
      "ACL Reconstruction",
      "Rotator Cuff Repair",
      "Sports Injury Management",
    ],
    publications: 34,
    awards: [
      "Best Orthopaedic Surgeon — Turkish Medical Awards 2022",
      "Excellence in Patient Care — Istanbul Health Centre 2023",
      "International Fellowship Award — British Orthopaedic Association",
    ],
    reviews: [
      { name: "James W.", country: "🇬🇧 UK", rating: 5, text: "Dr. Kaya performed my total knee replacement. The results are incredible — I'm walking pain-free for the first time in years. His attention to detail is remarkable.", date: "November 2024" },
      { name: "Hans B.", country: "🇩🇪 Germany", rating: 5, text: "Flew to Istanbul specifically for Dr. Kaya's expertise in robotic knee surgery. Best decision I ever made. Professional, skilled, and genuinely caring.", date: "October 2024" },
      { name: "Claire D.", country: "🇫🇷 France", rating: 5, text: "Exceptional surgeon. He explained everything clearly, answered all my concerns, and the surgery went perfectly. Recovery has been smooth.", date: "September 2024" },
    ],
  },
  "ayse-demir": {
    name: "Dr. Ayse Demir",
    specialty: "Cosmetic Surgeon",
    subspecialties: ["Rhinoplasty", "Facelift", "Body Contouring"],
    hospital: "Istanbul Health Centre",
    hospitalSlug: "istanbul-health-centre",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
    experience: 15,
    surgeries: 1800,
    rating: 4.8,
    reviewCount: 245,
    languages: ["English", "Turkish"],
    consultationFee: 120,
    bio: "Dr. Ayse Demir is a board-certified cosmetic surgeon with 15 years of experience in aesthetic and reconstructive surgery. She is renowned for her natural-looking results and meticulous surgical technique. Her expertise in rhinoplasty has made her one of the most sought-after surgeons in Turkey.",
    philosophy: "Beauty is about harmony and balance. My goal is to enhance each patient's natural features rather than create an artificial appearance. I work closely with every patient to understand their vision and deliver results that boost confidence.",
    education: [
      { degree: "MD", institution: "Ankara University Medical School", year: "2009" },
      { degree: "Residency in Plastic Surgery", institution: "Hacettepe University", year: "2014" },
      { degree: "Fellowship in Aesthetic Surgery", institution: "University of Milan, Italy", year: "2016" },
    ],
    certifications: [
      "Turkish Board of Plastic Surgery",
      "European Board of Plastic Surgery (EBOPRAS)",
      "ISAPS Member (International Society of Aesthetic Plastic Surgery)",
    ],
    specialties: ["Rhinoplasty", "Facelift", "Blepharoplasty", "Liposuction", "Breast Augmentation", "Body Contouring"],
    publications: 18,
    awards: [
      "Top Rhinoplasty Surgeon — RealSelf 2023",
      "Excellence in Aesthetic Surgery — Turkish Plastic Surgery Society",
    ],
    reviews: [
      { name: "Emily R.", country: "🇬🇧 UK", rating: 5, text: "My rhinoplasty results are absolutely beautiful. Dr. Demir understood exactly what I wanted and delivered perfection.", date: "October 2024" },
      { name: "Maria G.", country: "🇪🇸 Spain", rating: 5, text: "I travelled from Spain for my procedure and it was worth every mile. Dr. Demir is a true artist.", date: "September 2024" },
    ],
  },
  "priya-sharma": {
    name: "Dr. Priya Sharma",
    specialty: "Cardiac Surgeon",
    subspecialties: ["Coronary Bypass", "Valve Replacement", "Minimally Invasive Cardiac Surgery"],
    hospital: "Apollo Hospital Delhi",
    hospitalSlug: "apollo-hospital-delhi",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
    experience: 25,
    surgeries: 4200,
    rating: 4.9,
    reviewCount: 389,
    languages: ["English", "Hindi", "Tamil"],
    consultationFee: 200,
    bio: "Dr. Priya Sharma is a pioneering cardiac surgeon with 25 years of experience and over 4,200 successful cardiac procedures. She is one of India's foremost experts in minimally invasive cardiac surgery and complex valve repair. Her work has been published in leading international journals and she regularly speaks at global cardiology conferences.",
    philosophy: "The heart is more than an organ — it's what gives life its rhythm. I approach each surgery with the precision it demands and the compassion every patient deserves. My commitment is to provide world-class cardiac care that's accessible to patients from everywhere.",
    education: [
      { degree: "MBBS", institution: "AIIMS New Delhi", year: "1999" },
      { degree: "MCh Cardiothoracic Surgery", institution: "AIIMS New Delhi", year: "2005" },
      { degree: "Fellowship in Minimally Invasive Cardiac Surgery", institution: "Cleveland Clinic, USA", year: "2007" },
    ],
    certifications: [
      "National Board of Cardiothoracic Surgery — India",
      "Fellow of the Royal College of Surgeons (FRCS)",
      "Society of Thoracic Surgeons (STS) Member",
    ],
    specialties: ["CABG (Bypass Surgery)", "Mitral Valve Repair", "Aortic Valve Replacement", "TAVR", "Heart Failure Surgery", "Pediatric Cardiac Surgery"],
    publications: 67,
    awards: [
      "Padma Shri Nominee — Government of India 2023",
      "Best Cardiac Surgeon — India Healthcare Awards 2022",
      "Lifetime Achievement — Indian Association of Cardiovascular Surgery",
    ],
    reviews: [
      { name: "David H.", country: "🇬🇧 UK", rating: 5, text: "Dr. Sharma saved my life. Her skill and compassion during my bypass surgery were extraordinary. The entire team at Apollo was outstanding.", date: "October 2024" },
      { name: "Robert K.", country: "🇺🇸 USA", rating: 5, text: "Flew from Houston for my valve replacement. Dr. Sharma's expertise is on par with the best surgeons in the world, at a fraction of the cost.", date: "September 2024" },
    ],
  },
};

const defaultDoc = doctors["mehmet-kaya"];

const DoctorProfile = () => {
  const { slug } = useParams();
  const doc = doctors[slug || ""] || defaultDoc;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] border-b border-border py-12">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <Link to={`/providers/${doc.hospitalSlug}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to {doc.hospital}
            </Link>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <img
                src={doc.image}
                alt={doc.name}
                className="h-32 w-32 rounded-2xl object-cover shadow-lg border-2 border-background"
                loading="eager"
              />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-serif text-3xl font-bold sm:text-4xl">{doc.name}</h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </span>
                </div>
                <p className="mt-1 text-lg text-accent font-medium">{doc.specialty}</p>
                <p className="text-sm text-muted-foreground">
                  <Link to={`/providers/${doc.hospitalSlug}`} className="hover:text-primary transition-colors">{doc.hospital}</Link>
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <strong>{doc.experience}</strong> years experience
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Stethoscope className="h-4 w-4 text-primary" />
                    <strong>{doc.surgeries.toLocaleString()}</strong> surgeries
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <strong>{doc.rating}</strong> ({doc.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <strong>{doc.publications}</strong> publications
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {doc.languages.map((l: string) => (
                    <span key={l} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">About</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed text-[15px]">{doc.bio}</p>
              {doc.philosophy && (
                <blockquote className="mt-6 border-l-4 border-accent/40 bg-accent/5 rounded-r-xl pl-5 pr-4 py-4">
                  <p className="text-sm italic text-muted-foreground leading-relaxed">"{doc.philosophy}"</p>
                  <cite className="mt-2 block text-xs font-semibold text-foreground not-italic">— {doc.name}</cite>
                </blockquote>
              )}
            </motion.section>

            {/* Specialties */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Specialties & Procedures</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {doc.specialties.map((s: string, i: number) => (
                  <motion.div key={s} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:shadow-sm hover:-translate-y-0.5">
                    <HeartPulse className="h-4 w-4 text-accent shrink-0" />
                    {s}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Education & Training</h2>
              <div className="mt-5 space-y-4">
                {doc.education.map((e: any) => (
                  <div key={e.institution} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{e.degree}</p>
                      <p className="text-sm text-muted-foreground">{e.institution}</p>
                      <p className="text-xs text-muted-foreground/70">{e.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Certifications */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Certifications</h2>
              <div className="mt-5 space-y-3">
                {doc.certifications.map((c: string) => (
                  <div key={c} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Award className="h-4 w-4 text-accent shrink-0" /> {c}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Awards */}
            {doc.awards && (
              <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
                <h2 className="font-serif text-2xl font-bold">Awards & Recognition</h2>
                <div className="mt-5 space-y-3">
                  {doc.awards.map((a: string) => (
                    <div key={a} className="flex items-center gap-3 rounded-xl bg-accent/5 border border-accent/10 p-3.5 text-sm">
                      <Star className="h-4 w-4 text-accent shrink-0 fill-accent" /> {a}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Reviews */}
            <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.2 }}>
              <h2 className="font-serif text-2xl font-bold">Patient Reviews</h2>
              <div className="mt-6 space-y-4">
                {doc.reviews.map((r: any, i: number) => (
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
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-sm font-semibold">{r.name} <span className="font-normal text-muted-foreground">{r.country}</span></p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-20 space-y-6">
              {/* Booking CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.2 }}
                className="rounded-2xl border border-accent/20 bg-card p-6 shadow-lg"
                style={{ boxShadow: "0 0 20px rgba(34,211,238,0.08)" }}
              >
                <h3 className="font-serif text-lg font-bold">Book a Consultation</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Schedule a video or in-person consultation with {doc.name}.
                </p>
                <p className="mt-3 text-2xl font-bold text-primary font-serif">£{doc.consultationFee} <span className="text-sm font-normal text-muted-foreground">/ session</span></p>
                <div className="mt-5 space-y-3">
                  <Button className="w-full gap-2 bg-primary hover:bg-primary/90 shadow-md transition-shadow hover:shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                    <Phone className="h-4 w-4" /> Book In-Person
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Video className="h-4 w-4" /> Video Consultation
                  </Button>
                  <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" /> Send Message
                  </Button>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  Usually responds within 24 hours
                </div>
              </motion.div>

              {/* Quick Stats */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  {[
                    { icon: Calendar, label: "Experience", value: `${doc.experience} years` },
                    { icon: Stethoscope, label: "Surgeries", value: doc.surgeries.toLocaleString() },
                    { icon: Star, label: "Rating", value: `${doc.rating} ⭐` },
                    { icon: BookOpen, label: "Publications", value: doc.publications },
                    { icon: Clock, label: "Response Time", value: "< 24 hrs" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-primary shrink-0" />
                      <div className="flex flex-1 justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-semibold">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subspecialties */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Focus Areas</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {doc.subspecialties.map((s: string) => (
                    <span key={s} className="rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">{s}</span>
                  ))}
                </div>
              </div>

              {/* Hospital Link */}
              <Link to={`/providers/${doc.hospitalSlug}`}
                className="block rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Practices at</p>
                <p className="mt-1 font-serif text-lg font-bold text-foreground">{doc.hospital}</p>
                <p className="mt-1 text-xs text-primary font-medium">View hospital profile →</p>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DoctorProfile;
