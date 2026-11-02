// @/_contracts/src/design-package.ts
import type { ComponentType } from 'react'
import type { LayoutProps } from '@/themes/props'   // wherever your props live

export interface DesignPackage {
  Layout: ComponentType<LayoutProps>
  pages: Record<string, ComponentType<any>>
  /**
   * URL pattern → key in `pages`
   * Examples:
   *   ''                  → Home
   *   'products'          → ProductPage
   *   'products/:id'      → ProductDetail
   *   'categories/:slug'  → CategoryPage
   */
  routes: Record<string, keyof DesignPackage['pages']>
}