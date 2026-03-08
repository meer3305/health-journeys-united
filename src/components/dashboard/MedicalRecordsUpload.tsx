import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Image, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "uploading" | "complete";
}

export function MedicalRecordsUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const simulateUpload = (fileName: string, fileType: string) => {
    const id = Math.random().toString(36).slice(2);
    const newFile: UploadedFile = {
      id,
      name: fileName,
      type: fileType,
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
      status: "uploading",
    };
    setFiles((prev) => [...prev, newFile]);
    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "complete" } : f))
      );
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    simulateUpload("medical-report.pdf", "pdf");
  };

  const handleFileInput = () => {
    const types = ["X-Ray-scan.dcm", "MRI-report.pdf", "doctor-notes.pdf", "blood-test-results.pdf"];
    const name = types[Math.floor(Math.random() * types.length)];
    simulateUpload(name, name.endsWith(".pdf") ? "pdf" : "image");
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    return type === "image" ? Image : FileText;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
          <Upload className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-card-foreground">Upload Medical Documents</h3>
          <p className="text-xs text-muted-foreground">X-rays, MRI scans, doctor reports & more</p>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`mt-2 flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 px-6 transition-all cursor-pointer ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/30 hover:bg-muted/30"
        }`}
        onClick={handleFileInput}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-3">
          <Upload className="h-6 w-6 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground">Drag & drop files here</p>
        <p className="mt-1 text-xs text-muted-foreground">or click to browse · PDF, DICOM, JPG, PNG</p>
        <p className="mt-2 text-[10px] text-muted-foreground">Maximum file size: 20MB</p>
      </div>

      {/* Uploaded files */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Uploaded Files ({files.length})
          </p>
          {files.map((file) => {
            const Icon = getFileIcon(file.type);
            return (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3"
              >
                <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
                {file.status === "uploading" ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                )}
                <button onClick={() => removeFile(file.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
        <span className="text-xs text-muted-foreground">🔒 Files are encrypted and only shared with your care team</span>
      </div>
    </div>
  );
}
