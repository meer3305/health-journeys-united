import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AvailableDate {
  date: string;
  day: string;
  month: string;
  slots: number;
  popular?: boolean;
}

const availableDates: AvailableDate[] = [
  { date: "June 10", day: "Tue", month: "Jun", slots: 3, popular: true },
  { date: "June 18", day: "Wed", month: "Jun", slots: 5 },
  { date: "July 3", day: "Thu", month: "Jul", slots: 2 },
  { date: "July 15", day: "Tue", month: "Jul", slots: 7 },
  { date: "July 28", day: "Mon", month: "Jul", slots: 4 },
];

interface AvailabilityCalendarProps {
  className?: string;
}

export function AvailabilityCalendar({ className = "" }: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);

  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-sm ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
          <CalendarDays className="h-5 w-5 text-accent" />
        </div>
        <div>
          <h3 className="font-serif text-base font-semibold text-card-foreground">Next Available Dates</h3>
          <p className="text-xs text-muted-foreground">Select a preferred date</p>
        </div>
      </div>

      <div className="space-y-2">
        {availableDates.map((d, i) => (
          <motion.button
            key={d.date}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => { setSelectedDate(d.date); setRequested(false); }}
            className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
              selectedDate === d.date
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/30"
            }`}
          >
            <div className={`flex h-10 w-10 flex-col items-center justify-center rounded-lg text-xs font-bold ${
              selectedDate === d.date ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              <span className="text-[10px] uppercase">{d.day}</span>
              <span className="text-sm">{d.date.split(" ")[1]}</span>
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${selectedDate === d.date ? "text-primary" : "text-foreground"}`}>
                {d.date}
              </p>
              <p className="text-xs text-muted-foreground">{d.slots} slots available</p>
            </div>
            {d.popular && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                Popular
              </span>
            )}
            {selectedDate === d.date && (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {selectedDate && !requested && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => setRequested(true)}
          >
            Request {selectedDate}
          </Button>
        </motion.div>
      )}

      {requested && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 rounded-xl bg-primary/10 p-4 text-center"
        >
          <Check className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-1 text-sm font-medium text-primary">Date Requested!</p>
          <p className="text-xs text-muted-foreground">We'll confirm availability within 24 hours.</p>
        </motion.div>
      )}
    </div>
  );
}
