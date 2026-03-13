
-- Drop overly permissive INSERT policies on subscribers
DROP POLICY IF EXISTS "Anon can subscribe" ON public.subscribers;
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;

-- Recreate with proper validation
CREATE POLICY "Anon can subscribe"
  ON public.subscribers FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL AND email <> '' AND user_id IS NULL
  );

CREATE POLICY "Authenticated can subscribe"
  ON public.subscribers FOR INSERT
  TO authenticated
  WITH CHECK (
    email IS NOT NULL AND email <> '' AND (user_id IS NULL OR user_id = auth.uid())
  );
