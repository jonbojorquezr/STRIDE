/* Mapa central de imágenes del sitio (en public/img). */
import type { DivisionId } from "@/lib/routes";

export const IMG = {
  recoveryFront: "/img/recovery-front.png",
  recoveryAngle: "/img/recovery-angle.png",
  recoverySachets: "/img/recovery-sachets.png",
  recoveryShaker: "/img/recovery-shaker.png",
  recoveryPouch: "/img/recovery-pouch.png",
  athletePortrait: "/img/athlete-portrait.jpg",
  lifeRecover: "/img/life-recover.jpg",
  lifeEndure: "/img/life-endure.jpg",
  lifeHydrate: "/img/life-hydrate.jpg",
  lifeWide: "/img/life-wide.jpg",
  creatine: "/img/creatine.png",
  electrolitos: "/img/electrolitos.png",
} as const;

/* Imágenes por división: card (home/cross), hero (empaque), product, life (full-bleed).
   Las 3 líneas ya tienen foto real de producto: Recover = Recovery Mix (pouch 1 kg +
   sachets), Endure = bote de Creatina, Hydrate = bote de Electrolitos. */
export const DIV_IMG: Record<
  DivisionId,
  { card: string; hero: string; product: string; life: string }
> = {
  recover: { card: IMG.lifeRecover, hero: IMG.recoveryFront, product: IMG.recoverySachets, life: IMG.lifeRecover },
  endure: { card: IMG.lifeEndure, hero: IMG.creatine, product: IMG.creatine, life: IMG.lifeWide },
  hydrate: { card: IMG.lifeHydrate, hero: IMG.electrolitos, product: IMG.electrolitos, life: IMG.athletePortrait },
};
