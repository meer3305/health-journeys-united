import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Image as ImageIcon, X, CheckCircle, Loader2, AlertCircle, ChevronDown, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type RecordRow = {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  record_type: string | null;
  status: "processing" | "complete" | "failed" | string;
  summary: string | null;
  key_findings: Array<{ label: string; value: string; status?: string; note?: string }> | null;
  recommendations: string[] | null;
  extracted_text: string | null;
  error: string | null;
  created_at: string;
};

const ACCEPT = "application/pdf,image/png,image/jpeg,image/webp,image/heic";
const MAX_BYTES = 20 * 1024 * 1024;

function fmtSize(n: number | null) {
  if (!n) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

const statusColor: Record<string, string> = {
  normal: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  low: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  high: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  abnormal: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  info: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
};

export function MedicalRecordsUpload() {
  const { user } = useAuth();
  const [records, setRecords] = useState<RecordRow[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const load = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("medical_records")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRecords((data as any[]) ?? []);
  };

  useEffect(() => { load(); }, [user]);

  // Realtime so the row flips from processing → complete automatically
  useEffect(() => {
    if (!user) return;
    const ch = supabase
      .channel(`medrec-${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "medical_records", filter: `user_id=eq.${user.id}` },
        (payload) => {
          setRecords((prev) => {
            if (payload.eventType === "DELETE") return prev.filter((r) => r.id !== (payload.old as any).id);
            const row = payload.new as RecordRow;
            const exists = prev.find((r) => r.id === row.id);
            if (exists) return prev.map((r) => (r.id === row.id ? { ...r, ...row } : r));
            return [row, ...prev];
          });
        })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user]);

  const handleFiles = async (files: FileList | null) => {
    if (!files || !user) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      if (file.size > MAX_BYTES) {
        toast.error(`${file.name} exceeds 20MB`);
        continue;
      }
      const ext = file.name.split(".").pop() || "bin";
      const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("medical-records").upload(path, file, {
        contentType: file.type, upsert: false,
      });
      if (upErr) { toast.error(upErr.message); continue; }

      const { data: inserted, error: insErr } = await supabase.from("medical_records").insert({
        user_id: user.id,
        file_name: file.name,
        file_path: path,
        file_type: file.type,
        file_size: file.size,
        status: "processing",
      }).select().single();
      if (insErr || !inserted) { toast.error(insErr?.message ?? "Save failed"); continue; }

      // Fire analysis
      supabase.functions.invoke("analyze-medical-record", { body: { recordId: inserted.id } })
        .then(({ error }) => { if (error) toast.error(`Analysis failed: ${error.message}`); })
        .catch((e) => toast.error(`Analysis failed: ${e.message}`));

      toast.success(`${file.name} uploaded — analyzing…`);
    }
    setUploading(false);
    if (fileInput.current) fileInput.current.value = "";
  };

  const remove = async (rec: RecordRow) => {
    await supabase.storage.from("medical-records").remove([rec.file_path]);
    const { error } = await supabase.from("medical_records").delete().eq("id", rec.id);
    if (error) toast.error(error.message);
    else toast.success("Removed");
  };

  const retry = async (rec: RecordRow) => {
    await supabase.from("medical_records").update({ status: "processing", error: null }).eq("id", rec.id);
    const { error } = await supabase.functions.invoke("analyze-medical-record", { body: { recordId: rec.id } });
    if (error) toast.error(error.message);
  };

  const Icon = (t: string | null) => (t?.startsWith("image/") ? ImageIcon : FileText);

  if (!user) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm" id="records">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-card-foreground">AI Medical Records</h3>
          <p className="text-xs text-muted-foreground">Upload lab reports, scans, or prescriptions — AI explains what they mean</p>
        </div>
      </div>

      <input
        ref={fileInput}
        type="file"
        accept={ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInput.current?.click()}
        className={`mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 px-6 transition-all cursor-pointer ${
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/30"
        }`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
          {uploading ? <Loader2 className="h-6 w-6 text-primary animate-spin" /> : <Upload className="h-6 w-6 text-primary" />}
        </div>
        <p className="text-sm font-medium text-foreground">Drag & drop or click to upload</p>
        <p className="mt-1 text-xs text-muted-foreground">PDF, JPG, PNG · up to 20MB</p>
        <p className="mt-2 text-[10px] text-muted-foreground">🔒 Encrypted & only visible to you</p>
      </div>

      {records.length > 0 && (
        <div className="mt-5 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your records ({records.length})
          </p>
          {records.map((rec) => {
            const FIcon = Icon(rec.file_type);
            const open = openId === rec.id;
            return (
              <motion.div key={rec.id} layout className="rounded-xl border border-border bg-muted/30 overflow-hidden">
                <button
                  onClick={() => setOpenId(open ? null : rec.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                >
                  <FIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{rec.file_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {fmtSize(rec.file_size)} · {rec.record_type ?? "—"}
                    </p>
                  </div>
                  {rec.status === "processing" && (
                    <span className="flex items-center gap-1 text-xs text-primary"><Loader2 className="h-3 w-3 animate-spin" /> Analyzing</span>
                  )}
                  {rec.status === "complete" && <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />}
                  {rec.status === "failed" && <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />}
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                  <span
                    role="button"
                    onClick={(e) => { e.stopPropagation(); remove(rec); }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-border bg-background"
                    >
                      <div className="p-4 space-y-4">
                        {rec.status === "processing" && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" /> AI is reading your document…
                          </div>
                        )}

                        {rec.status === "failed" && (
                          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm">
                            <p className="text-destructive font-medium">Analysis failed</p>
                            <p className="text-xs text-muted-foreground mt-1">{rec.error ?? "Unknown error"}</p>
                            <button onClick={() => retry(rec)} className="mt-2 text-xs font-medium text-primary hover:underline">
                              Retry analysis
                            </button>
                          </div>
                        )}

                        {rec.status === "complete" && (
                          <>
                            {rec.summary && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Summary</p>
                                <p className="text-sm text-foreground leading-relaxed">{rec.summary}</p>
                              </div>
                            )}

                            {rec.key_findings && rec.key_findings.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key findings</p>
                                <div className="space-y-2">
                                  {rec.key_findings.map((f, i) => (
                                    <div key={i} className="rounded-lg border border-border bg-card p-3">
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                          <p className="text-sm font-medium text-foreground">{f.label}</p>
                                          <p className="text-sm text-muted-foreground">{f.value}</p>
                                        </div>
                                        {f.status && (
                                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${statusColor[f.status] ?? statusColor.info}`}>
                                            {f.status}
                                          </span>
                                        )}
                                      </div>
                                      {f.note && <p className="mt-1 text-xs text-muted-foreground">{f.note}</p>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {rec.recommendations && rec.recommendations.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Recommendations</p>
                                <ul className="space-y-1.5">
                                  {rec.recommendations.map((r, i) => (
                                    <li key={i} className="text-sm text-foreground flex gap-2">
                                      <span className="text-primary mt-1">•</span>
                                      <span>{r}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
