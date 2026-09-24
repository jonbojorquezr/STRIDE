import type { Metadata } from "next";
import "../division.css";
import DivisionContent from "@/components/pages/DivisionContent";

export const metadata: Metadata = {
  title: "Electrolitos | Stride",
  description:
    "Electrolitos con sodio, potasio y magnesio para hidratarte mejor, sin azúcar y con sabor cítrico ligero para entrenar y vivir.",
  openGraph: {
    title: "Electrolitos | Stride",
    description:
      "Electrolitos con sodio, potasio y magnesio para hidratarte mejor, sin azúcar y con sabor cítrico ligero para entrenar y vivir.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/electrolitos.png"],
  },
};

export default function Page() {
  return <DivisionContent division="hydrate" />;
}