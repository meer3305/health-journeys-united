import { CreditCard, Shield } from "lucide-react";

export function CareCardWidget() {
  return (
    <div className="overflow-hidden rounded-xl bg-gradient-to-br from-primary to-teal-dark p-6 text-primary-foreground shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider opacity-70">Virtual Care Card</p>
          <h3 className="mt-1 font-serif text-xl font-bold">MediVoyage Card</h3>
        </div>
        <CreditCard className="h-8 w-8 opacity-50" />
      </div>
      <div className="mt-8">
        <p className="font-mono text-lg tracking-widest">•••• •••• •••• 4829</p>
      </div>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="text-xs opacity-60">Card Holder</p>
          <p className="text-sm font-medium">JAMES WILSON</p>
        </div>
        <div>
          <p className="text-xs opacity-60">Valid Thru</p>
          <p className="text-sm font-medium">12/27</p>
        </div>
        <Shield className="h-6 w-6 opacity-40" />
      </div>
    </div>
  );
}
