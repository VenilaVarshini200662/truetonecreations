-- Make the deliverables bucket private so files require authentication
UPDATE storage.buckets SET public = false WHERE id = 'deliverables';
