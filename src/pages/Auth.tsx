import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/layout/Container";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User as UserIcon } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().trim().email("Invalid email").max(255);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters").max(72);
const nameSchema = z.string().trim().min(1, "Name required").max(100);

export default function Auth() {
  const [params] = useSearchParams();
  const initialMode = params.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const redirect = params.get("redirect") || "/dashboard";

  useEffect(() => {
    if (!loading && user) navigate(redirect, { replace: true });
  }, [user, loading, navigate, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const emailResult = emailSchema.safeParse(email);
      const passResult = passwordSchema.safeParse(password);
      if (!emailResult.success) return toast.error(emailResult.error.issues[0].message);
      if (!passResult.success) return toast.error(passResult.error.issues[0].message);

      if (mode === "signup") {
        const nameResult = nameSchema.safeParse(fullName);
        if (!nameResult.success) return toast.error(nameResult.error.issues[0].message);
        const { error } = await supabase.auth.signUp({
          email: emailResult.data,
          password: passResult.data,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: nameResult.data },
          },
        });
        if (error) {
          if (error.message.toLowerCase().includes("already")) {
            toast.error("Account exists. Please log in instead.");
          } else toast.error(error.message);
          return;
        }
        toast.success("Welcome to MedXTrawell!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailResult.data,
          password: passResult.data,
        });
        if (error) {
          toast.error(error.message.includes("Invalid") ? "Invalid email or password" : error.message);
          return;
        }
        toast.success("Welcome back!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] py-16">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
            <h1 className="font-serif text-3xl font-bold text-center">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {mode === "login"
                ? "Sign in to access your dashboard"
                : "Start your health journey with MedXTrawell"}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="James Wilson" className="pl-9" required />
                  </div>
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-9" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="pl-9" required minLength={8} />
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "login" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "login" ? (
                <>Don't have an account?{" "}
                  <button onClick={() => setMode("signup")} className="font-medium text-primary hover:underline">Sign up</button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="font-medium text-primary hover:underline">Sign in</button>
                </>
              )}
            </p>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:underline">← Back to home</Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}