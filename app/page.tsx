import type { Metadata } from "next";
import "./home.css";
import HomeContent from "@/components/pages/HomeContent";

export const metadata: Metadata = {
  title: "Stride | Suplementos de Recuperación para Corredores",
  description:
    "Stride: suplementos para corredores y atletas de resistencia. Recovery Mix, Creatina y Electrolitos con formulación basada en evidencia y hechos en México.",
  openGraph: {
    title: "Stride | Suplementos de Recuperación para Corredores",
    description:
      "Suplementos para corredores y atletas de resistencia. Recovery Mix, Creatina y Electrolitos con formulación basada en evidencia y hechos en México.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/recovery-front.png"],
  },
};

export default function Page() {
  return <HomeContent />;
}
