-- Setup Storage Buckets for SafeConstruct
-- Buckets: catalogue-media, blog-media, team-photos

-- Insert public buckets into storage.buckets table
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('catalogue-media', 'catalogue-media', true),
  ('blog-media', 'blog-media', true),
  ('team-photos', 'team-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Cleanup existing policies if any to prevent conflict
DROP POLICY IF EXISTS "Public Read catalogue-media" ON storage.objects;
DROP POLICY IF EXISTS "Public Read blog-media" ON storage.objects;
DROP POLICY IF EXISTS "Public Read team-photos" ON storage.objects;

DROP POLICY IF EXISTS "Admin Insert catalogue-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert blog-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Insert team-photos" ON storage.objects;

DROP POLICY IF EXISTS "Admin Update catalogue-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update blog-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update team-photos" ON storage.objects;

DROP POLICY IF EXISTS "Admin Delete catalogue-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete blog-media" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete team-photos" ON storage.objects;

-- Create SELECT policies (Allow public read access)
CREATE POLICY "Public Read catalogue-media" ON storage.objects 
  FOR SELECT USING (bucket_id = 'catalogue-media');

CREATE POLICY "Public Read blog-media" ON storage.objects 
  FOR SELECT USING (bucket_id = 'blog-media');

CREATE POLICY "Public Read team-photos" ON storage.objects 
  FOR SELECT USING (bucket_id = 'team-photos');

-- Create INSERT policies (Only authenticated admins can upload/insert)
CREATE POLICY "Admin Insert catalogue-media" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'catalogue-media' AND public.is_admin());

CREATE POLICY "Admin Insert blog-media" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'blog-media' AND public.is_admin());

CREATE POLICY "Admin Insert team-photos" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'team-photos' AND public.is_admin());

-- Create UPDATE policies (Only authenticated admins can modify files)
CREATE POLICY "Admin Update catalogue-media" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'catalogue-media' AND public.is_admin());

CREATE POLICY "Admin Update blog-media" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'blog-media' AND public.is_admin());

CREATE POLICY "Admin Update team-photos" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'team-photos' AND public.is_admin());

-- Create DELETE policies (Only authenticated admins can delete files)
CREATE POLICY "Admin Delete catalogue-media" ON storage.objects 
  FOR DELETE USING (bucket_id = 'catalogue-media' AND public.is_admin());

CREATE POLICY "Admin Delete blog-media" ON storage.objects 
  FOR DELETE USING (bucket_id = 'blog-media' AND public.is_admin());

CREATE POLICY "Admin Delete team-photos" ON storage.objects 
  FOR DELETE USING (bucket_id = 'team-photos' AND public.is_admin());
