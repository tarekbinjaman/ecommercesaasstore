'use client';
import { useDesign } from '@/lib/design-context';

type PageKey = keyof ReturnType<typeof useDesign>['pages'];

export function DesignSlot<P extends object>({ page, ...props }: { page: PageKey } & P) {
  const design = useDesign();
  const Component = design.pages[page] as React.ComponentType<P>;
  return <Component {...(props as P)} />;
}