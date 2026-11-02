import type { ReactNode } from 'react';
import type { DesignPackage } from '@/_contracts/src/design-package';
import type { TenantConfig } from '@/themes/types';
import { ThemeProvider } from '@/lib/theme-provider';
export function DesignHost({
  design,
  tenant,
  children,
}: {
  design: DesignPackage;
  tenant: TenantConfig;
  children: ReactNode;
}) {
  const { Layout } = design;
  return (
    <ThemeProvider tenant={tenant}>
      <Layout>{children}</Layout>
    </ThemeProvider >
  );
}