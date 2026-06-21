import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface DbBooking {
  id: string;
  treatment_name: string;
  provider: string | null;
  country: string | null;
  price: number | null;
  preferred_date: string | null;
  status: string;
  created_at: string;
}

const statusConfig: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: "bg-emerald-500/15", text: "text-emerald-600" },
  pending: { bg: "bg-amber-500/15", text: "text-amber-600" },
  completed: { bg: "bg-sky-500/15", text: "text-sky-600" },
  cancelled: { bg: "bg-destructive/15", text: "text-destructive" },
};

export function BookingsView() {
  const [filter, setFilter] = useState<string>("all");
  const { user } = useAuth();
  const [bookings, setBookings] = useState<DbBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("id, treatment_name, provider, country, price, preferred_date, status, created_at")
        .order("created_at", { ascending: false });
      if (error) toast.error(error.message);
      else setBookings(data ?? []);
      setLoading(false);
    })();
  }, [user]);

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold">My Bookings</h2>
          <p className="text-sm text-muted-foreground">{bookings.length} total bookings</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "confirmed", "pending", "completed"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="capitalize text-xs"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">Loading bookings...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 font-medium text-muted-foreground">No bookings yet</p>
          <Button asChild className="mt-4"><Link to="/treatments">Browse Treatments</Link></Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((b, i) => {
            const sc = statusConfig[b.status] ?? statusConfig.pending;
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-serif text-base font-semibold">{b.treatment_name}</h4>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${sc.bg} ${sc.text}`}>
                      {b.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{b.provider ?? "—"}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {b.country && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{b.country}</span>}
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />
                      {new Date(b.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {b.price != null && (
                    <p className="font-serif text-xl font-bold text-primary">£{Number(b.price).toLocaleString()}</p>
                  )}
                  {(b.status === "confirmed" || b.status === "pending") && (
                    <Button size="sm" variant="outline" className="mt-2 text-xs">
                      Manage Booking
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
