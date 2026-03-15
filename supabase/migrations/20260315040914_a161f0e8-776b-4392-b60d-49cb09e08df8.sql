
-- Add attachments column to service_requests
ALTER TABLE public.service_requests ADD COLUMN attachments text[] DEFAULT '{}';

-- Create storage bucket for request attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('request-attachments', 'request-attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload attachments"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'request-attachments' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Allow users to view their own attachments
CREATE POLICY "Users can view own attachments"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'request-attachments' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.has_role(auth.uid(), 'admin'::app_role)));
