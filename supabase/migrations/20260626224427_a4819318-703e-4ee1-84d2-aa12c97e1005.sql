
CREATE TABLE public.medical_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size BIGINT,
  record_type TEXT,
  status TEXT NOT NULL DEFAULT 'processing',
  summary TEXT,
  key_findings JSONB DEFAULT '[]'::jsonb,
  recommendations JSONB DEFAULT '[]'::jsonb,
  extracted_text TEXT,
  raw_analysis JSONB,
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.medical_records TO authenticated;
GRANT ALL ON public.medical_records TO service_role;

ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own medical records"
  ON public.medical_records FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_medical_records_updated_at
  BEFORE UPDATE ON public.medical_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_medical_records_user ON public.medical_records(user_id, created_at DESC);

-- Storage policies for the medical-records bucket (bucket itself created via tool)
CREATE POLICY "Users read own medical files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'medical-records' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own medical files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'medical-records' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own medical files"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'medical-records' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own medical files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'medical-records' AND auth.uid()::text = (storage.foldername(name))[1]);
