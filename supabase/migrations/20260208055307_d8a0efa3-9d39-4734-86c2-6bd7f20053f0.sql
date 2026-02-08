
-- Create service type enum
CREATE TYPE public.service_type AS ENUM ('content_writing', 'video_image_editing', 'poster_making');

-- Create request status enum
CREATE TYPE public.request_status AS ENUM ('pending', 'in_progress', 'completed', 'revision_requested', 'delivered');

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create service_requests table
CREATE TABLE public.service_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_type service_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status request_status NOT NULL DEFAULT 'pending',
  admin_reply TEXT,
  delivery_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create request_messages table for conversation between client and admin
CREATE TABLE public.request_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID REFERENCES public.service_requests(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  is_correction BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.request_messages ENABLE ROW LEVEL SECURITY;

-- has_role helper function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_requests_updated_at
  BEFORE UPDATE ON public.service_requests FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- PROFILES RLS
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (user_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- USER_ROLES RLS
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid());

-- SERVICE_REQUESTS RLS
CREATE POLICY "Clients can view own requests"
  ON public.service_requests FOR SELECT
  USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can create requests"
  ON public.service_requests FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can update own requests"
  ON public.service_requests FOR UPDATE
  USING (client_id = auth.uid() OR public.has_role(auth.uid(), 'admin'));

-- REQUEST_MESSAGES RLS
CREATE POLICY "Users can view messages for their requests"
  ON public.request_messages FOR SELECT
  USING (
    sender_id = auth.uid() 
    OR public.has_role(auth.uid(), 'admin')
    OR EXISTS (
      SELECT 1 FROM public.service_requests 
      WHERE id = request_id AND client_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages"
  ON public.request_messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() 
    AND (
      public.has_role(auth.uid(), 'admin')
      OR EXISTS (
        SELECT 1 FROM public.service_requests 
        WHERE id = request_id AND client_id = auth.uid()
      )
    )
  );

-- Storage bucket for deliverables
INSERT INTO storage.buckets (id, name, public) VALUES ('deliverables', 'deliverables', true);

CREATE POLICY "Admin can upload deliverables"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'deliverables' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone authenticated can view deliverables"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'deliverables' AND auth.role() = 'authenticated');
