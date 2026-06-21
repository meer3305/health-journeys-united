import { useState } from "react";
import { Bell, Search, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { notifications as mockNotifications, type Notification } from "@/data/dashboardData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function DashboardHeader() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [search, setSearch] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const displayName = (user?.user_metadata as { full_name?: string })?.full_name || user?.email?.split("@")[0] || "Guest";
  const initials = displayName.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const typeColors: Record<string, string> = {
    booking: "bg-primary/15 text-primary",
    success: "bg-emerald-500/15 text-emerald-600",
    warning: "bg-amber-500/15 text-amber-600",
    info: "bg-sky-500/15 text-sky-600",
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 sm:px-6">
      {/* Search */}
      <div className="relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search treatments, providers..."
          className="h-10 w-72 rounded-xl border border-input bg-muted/30 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-colors"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
              >
                {unreadCount}
              </motion.span>
            )}
          </Button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 z-40 w-80 sm:w-96 rounded-xl border border-border bg-card shadow-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <h4 className="font-serif text-sm font-semibold">Notifications</h4>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                          Mark all read
                        </button>
                      )}
                      <button onClick={() => setNotifOpen(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-border">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => markRead(n.id)}
                        className={`w-full text-left px-4 py-3 transition-colors hover:bg-muted/50 ${!n.read ? "bg-primary/[0.03]" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${typeColors[n.type]}`}>
                            {n.type === "booking" ? "📅" : n.type === "success" ? "✓" : n.type === "warning" ? "⚠" : "ℹ"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>{n.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                            <p className="mt-1 text-[10px] text-muted-foreground/60">{n.time}</p>
                          </div>
                          {!n.read && <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center ring-2 ring-primary/20">
            <span className="text-sm font-semibold text-primary">{initials}</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-tight">{displayName}</p>
            <p className="text-[11px] text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="ghost" size="icon" title="Sign out" onClick={async () => { await signOut(); toast.success("Signed out"); navigate("/"); }}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
