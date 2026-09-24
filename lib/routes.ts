/* Rutas canónicas del sitio. La página de producto es única y las divisiones tienen URLs claras. */
export type DivisionId = "recover" | "endure" | "hydrate";

export const HOME_URL = "/";
export const PROD_URL = "/producto";
export const SCIENCE_URL = "/ciencia";
export const DIV_URL: Record<DivisionId, string> = {
  recover: "/producto",
  endure: "/creatina",
  hydrate: "/electrolitos",
};
