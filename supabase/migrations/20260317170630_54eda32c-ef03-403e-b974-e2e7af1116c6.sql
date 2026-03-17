
-- Drop the existing overly permissive policy
DROP POLICY "Clients can update own requests" ON public.service_requests;

-- Admin policy: admins can update any field
CREATE POLICY "Admins can update requests"
  ON public.service_requests FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Client policy: clients can update their own requests but cannot change sensitive fields
CREATE POLICY "Clients can update own requests"
  ON public.service_requests FOR UPDATE
  TO authenticated
  USING (client_id = auth.uid())
  WITH CHECK (
    client_id = auth.uid()
    AND payment_status = (SELECT sr.payment_status FROM public.service_requests sr WHERE sr.id = id)
    AND status = (SELECT sr.status FROM public.service_requests sr WHERE sr.id = id)
    AND delivery_url IS NOT DISTINCT FROM (SELECT sr.delivery_url FROM public.service_requests sr WHERE sr.id = id)
    AND admin_reply IS NOT DISTINCT FROM (SELECT sr.admin_reply FROM public.service_requests sr WHERE sr.id = id)
  );
