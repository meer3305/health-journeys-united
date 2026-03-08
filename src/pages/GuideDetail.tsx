import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ArrowRight, TrendingDown, BookOpen } from "lucide-react";
import { guides } from "./MedicalTravelGuides";

const GuideDetail = () => {
  const { slug } = useParams();
  const guide = guides.find((g) => g.slug === slug) || guides[0];
  const otherGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <img src={guide.image} alt={guide.title} className="h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <Container className="absolute bottom-0 left-0 right-0 pb-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            <Link to="/guides" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Guides
            </Link>
            <span className="inline-block rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground mb-3">{guide.category}</span>
            <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{guide.title}</h1>
            <div className="mt-3 flex items-center gap-4 text-white/70 text-sm">
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {guide.readTime}</span>
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> Medical Travel Guide</span>
            </div>
          </motion.div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed">{guide.excerpt}</motion.p>

            {guide.sections.map((section, i) => (
              <motion.div key={section.heading} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.2 }}>
                <h2 className="font-serif text-2xl font-bold">{section.heading}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed text-[15px]">{section.content}</p>
              </motion.div>
            ))}

            {/* Savings Highlight */}
            {guide.savings && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-50/50 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="h-5 w-5 text-green-600" />
                  <h3 className="font-serif text-xl font-bold text-green-800">Potential Savings</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">UK Price</p>
                    <p className="mt-1 font-serif text-2xl font-bold text-foreground">£{guide.savings.uk.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{guide.savings.country}</p>
                    <p className="mt-1 font-serif text-2xl font-bold text-primary">£{guide.savings.abroad.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">You Save</p>
                    <p className="mt-1 font-serif text-2xl font-bold text-green-600">£{(guide.savings.uk - guide.savings.abroad).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${((guide.savings.uk - guide.savings.abroad) / guide.savings.uk) * 100}%` }} />
                </div>
                <p className="mt-2 text-sm text-center text-green-700 font-medium">
                  Save up to {Math.round(((guide.savings.uk - guide.savings.abroad) / guide.savings.uk) * 100)}% compared to UK prices
                </p>
              </motion.div>
            )}

            {/* CTA */}
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-white">Ready to Get Started?</h3>
              <p className="mt-2 text-white/80 text-sm">Get a free quote from verified providers today.</p>
              <Button size="lg" className="mt-4 gap-2 bg-accent text-accent-foreground" asChild>
                <Link to="/treatments">Find Providers <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-20 space-y-6">
              <div className="rounded-2xl border border-accent/20 bg-card p-6 shadow-md" style={{ boxShadow: "0 0 16px rgba(34,211,238,0.08)" }}>
                <h3 className="font-serif text-lg font-bold">Get a Free Quote</h3>
                <p className="mt-2 text-sm text-muted-foreground">Compare prices from verified providers.</p>
                <Button className="mt-4 w-full bg-primary hover:bg-primary/90" asChild>
                  <Link to="/treatments">Browse Treatments</Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Related Guides</h3>
                <div className="space-y-3">
                  {otherGuides.map((g) => (
                    <Link key={g.slug} to={`/guides/${g.slug}`} className="group flex items-start gap-3 rounded-xl p-2 -mx-2 transition-colors hover:bg-muted/50">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <g.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors leading-tight">{g.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{g.readTime}</p>
                      </div>
                    </Link>
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

export default GuideDetail;
