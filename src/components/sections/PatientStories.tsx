import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Star, Quote } from "lucide-react";

const stories = [
  {
    name: "Sarah T.",
    country: "United Kingdom 🇬🇧",
    treatment: "Knee Replacement in Turkey",
    saved: "£10,800",
    quote: "Everything was organised for me — the hospital, transfers, and post-op care were incredible. I saved over £10,000 and received better care than I would have at home.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
  },
  {
    name: "David K.",
    country: "Australia 🇦🇺",
    treatment: "Hair Transplant in Turkey",
    saved: "£5,500",
    quote: "I was nervous about travelling for surgery, but the MedXTrawell team made it seamless. The results exceeded my expectations and the savings were incredible.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
  },
  {
    name: "Emma R.",
    country: "Germany 🇩🇪",
    treatment: "IVF Treatment in Greece",
    saved: "£3,500",
    quote: "After two failed IVF cycles at home, we decided to try Athens. The fertility centre was world-class, and we're now expecting our first child.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
  },
];

export function PatientStories() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-background" />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            ❤️ Patient Stories
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Real Patients, Real Results</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Hear from patients who transformed their health and saved thousands.</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition-all group"
            >
              <Quote className="h-8 w-8 text-accent/30 mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{story.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={story.avatar} alt={story.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-accent/20" loading="lazy" />
                <div>
                  <p className="font-semibold text-sm">{story.name}</p>
                  <p className="text-xs text-muted-foreground">{story.country}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: story.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{story.treatment}</span>
                <span className="font-bold text-neon-green">Saved {story.saved}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
