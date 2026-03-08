import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Clock, ArrowRight, Globe, TrendingDown, Heart,
  Stethoscope, Plane, Star, ChevronRight
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.2 } }),
};

const guides = [
  {
    slug: "knee-replacement-abroad",
    title: "Cost of Knee Replacement Abroad",
    excerpt: "Compare knee replacement costs across Turkey, India, Thailand and more. Learn how to save up to 80% without compromising on quality.",
    category: "Orthopaedics",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    icon: Stethoscope,
    featured: true,
    sections: [
      { heading: "Average Costs by Country", content: "Knee replacement surgery costs vary dramatically worldwide. In the UK, private knee replacement averages £14,000–£18,000. In the US, it can reach $30,000–$50,000. Compare this with Turkey (£3,200–£5,000), India (£3,500–£6,000), and Thailand (£5,000–£8,000). These prices typically include the procedure, hospital stay, physiotherapy, and follow-up care." },
      { heading: "What's Included in the Price?", content: "Most international hospitals offer all-inclusive packages: pre-operative assessment, the surgery itself, hospital stay (typically 3–5 nights), post-operative physiotherapy, medications, airport transfers, and follow-up consultations. Some premium packages also include hotel accommodation for recovery and a personal care coordinator." },
      { heading: "Choosing the Right Hospital", content: "Look for JCI-accredited hospitals with dedicated international patient departments. Check surgeon credentials, patient reviews, and success rates. Leading hospitals like Istanbul Health Centre and Apollo Hospital Delhi have performed thousands of knee replacements with outcomes comparable to top Western hospitals." },
      { heading: "Recovery & Travel Tips", content: "Plan for 7–10 days abroad. Most patients can fly home after 5–7 days. Choose accommodation near the hospital for follow-up appointments. Many hospitals offer recovery suites with nursing support. Start physiotherapy early and continue at home for optimal results." },
    ],
    savings: { uk: 14000, abroad: 3200, country: "Turkey" },
  },
  {
    slug: "best-countries-ivf",
    title: "Best Countries for IVF Treatment",
    excerpt: "A comprehensive guide to the top destinations for IVF treatment, including success rates, costs, and legal considerations.",
    category: "Fertility",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800",
    icon: Heart,
    featured: true,
    sections: [
      { heading: "Top IVF Destinations", content: "Greece, Czech Republic, Spain, and Turkey lead the world in IVF tourism. Greece offers some of the highest success rates in Europe (55–65% for women under 35) at prices 40–60% lower than the UK. The Czech Republic is renowned for its advanced embryology labs and donor egg programmes." },
      { heading: "Cost Comparison", content: "IVF in the UK costs £5,000–£8,000 per cycle (often excluding medications). In Greece, a full IVF cycle costs €3,000–€4,500. Czech Republic: €2,500–€4,000. Turkey: £2,500–£3,500. Spain: €4,000–€6,000. All prices typically include consultations, medications, monitoring, and the procedure." },
      { heading: "Legal Considerations", content: "IVF laws vary by country. Greece allows treatment for women up to 50 and permits egg donation and embryo freezing. Spain has one of the most liberal frameworks in Europe. Check donor anonymity laws, embryo storage regulations, and age limits before choosing your destination." },
      { heading: "What to Expect", content: "Most IVF journeys require 2 visits: an initial consultation (2–3 days) and the treatment cycle (10–14 days). Many clinics offer remote monitoring for the stimulation phase, reducing time abroad. Choose clinics with English-speaking staff and international patient coordinators." },
    ],
    savings: { uk: 7000, abroad: 2500, country: "Greece" },
  },
  {
    slug: "dental-implants-abroad",
    title: "Dental Implants Abroad: Complete Guide",
    excerpt: "Everything you need to know about getting dental implants abroad — from costs and quality to choosing the right clinic.",
    category: "Dentistry",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
    icon: Star,
    featured: false,
    sections: [
      { heading: "Why Get Dental Implants Abroad?", content: "A single dental implant in the UK costs £2,000–£3,000. A full mouth restoration can exceed £30,000. In Turkey, a single implant costs £400–£800, while a full set of dental implants starts from £3,000. The same Swiss and German implant brands used in the UK are available at a fraction of the price." },
      { heading: "Best Countries for Dental Tourism", content: "Turkey leads dental tourism globally, particularly Istanbul and Antalya. Hungary is Europe's dental capital with decades of experience. Thailand and India also offer excellent dental care. Look for clinics using premium implant brands like Straumann, Nobel Biocare, or Megagen." },
      { heading: "Treatment Timeline", content: "Most dental implant procedures require 2 visits. The first visit (3–5 days) includes assessment, extractions if needed, and implant placement. After 3–6 months of healing, a second visit (2–3 days) is needed for the final crowns. Some clinics offer same-day implants for suitable candidates." },
      { heading: "Quality & Safety", content: "Reputable clinics abroad use the same implant systems, sterilisation protocols, and digital technology as Western practices. Check for ISO certification, dentist credentials, and patient reviews. Many Turkish clinics have state-of-the-art CBCT scanners and CAD/CAM crown production on-site." },
    ],
    savings: { uk: 2500, abroad: 600, country: "Turkey" },
  },
  {
    slug: "hair-transplant-turkey",
    title: "Hair Transplant in Turkey: What to Know",
    excerpt: "Turkey performs 500,000+ hair transplants annually. Here's your complete guide to costs, clinics, and what to expect.",
    category: "Cosmetic",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800",
    icon: TrendingDown,
    featured: false,
    sections: [
      { heading: "Why Turkey for Hair Transplants?", content: "Turkey is the world's #1 destination for hair transplants, performing over 500,000 procedures annually. Istanbul alone has 350+ clinics specialising in FUE and DHI techniques. Prices are 70–80% lower than the UK, with all-inclusive VIP packages that include flights, hotels, and transfers." },
      { heading: "Costs Breakdown", content: "UK: £4,000–£15,000 depending on grafts. Turkey: £1,200–£2,500 for up to 5,000 grafts (FUE). Premium DHI packages cost £2,000–£3,500. Most packages include airport VIP transfers, 5-star hotel (2 nights), PRP treatment, medications, aftercare kit, and 12-month follow-up." },
    ],
    savings: { uk: 8000, abroad: 1500, country: "Turkey" },
  },
  {
    slug: "cardiac-surgery-india",
    title: "Cardiac Surgery in India: A Patient Guide",
    excerpt: "India's cardiac surgeons perform 250,000+ heart surgeries annually with outcomes matching global benchmarks.",
    category: "Cardiology",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=800",
    icon: Heart,
    featured: false,
    sections: [
      { heading: "Why India for Heart Surgery?", content: "India has some of the world's most experienced cardiac surgeons, many trained at top US and UK institutions. Hospitals like Apollo, Fortis, and Medanta perform complex procedures including CABG, valve replacements, and TAVR at 60–80% lower cost than Western countries." },
      { heading: "Cost Comparison", content: "Coronary bypass (CABG) — UK: £20,000–£30,000, India: £5,000–£8,000. Valve replacement — UK: £25,000+, India: £6,000–£10,000. These include pre-operative assessment, surgery, ICU stay, hospital stay, medications, and cardiac rehabilitation." },
    ],
    savings: { uk: 25000, abroad: 7000, country: "India" },
  },
];

const MedicalTravelGuides = () => {
  const featuredGuides = guides.filter((g) => g.featured);
  const otherGuides = guides.filter((g) => !g.featured);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-24">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 right-[10%] h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <Container className="relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/20">
              <BookOpen className="h-4 w-4" /> Medical Travel Guides
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">Your Guide to Healthcare Abroad</h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">Expert guides on costs, destinations, and what to expect when travelling for medical treatment.</p>
          </motion.div>
        </Container>
      </section>

      {/* Featured Guides */}
      <section className="py-20">
        <Container>
          <h2 className="font-serif text-2xl font-bold">Featured Guides</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {featuredGuides.map((guide, i) => (
              <motion.div key={guide.slug} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/guides/${guide.slug}`} className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <div className="relative h-56 overflow-hidden">
                    <img src={guide.image} alt={guide.title} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">{guide.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold group-hover:text-primary transition-colors">{guide.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{guide.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {guide.readTime}</span>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">Read Guide <ChevronRight className="h-4 w-4" /></span>
                    </div>
                    {guide.savings && (
                      <div className="mt-4 rounded-xl bg-green-50 border border-green-200/50 p-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Save up to</span>
                        <span className="font-serif text-lg font-bold text-green-600">£{(guide.savings.uk - guide.savings.abroad).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* All Guides */}
      <section className="py-20 bg-muted/30">
        <Container>
          <h2 className="font-serif text-2xl font-bold">All Guides</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide, i) => (
              <motion.div key={guide.slug} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/guides/${guide.slug}`} className="group block rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <guide.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-accent">{guide.category}</span>
                      <h3 className="mt-1 font-semibold text-sm group-hover:text-primary transition-colors leading-tight">{guide.title}</h3>
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{guide.excerpt}</p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {guide.readTime}</span>
                        {guide.savings && (
                          <span className="font-semibold text-green-600">Save £{(guide.savings.uk - guide.savings.abroad).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-12 text-center">
            <Globe className="mx-auto h-10 w-10 text-white/60" />
            <h2 className="mt-4 font-serif text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
            <p className="mt-3 mx-auto max-w-xl text-white/80">Get matched with verified providers worldwide. Free consultation, no obligation.</p>
            <Button size="lg" className="mt-6 gap-2 bg-accent text-accent-foreground shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]" asChild>
              <Link to="/treatments"><Plane className="h-4 w-4" /> Find My Treatment <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default MedicalTravelGuides;

export { guides };
