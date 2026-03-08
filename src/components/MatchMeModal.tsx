import { useState } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface MatchMeModalProps {
  type: "treatment" | "wellness";
  open: boolean;
  onClose: () => void;
  onResults: (filters: Record<string, string>) => void;
}

const treatmentQuestions = [
  {
    key: "goal",
    question: "What type of treatment are you looking for?",
    options: ["Dental", "Cosmetic Surgery", "Orthopaedics", "Fertility / IVF", "Cardiac", "Eye Surgery", "Not sure — help me decide"],
  },
  {
    key: "destination",
    question: "Do you have a preferred destination?",
    options: ["Turkey", "India", "Thailand", "UAE", "Greece", "Germany", "No preference"],
  },
  {
    key: "budget",
    question: "What's your approximate budget?",
    options: ["Under £1,000", "£1,000 – £3,000", "£3,000 – £5,000", "£5,000 – £10,000", "£10,000+", "Flexible"],
  },
  {
    key: "timeline",
    question: "When are you looking to travel?",
    options: ["Within 1 month", "1–3 months", "3–6 months", "Flexible"],
  },
];

const wellnessQuestions = [
  {
    key: "goal",
    question: "What's your wellness goal?",
    options: ["Stress relief & relaxation", "Weight management", "Mental health & mindfulness", "Detox & cleansing", "Fitness & adventure", "Anti-ageing & longevity", "Spiritual healing"],
  },
  {
    key: "style",
    question: "What type of experience do you prefer?",
    options: ["🧘 Retreat (spa & sanctuary)", "🏔️ Outdoor & adventure", "🏥 Clinical & medical", "🌿 Holistic & spiritual"],
  },
  {
    key: "duration",
    question: "How long would you like your program?",
    options: ["3–5 days", "7 days", "10–14 days", "14+ days"],
  },
  {
    key: "budget",
    question: "What's your budget per person?",
    options: ["Under £1,500", "£1,500 – £2,500", "£2,500 – £4,000", "£4,000+", "Flexible"],
  },
];

export function MatchMeModal({ type, open, onClose, onResults }: MatchMeModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = type === "treatment" ? treatmentQuestions : wellnessQuestions;

  const handleSelect = (key: string, value: string) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setShowResults(true);
      setTimeout(() => {
        onResults(newAnswers);
        onClose();
        setStep(0);
        setAnswers({});
        setShowResults(false);
      }, 1500);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg rounded-2xl bg-card p-8 shadow-2xl mx-4"
      >
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {!showResults ? (
          <>
            {/* Progress */}
            <div className="mb-6 flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-accent" : "bg-border"}`} />
              ))}
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-accent">Match Me — Step {step + 1} of {questions.length}</span>
            </div>

            <h2 className="font-serif text-2xl font-bold mt-2">{questions[step].question}</h2>

            <div className="mt-6 space-y-2">
              {questions[step].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(questions[step].key, option)}
                  className={`flex w-full items-center justify-between rounded-xl border-2 px-5 py-3.5 text-sm font-medium transition-all hover:border-accent hover:bg-accent/5 ${
                    answers[questions[step].key] === option ? "border-accent bg-accent/5" : "border-border"
                  }`}
                >
                  {option}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="mt-4 text-sm text-muted-foreground hover:text-foreground">
                ← Back
              </button>
            )}
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Sparkles className="h-8 w-8 text-accent animate-pulse" />
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold">Finding Your Matches...</h2>
            <p className="mt-2 text-muted-foreground">We're matching you with the best {type === "treatment" ? "treatments" : "programs"} based on your preferences.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
