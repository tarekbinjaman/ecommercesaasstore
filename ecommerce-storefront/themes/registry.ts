export const themeRegistry: Record<string, () => Promise<any>> = {
  marketplace: () => import('./clothing/src/index'),
  grocery: () => import('./grocery/src/index'),
  clothing: () => import('./clothing/src/index'),
}

//  ? ===== new themes register =====

// export const themeRegistry: Record<string, () => Promise<any>> = {
//   marketplace: () => import('./marketplace'),
//   grocery: () => import('./grocery'),
// }