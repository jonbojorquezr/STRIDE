/* Rutas limpias del sitio (reemplazan los .html del export) */
export type DivisionId = "recover" | "endure" | "hydrate";

export const HOME_URL = "/";
export const PROD_URL = "/producto";
export const DIV_URL: Record<DivisionId, string> = {
  recover: "/recover",
  endure: "/endure",
  hydrate: "/hydrate",
};
