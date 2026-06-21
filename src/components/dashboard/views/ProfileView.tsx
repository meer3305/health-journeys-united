import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Save, Heart, Stethoscope, Plane, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type HealthProfile = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string;
  medications: string;
  conditions: string;
  preferredDestinations: string[];
  travelCompanion: string;
  budgetRange: string;
  treatmentInterests: string[];
};

const empty: HealthProfile = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  dateOfBirth: "",
  gender: "",
  bloodType: "",
  allergies: "",
  medications: "",
  conditions: "",
  preferredDestinations: [],
  travelCompanion: "",
  budgetRange: "",
  treatmentInterests: [],
};

export function ProfileView() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<HealthProfile>(empty);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      if (error) toast.error(error.message);
      if (data) {
        setProfile({
          fullName: data.full_name ?? "",
          email: data.email ?? user.email ?? "",
          phone: data.phone ?? "",
          country: data.country ?? "",
          dateOfBirth: data.date_of_birth ?? "",
          gender: data.gender ?? "",
          bloodType: data.blood_type ?? "",
          allergies: data.allergies ?? "",
          medications: data.medications ?? "",
          conditions: data.conditions ?? "",
          preferredDestinations: data.preferred_destinations ?? [],
          travelCompanion: data.travel_companion ?? "",
          budgetRange: data.budget_range ?? "",
          treatmentInterests: data.treatment_interests ?? [],
        });
      } else {
        setProfile({ ...empty, email: user.email ?? "" });
      }
      setLoading(false);
    })();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      country: profile.country,
      date_of_birth: profile.dateOfBirth || null,
      gender: profile.gender,
      blood_type: profile.bloodType,
      allergies: profile.allergies,
      medications: profile.medications,
      conditions: profile.conditions,
      preferred_destinations: profile.preferredDestinations,
      travel_companion: profile.travelCompanion,
      budget_range: profile.budgetRange,
      treatment_interests: profile.treatmentInterests,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  const update = (key: keyof HealthProfile, value: any) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  const updateList = (key: "preferredDestinations" | "treatmentInterests", value: string) =>
    setProfile((prev) => ({ ...prev, [key]: value.split(",").map((s) => s.trim()).filter(Boolean) }));

  const initials = (profile.fullName || profile.email || "U")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-serif text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );

  const Field = ({ label, value, field }: { label: string; value: string; field: keyof HealthProfile }) => (
    <div>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
      {editing ? (
        <input
          value={value}
          onChange={(e) => update(field, e.target.value)}
          className="mt-1 block w-full rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      ) : (
        <p className="mt-1 text-sm font-medium">{value || "—"}</p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">My Profile</h2>
          <p className="text-sm text-muted-foreground">Manage your health profile and preferences</p>
        </div>
        <Button onClick={editing ? handleSave : () => setEditing(true)} disabled={saving} className="gap-2">
          {editing ? (saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : <><Save className="h-4 w-4" /> Save Changes</>) : <><User className="h-4 w-4" /> Edit Profile</>}
        </Button>
      </div>

      {/* Avatar banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border p-6 flex items-center gap-5">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ring-4 ring-primary/20">
          <span className="font-serif text-2xl font-bold text-primary">{initials}</span>
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold">{profile.fullName || "Welcome"}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-0.5 text-xs font-semibold text-primary">
            Member
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Section icon={User} title="Personal Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" value={profile.fullName} field="fullName" />
            <Field label="Email" value={profile.email} field="email" />
            <Field label="Phone" value={profile.phone} field="phone" />
            <Field label="Date of Birth" value={profile.dateOfBirth} field="dateOfBirth" />
            <Field label="Gender" value={profile.gender} field="gender" />
            <Field label="Blood Type" value={profile.bloodType} field="bloodType" />
          </div>
        </Section>

        <Section icon={Stethoscope} title="Medical Information">
          <div className="grid gap-4">
            <Field label="Allergies" value={profile.allergies} field="allergies" />
            <Field label="Current Medications" value={profile.medications} field="medications" />
            <Field label="Medical Conditions" value={profile.conditions} field="conditions" />
          </div>
        </Section>

        <Section icon={Plane} title="Travel Preferences">
          <div className="grid gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Preferred Destinations</label>
              {editing ? (
                <input
                  value={profile.preferredDestinations.join(", ")}
                  onChange={(e) => updateList("preferredDestinations", e.target.value)}
                  placeholder="Turkey, Thailand, India"
                  className="mt-1 block w-full rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.preferredDestinations.length ? profile.preferredDestinations.map((d) => (
                    <span key={d} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{d}</span>
                  )) : <p className="text-sm text-muted-foreground">—</p>}
                </div>
              )}
            </div>
            <Field label="Travel Companion" value={profile.travelCompanion} field="travelCompanion" />
            <Field label="Budget Range" value={profile.budgetRange} field="budgetRange" />
          </div>
        </Section>

        <Section icon={Heart} title="Treatment Interests">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Specialties</label>
            {editing ? (
              <input
                value={profile.treatmentInterests.join(", ")}
                onChange={(e) => updateList("treatmentInterests", e.target.value)}
                placeholder="Dental, Cardiology, Cosmetic"
                className="mt-1 block w-full rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            ) : (
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.treatmentInterests.length ? profile.treatmentInterests.map((t) => (
                  <span key={t} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{t}</span>
                )) : <p className="text-sm text-muted-foreground">—</p>}
              </div>
            )}
          </div>
        </Section>
      </div>
    </motion.div>
  );
}
