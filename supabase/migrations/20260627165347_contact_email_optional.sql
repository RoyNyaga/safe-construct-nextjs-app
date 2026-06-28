-- Make email column optional in contact_messages table
ALTER TABLE public.contact_messages ALTER COLUMN email DROP NOT NULL;
