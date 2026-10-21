import createMiddleware from 'next-intl/middleware'
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  // Pass intlMiddleware function directly so updateSession can re-create
  // the localized response with fresh request cookies whenever tokens are refreshed
  return await updateSession(request, intlMiddleware)
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
