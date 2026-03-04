
-- Add payment_status column to service_requests
ALTER TABLE public.service_requests 
ADD COLUMN payment_status text NOT NULL DEFAULT 'pending' 
CHECK (payment_status IN ('pending', 'paid', 'free_trial'));

-- Mark existing requests as free_trial (legacy)
UPDATE public.service_requests SET payment_status = 'free_trial';
