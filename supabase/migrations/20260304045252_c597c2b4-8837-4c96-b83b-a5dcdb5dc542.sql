UPDATE storage.buckets
SET file_size_limit = 52428800,
    allowed_mime_types = ARRAY[
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/quicktime',
      'application/pdf',
      'application/zip', 'application/x-zip-compressed',
      'text/plain'
    ]
WHERE id = 'deliverables';