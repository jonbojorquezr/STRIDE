/* Catálogo canónico: única fuente de verdad de productos y precios (MXN). */
export const SUB_DISCOUNT = 0.15;

export type ProductKey = "recovery-mix" | "creatina" | "electrolitos";

export const CATALOG: Record<ProductKey, { name: string; price: number }> = {
  "recovery-mix": { name: "Recovery Mix", price: 999 },
  "creatina": { name: "Creatina", price: 549 },
  "electrolitos": { name: "Electrolitos", price: 599 },
};

export function isProductKey(k: string): k is ProductKey {
  return k in CATALOG;
}

/** Precio unitario en pesos según el plan (sub aplica -15%). */
export function unitPrice(key: ProductKey, mode: "once" | "sub"): number {
  const base = CATALOG[key].price;
  return mode === "sub" ? Math.round(base * (1 - SUB_DISCOUNT)) : base;
}
