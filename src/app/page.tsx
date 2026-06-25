import { redirect } from 'next/navigation'

// The root `/` path redirects to the default locale via middleware.
// This page is a fallback for environments where middleware doesn't run.
export default function RootPage() {
  redirect('/en')
}
