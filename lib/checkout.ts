import { CATALOG, unitPrice, isProductKey, type ProductKey } from "./catalog";

export const FREE_SHIPPING_THRESHOLD = 900; // pesos
export const FLAT_SHIPPING = 99; // pesos

export type CheckoutItem = { key: string; flavor?: string; mode: string; qty: number };

export type StripeLineItem = {
  price_data: {
    currency: "mxn";
    unit_amount: number; // centavos
    product_data: { name: string };
  };
  quantity: number;
};

export type ShippingOption = { amount: number; label: string }; // amount en centavos

export class CheckoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CheckoutError";
  }
}

export function priceCheckout(items: CheckoutItem[]): {
  lineItems: StripeLineItem[];
  subtotal: number;
  shipping: ShippingOption;
} {
  if (!Array.isArray(items) || items.length === 0) {
    throw new CheckoutError("El carrito está vacío");
  }
  const lineItems: StripeLineItem[] = [];
  let subtotal = 0;
  for (const it of items) {
    if (typeof it?.key !== "string" || !isProductKey(it.key)) {
      throw new CheckoutError(`Producto inválido: ${it?.key}`);
    }
    if (it.mode !== "once" && it.mode !== "sub") {
      throw new CheckoutError("Plan inválido");
    }
    if (!Number.isInteger(it.qty) || it.qty < 1 || it.qty > 9) {
      throw new CheckoutError("Cantidad inválida");
    }
    const key = it.key as ProductKey;
    const unit = unitPrice(key, it.mode);
    subtotal += unit * it.qty;
    const planLabel = it.mode === "sub" ? "Suscripción" : "Compra única";
    const flavor = it.flavor ? ` — ${it.flavor}` : "";
    lineItems.push({
      price_data: {
        currency: "mxn",
        unit_amount: unit * 100,
        product_data: { name: `${CATALOG[key].name}${flavor} (${planLabel})` },
      },
      quantity: it.qty,
    });
  }
  const shipping: ShippingOption =
    subtotal >= FREE_SHIPPING_THRESHOLD
      ? { amount: 0, label: "Envío gratis" }
      : { amount: FLAT_SHIPPING * 100, label: "Envío estándar" };
  return { lineItems, subtotal, shipping };
}
