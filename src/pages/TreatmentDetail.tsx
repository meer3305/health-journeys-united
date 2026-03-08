import { useParams, Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { treatments, reviews } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, BadgeCheck, Check } from "lucide-react";
import { useState } from "react";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { useCurrency } from "@/contexts/CurrencyContext";

const tabs = ["Overview", "What's Included", "Provider", "Reviews", "Location"];

const TreatmentDetail = () => {
  const { slug } = useParams();
  const treatment = treatments.find((t) => t.slug === slug) || treatments[0];
  const [activeTab, setActiveTab] = useState("Overview");
  const [enquirySent, setEnquirySent] = useState(false);
  const { formatPrice } = useCurrency();

  return (
    <div>
      <section className="relative h-[45vh] min-h-[340px]">
        <img src={treatment.image} alt={treatment.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <Container className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="flex items-end justify-between">
            <div>
              {treatment.accredited && (
                <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-accent-foreground">
                  <BadgeCheck className="h-3 w-3" /> JCI Accredited
                </span>
              )}
              <h1 className="mt-2 font-serif text-3xl font-bold text-background sm:text-4xl">{treatment.name}</h1>
              <p className="mt-1 text-lg text-background/80">{treatment.provider}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-background/70">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{treatment.city}, {treatment.country}</span>
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-current text-accent" />{treatment.rating} ({treatment.reviewCount} reviews)</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{treatment.duration}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <div className="flex gap-1 overflow-x-auto border-b border-border">
                {tabs.map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab ? "border-b-2 border-accent text-accent" : "text-muted-foreground hover:text-foreground"
                    }`}>{tab}</button>
                ))}
              </div>
              <div className="mt-8">
                {activeTab === "Overview" && (
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">About This Treatment</h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{treatment.description}</p>
                    <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2">
                      {[
                        { label: "Specialty", value: treatment.specialty },
                        { label: "Duration", value: treatment.duration },
                        { label: "Location", value: `${treatment.city}, ${treatment.country}` },
                        { label: "Rating", value: `${treatment.rating} (${treatment.reviewCount} reviews)` },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl bg-muted/50 p-5">
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className="mt-1 font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "What's Included" && (
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">What's Included</h2>
                    <ul className="mt-6 space-y-3">
                      {treatment.included.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10"><Check className="h-3.5 w-3.5 text-primary" /></div>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === "Provider" && (
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">{treatment.provider}</h2>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {treatment.provider} is a leading healthcare facility in {treatment.city}, {treatment.country} with a {treatment.rating}★ satisfaction rating from {treatment.reviewCount}+ patients.
                    </p>
                  </div>
                )}
                {activeTab === "Reviews" && (
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">Patient Reviews</h2>
                    <div className="mt-6 space-y-4">{reviews.map((r) => <ReviewCard key={r.id} review={r} />)}</div>
                  </div>
                )}
                {activeTab === "Location" && (
                  <div>
                    <h2 className="font-serif text-2xl font-semibold">Location</h2>
                    <div className="mt-6 h-64 rounded-xl bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">Map placeholder — {treatment.city}, {treatment.country}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full lg:w-80">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6 shadow-lg">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="mt-1 font-serif text-3xl font-bold text-primary">{formatPrice(treatment.price)}</p>
                <p className="mt-1 text-xs text-muted-foreground">per person · all-inclusive package</p>
                {!enquirySent ? (
                  <>
                    <Button className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" onClick={() => setEnquirySent(true)}>Enquire Now</Button>
                    <Button variant="outline" className="mt-3 w-full" size="lg" asChild><Link to="/signup">Book Consultation</Link></Button>
                  </>
                ) : (
                  <div className="mt-6 rounded-lg bg-primary/10 p-4 text-center">
                    <Check className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-2 text-sm font-medium text-primary">Enquiry Sent!</p>
                    <p className="mt-1 text-xs text-muted-foreground">A coordinator will contact you within 24 hours.</p>
                  </div>
                )}
                <div className="mt-6 rounded-lg border border-border p-4">
                  <p className="text-xs font-medium text-muted-foreground">BNPL Available</p>
                  <p className="mt-1 text-sm">Pay in <span className="font-semibold">4 instalments</span> of {formatPrice(Math.round(treatment.price / 4))}/month</p>
                  <p className="mt-1 text-xs text-muted-foreground">Interest-free · No credit check</p>
                </div>
                <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                  <p>✓ Free cancellation up to 14 days before</p>
                  <p>✓ No hidden fees</p>
                  <p>✓ Price match guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default TreatmentDetail;
