export const shouldHideTopNav = (pathname: string) => {
  // Show ONLY on the homepage. Hide everywhere else.
  return pathname == "/";
}