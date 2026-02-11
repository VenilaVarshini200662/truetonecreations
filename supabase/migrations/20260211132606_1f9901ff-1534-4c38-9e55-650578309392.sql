
-- Drop the overly permissive storage SELECT policy
DROP POLICY IF EXISTS "Anyone authenticated can view deliverables" ON storage.objects;

-- Add restrictive policy: clients can only view their own files, admins can view all
CREATE POLICY "Users can view own deliverables"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'deliverables' 
    AND (
      public.has_role(auth.uid(), 'admin')
      OR (storage.foldername(name))[1] = auth.uid()::text
    )
  );
