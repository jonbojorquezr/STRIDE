# Stride web: pasada de fixes de conversión y confianza

Fecha: 2026-09-17. Aprobado por Alan. Alcance: arreglar lo que rompe venta, sin rediseño.

## Contexto

Auditoría del sitio en vivo (stride-black-tau.vercel.app) con browse: diseño y flujo de
compra funcionan end-to-end (producto → carrito → Stripe Checkout test). El menú móvil
existe y funciona (hamburguesa ≤900px), se descartó como fix. Hallazgos que sí se
atienden aquí:

1. Reseñas infladas: "4.9/5 · 132 reseñas verificadas" con ~65 frascos vendidos en 2025.
   Riesgo de confianza y legal (PROFECO).
2. Suscripción −15% preseleccionada: el precio grande ($849) no es el de compra única
   ($999); se siente engañoso al pagar.
3. Botón de checkout sin feedback visual durante el cold start del API (~5 s).
4. Sin Open Graph: compartir en WhatsApp/Instagram no muestra tarjeta.
5. Stripe test configurado en EUR con métodos europeos (MB WAY, Bancontact, EPS) y
   checkout en inglés. No es arreglable desde el código: vive en la cuenta de Stripe.

## Cambios

### 1. Reseñas honestas (`components/pages/ProductContent.tsx`)
- Quitar la línea `★★★★★ 4.9 — 132 reseñas` bajo el H1 del panel de compra.
- En la sección Reviews: quitar el `4.9 / 5` y el conteo "132 reseñas verificadas";
  el título pasa a "Lo que dicen los corredores" / "What runners say". Se quitan las
  estrellas por tarjeta. Los 3 testimonios con nombre se quedan (vienen del sitio de
  marca).

### 2. Suscripción oculta (cambio sobre lo aprobado, con causa)
Al revisar `app/api/checkout/route.ts` se confirmó que la Checkout Session se crea
siempre con `mode: "payment"`: la "Suscripción cada 30 días −15%" cobraba UNA vez con
descuento y no creaba ningún cobro recurrente. Promesa falsa al cliente. En vez de
solo despreseleccionarla, se oculta el selector de plan completo tras el flag
`SUBSCRIPTIONS_ENABLED = false` en `lib/catalog.ts` (aplica a /producto y a las
páginas de división), el default pasa a `"once"` y se quita el link muerto
"Suscripción" del footer. Reactivable en una línea cuando Stripe live tenga precios
recurrentes y el API soporte `mode: "subscription"`.

### 3. Feedback del checkout (`components/Nav.tsx` + `app/components.css`)
- Spinner CSS en el botón "Finalizar compra" mientras `loading` (el estado disabled y
  el manejo de error ya existen).

### 4. Meta/OG (`app/layout.tsx` + 5 `page.tsx`)
- `metadataBase` con la URL de producción + `openGraph` (title, description, imagen de
  producto de `public/img/`) por página + `twitter: summary_large_image` en layout.

### 5. Nota operativa para Jon (`docs/PENDIENTES-OPERATIVOS.md`)
- Documentar: Stripe sandbox está en EUR/Europa; al crear la cuenta live mexicana
  configurar MXN, tarjetas + OXXO, locale es-MX en la Checkout Session; falta dominio
  propio; el correo del newsletter del footer no está conectado a ningún backend.

## Fuera de alcance
Estructura de la home, textos, imágenes, precios, rediseño visual, dominio, cuenta de
Stripe live (eso es de Jon).

## Verificación
Build local OK → push a main → Vercel auto-deploy → re-visita con browse: sin rating
inflado, "Compra única" activa por default con precio $999, OG tags presentes.
