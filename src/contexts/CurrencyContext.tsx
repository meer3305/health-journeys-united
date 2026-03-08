import { createContext, useContext, useState, ReactNode } from "react";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number; // relative to GBP (base)
}

export const currencies: CurrencyInfo[] = [
  { code: "GBP", symbol: "£", rate: 1 },
  { code: "USD", symbol: "$", rate: 1.27 },
  { code: "EUR", symbol: "€", rate: 1.17 },
  { code: "AED", symbol: "د.إ", rate: 4.67 },
  { code: "INR", symbol: "₹", rate: 106.5 },
  { code: "TRY", symbol: "₺", rate: 41.2 },
];

interface CurrencyContextType {
  currency: CurrencyInfo;
  setCurrency: (c: CurrencyInfo) => void;
  formatPrice: (priceGBP: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: currencies[0],
  setCurrency: () => {},
  formatPrice: (p) => `£${p.toLocaleString()}`,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyInfo>(currencies[0]);

  const formatPrice = (priceGBP: number) => {
    const converted = Math.round(priceGBP * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
