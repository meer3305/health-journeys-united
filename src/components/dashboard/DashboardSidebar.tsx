import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, User, Sparkles, Bookmark, Calendar,
  CreditCard, MessageSquare, Settings,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard", icon: User },
  { label: "Recommended For Me", href: "/dashboard", icon: Sparkles },
  { label: "Saved Items", href: "/dashboard", icon: Bookmark },
  { label: "My Bookings", href: "/dashboard", icon: Calendar },
  { label: "My Care Card", href: "/dashboard", icon: CreditCard },
  { label: "Messages", href: "/dashboard", icon: MessageSquare },
  { label: "Settings", href: "/dashboard", icon: Settings },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="font-serif text-sm font-bold text-primary-foreground">M</span>
          </div>
          <span className="font-serif text-lg font-bold">MediVoyage</span>
        </Link>
      </div>
      <nav className="space-y-1 p-4">
        {sidebarLinks.map((link) => {
          const active = location.pathname === link.href && link.label === "Dashboard";
          return (
            <Link
              key={link.label}
              to={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
