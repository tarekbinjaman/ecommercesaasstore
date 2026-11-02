// lib/api/tenant.ts:
import { TenantConfig } from '@/themes/types'

export async function getTenantByHost(host: string): Promise<TenantConfig> {
  // ekhon hardcoded — pore Django backend theke fetch korbe
  if (host.startsWith('clothing')) {
    return { tenantId: '1', theme: 'clothing', storeName: 'Hikmot IT Shop', logoUrl: '/logo1.png', colors: { headerBg: '#000000', primary: '#D85A30' } }
  }
  if(host.startsWith('grocery')) {
    return { tenantId: '2', theme: 'grocery', storeName: 'Fresh Mart', logoUrl: '/logo2.png', colors: { headerBg: '#1D9E75', primary: '#0F6E56' } }
  }
  if(host.startsWith('marketplace')) {
    return { tenantId: '3', theme: 'marketplace', storeName: 'Clothing', logoUrl: '/logo2.png', colors: { headerBg: '#1D9E75', primary: '#0F6E56' } }
  }
  // unknown host — fallback marketplace-e, silent crash na
  return { tenantId: '2', theme: 'grocery', storeName: 'Fresh Mart', logoUrl: '/logo2.png', colors: { headerBg: '#1D9E75', primary: '#0F6E56' } }
}

// ! ===== next themes add ======

// import { TenantConfig } from '@/themes/types'

// export async function getTenantByHost(host: string): Promise<TenantConfig> {
//   // ekhon hardcoded — pore Django backend theke fetch korbe
//   if (host.startsWith('shop1')) {
//     return { tenantId: '1', theme: 'marketplace', storeName: 'Hikmot IT Shop', logoUrl: '/logo1.png', colors: { headerBg: '#000000', primary: '#D85A30' } }
//   }
//   if (host.startsWith('shop2')) {
//     return { tenantId: '2', theme: 'grocery', storeName: 'Fresh Mart', logoUrl: '/logo2.png', colors: { headerBg: '#1D9E75', primary: '#0F6E56' } }
//   }
//   // unknown host — fallback marketplace-e, silent crash na
//   return { tenantId: '1', theme: 'marketplace', storeName: 'Hikmot IT Shop', logoUrl: '/logo1.png', colors: { headerBg: '#000000', primary: '#D85A30' } }
// }