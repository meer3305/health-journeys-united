import { useState } from "react";
import { motion } from "framer-motion";
import { User, Save, MapPin, Heart, Stethoscope, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultProfile, type HealthProfile } from "@/data/dashboardData";
import { toast } from "sonner";

export function ProfileView() {
  const [profile, setProfile] = useState<HealthProfile>(defaultProfile);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  const update = (key: keyof HealthProfile, value: string) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold">My Profile</h2>
          <p className="text-sm text-muted-foreground">Manage your health profile and preferences</p>
        </div>
        <Button onClick={editing ? handleSave : () => setEditing(true)} className="gap-2">
          {editing ? <><Save className="h-4 w-4" /> Save Changes</> : <><User className="h-4 w-4" /> Edit Profile</>}
        </Button>
      </div>

      {/* Avatar banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-border p-6 flex items-center gap-5">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ring-4 ring-primary/20">
          <span className="font-serif text-2xl font-bold text-primary">JW</span>
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold">{profile.fullName}</h3>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-0.5 text-xs font-semibold text-primary">
            Premium Member
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
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.preferredDestinations.map((d) => (
                  <span key={d} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{d}</span>
                ))}
              </div>
            </div>
            <Field label="Travel Companion" value={profile.travelCompanion} field="travelCompanion" />
            <Field label="Budget Range" value={profile.budgetRange} field="budgetRange" />
          </div>
        </Section>

        <Section icon={Heart} title="Treatment Interests">
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Specialties</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.treatmentInterests.map((t) => (
                <span key={t} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{t}</span>
              ))}
            </div>
          </div>
        </Section>
      </div>
    </motion.div>
  );
}
