# Stride — Design System del sitio

Fuente de verdad visual del sitio. Inferido del código y del manual de marca MDIG
(design-review 17-sep-2026, score A−). Cualquier cambio visual debe respetar esto.

## Tipografía (3 familias, no agregar más)

| Rol | Familia | Uso |
|-----|---------|-----|
| Display | Config Condensed (500–900, self-hosted) | Headings, uppercase, weight 800; font-stretch 80–85% |
| Body | Raveo (self-hosted) | Texto corrido, UI |
| Mono | Space Mono (Google Fonts) | Eyebrows, labels técnicos, precios, letter-spacing .12em |

Escala de headings observada: 115 / 77 / 51 / 30 / 22 px. Body ≥ 15 px.

## Color (todo por variables CSS en `app/base.css`, nunca hex sueltos)

- Marca: `--aqua #00EABD`, `--teal #006666` (acento legible en claro), `--night #00111E`.
- Superficies claras: `--paper #F4F5F2` (off-white cálido), `--card #FFF`; texto `--ink`, `--ink-2`, `--ink-3`.
- Divisiones (manual MDIG): Recover `#8AE02F`, Endure `#E20031`, Hydrate `#009EFF`,
  cada una con su `-tint` para fondos y su `-ink` (variante ≥4.5:1) para texto/badges.
  Regla: el color brillante decora (tints, bordes, hovers); el `-ink` escribe.

## Reglas que ya cumple el sitio (no romper)

1. Focus visible global: outline 3px `--night` (aqua en secciones dark), offset 2px. Nunca `outline: none` sin reemplazo.
2. `prefers-reduced-motion` respetado (reveals y scroll-behavior se apagan).
3. Touch targets ≥ 24px reales (dots del carrusel usan `background-clip: content-box` para hit area grande con dot chico).
4. Imágenes: `ImageSlot` con `loading="lazy"` por default; heroes above-the-fold llevan `eager`.
5. Solo se anima `transform`/`opacity`; easing `--ease`.
6. Nav: hamburguesa + drawer a ≤900px; nav sólida al scrollear (`nav--solid`).
7. Honestidad comercial: sin ratings inventados, sin opciones de compra que el backend no cumpla (`SUBSCRIPTIONS_ENABLED` en `lib/catalog.ts`), sin links muertos.

## Voz

Español mexicano directo, segunda persona, frases cortas ("Recupera como compites").
Labels técnicos en mono uppercase. Bilingüe vía `t(es, en)` en `lib/store`: todo texto
nuevo entra con sus dos versiones.

## Anti-patrones vetados

Gradientes morados, icon-in-circle grids, emoji como diseño, border-left de acento en
cards, copy genérico ("Bienvenido a...", "Tu solución todo-en-uno"), fuentes del
sistema como display, radius uniforme bubbly.
