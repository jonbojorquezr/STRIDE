# Diseño — Checkout con Stripe (Stride)

**Fecha:** 2026-06-05
**Estado:** Aprobado en brainstorming, pendiente de revisión del spec

## Objetivo

Convertir el botón "Finalizar compra" del carrito (hoy inerte) en un checkout real con
Stripe Checkout hospedado, en **modo de pruebas (test)**, listo para activar a producción
cuando la cuenta de Stripe esté lista.

## Decisiones (del brainstorming)

| Tema | Decisión |
|------|----------|
| Pasarela | **Stripe Checkout** (página hospedada por Stripe) |
| Modo | **Test** primero (el usuario crea cuenta gratis y aporta la *test secret key*) |
| Tipo de cobro | **Pago único** (`mode: payment`). La opción "Suscripción" conserva su −15% pero se cobra una sola vez. Sin recurrencia todavía. |
| Moneda | MXN (montos a Stripe en centavos: `precio * 100`) |
| Integridad de precios | **Catálogo en servidor** (`lib/catalog.ts`). El API recalcula precios; nunca confía en el precio del navegador. |
| Precios canónicos | Recovery Mix **$999**, Creatina **$549**, Electrolitos **$599** (MXN) |
| Envío | Pide dirección (solo México). **Gratis si subtotal ≥ $900**, si no **$99 MXN** fijo. |
| Éxito / cancelación | Éxito → `/gracias` (limpia carrito). Cancelar → regresa a `/producto` con carrito intacto. |

## Arquitectura

Next.js 16 (App Router) en Vercel. Se usa un Route Handler de Node (Fluid Compute) para
hablar con Stripe usando la clave secreta (nunca expuesta al cliente).

```
Carrito (CartDrawer, cliente)
   │  POST /api/checkout  { items: [{ key, flavor, mode, qty }] }
   ▼
app/api/checkout/route.ts (servidor)
   │  - valida items contra lib/catalog.ts
   │  - recalcula precios (ignora precio del cliente)
   │  - arma line_items (price_data, MXN)
   │  - calcula opción de envío según subtotal
   │  - crea Stripe Checkout Session
   │  → { url }
   ▼
Cliente → redirige a url (Stripe hospedado)
   │
   ├── pago OK  → success_url  /gracias?session_id=...  (limpia carrito)
   └── cancela  → cancel_url   /producto                (carrito intacto)
```

### Componentes

1. **`lib/catalog.ts`** (nuevo) — fuente única de verdad de productos y precios.
   ```ts
   export const SUB_DISCOUNT = 0.15;
   export type ProductKey = "recovery-mix" | "creatina" | "electrolitos";
   export const CATALOG: Record<ProductKey, { name: string; price: number }> = {
     "recovery-mix": { name: "Recovery Mix", price: 999 },
     "creatina":     { name: "Creatina",     price: 549 },
     "electrolitos": { name: "Electrolitos", price: 599 },
   };
   export function unitPrice(key: ProductKey, mode: "once" | "sub"): number {
     const base = CATALOG[key].price;
     return mode === "sub" ? Math.round(base * (1 - SUB_DISCOUNT)) : base;
   }
   ```
   Lo usan tanto el front (precios mostrados) como el API (cobro).

2. **Refactor del carrito** (`lib/store.tsx` + páginas) — el `CartItem` gana un campo
   estable **`key: ProductKey`**. Las llamadas `addToCart` en `ProductContent`,
   `DivisionContent` pasan el `key` correcto (PDP y división Recover → `recovery-mix`;
   Endure → `creatina`; Hydrate → `electrolitos`). Los precios mostrados se derivan de
   `unitPrice()` en vez de constantes locales, lo que **reconcilia** las inconsistencias
   actuales ($749 vs $699) y aplica los nuevos precios canónicos.

3. **`app/api/checkout/route.ts`** (nuevo, POST) — contrato:
   - **Entrada:** `{ items: [{ key, flavor, mode, qty }] }`
   - **Validación:** `key` existe en CATALOG; `mode ∈ {once, sub}`; `qty` entero 1–9;
     carrito no vacío. Si falla → `400`.
   - **Construye** `line_items` con `price_data` (currency `mxn`, `unit_amount =
     unitPrice(key,mode)*100`, `product_data.name = "<Nombre> — <flavor> (<plan>)"`).
   - **Envío:** `subtotal = Σ unitPrice*qty`. Si `subtotal ≥ 900` → opción única
     "Envío gratis" ($0); si no → "Envío estándar" ($99). Vía `shipping_options`.
   - **Sesión:** `mode: 'payment'`, `shipping_address_collection: { allowed_countries:
     ['MX'] }`, `success_url = ${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
     `cancel_url = ${origin}/producto`. `origin` se deriva del header `Host` para que
     funcione en local, preview y producción.
   - **Salida:** `{ url }` (200) o `{ error }` (4xx/5xx).

4. **`CartDrawer`** (`components/Nav.tsx`) — el botón "Finalizar compra":
   - estado `loading`; deshabilita el botón y muestra spinner mientras llama al API.
   - `POST /api/checkout` con el carrito; en éxito `window.location.href = url`.
   - en error muestra un mensaje inline ("No se pudo iniciar el pago, intenta de nuevo").

5. **`app/gracias/page.tsx`** (nuevo) — página de éxito (cliente):
   - al montar, **limpia el carrito** (`localStorage` + estado).
   - mensaje de agradecimiento, referencia (`session_id` del query), CTA a seguir
     comprando. Reusa el sistema de diseño (Nav/Footer/estilos existentes).

6. **Configuración**
   - Paquete `stripe` (SDK de Node).
   - Variable `STRIPE_SECRET_KEY` (test) en `.env.local` (local) y en Vercel
     (Production + Preview). Nunca se commitea.
   - No se requiere clave publishable (Checkout hospedado redirige por URL).

## Manejo de errores y casos borde

- **Carrito vacío / item inválido / qty fuera de rango:** API responde `400`; el cliente
  no redirige y muestra error.
- **Precio manipulado en el cliente:** ignorado — el API siempre recalcula desde el catálogo.
- **Falta `STRIPE_SECRET_KEY`:** API responde `500` con mensaje claro en logs; el cliente
  muestra error genérico.
- **Usuario cancela en Stripe:** vuelve a `/producto`, carrito intacto (no se limpia hasta éxito).
- **Doble clic en "Finalizar compra":** botón deshabilitado durante la petición.

## Reconciliación de precios mostrados

Al derivar precios de `lib/catalog.ts`, se actualizan en todo el sitio:
- Página de producto (`/producto`): Recovery Mix $999 (antes $749).
- División Recover: Recovery Mix $999 (antes $699).
- Home "desde $637": pasa a derivarse (`unitPrice('recovery-mix','sub')` = $849).
- Endure $549 y Hydrate $599 quedan igual.

## Fuera de alcance (fase 2)

- Webhooks de Stripe (`checkout.session.completed`) para fulfillment automático.
- Suscripciones recurrentes reales.
- Persistencia de órdenes / base de datos / panel de pedidos.
- Inventario y correos transaccionales propios (Stripe puede enviar su recibo).

## Pruebas

- Tarjeta de prueba Stripe `4242 4242 4242 4242`, fecha futura, CVC cualquiera.
- Verificar: creación de sesión, redirección, total y envío correctos (caso < $900 con
  $99 y caso ≥ $900 gratis), página `/gracias` limpia el carrito, cancelación conserva
  carrito, validación rechaza carrito manipulado.
- `npm run build` y despliegue de preview en Vercel antes de producción.
