import createMiddleware from 'next-intl/middleware'
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  // First handle Supabase session refresh
  // Pass the intl response as the base so cookies flow through
  const intlResponse = intlMiddleware(request)
  return await updateSession(request, intlResponse)
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … standard Next.js metadata routes (e.g. icon, apple-icon, opengraph-image, twitter-image, sitemap, robots, manifest)
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.json|.*\\/icon|.*\\/apple-icon|.*\\/opengraph-image|.*\\/twitter-image|.*\\..*$).*)',
  ],
}
