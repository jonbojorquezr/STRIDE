# Stripe Checkout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir el botón "Finalizar compra" del carrito en un checkout real con Stripe Checkout hospedado (modo test), con precios validados en el servidor.

**Architecture:** La lógica de precios/validación/envío vive en módulos puros y testeables (`lib/catalog.ts`, `lib/checkout.ts`). Un Route Handler (`app/api/checkout/route.ts`) usa esa lógica y crea la sesión de Stripe con la clave secreta del servidor. El carrito (cliente) llama al API y redirige a Stripe; al volver, `/gracias` limpia el carrito.

**Tech Stack:** Next.js 16 (App Router, Node runtime), TypeScript, Stripe Node SDK, Vitest (tests unitarios de la lógica pura).

**Directorio del proyecto:** `C:\Users\Alan\.cursor\projects\Stride\web` (todas las rutas son relativas a esa carpeta).

---

### Task 0: Dependencias y runner de tests

**Files:**
- Modify: `package.json` (scripts + deps)
- Create: `vitest.config.ts`
- Create: `.env.local` (local, no se commitea — ya está en .gitignore vía `.env*`)
- Create: `.env.example`

- [ ] **Step 1: Instalar dependencias**

Run:
```bash
npm install stripe
npm install -D vitest
```
Expected: ambos paquetes quedan en `package.json`.

- [ ] **Step 2: Agregar script de test**

En `package.json`, dentro de `"scripts"`, agregar la línea `"test": "vitest run"` (y `"test:watch": "vitest"`). Resultado esperado del bloque scripts:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Crear `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Crear `.env.example`**

```bash
# Clave secreta de Stripe (modo test: empieza con sk_test_...)
STRIPE_SECRET_KEY=sk_test_xxx
```

- [ ] **Step 5: Crear `.env.local`** (placeholder hasta tener la clave real)

```bash
STRIPE_SECRET_KEY=sk_test_placeholder
```

- [ ] **Step 6: Verificar que `.env.local` está ignorado por git**

Run: `git check-ignore .env.local`
Expected: imprime `.env.local` (está ignorado). Si no imprime nada, agregar `.env.local` a `.gitignore`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts .env.example
git commit -m "chore: add stripe + vitest deps and test runner"
```

---

### Task 1: Catálogo canónico de productos (`lib/catalog.ts`)

**Files:**
- Create: `lib/catalog.ts`
- Test: `lib/catalog.test.ts`

- [ ] **Step 1: Escribir el test que falla**

`lib/catalog.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { CATALOG, unitPrice } from "./catalog";

describe("catalog", () => {
  it("tiene los 3 productos con sus precios canónicos", () => {
    expect(CATALOG["recovery-mix"].price).toBe(999);
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
});
```

- [ ] **Step 2: Correr el test para verque falla**

Run: `npm test`
Expected: FAIL (`Cannot find module './catalog'`).

- [ ] **Step 3: Implementar `lib/catalog.ts`**

```ts
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
```

- [ ] **Step 4: Correr el test para verificar que pasa**

Run: `npm test`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/catalog.ts lib/catalog.test.ts
git commit -m "feat: add canonical product catalog with pricing"
```

---

### Task 2: Lógica pura de checkout (`lib/checkout.ts`)

**Files:**
- Create: `lib/checkout.ts`
- Test: `lib/checkout.test.ts`

- [ ] **Step 1: Escribir el test que falla**

`lib/checkout.test.ts`:
```ts
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
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `npm test`
Expected: FAIL (`Cannot find module './checkout'`).

- [ ] **Step 3: Implementar `lib/checkout.ts`**

```ts
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
```

- [ ] **Step 4: Correr el test para verificar que pasa**

Run: `npm test`
Expected: PASS (todos los tests de catalog + checkout).

- [ ] **Step 5: Commit**

```bash
git add lib/checkout.ts lib/checkout.test.ts
git commit -m "feat: add pure checkout pricing + shipping logic"
```

---

### Task 3: Agregar `key` estable al carrito (`lib/store.tsx`)

**Files:**
- Modify: `lib/store.tsx` (tipo `CartItem`)

- [ ] **Step 1: Agregar el campo `key` al tipo `CartItem`**

En `lib/store.tsx`, localizar el tipo `CartItem` y agregar `key`. Cambiar:
```ts
export type CartItem = {
  id: string;
  name: string;
```
por:
```ts
import type { ProductKey } from "./catalog";

export type CartItem = {
  id: string;
  key: ProductKey;
  name: string;
```
(El `import type` va arriba del archivo, junto a los demás imports.)

- [ ] **Step 2: Verificar que compila el tipo**

Run: `npx tsc --noEmit`
Expected: aparecerán errores SOLO en los lugares que crean `CartItem` sin `key` (ProductContent y DivisionContent). Eso es esperado y se corrige en la Task 4. Si hay errores en otros archivos, revisarlos.

- [ ] **Step 3: Commit**

```bash
git add lib/store.tsx
git commit -m "feat: add stable product key to cart items"
```

---

### Task 4: Usar el catálogo en las páginas (precios + addToCart)

**Files:**
- Modify: `components/pages/ProductContent.tsx`
- Modify: `components/pages/DivisionContent.tsx`
- Modify: `components/pages/HomeContent.tsx`

- [ ] **Step 1: ProductContent — usar catálogo y pasar `key`**

En `components/pages/ProductContent.tsx`:

a) Agregar import:
```ts
import { unitPrice } from "@/lib/catalog";
```

b) Eliminar la constante `const BASE_PRICE = 749;` y reemplazar el cálculo de `unit` dentro de `PDP`. Cambiar:
```ts
  const unit = mode === "sub" ? Math.round(BASE_PRICE * 0.85) : BASE_PRICE;
```
por:
```ts
  const unit = unitPrice("recovery-mix", mode);
```

c) En la llamada `addToCart`, agregar `key`. Cambiar:
```ts
    addToCart({
      id: "recovery-" + f.id,
      name: "Recovery Mix",
```
por:
```ts
    addToCart({
      id: "recovery-" + f.id,
      key: "recovery-mix",
      name: "Recovery Mix",
```

- [ ] **Step 2: DivisionContent — usar catálogo y pasar `key`**

En `components/pages/DivisionContent.tsx`:

a) Agregar imports:
```ts
import { unitPrice, type ProductKey } from "@/lib/catalog";
```

b) Mapear cada división a su `ProductKey`. Agregar esta constante cerca de `DIVDATA`:
```ts
const DIV_KEY: Record<DivisionId, ProductKey> = {
  recover: "recovery-mix",
  endure: "creatina",
  hydrate: "electrolitos",
};
```

c) En `DivProduct`, la firma ya recibe `division`. Cambiar el cálculo de `unit`. Cambiar:
```ts
  const unit = mode === "sub" ? Math.round(D.product.price * 0.85) : D.product.price;
```
por:
```ts
  const unit = unitPrice(DIV_KEY[division], mode);
```

d) En la llamada `addToCart` dentro de `DivProduct`, agregar `key`. Cambiar:
```ts
    addToCart({
      id: D.product.id + "-" + flavor,
      name: D.product.name,
```
por:
```ts
    addToCart({
      id: D.product.id + "-" + flavor,
      key: DIV_KEY[division],
      name: D.product.name,
```

e) `DivProduct` debe recibir `division` (ya lo recibe: `function DivProduct({ D, division }`). Confirmar que sí. Si no, agregarlo a la firma y a la llamada en el componente raíz.

- [ ] **Step 3: HomeContent — derivar el precio "desde"**

En `components/pages/HomeContent.tsx`:

a) Agregar import:
```ts
import { unitPrice } from "@/lib/catalog";
```

b) En `ProductFeature`, cambiar el precio "desde". Cambiar:
```ts
              {t("desde", "from")} {money(637)}
```
por:
```ts
              {t("desde", "from")} {money(unitPrice("recovery-mix", "sub"))}
```

- [ ] **Step 4: Verificar tipos y build**

Run: `npx tsc --noEmit`
Expected: sin errores (ya no faltan `key`).

Run: `npm run build`
Expected: `✓ Compiled successfully`, 5 rutas estáticas.

- [ ] **Step 5: Verificación visual de precios**

Run: `npm run dev` (si no está corriendo) y en el navegador confirmar:
- `/producto`: precio muestra **$999** (única) / **$849** (suscripción).
- `/recover`: Recovery Mix **$999/$849**.
- `/` (ProductFeature): "desde **$849 MXN**".
- `/endure`: Creatina **$549/$467**. `/hydrate`: Electrolitos **$599/$509**.

- [ ] **Step 6: Commit**

```bash
git add components/pages/ProductContent.tsx components/pages/DivisionContent.tsx components/pages/HomeContent.tsx
git commit -m "refactor: derive prices from catalog and tag cart items with key"
```

---

### Task 5: Route Handler de checkout (`app/api/checkout/route.ts`)

**Files:**
- Create: `app/api/checkout/route.ts`

- [ ] **Step 1: Implementar el Route Handler**

```ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { priceCheckout, CheckoutError } from "@/lib/checkout";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Pago no configurado" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const items = (body as { items?: unknown }).items;
  let priced;
  try {
    priced = priceCheckout(items as never);
  } catch (e) {
    if (e instanceof CheckoutError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    throw e;
  }

  const stripe = new Stripe(secret);
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: priced.lineItems,
      shipping_address_collection: { allowed_countries: ["MX"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: priced.shipping.amount, currency: "mxn" },
            display_name: priced.shipping.label,
          },
        },
      ],
      success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/producto`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Stripe error:", e);
    return NextResponse.json({ error: "No se pudo iniciar el pago" }, { status: 502 });
  }
}
```

- [ ] **Step 2: Verificar el build**

Run: `npm run build`
Expected: `✓ Compiled successfully`. La ruta `/api/checkout` aparece como función (no estática). Si TypeScript se queja del tipo de `line_items`/`shipping_options`, es por la versión del SDK — ver Step 3.

- [ ] **Step 3: Verificación de la respuesta de error (sin clave válida no se prueba Stripe todavía)**

Con `STRIPE_SECRET_KEY=sk_test_placeholder` en `.env.local`, correr `npm run dev` y:
```bash
curl -s -X POST http://localhost:3000/api/checkout -H "Content-Type: application/json" -d '{"items":[]}'
```
Expected: `{"error":"El carrito está vacío"}` con HTTP 400 (la validación corre antes de tocar Stripe).

```bash
curl -s -X POST http://localhost:3000/api/checkout -H "Content-Type: application/json" -d '{"items":[{"key":"creatina","mode":"once","qty":1}]}'
```
Expected: `{"error":"No se pudo iniciar el pago"}` HTTP 502 (la clave placeholder es rechazada por Stripe). Esto confirma que la validación pasó y la llamada llegó a Stripe. Con la clave real (Task 8) devolverá `{"url":"https://checkout.stripe.com/..."}`.

- [ ] **Step 4: Commit**

```bash
git add app/api/checkout/route.ts
git commit -m "feat: add stripe checkout session API route"
```

---

### Task 6: Botón "Finalizar compra" llama al API (`components/Nav.tsx`)

**Files:**
- Modify: `components/Nav.tsx` (componente `CartDrawer`)

- [ ] **Step 1: Agregar estado y handler en `CartDrawer`**

En `components/Nav.tsx`, dentro de la función `CartDrawer`, después de la línea
`const { t, cart, money, cartTotal, setQty } = useStore();`, agregar:
```ts
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((c) => ({ key: c.key, flavor: c.flavor, mode: c.mode, qty: c.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Error");
      window.location.href = data.url;
    } catch {
      setError(t("No se pudo iniciar el pago. Intenta de nuevo.", "Couldn't start payment. Try again."));
      setLoading(false);
    }
  };
```
(Asegurarse de que `React` esté importado en el archivo — ya lo está.)

- [ ] **Step 2: Conectar el botón de checkout**

En el mismo componente, localizar el botón de checkout dentro de `.cart-foot`. Cambiar:
```tsx
              <button className="btn btn-accent btn-lg" style={{ width: "100%" }}>
                {t("Finalizar compra", "Checkout")}
              </button>
```
por:
```tsx
              <button
                className="btn btn-accent btn-lg"
                style={{ width: "100%" }}
                onClick={checkout}
                disabled={loading}
              >
                {loading ? t("Redirigiendo…", "Redirecting…") : t("Finalizar compra", "Checkout")}
              </button>
              {error && (
                <p className="mono" style={{ color: "#d23", textAlign: "center", marginTop: 10 }}>
                  {error}
                </p>
              )}
```

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: `✓ Compiled successfully`.

- [ ] **Step 4: Verificación en navegador (sin clave real aún)**

`npm run dev`, agregar un producto al carrito, abrir el carrito, click en "Finalizar compra".
Expected: el botón muestra "Redirigiendo…" y luego aparece el mensaje de error (porque la clave es placeholder). Esto confirma que el flujo cliente→API funciona. Con la clave real (Task 8) redirigirá a Stripe.

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: wire cart checkout button to stripe API"
```

---

### Task 7: Página de éxito (`app/gracias/page.tsx`)

**Files:**
- Create: `app/gracias/page.tsx`
- Create: `components/pages/GraciasContent.tsx`

- [ ] **Step 1: Crear el componente cliente que limpia el carrito**

`components/pages/GraciasContent.tsx`:
```tsx
"use client";
import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { PROD_URL, HOME_URL } from "@/lib/routes";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mark } from "@/components/Brand";

export default function GraciasContent() {
  const { t, clearCart } = useStore();
  React.useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Nav />
      <main>
        <section className="section" style={{ textAlign: "center", paddingTop: 96, paddingBottom: 96 }}>
          <div className="wrap" style={{ maxWidth: 560 }}>
            <Mark size={40} color="var(--teal)" />
            <h1 className="display h-lg" style={{ marginTop: 20 }}>
              {t("¡Gracias por tu compra!", "Thank you for your order!")}
            </h1>
            <p className="lede" style={{ marginTop: 16 }}>
              {t(
                "Recibimos tu pedido. Te enviaremos la confirmación y el seguimiento por correo.",
                "We received your order. We'll email you the confirmation and tracking."
              )}
            </p>
            <div className="hero-cta" style={{ justifyContent: "center", marginTop: 28 }}>
              <Link href={PROD_URL} className="btn btn-primary btn-lg">
                {t("Seguir comprando", "Keep shopping")} <span className="arrow">→</span>
              </Link>
              <Link href={HOME_URL} className="btn btn-ghost btn-lg">
                {t("Volver al inicio", "Back home")}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Agregar `clearCart` al store**

En `lib/store.tsx`:

a) En el tipo `StoreValue`, agregar la firma después de `setQty`:
```ts
  clearCart: () => void;
```

b) Implementar el callback (cerca de `setQty`):
```ts
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.setItem("stride_cart", JSON.stringify([]));
  }, []);
```

c) Incluir `clearCart` en el objeto `value`:
```ts
    setQty,
    clearCart,
    cartCount,
```

- [ ] **Step 3: Crear la ruta `/gracias`**

`app/gracias/page.tsx`:
```tsx
import type { Metadata } from "next";
import GraciasContent from "@/components/pages/GraciasContent";

export const metadata: Metadata = {
  title: "Gracias — Stride",
  robots: { index: false },
};

export default function Page() {
  return <GraciasContent />;
}
```

- [ ] **Step 4: Verificar build y navegador**

Run: `npm run build`
Expected: `✓ Compiled successfully`; aparece la ruta `/gracias`.

`npm run dev`, agregar algo al carrito, luego visitar `http://localhost:3000/gracias` directo.
Expected: se ve la página de gracias y el contador del carrito vuelve a 0 (carrito limpiado).

- [ ] **Step 5: Commit**

```bash
git add app/gracias/page.tsx components/pages/GraciasContent.tsx lib/store.tsx
git commit -m "feat: add /gracias success page that clears the cart"
```

---

### Task 8: Cuenta Stripe, clave real y prueba end-to-end

**Files:**
- Modify: `.env.local` (clave real, local)
- (Vercel) variable de entorno `STRIPE_SECRET_KEY`

- [ ] **Step 1: Crear cuenta y obtener la test secret key** (acción del usuario, con guía)

1. Ir a https://dashboard.stripe.com/register y crear cuenta gratis (no requiere datos de negocio para modo test).
2. Confirmar que el dashboard está en **Test mode** (toggle arriba a la derecha).
3. Ir a Developers → API keys.
4. Copiar la **Secret key** que empieza con `sk_test_...`.

- [ ] **Step 2: Poner la clave en `.env.local`**

Reemplazar el placeholder en `.env.local`:
```bash
STRIPE_SECRET_KEY=sk_test_<la_clave_real>
```
Reiniciar `npm run dev` para que tome la variable.

- [ ] **Step 3: Probar la creación de sesión real**

```bash
curl -s -X POST http://localhost:3000/api/checkout -H "Content-Type: application/json" -d '{"items":[{"key":"creatina","flavor":"Sin sabor","mode":"once","qty":1}]}'
```
Expected: `{"url":"https://checkout.stripe.com/c/pay/..."}` (HTTP 200).

- [ ] **Step 4: Prueba end-to-end en el navegador**

1. `npm run dev`, agregar un producto, abrir carrito, "Finalizar compra".
2. Redirige a Stripe Checkout. Verificar: productos correctos, total en MXN, opción de envío correcta (≥$900 gratis / si no $99), pide dirección de México.
3. Pagar con tarjeta de prueba `4242 4242 4242 4242`, fecha futura, CVC `123`, código postal cualquiera.
4. Expected: regresa a `/gracias`, el carrito queda vacío.
5. Repetir y en Stripe darle "atrás"/cancelar → vuelve a `/producto` con el carrito intacto.

- [ ] **Step 5: Configurar la variable en Vercel y desplegar**

```bash
vercel env add STRIPE_SECRET_KEY production --scope alanrv25-2774s-projects
# pegar la clave sk_test_... cuando lo pida
vercel env add STRIPE_SECRET_KEY preview --scope alanrv25-2774s-projects
```
Luego push para auto-deploy:
```bash
git push origin main
```
Expected: deploy de producción ● Ready. Probar el flujo en la URL pública con la tarjeta de prueba.

- [ ] **Step 6: Verificación final**

Run: `npm test`
Expected: PASS (catalog + checkout).

Run: `npm run build`
Expected: `✓ Compiled successfully`.

---

## Self-Review

- **Cobertura del spec:** catálogo (Task 1), integridad de precios server-side (Task 2+5), refactor carrito con `key` (Task 3-4), reconciliación de precios mostrados (Task 4), API de checkout con envío y dirección MX (Task 5), botón con loading/error (Task 6), página `/gracias` que limpia carrito (Task 7), cancel a `/producto` (Task 5 cancel_url), env + test card + deploy (Task 8). Suscripción = pago único con −15% (lib/catalog unitPrice). Todo cubierto.
- **Fuera de alcance** (webhooks, recurrente, DB) no tiene tareas — correcto.
- **Consistencia de tipos:** `ProductKey`, `CheckoutItem`, `priceCheckout`, `unitPrice`, `clearCart`, `CartItem.key` usados consistentemente entre tareas.
- **Sin placeholders:** todo paso de código incluye el código real.
