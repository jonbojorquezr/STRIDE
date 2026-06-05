import { describe, it, expect } from "vitest";
import { priceCheckout, CheckoutError } from "./checkout";

describe("priceCheckout", () => {
  it("rechaza carrito vacío", () => {
    expect(() => priceCheckout([])).toThrow(CheckoutError);
  });

  it("rechaza key inválida", () => {
    expect(() => priceCheckout([{ key: "x", mode: "once", qty: 1 }])).toThrow(CheckoutError);
  });

  it("rechaza qty fuera de rango", () => {
    expect(() => priceCheckout([{ key: "creatina", mode: "once", qty: 0 }])).toThrow(CheckoutError);
    expect(() => priceCheckout([{ key: "creatina", mode: "once", qty: 10 }])).toThrow(CheckoutError);
  });

  it("arma line_items en centavos e ignora cualquier precio del cliente", () => {
    const r = priceCheckout([{ key: "creatina", flavor: "Sin sabor", mode: "once", qty: 2 }]);
    expect(r.lineItems[0].price_data.unit_amount).toBe(54900); // 549 * 100
    expect(r.lineItems[0].quantity).toBe(2);
    expect(r.lineItems[0].price_data.product_data.name).toContain("Creatina");
    expect(r.subtotal).toBe(1098);
  });

  it("cobra $99 de envío bajo $900", () => {
    const r = priceCheckout([{ key: "creatina", mode: "once", qty: 1 }]); // 549
    expect(r.shipping.amount).toBe(9900);
    expect(r.shipping.label).toBe("Envío estándar");
  });

  it("envío gratis si subtotal >= $900", () => {
    const r = priceCheckout([{ key: "recovery-mix", mode: "once", qty: 1 }]); // 999
    expect(r.shipping.amount).toBe(0);
    expect(r.shipping.label).toBe("Envío gratis");
  });
});
