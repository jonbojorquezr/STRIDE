/* Catálogo canónico: única fuente de verdad de productos y precios (MXN). */
export const SUB_DISCOUNT = 0.15;

// Oculta la opción de suscripción en toda la tienda: el API cobra siempre pago
// único (mode: "payment"), así que ofrecer "cada 30 días" sería una promesa
// falsa. Reactivar cuando Stripe live tenga precios recurrentes; ver
// docs/PENDIENTES-OPERATIVOS.md §1.
export const SUBSCRIPTIONS_ENABLED = false;

export type ProductKey =
  | "recovery-mix"
  | "recovery-mix-sachets"
  | "creatina"
  | "electrolitos";

export const CATALOG: Record<ProductKey, { name: string; price: number }> = {
  "recovery-mix": { name: "Recovery Mix · Bolsa 1 kg", price: 999 },
  "recovery-mix-sachets": { name: "Recovery Mix · Caja de sachets", price: 640 },
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
