import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Check, Heart, Activity, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

const HERO_IMAGE = "https://images.unsplash.com/photo-1519046904884-a0b8cd3c34d2?w=1200&q=80";

const inputClass =
  "w-full rounded-xl border border-border bg-white/70 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [path, setPath] = useState<"medical" | "wellness" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const Panel = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card p-8 shadow-sm"
    >
      {children}
    </motion.div>
  );

  if (submitted) {
    return (
      <div className="relative flex min-h-[86vh] items-center justify-center overflow-hidden px-4">
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 right-20 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="relative">
          <div className="max-w-md rounded-2xl border border-border bg-card p-12 text-center shadow-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage/15"
            >
              <Check className="h-8 w-8 text-sage" />
            </motion.div>
            <h1 className="mt-6 font-serif text-3xl font-bold">You're All Set!</h1>
            <p className="mt-4 text-muted-foreground">
              Thank you for joining trawellcare. Your care coordinator will reach out within 24 hours to discuss your needs.
            </p>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate("/dashboard")}>
                Go to Dashboard
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid min-h-[86vh] lg:grid-cols-2">
      {/* Left — form */}
      <div className="flex items-center justify-center px-6 py-14 lg:px-12">
        <div className="w-full max-w-xl">
          {/* Progress */}
          <div className="mb-10 flex items-center justify-center gap-4">
            {[1, 2].map((n) => (
              <div key={n} className="flex items-center gap-4">
                {n > 1 && (
                  <div className="h-px w-16 overflow-hidden rounded-full bg-border">
                    <motion.div animate={{ scaleX: step >= 2 ? 1 : 0.3 }} className="h-full origin-left bg-accent" />
                  </div>
                )}
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    step >= n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {n}
                </div>
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Logo className="text-xl" />
              <h1 className="mt-6 text-center font-serif text-3xl font-bold">What brings you here?</h1>
              <p className="mt-3 text-center text-muted-foreground">Choose your path to get personalised recommendations.</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {([
                  { key: "medical", icon: Activity, title: "Medical Treatment", desc: "I'm looking for a specific medical procedure abroad" },
                  { key: "wellness", icon: Heart, title: "Wellness Programs", desc: "I want to explore health & wellness retreats" },
                ] as const).map(({ key, icon: Icon, title, desc }) => (
                  <motion.button
                    key={key}
                    type="button"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setPath(key); setStep(2); }}
                    className="group rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-colors hover:border-accent/50"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 transition-colors group-hover:bg-primary/10">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-center font-serif text-3xl font-bold">
                {path === "medical" ? "Tell Us About Your Treatment Needs" : "Tell Us About Your Wellness Goals"}
              </h1>
              <p className="mt-3 text-center text-muted-foreground">We'll match you with the best providers.</p>
              <Panel>
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><label className="mb-1.5 block text-sm font-medium">Full Name</label><input type="text" required className={inputClass} placeholder="James Wilson" /></div>
                    <div><label className="mb-1.5 block text-sm font-medium">Email</label><input type="email" required className={inputClass} placeholder="james@example.com" /></div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><label className="mb-1.5 block text-sm font-medium">Phone</label><input type="tel" className={inputClass} placeholder="+44 7700 900000" /></div>
                    <div><label className="mb-1.5 block text-sm font-medium">Country</label><input type="text" className={inputClass} placeholder="United Kingdom" /></div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{path === "medical" ? "Medical Condition / Treatment Needed" : "Wellness Goals"}</label>
                    <textarea rows={3} className={inputClass} placeholder={path === "medical" ? "e.g., Knee replacement, dental implants..." : "e.g., Stress relief, weight management..."} />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><label className="mb-1.5 block text-sm font-medium">Budget</label>
                      <select className={inputClass}>
                        <option>Under £1,000</option><option>£1,000 – £3,000</option><option>£3,000 – £5,000</option><option>£5,000 – £10,000</option><option>£10,000+</option>
                      </select>
                    </div>
                    <div><label className="mb-1.5 block text-sm font-medium">Travel Timeline</label>
                      <select className={inputClass}>
                        <option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>6+ months</option><option>Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                        Submit
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Panel>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right — scenic panel */}
      <div className="relative hidden overflow-hidden lg:block">
        <img src={HERO_IMAGE} alt="Coastal sunrise" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(42_9%_22%/0.85)] via-[hsl(42_9%_22%/0.35)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="font-serif text-4xl font-semibold leading-snug">Every journey can be a<br />healthier journey.</p>
            <p className="mt-4 max-w-md text-white/75">
              Join trawellcare and travel with a dedicated care team beside you — from discovery to recovery.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
              <Check className="h-4 w-4" /> Trusted providers worldwide
              <Check className="ml-3 h-4 w-4" /> Care at every step
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
