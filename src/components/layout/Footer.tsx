import { Link } from "react-router-dom";

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
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">M</span>
              </div>
              <span className="font-serif text-xl font-bold">MedXTrawell</span>
            </Link>
            <p className="mt-4 text-sm opacity-70">
              World-class healthcare, wherever you are. Connecting patients with verified providers worldwide.
            </p>
            <div className="mt-6 flex gap-4">
              {["Twitter", "LinkedIn", "Instagram", "Facebook"].map((social) => (
                <a key={social} href="#" className="text-xs opacity-50 transition-opacity hover:opacity-100">
                  {social}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-50">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm opacity-70 transition-opacity hover:opacity-100">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-background/10 pt-8">
          <p className="text-center text-xs opacity-40">
            © {new Date().getFullYear()} MedXTrawell. All rights reserved. This is a prototype for demonstration purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
