import type { ReactNode } from 'react'
import type { TenantConfig } from './types'

export interface BasePageProps {
  tenant: TenantConfig
  searchParams?: Record<string, string | string[] | undefined>
}

export interface LayoutProps {
  tenant: TenantConfig
  children: ReactNode
}

export type HomeProps = BasePageProps

export interface ProductPageProps extends BasePageProps {
  slug: string
}

export interface ProductDetailProps extends BasePageProps {
  id: string
}

export interface CategoryPageProps extends BasePageProps {
  slug?: string
}

export type CartPageProps = BasePageProps

export type CheckoutPageProps = BasePageProps

export type LoginProps = BasePageProps