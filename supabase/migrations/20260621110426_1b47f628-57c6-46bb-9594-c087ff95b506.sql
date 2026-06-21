ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS blood_type text,
  ADD COLUMN IF NOT EXISTS allergies text,
  ADD COLUMN IF NOT EXISTS medications text,
  ADD COLUMN IF NOT EXISTS conditions text,
  ADD COLUMN IF NOT EXISTS preferred_destinations text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS travel_companion text,
  ADD COLUMN IF NOT EXISTS budget_range text,
  ADD COLUMN IF NOT EXISTS treatment_interests text[] DEFAULT '{}'::text[];