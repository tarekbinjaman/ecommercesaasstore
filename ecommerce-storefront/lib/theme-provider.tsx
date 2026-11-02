'use client';
import { createContext, useContext, type ReactNode } from 'react';
import type { TenantConfig } from '@/themes/types';

const TenantContext = createContext<TenantConfig | null>(null);

export function ThemeProvider({
  tenant,
  children,
}: {
  tenant: TenantConfig;
  children: ReactNode;
}) {
  return <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  const t = useContext(TenantContext);
  if (!t) throw new Error('useTenant must be inside <ThemeProvider>');
  return t;
}