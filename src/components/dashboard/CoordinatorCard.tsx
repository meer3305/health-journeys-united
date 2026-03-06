import { MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CoordinatorCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-serif text-lg font-semibold">Your Care Coordinator</h3>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="font-serif text-lg font-bold text-primary">SM</span>
        </div>
        <div>
          <p className="font-medium">Sarah M.</p>
          <p className="text-sm text-muted-foreground">Senior Care Coordinator</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <Button size="sm" className="flex-1 gap-2">
          <MessageSquare className="h-4 w-4" />
          Message
        </Button>
        <Button size="sm" variant="outline" className="flex-1 gap-2">
          <Phone className="h-4 w-4" />
          Schedule Call
        </Button>
      </div>
    </div>
  );
}
