// lib/api/products.ts
export interface Product {
  id: string
  name: string
  price: number
}

export async function getProductsByTenant(tenantId: string): Promise<Product[]> {
  // ekhon hardcoded — pore Django backend theke fetch korbe
  return [
    { id: '1', name: 'Product A', price: 500 },
    { id: '2', name: 'Product B', price: 750 },
    { id: '3', name: 'Product C', price: 1200 },
  ]
}