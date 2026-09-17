# Pendientes operativos del sitio (para quien opere la tienda)

Actualizado: 17-sep-2026. Estos puntos NO se arreglan desde el código: requieren
cuentas y decisiones del operador.

## 1. Stripe: hoy no cobra dinero real

El sitio corre con una cuenta de Stripe en modo TEST (sandbox). Además, esa cuenta
sandbox está configurada como cuenta europea: el checkout muestra EUR como moneda
principal, ofrece métodos de pago de Europa (MB WAY, Bancontact, EPS) y sale en inglés.

Al crear la cuenta de Stripe real (mexicana, a nombre de quien opera):

- Generar la clave `sk_live_...` y ponerla como env var `STRIPE_SECRET_KEY` en Vercel.
- Verificar que la moneda de la cuenta sea MXN.
- Activar métodos de pago para México: tarjetas y OXXO (y MSI si conviene).
- En `app/api/checkout/route.ts`, al crear la Checkout Session conviene fijar
  `locale: "es-419"` para que la página de pago salga en español.
- El envío ya está bien en código: $99 fijo y gratis a partir de $900 de subtotal
  (`lib/checkout.ts`).
- La opción "Suscripción −15%" está OCULTA a propósito (flag
  `SUBSCRIPTIONS_ENABLED` en `lib/catalog.ts`): el API cobra siempre pago único
  (`mode: "payment"`), así que un cliente que "se suscribía" pagaba una vez con
  descuento y nunca se le cobraba ni enviaba nada recurrente. Para reactivarla hay
  que crear precios recurrentes en Stripe y cambiar el API a `mode: "subscription"`
  cuando el carrito traiga items de suscripción; luego poner el flag en `true`.

## 2. Newsletter: el formulario no guarda nada

El bloque "Tu mejor versión empieza ahora" de la home valida el correo y muestra
"¡Listo! Revisa tu correo.", pero no está conectado a nada: el correo se descarta y
no se envía ningún mensaje ni descuento de bienvenida. Opciones: conectar a
Mailchimp/Klaviyo/Beehiiv o a un endpoint propio. Mientras tanto, cuidado con
prometer el descuento en campañas.

## 3. Dominio propio

DECIDIDO (Alan, 17-sep-2026): el dominio canónico es **strideforathletes.com**
(propio, hoy sirve el sitio de marca de B7; Instagram oficial @strideforathletes).
`stride.mx` del manual MDIG quedó como legado y está parked; ignorarlo.

DATO CLAVE: lo que hoy sirve strideforathletes.com es una TIENDA SHOPIFY
(IP 23.227.38.32 + headers de Shopify, detrás de Cloudflare), no un sitio estático.
Es el único canal propio que puede cobrar dinero real mientras la tienda Vercel
siga en Stripe TEST.

DECIDIDO (Alan): el Shopify actual se CONSERVA en un subdominio por si se quiere
en el futuro. Propuesta: `shopify.strideforathletes.com` (el nombre es cambiable).

Secuencia segura del switch (cuando llegue el acceso al DNS):

0. ⚠️ PRERREQUISITO: la tienda Vercel debe cobrar real ANTES del switch (cuenta
   Stripe live del operador con `sk_live` en las env vars de Vercel). Si el root se
   apunta a Vercel con Stripe en TEST, el dominio deja de vender.
1. En Shopify admin (Settings → Domains): cambiar el dominio conectado a
   `shopify.strideforathletes.com`; en el DNS, CNAME de `shopify` →
   `shops.myshopify.com` (confirmar destino exacto en el admin de Shopify).
2. En Vercel (proyecto `stride`, cuenta del operador): Settings → Domains → agregar
   `strideforathletes.com` y `www`. Vercel indica los registros exactos.
3. En el DNS: A de `@` → `76.76.21.21` y CNAME de `www` → `cname.vercel-dns.com`
   (confirmar contra lo que Vercel muestre). Ojo con Cloudflare: si el DNS vive ahí,
   crear los registros en modo "DNS only" (nube gris) para no meter el proxy delante
   de Vercel.
4. ⚠️ NO TOCAR los registros MX (Outlook): el buzón `contacto@strideforathletes.com`
   depende de ellos. Solo se cambian A/CNAME.
5. En el código: actualizar `metadataBase` en `app/layout.tsx` a
   `https://strideforathletes.com` (un solo cambio, ya está preparado).
6. Verificar: https + certificado en root y subdominio, el Shopify respondiendo en
   su subdominio, checkout de Stripe real con el dominio nuevo (success/cancel URLs
   se derivan del origin, se actualizan solas) y que el correo siga llegando.

## 4. Redes y contacto

En el footer quedó Instagram (@strideforathletes, el handle impreso en la etiqueta
del producto) y Contacto → `mailto:contacto@strideforathletes.com` (buzón real,
MX en Outlook). Strava y TikTok se quitaron porque apuntaban a "#": crear los
perfiles y volverlos a agregar. Confirmar quién monitorea el buzón de contacto.

## 5. Divisiones Endure e Hydrate

Sus páginas SÍ venden (Creatina $549, Electrolitos $599, definidos en
`lib/catalog.ts`). Confirmar contra el inventario físico que hay stock y que esos
precios son los correctos antes de hacerles promoción.
