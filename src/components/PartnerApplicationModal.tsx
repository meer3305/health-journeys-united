import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Upload, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartnerApplicationModalProps {
  open: boolean;
  onClose: () => void;
}

export function PartnerApplicationModal({ open, onClose }: PartnerApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setRot({ x: 0, y: 0 });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/60"
            style={{ backdropFilter: "blur(8px)" }}
          />

          {/* Modal Card */}
          <div style={{ perspective: 1000 }} onClick={(e) => e.stopPropagation()}>
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotateX: rot.x,
                rotateY: rot.y,
              }}
              exit={{ opacity: 0, scale: 0.94, y: 30 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                duration: 0.2
              }}
              onMouseMove={handleMove}
              onMouseLeave={() => setRot({ x: 0, y: 0 })}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[22px]"
              style={{
                transformStyle: "preserve-3d",
                background: "rgba(255, 255, 255, 0.18)",
                backdropFilter: "blur(14px) saturate(1.5)",
                WebkitBackdropFilter: "blur(14px) saturate(1.5)",
                border: "1px solid rgba(255, 255, 255, 0.35)",
                boxShadow: "0 0 24px rgba(34, 211, 238, 0.25), 0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* Holographic shimmer */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[22px] opacity-20"
                style={{
                  background: `radial-gradient(circle at ${50 + rot.y * 3}% ${50 + rot.x * 3}%, rgba(34, 211, 238, 0.5) 0%, transparent 50%)`,
                }}
              />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition-all hover:bg-white/20 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-8" style={{ transform: "translateZ(10px)" }}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1, duration: 0.3 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
                    >
                      <Check className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h2 className="mt-6 font-serif text-2xl font-bold text-foreground">Application Submitted!</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Thank you. Our partnership team will review your application within 3 business days.
                    </p>
                    <Button onClick={handleClose} className="mt-8 bg-primary hover:bg-primary/90">
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-bold text-foreground">Partner Application</h2>
                        <p className="text-sm text-muted-foreground">Join our provider network</p>
                      </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Organisation Name</label>
                        <input
                          type="text"
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150"
                          placeholder="Istanbul Health Centre"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-foreground">Country</label>
                          <input
                            type="text"
                            required
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150"
                            placeholder="Turkey"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-foreground">Type</label>
                          <select className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150">
                            <option>Hospital</option>
                            <option>Clinic</option>
                            <option>Wellness Centre</option>
                            <option>Retreat</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Website</label>
                        <input
                          type="url"
                          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150"
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-foreground">Contact Name</label>
                          <input
                            type="text"
                            required
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150"
                            placeholder="Dr. Ali Yilmaz"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
                          <input
                            type="email"
                            required
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150"
                            placeholder="contact@hospital.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Phone</label>
                        <input
                          type="tel"
                          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150"
                          placeholder="+90 555 123 4567"
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Specialties</label>
                        <input
                          type="text"
                          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150"
                          placeholder="Orthopaedics, Dental, Cosmetic..."
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm text-foreground">
                          <input type="checkbox" className="rounded accent-primary" />
                          JCI or equivalent accreditation
                        </label>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Documents (optional)</label>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.15 }}
                          className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 px-6 py-6 text-center transition-colors hover:border-primary/30"
                        >
                          <div>
                            <Upload className="mx-auto h-5 w-5 text-muted-foreground" />
                            <p className="mt-2 text-xs text-muted-foreground">
                              Upload credentials • PDF, PNG up to 10MB
                            </p>
                          </div>
                        </motion.div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-foreground">Message (optional)</label>
                        <textarea
                          rows={3}
                          className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150 resize-none"
                          placeholder="Tell us about your facility..."
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90 shadow-lg transition-shadow hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                        >
                          Submit Application
                        </Button>
                      </motion.div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
