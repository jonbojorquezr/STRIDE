import type { Metadata } from "next";
import "../division.css";
import DivisionContent from "@/components/pages/DivisionContent";

export const metadata: Metadata = {
  title: "Stride — Endure",
  description:
    "Endure: combustible de resistencia con carbohidratos de liberación sostenida, electrolitos y cafeína natural para los días largos. Domina el juego.",
  openGraph: {
    title: "Stride — Endure",
    description:
      "Combustible de resistencia con carbohidratos de liberación sostenida, electrolitos y cafeína natural para los días largos.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/life-endure.jpg"],
  },
};

export default function Page() {
  return <DivisionContent division="endure" />;
}
