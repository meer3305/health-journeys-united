import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const footerLinks = {
  Treatments: [
    { label: "Orthopaedics", href: "/treatments" },
    { label: "Dentistry", href: "/treatments" },
    { label: "Fertility", href: "/treatments" },
    { label: "Cosmetic Surgery", href: "/treatments" },
  ],
  Wellness: [
    { label: "Retreats", href: "/wellness" },
    { label: "Outdoor & Adventure", href: "/wellness" },
    { label: "Indoor & Clinical", href: "/wellness" },
    { label: "Holistic", href: "/wellness" },
  ],
  Destinations: [
    { label: "Turkey", href: "/destinations/turkey" },
    { label: "Thailand", href: "/destinations/thailand" },
    { label: "India", href: "/destinations/india" },
    { label: "UAE", href: "/destinations/uae" },
    { label: "South Korea", href: "/destinations/south-korea" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Partner With Us", href: "/partners/apply" },
    { label: "Contact", href: "/about" },
    { label: "Careers", href: "/about" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border/30">
      <div className="absolute inset-0 bg-foreground" />
      <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl shadow-md bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-serif text-xl font-bold text-white">MedXTrawell</span>
            </Link>
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              World-class healthcare, wherever you are. Connecting patients with verified providers worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="rounded-lg px-3 py-1.5 text-xs text-white/40 transition-all hover:text-white/80 border border-white/10 hover:border-accent/30"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/30">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-white/50 transition-colors hover:text-white/90">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/8 pt-8">
          <p className="text-center text-xs text-white/25">
            © {new Date().getFullYear()} MedXTrawell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
