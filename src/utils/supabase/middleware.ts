import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(
  request: NextRequest,
  responseOrHandler?: NextResponse | ((req: NextRequest) => NextResponse)
) {
  let supabaseResponse =
    typeof responseOrHandler === 'function'
      ? responseOrHandler(request)
      : responseOrHandler ||
        NextResponse.next({
          request,
        })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))

          if (typeof responseOrHandler === 'function') {
            supabaseResponse = responseOrHandler(request)
          } else {
            supabaseResponse = NextResponse.next({
              request,
            })
          }

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing lightweight, fragile session checks.
  // Calling getUser() on every request ensures session validity.
  try {
    const { error } = await supabase.auth.getUser()
    if (error) {
      const isRefreshTokenError =
        error.code === 'refresh_token_already_used' ||
        error.message?.toLowerCase().includes('refresh token') ||
        error.status === 400

      if (isRefreshTokenError) {
        // Clear stale auth cookies so the browser doesn't stay in a loop sending an already-used token
        const allCookies = request.cookies.getAll()
        allCookies.forEach((c) => {
          if (c.name.startsWith('sb-') && c.name.includes('-auth-token')) {
            supabaseResponse.cookies.delete(c.name)
          }
        })
      }
    }
  } catch (err: any) {
    if (
      err?.code !== 'refresh_token_already_used' &&
      !err?.message?.toLowerCase().includes('refresh token')
    ) {
      console.error('Supabase session refresh error in proxy:', err)
    }
  }

  return supabaseResponse
}
