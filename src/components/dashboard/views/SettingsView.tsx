import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Shield, Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SettingsView() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}
    >
      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5.5 left-0.5" : "left-0.5"}`}
        style={{ transform: checked ? "translateX(22px)" : "translateX(0)" }}
      />
    </button>
  );

  const handleSave = () => toast.success("Settings saved successfully!");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-2xl">
      <div>
        <h2 className="font-serif text-2xl font-bold">Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Email Notifications</p><p className="text-xs text-muted-foreground">Receive booking updates via email</p></div>
            <Toggle checked={emailNotifs} onChange={setEmailNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Push Notifications</p><p className="text-xs text-muted-foreground">Browser push notifications</p></div>
            <Toggle checked={pushNotifs} onChange={setPushNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Marketing Emails</p><p className="text-xs text-muted-foreground">Deals, offers, and travel tips</p></div>
            <Toggle checked={marketingEmails} onChange={setMarketingEmails} />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold">Appearance & Language</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <div><p className="text-sm font-medium">Dark Mode</p></div>
            </div>
            <Toggle checked={darkMode} onChange={setDarkMode} />
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Language</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
              <option value="de">Deutsch</option>
              <option value="ar">العربية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-lg font-semibold">Security</h3>
        </div>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">Change Password</Button>
          <Button variant="outline" className="w-full justify-start">Enable Two-Factor Authentication</Button>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">Delete Account</Button>
        </div>
      </div>

      <Button onClick={handleSave} className="w-full sm:w-auto">Save Settings</Button>
    </motion.div>
  );
}
