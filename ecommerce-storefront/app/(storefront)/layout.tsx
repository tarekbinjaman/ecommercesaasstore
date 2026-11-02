// app/(storefront)/layout.tsx
import { resolveTheme } from '@/lib/theme-resolver'
import { ThemeProvider } from '@/lib/theme-provider'

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { tenant, theme } = await resolveTheme()
  const Layout = theme.Layout

  
  return (
    <ThemeProvider tenant={tenant}>
      <Layout tenant={tenant}>{children}</Layout>
    </ThemeProvider>
  )
}
















// ==========================previous code===============================




// import { resolveTheme } from '@/lib/theme-resolver';
// import { DesignHost } from '@/components/shell/DesignHost';

// export default async function StorefrontLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { tenant, theme } = await resolveTheme();
//   return (
//     <DesignHost design={theme} tenant={tenant}>
//       {children}
//     </DesignHost>
//   );
// }