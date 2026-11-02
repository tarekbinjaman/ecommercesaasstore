'use client';
import { createContext, useContext } from 'react';
import type { DesignPackage } from '@/_contracts/src/design-package';
import type { TenantConfig } from '@/themes/types';

type DesignCtx = {
  design: DesignPackage;
  tenant: TenantConfig;
};

export const DesignContext = createContext<DesignCtx | null>(null);

export const useDesign = () => {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error('useDesign must be used inside <DesignHost>');
  return ctx.design;
};

export const useTenant = () => {
  const ctx = useContext(DesignContext);
  if (!ctx) throw new Error('useTenant must be used inside <DesignHost>');
  return ctx.tenant;
};