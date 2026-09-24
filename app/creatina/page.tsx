import type { Metadata } from "next";
import "../division.css";
import DivisionContent from "@/components/pages/DivisionContent";

export const metadata: Metadata = {
  title: "Creatina | Stride",
  description:
    "Creatina monohidratada pura: 5 g por porción para fuerza, potencia y resistencia muscular, sin rellenos ni azúcar añadido.",
  openGraph: {
    title: "Creatina | Stride",
    description:
      "Creatina monohidratada pura: 5 g por porción para fuerza, potencia y resistencia muscular, sin rellenos ni azúcar añadido.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/creatine.png"],
  },
};

export default function Page() {
  return <DivisionContent division="endure" />;
}