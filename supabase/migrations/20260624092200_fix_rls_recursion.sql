-- Fix: infinite recursion in profiles RLS policies
-- The admin SELECT/DELETE policies were self-referencing profiles
-- Solution: security-definer helper function breaks the recursion

-- Remove recursive policies
DROP POLICY IF EXISTS "Allow admin to view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Only admin can delete profiles" ON public.profiles;

-- Security-definer function: runs outside RLS, safe to call from policies
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- Recreate policies using the helper
CREATE POLICY "Allow admin to view all profiles"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Only admin can delete profiles"
  ON public.profiles FOR DELETE
  USING (public.is_admin());
