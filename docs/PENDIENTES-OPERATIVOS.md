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

`strideforathletes.com` YA EXISTE y responde (sitio de marca de la agencia B7), con
correo activo en Outlook (`contacto@strideforathletes.com`). Decisión pendiente:
apuntar el dominio a esta tienda, o crear `shop.strideforathletes.com` hacia Vercel
y dejar el sitio de marca donde está. Al conectarlo, actualizar `metadataBase` en
`app/layout.tsx`. Averiguar quién administra el DNS (¿B7?).

OJO: el manual de marca (Stride-MDIG 2024) asume `stride.mx` (los artes dicen
WWW.STRIDE.MX y las tarjetas usan correos `@stride.mx`), pero ese dominio está
PARKED (redirige a un lander de registrador). Confirmar con B7/Lorena si stride.mx
es de Stride; si sí, decidir cuál es el dominio canónico antes de redirigir.

## 4. Redes y contacto

En el footer quedó Instagram (@strideforathletes, el handle impreso en la etiqueta
del producto) y Contacto → `mailto:contacto@strideforathletes.com` (buzón real,
MX en Outlook). Strava y TikTok se quitaron porque apuntaban a "#": crear los
perfiles y volverlos a agregar. Confirmar quién monitorea el buzón de contacto.

## 5. Divisiones Endure e Hydrate

Sus páginas SÍ venden (Creatina $549, Electrolitos $599, definidos en
`lib/catalog.ts`). Confirmar contra el inventario físico que hay stock y que esos
precios son los correctos antes de hacerles promoción.
