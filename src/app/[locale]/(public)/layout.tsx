import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

/**
 * Public layout — wraps all public-facing pages with Navbar and Footer.
 * Auth pages (login/register) use the bare [locale] layout directly.
 */
export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
