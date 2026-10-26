import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CoordinatorCard } from "@/components/dashboard/CoordinatorCard";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Check, FileText, Loader2, Upload, User, MapPin, Home, Phone, ClipboardCheck, ArrowLeft, ArrowRight, Plane, Building2, Users } from "lucide-react";

const STEPS = [
  { id: 1, label: "Pre-Procedure Info", icon: MapPin },
  { id: 2, label: "Medical Information", icon: FileText },
  { id: 3, label: "Documents & Preparation", icon: Upload },
];

const ACCOMMODATION_OPTIONS = [
  { value: "recovery-retreat", label: "Recovery Retreat", desc: "Nurse-supported villa with meals included", icon: Building2 },
  { value: "partner-hotel", label: "Partner Hotel", desc: "4–5★ hotel close to your hospital", icon: Home },
  { value: "serviced-apartment", label: "Serviced Apartment", desc: "Private space with kitchenette", icon: Building2 },
  { value: "own-arrangement", label: "Own Arrangement", desc: "Staying with family or friends", icon: Users },
];

const CHECKLIST = [
  "I have shared my complete medical history",
  "I understand the treatment plan and costs",
  "My passport is valid for at least 6 months",
  "I have arranged travel insurance where required",
  "I have listed all current medications",
];

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all";

function makeReference() {
  return `TC-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function ProcedureForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{ reference: string; docs: string[] } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    currentLocation: "",
    accommodation: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    allergies: "",
    medications: "",
    conditions: "",
  });
  const [checks, setChecks] = useState<boolean[]>(CHECKLIST.map(() => false));
  const { toast } = useToast();
  const navigate = useNavigate();

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const canProceed =
    step === 1
      ? form.currentLocation.trim() && form.accommodation && form.emergencyName.trim() && form.emergencyPhone.trim()
      : step === 2
      ? form.medications.trim() !== "" // medications field is the minimum medical disclosure
      : checks.every(Boolean);

  const uploadDocs = async (userId: string): Promise<string[]> => {
    const names: string[] = [];
    for (const file of files) {
      const path = `${userId}/procedure-docs/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("medical-records").upload(path, file, { upsert: false });
      if (error) throw new Error(`Could not upload ${file.name}`);
      names.push(file.name);
    }
    return names;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: "Sign in required", description: "Please sign in to submit your pre-procedure form." });
        navigate("/auth");
        return;
      }
      const docNames = await uploadDocs(user.id);
      const reference = makeReference();
      const { error } = await supabase.from("procedure_submissions").insert({
        user_id: user.id,
        reference,
        form_type: "pre_procedure",
        status: "submitted",
        data: {
          ...form,
          checklist: CHECKLIST.filter((_, i) => checks[i]),
          documents: docNames,
        },
      });
      if (error) throw error;
      setConfirmation({ reference, docs: docNames });
    } catch (e: any) {
      toast({ title: "Submission failed", description: e?.message ?? "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="rounded-2xl border border-sage/40 bg-sage/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-white"><Check className="h-5 w-5" /></div>
              <div>
                <p className="font-serif text-lg font-semibold text-sage">Submission received</p>
                <p className="text-sm text-muted-foreground">Your pre-procedure form was submitted successfully.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Reference</p>
                    <p className="font-mono text-xl font-semibold">{confirmation.reference}</p>
                  </div>
                  <span className="rounded-full bg-sage/15 px-3 py-1 text-xs font-semibold text-sage">Submitted</span>
                </div>
                <div className="mt-6 space-y-3 text-sm">
                  <p className="font-medium">Next steps</p>
                  {[
                    "Your care coordinator reviews your form within 24 hours",
                    "You'll receive a personalised treatment and travel plan",
                    "Hayat will guide you through anything you need before departure",
                  ].map((s, i) => (
                    <div key={s} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
                      <span className="text-muted-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="font-serif text-lg font-semibold">Documents on file</p>
                {confirmation.docs.length ? (
                  <ul className="mt-3 space-y-2">
                    {confirmation.docs.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground"><FileText className="h-4 w-4 text-primary" /> {d}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">No documents uploaded — your coordinator may request them later.</p>
                )}
              </div>
              <div className="flex gap-3">
                <Button onClick={() => navigate("/dashboard")} className="bg-primary text-primary-foreground hover:bg-primary/90">Go to Dashboard</Button>
                <Button variant="outline" onClick={() => navigate("/treatments")}>Explore Treatments</Button>
              </div>
            </div>
            <div className="space-y-6">
              <CoordinatorCard />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">Pre-Procedure</p>
        <h1 className="mt-1 font-serif text-3xl font-bold">Prepare for your journey</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          A few details help your care team and Hayat personalise everything — from travel logistics to recovery support.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main form */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-medium"><MapPin className="h-4 w-4 text-primary" /> Current location</label>
                  <input className={inputClass} placeholder="City, country — e.g., London, United Kingdom" value={form.currentLocation} onChange={set("currentLocation")} />
                </div>
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-medium"><Home className="h-4 w-4 text-primary" /> Where would you like to stay?</label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {ACCOMMODATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, accommodation: opt.value }))}
                        className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                          form.accommodation === opt.value ? "border-accent bg-accent/10 shadow-sm" : "border-border hover:border-accent/40"
                        }`}
                      >
                        <opt.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>
                          <span className="block text-sm font-medium">{opt.label}</span>
                          <span className="block text-xs text-muted-foreground">{opt.desc}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium"><Phone className="h-4 w-4 text-primary" /> Emergency contact</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <input className={inputClass} placeholder="Full name" value={form.emergencyName} onChange={set("emergencyName")} />
                    <input className={inputClass} placeholder="Phone" value={form.emergencyPhone} onChange={set("emergencyPhone")} />
                    <input className={inputClass} placeholder="Relationship" value={form.emergencyRelation} onChange={set("emergencyRelation")} />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Allergies</label>
                  <textarea rows={2} className={inputClass} placeholder="e.g., Penicillin, latex..." value={form.allergies} onChange={set("allergies")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Current medications <span className="text-destructive">*</span></label>
                  <textarea rows={2} className={inputClass} placeholder="List all medications and doses, or write 'None'" value={form.medications} onChange={set("medications")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Existing conditions</label>
                  <textarea rows={3} className={inputClass} placeholder="Any diagnosed conditions your care team should know about" value={form.conditions} onChange={set("conditions")} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <label className="mb-3 flex items-center gap-2 text-sm font-medium"><Upload className="h-4 w-4 text-primary" /> Required documents</label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40 px-6 py-10 text-center transition-colors hover:border-accent/50">
                    <Upload className="h-6 w-6 text-primary" />
                    <span className="mt-2 text-sm font-medium">Upload passport, visa & medical reports</span>
                    <span className="mt-1 text-xs text-muted-foreground">PDF, JPG or PNG — up to 10 MB each</span>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 5))}
                    />
                  </label>
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {files.map((f) => (
                        <li key={f.name} className="flex items-center gap-2 text-xs text-muted-foreground"><FileText className="h-3.5 w-3.5 text-primary" /> {f.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium"><ClipboardCheck className="h-4 w-4 text-primary" /> Preparation checklist</p>
                  <div className="mt-3 space-y-2">
                    {CHECKLIST.map((item, i) => (
                      <label key={item} className="flex cursor-pointer items-start gap-3 text-sm">
                        <input
                          type="checkbox"
                          checked={checks[i]}
                          onChange={() => setChecks((c) => c.map((v, j) => (j === i ? !v : v)))}
                          className="mt-0.5 h-4 w-4 rounded border-border accent-[hsl(36_24%_50%)]"
                        />
                        <span className="text-muted-foreground">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-6">
              <Button variant="outline" disabled={step === 1} onClick={() => setStep((s) => s - 1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              {step < 3 ? (
                <Button disabled={!canProceed} onClick={() => setStep((s) => s + 1)} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button disabled={!canProceed || submitting} onClick={handleSubmit} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plane className="h-4 w-4" />} Submit Form
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Progress</p>
            <div className="mt-4 space-y-1">
              {STEPS.map((s) => {
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div key={s.id} className="flex items-center gap-3 rounded-lg px-2 py-2">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        done ? "bg-sage text-white" : active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" /> : s.id}
                    </span>
                    <span className={`text-sm ${active ? "font-semibold" : "text-muted-foreground"}`}>{s.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <CoordinatorCard />
          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6">
            <p className="font-serif text-lg font-semibold">Ask Hayat anything</p>
            <p className="mt-2 text-sm text-muted-foreground">Your AI care companion answers questions about your procedure, travel and recovery — 24/7.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcedureForm;
