import { describe, it, expect } from "vitest";
import { CATALOG, unitPrice } from "./catalog";
import { DIV_URL, PROD_URL } from "./routes";

describe("catalog", () => {
  it("tiene los productos con sus precios canónicos", () => {
    expect(CATALOG["recovery-mix"].price).toBe(999);
    expect(CATALOG["recovery-mix-sachets"].price).toBe(640);
    expect(CATALOG["creatina"].price).toBe(549);
    expect(CATALOG["electrolitos"].price).toBe(599);
  });

  it("compra única devuelve el precio base", () => {
    expect(unitPrice("recovery-mix", "once")).toBe(999);
  });

  it("suscripción aplica -15% redondeado", () => {
    expect(unitPrice("recovery-mix", "sub")).toBe(849); // 999 * .85 = 849.15 -> 849
    expect(unitPrice("creatina", "sub")).toBe(467); // 549 * .85 = 466.65 -> 467
  });

  it("usa rutas canónicas y sin duplicados", () => {
    expect(PROD_URL).toBe("/producto");
    expect(DIV_URL.recover).toBe("/producto");
    expect(DIV_URL.endure).toBe("/creatina");
    expect(DIV_URL.hydrate).toBe("/electrolitos");
  });
});
