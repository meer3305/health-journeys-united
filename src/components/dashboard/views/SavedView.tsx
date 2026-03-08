import { useState } from "react";
import { motion } from "framer-motion";
import { Bookmark, Star, MapPin, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { savedItems as mockSaved, type SavedItem } from "@/data/dashboardData";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function SavedView() {
  const [items, setItems] = useState<SavedItem[]>(mockSaved);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success("Item removed from saved");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Saved Items</h2>
        <p className="text-sm text-muted-foreground">{items.length} saved treatments and programs</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <p className="mt-4 font-medium text-muted-foreground">No saved items yet</p>
          <p className="mt-1 text-sm text-muted-foreground/70">Browse treatments and programs to save your favourites.</p>
          <Button asChild className="mt-4">
            <Link to="/treatments">Explore Treatments</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 rounded-full bg-card/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                  {item.type}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-serif font-semibold">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.provider}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{item.location}</span>
                  <span className="flex items-center gap-1 text-accent"><Star className="h-3 w-3 fill-current" />{item.rating}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-primary">{item.currency}{item.price.toLocaleString()}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)} className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" asChild className="h-8 gap-1">
                      <Link to={`/${item.type === "treatment" ? "treatments" : "wellness"}/${item.slug}`}>
                        <ExternalLink className="h-3 w-3" /> View
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-muted-foreground/60">Saved {item.savedAt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
