import { useState, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Check, Heart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Glass3DCard({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6,
    });
  };

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => { setHov(false); setRot({ x: 0, y: 0 }); }}
        animate={{ rotateX: rot.x, rotateY: rot.y, scale: hov ? 1.04 : 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl border border-white/20 shadow-xl cursor-pointer ${className}`}
        style={{
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        }}
      >
        {hov && (
          <div className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(circle at ${50 + rot.y * 4}% ${50 + rot.x * 4}%, rgba(255,255,255,0.5) 0%, transparent 50%)` }} />
        )}
        <div style={{ transform: "translateZ(12px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

const Signup = () => {
  const [step, setStep] = useState(1);
  const [path, setPath] = useState<"medical" | "wellness" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 relative overflow-hidden">
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 right-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Glass3DCard className="p-12 max-w-md text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, hsl(174 65% 28% / 0.2), hsl(174 65% 28% / 0.05))" }}
            >
              <Check className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="mt-6 font-serif text-3xl font-bold">You're All Set!</h1>
            <p className="mt-4 text-muted-foreground">
              Thank you for signing up. Your care coordinator will reach out within 24 hours to discuss your needs.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="mt-8 border border-white/20"
                style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))", color: "white" }}
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </motion.div>
          </Glass3DCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-16 relative overflow-hidden">
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-20 left-10 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />
      <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }} className="absolute bottom-20 right-10 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />
      <Container className="relative">
        <div className="mx-auto max-w-xl">
          {/* Progress */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <motion.div
              animate={{ scale: step >= 1 ? [1, 1.2, 1] : 1 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium border border-white/20 shadow-lg ${
                step >= 1 ? "text-white" : "bg-muted text-muted-foreground"
              }`}
              style={step >= 1 ? { background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))" } : {}}
            >
              1
            </motion.div>
            <motion.div
              animate={{ scaleX: step >= 2 ? 1 : 0.3, opacity: step >= 2 ? 1 : 0.3 }}
              className="h-0.5 w-16 rounded-full"
              style={{ background: step >= 2 ? "linear-gradient(90deg, hsl(38 55% 52%), hsl(174 65% 28%))" : "hsl(var(--border))" }}
            />
            <motion.div
              animate={{ scale: step >= 2 ? [1, 1.2, 1] : 1 }}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium border border-white/20 shadow-lg ${
                step >= 2 ? "text-white" : "bg-muted text-muted-foreground"
              }`}
              style={step >= 2 ? { background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))" } : {}}
            >
              2
            </motion.div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-center font-serif text-3xl font-bold">What brings you here?</h1>
              <p className="mt-3 text-center text-muted-foreground">Choose your path to get personalised recommendations.</p>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Glass3DCard onClick={() => { setPath("medical"); setStep(2); }} className="p-8 text-center">
                  <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                    <Activity className="mx-auto h-12 w-12 text-primary" />
                  </motion.div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">Medical Treatment</h3>
                  <p className="mt-2 text-sm text-muted-foreground">I'm looking for a specific medical procedure abroad</p>
                </Glass3DCard>
                <Glass3DCard onClick={() => { setPath("wellness"); setStep(2); }} className="p-8 text-center">
                  <motion.div whileHover={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5 }}>
                    <Heart className="mx-auto h-12 w-12 text-primary" />
                  </motion.div>
                  <h3 className="mt-4 font-serif text-lg font-semibold">Wellness Programs</h3>
                  <p className="mt-2 text-sm text-muted-foreground">I want to explore health & wellness retreats</p>
                </Glass3DCard>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-center font-serif text-3xl font-bold">
                {path === "medical" ? "Tell Us About Your Treatment Needs" : "Tell Us About Your Wellness Goals"}
              </h1>
              <p className="mt-3 text-center text-muted-foreground">We'll match you with the best providers.</p>
              <Glass3DCard className="mt-10 p-8">
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><label className="mb-1.5 block text-sm font-medium">Full Name</label><input type="text" required className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="James Wilson" /></div>
                    <div><label className="mb-1.5 block text-sm font-medium">Email</label><input type="email" required className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="james@example.com" /></div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><label className="mb-1.5 block text-sm font-medium">Phone</label><input type="tel" className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="+44 7700 900000" /></div>
                    <div><label className="mb-1.5 block text-sm font-medium">Country</label><input type="text" className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="United Kingdom" /></div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{path === "medical" ? "Medical Condition / Treatment Needed" : "Wellness Goals"}</label>
                    <textarea rows={3} className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder={path === "medical" ? "e.g., Knee replacement, dental implants..." : "e.g., Stress relief, weight management..."} />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><label className="mb-1.5 block text-sm font-medium">Budget</label>
                      <select className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                        <option>Under £1,000</option><option>£1,000 – £3,000</option><option>£3,000 – £5,000</option><option>£5,000 – £10,000</option><option>£10,000+</option>
                      </select>
                    </div>
                    <div><label className="mb-1.5 block text-sm font-medium">Travel Timeline</label>
                      <select className="w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
                        <option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>6+ months</option><option>Flexible</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="rounded-xl border-white/20">Back</Button>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                      <Button
                        type="submit"
                        className="w-full border border-white/20 shadow-lg"
                        style={{ background: "linear-gradient(135deg, hsl(38 55% 52%), hsl(38 55% 42%))", color: "white" }}
                      >
                        Submit
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </Glass3DCard>
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Signup;
