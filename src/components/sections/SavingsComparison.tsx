import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useCurrency } from "@/contexts/CurrencyContext";

interface SavingsItem {
  treatment: string;
  ukPrice: number;
  abroadPrice: number;
  abroadCountry: string;
}

const savingsData: SavingsItem[] = [
  { treatment: "Knee Replacement", ukPrice: 14000, abroadPrice: 3200, abroadCountry: "Turkey" },
  { treatment: "Dental Implants (full set)", ukPrice: 8500, abroadPrice: 800, abroadCountry: "Turkey" },
  { treatment: "IVF Treatment", ukPrice: 6000, abroadPrice: 2500, abroadCountry: "Greece" },
  { treatment: "Hair Transplant (FUE)", ukPrice: 7000, abroadPrice: 1500, abroadCountry: "Turkey" },
];

export function SavingsComparison() {
  const { currency } = useCurrency();
  const rate = currency.rate || 1;
  const sym = currency.symbol;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-accent/5" />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-neon-green/10 px-4 py-1.5 text-sm font-semibold text-neon-green">
            💰 Savings Calculator
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">See How Much You Could Save</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Compare UK prices with international treatment costs. Save up to 80% without compromising on quality.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {savingsData.map((item, i) => {
            const savings = item.ukPrice - item.abroadPrice;
            const pct = Math.round((savings / item.ukPrice) * 100);
            const ukWidth = 100;
            const abroadWidth = (item.abroadPrice / item.ukPrice) * 100;

            return (
              <motion.div
                key={item.treatment}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg">{item.treatment}</h3>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">UK Price</span>
                      <span className="font-medium">{sym}{Math.round(item.ukPrice * rate).toLocaleString()}</span>
                    </div>
                    <div className="h-3 rounded-full bg-destructive/20 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${ukWidth}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="h-full rounded-full bg-destructive/60"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{item.abroadCountry}</span>
                      <span className="font-semibold text-primary">{sym}{Math.round(item.abroadPrice * rate).toLocaleString()}</span>
                    </div>
                    <div className="h-3 rounded-full bg-primary/20 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${abroadWidth}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 + 0.1 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-neon-green/10 px-3 py-1 text-sm font-bold text-neon-green">
                    YOU SAVE {sym}{Math.round(savings * rate).toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-primary">{pct}% less</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
