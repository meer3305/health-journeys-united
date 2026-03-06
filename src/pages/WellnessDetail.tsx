import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { wellnessPrograms } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Check } from "lucide-react";
import { useState } from "react";

const WellnessDetail = () => {
  const { slug } = useParams();
  const program = wellnessPrograms.find((p) => p.slug === slug) || wellnessPrograms[0];
  const [enquirySent, setEnquirySent] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px]">
        <img src={program.image} alt={program.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-8">
          <span className="inline-block rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-accent-foreground">
            {program.type}
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold text-background sm:text-4xl">{program.name}</h1>
          <div className="mt-3 flex items-center gap-4 text-sm text-background/70">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{program.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{program.duration}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-current text-accent" />{program.rating} ({program.reviewCount} reviews)</span>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <h2 className="font-serif text-2xl font-semibold">About This Program</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">{program.description}</p>

              <h3 className="mt-10 font-serif text-xl font-semibold">What's Included</h3>
              <ul className="mt-4 space-y-3">
                {program.included.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-serif text-xl font-semibold">Daily Schedule</h3>
              <div className="mt-4 space-y-3">
                {["06:30 — Sunrise yoga & meditation", "08:00 — Healthy breakfast", "09:30 — Morning therapy session", "12:00 — Nutritious lunch", "14:00 — Afternoon activity / free time", "16:00 — Spa treatment", "18:30 — Evening meditation", "19:30 — Dinner & social time"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing card */}
            <div className="w-full lg:w-80">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-lg">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="mt-1 font-serif text-3xl font-bold text-primary">{program.currency}{program.price.toLocaleString()}</p>
                <p className="mt-1 text-xs text-muted-foreground">per person · {program.duration}</p>
                
                {!enquirySent ? (
                  <>
                    <Button className="mt-6 w-full" size="lg" onClick={() => setEnquirySent(true)}>
                      Book This Program
                    </Button>
                    <Button variant="outline" className="mt-3 w-full" size="lg" asChild>
                      <Link to="/signup">Get More Info</Link>
                    </Button>
                  </>
                ) : (
                  <div className="mt-6 rounded-lg bg-primary/10 p-4 text-center">
                    <Check className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-2 text-sm font-medium text-primary">Booking Request Sent!</p>
                    <p className="mt-1 text-xs text-muted-foreground">We'll confirm availability within 24 hours.</p>
                  </div>
                )}

                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <p>✓ Free cancellation up to 7 days before</p>
                  <p>✓ Small group sizes (max 12)</p>
                  <p>✓ All meals included</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default WellnessDetail;
