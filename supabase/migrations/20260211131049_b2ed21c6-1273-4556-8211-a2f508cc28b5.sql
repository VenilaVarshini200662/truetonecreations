
-- Fix 1: Restrict has_role() to only allow checking current user's own roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE 
    WHEN _user_id = auth.uid() THEN
      EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
    ELSE false
  END
$$;

-- Fix 2: Add server-side input length constraints
ALTER TABLE public.service_requests
  ADD CONSTRAINT title_length_check CHECK (char_length(title) <= 200),
  ADD CONSTRAINT description_length_check CHECK (char_length(description) <= 5000);

ALTER TABLE public.profiles
  ADD CONSTRAINT full_name_length_check CHECK (char_length(full_name) <= 200),
  ADD CONSTRAINT email_length_check CHECK (char_length(email) <= 255);

ALTER TABLE public.request_messages
  ADD CONSTRAINT message_length_check CHECK (char_length(message) <= 10000);
