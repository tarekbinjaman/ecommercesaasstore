const map = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBn = (v: number | string): string =>
  String(v).replace(/\d/g, (d) => map[Number(d)]);

export const formatBDT = (n: number): string =>
  toBn(n.toLocaleString('en-IN')) + '৳';