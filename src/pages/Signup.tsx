import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Check, Heart, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [path, setPath] = useState<"medical" | "wellness" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  if (submitted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-bold">You're All Set!</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for signing up. Your care coordinator will reach out within 24 hours to discuss your needs.
          </p>
          <Button className="mt-8" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-16">
      <Container>
        <div className="mx-auto max-w-xl">
          {/* Progress */}
          <div className="mb-10 flex items-center justify-center gap-4">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1</div>
            <div className={`h-0.5 w-16 ${step >= 2 ? "bg-primary" : "bg-border"}`} />
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</div>
          </div>

          {step === 1 && (
            <div>
              <h1 className="text-center font-serif text-3xl font-bold">What brings you here?</h1>
              <p className="mt-3 text-center text-muted-foreground">Choose your path to get personalised recommendations.</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => { setPath("medical"); setStep(2); }}
                  className={`flex flex-col items-center rounded-xl border-2 p-8 text-center transition-all hover:border-primary hover:shadow-md ${path === "medical" ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <Activity className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-serif text-lg font-semibold">Medical Treatment</h3>
                  <p className="mt-2 text-sm text-muted-foreground">I'm looking for a specific medical procedure abroad</p>
                </button>
                <button
                  onClick={() => { setPath("wellness"); setStep(2); }}
                  className={`flex flex-col items-center rounded-xl border-2 p-8 text-center transition-all hover:border-primary hover:shadow-md ${path === "wellness" ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <Heart className="h-10 w-10 text-primary" />
                  <h3 className="mt-4 font-serif text-lg font-semibold">Wellness Programs</h3>
                  <p className="mt-2 text-sm text-muted-foreground">I want to explore health & wellness retreats</p>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-center font-serif text-3xl font-bold">
                {path === "medical" ? "Tell Us About Your Treatment Needs" : "Tell Us About Your Wellness Goals"}
              </h1>
              <p className="mt-3 text-center text-muted-foreground">We'll match you with the best providers.</p>
              <form
                className="mt-10 space-y-5"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Full Name</label>
                    <input type="text" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="James Wilson" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Email</label>
                    <input type="email" required className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="james@example.com" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Phone</label>
                    <input type="tel" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+44 7700 900000" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Country</label>
                    <input type="text" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="United Kingdom" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    {path === "medical" ? "Medical Condition / Treatment Needed" : "Wellness Goals"}
                  </label>
                  <textarea rows={3} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder={path === "medical" ? "e.g., Knee replacement, dental implants..." : "e.g., Stress relief, weight management..."} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Budget</label>
                    <select className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Under £1,000</option>
                      <option>£1,000 – £3,000</option>
                      <option>£3,000 – £5,000</option>
                      <option>£5,000 – £10,000</option>
                      <option>£10,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Travel Timeline</label>
                    <select className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Within 1 month</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>6+ months</option>
                      <option>Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" className="flex-1">Submit</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Signup;
