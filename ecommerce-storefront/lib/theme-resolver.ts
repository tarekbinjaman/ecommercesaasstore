import { cache } from 'react'
import { headers } from 'next/headers'
import { getTenantByHost } from '@/lib/api/tenant'
import { themeRegistry } from '@/themes/registry'

export const resolveTheme = cache(async () => {
  const h = await headers()
  const host = h.get('x-tenant-host') ?? 'shop1.localhost'
  const tenant = await getTenantByHost(host)

  const loader = themeRegistry[tenant.theme as keyof typeof themeRegistry]
    ?? themeRegistry.marketplace

  const mod = (await loader()).default
  return { tenant, theme: mod }
})