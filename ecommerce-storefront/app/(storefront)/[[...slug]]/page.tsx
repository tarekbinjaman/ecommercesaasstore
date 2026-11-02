// app/(storefront)/[[...slug]]/page.tsx
import { resolveTheme } from '@/lib/theme-resolver'
import { notFound } from 'next/navigation'

interface StorefrontPageProps {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function matchPattern(
  pattern: string,
  slug: string[]
): Record<string, string> | null {
  const pat = pattern.split('/').filter(Boolean)
  if (pat.length !== slug.length) return null

  const params: Record<string, string> = {}
  for (let i = 0; i < pat.length; i++) {
    const p = pat[i]
    if (p.startsWith(':')) {
      params[p.slice(1)] = slug[i]
    } else if (p !== slug[i]) {
      return null
    }
  }
  return params
}

export default async function StorefrontPage({
  params,
  searchParams,
}: StorefrontPageProps) {
  const { slug = [] } = await params
  const sp = await searchParams
  const { tenant, theme } = await resolveTheme()

  for (const pattern of Object.keys(theme.routes)) {
    const extra = matchPattern(pattern, slug)
    if (extra) {
      const key = theme.routes[pattern]
      const Component = theme.pages[key]
      if (!Component) notFound()
      return <Component tenant={tenant} searchParams={sp} {...extra} />
    }
  }

  notFound()
}