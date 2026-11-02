// storefront/src/lib/design-loader.ts
import type { DesignPackage } from '@/_contracts/src/design-package'; 
import { themeRegistry } from '@/themes/registry'; 

export async function loadDesign(designId: string): Promise<DesignPackage> {
  const loader = themeRegistry[designId];
  if (!loader) throw new Error(`Unknown design: ${designId}`);

  const mod = await loader();
  return mod.default;   // because each index.tsx does `export default { Layout, pages }`
}