import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Upload, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PartnerApplicationModalProps {
  open: boolean;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all duration-150";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

export function PartnerApplicationModal({ open, onClose }: PartnerApplicationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -3,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 3,
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
            className="absolute inset-0 bg-black/50"
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
                duration: 0.2,
              }}
              onMouseMove={handleMove}
              onMouseLeave={() => setRot({ x: 0, y: 0 })}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[22px] border border-border/60 bg-card shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 0 24px rgba(34, 211, 238, 0.15), 0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
            >
              {/* Subtle top accent bar */}
              <div className="h-1 w-full rounded-t-[22px] bg-gradient-to-r from-primary via-accent to-primary" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="p-8" style={{ transform: "translateZ(6px)" }}>
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
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15"
                    >
                      <Check className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h2 className="mt-6 font-serif text-2xl font-bold text-foreground">
                      Application Submitted!
                    </h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Thank you. Our partnership team will review your application within 3 business days.
                    </p>
                    <Button
                      onClick={handleClose}
                      className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-serif text-xl font-bold text-foreground">
                          Partner Application
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Join our global provider network
                        </p>
                      </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div>
                        <label className={labelClass}>Organisation Name</label>
                        <input
                          type="text"
                          required
                          className={inputClass}
                          placeholder="Istanbul Health Centre"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Country</label>
                          <input
                            type="text"
                            required
                            className={inputClass}
                            placeholder="Turkey"
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Type</label>
                          <select className={inputClass}>
                            <option>Hospital</option>
                            <option>Clinic</option>
                            <option>Wellness Centre</option>
                            <option>Retreat</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Website</label>
                        <input
                          type="url"
                          className={inputClass}
                          placeholder="https://example.com"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Contact Name</label>
                          <input
                            type="text"
                            required
                            className={inputClass}
                            placeholder="Dr. Ali Yilmaz"
                          />
                        </div>
                        <div>
                          <label className={labelClass}>Email</label>
                          <input
                            type="email"
                            required
                            className={inputClass}
                            placeholder="contact@hospital.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Phone</label>
                        <input
                          type="tel"
                          className={inputClass}
                          placeholder="+90 555 123 4567"
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Specialties</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="Orthopaedics, Dental, Cosmetic..."
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm text-foreground">
                          <input
                            type="checkbox"
                            className="rounded border-border accent-primary h-4 w-4"
                          />
                          JCI or equivalent accreditation
                        </label>
                      </div>

                      <div>
                        <label className={labelClass}>Documents (optional)</label>
                        <motion.div
                          whileHover={{ scale: 1.005 }}
                          transition={{ duration: 0.15 }}
                          className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-6 text-center transition-colors hover:border-primary/30 hover:bg-muted/50"
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
                        <label className={labelClass}>Message (optional)</label>
                        <textarea
                          rows={3}
                          className={`${inputClass} resize-none`}
                          placeholder="Tell us about your facility..."
                        />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-shadow hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
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
