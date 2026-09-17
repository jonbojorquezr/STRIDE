import type { Metadata } from "next";
import "../division.css";
import DivisionContent from "@/components/pages/DivisionContent";

export const metadata: Metadata = {
  title: "Stride — Hydrate",
  description:
    "Hydrate: hidratación inteligente con sodio, potasio y magnesio y cítricos naturales. Ligera, fresca y sin azúcar. Refresca tu flow.",
  openGraph: {
    title: "Stride — Hydrate",
    description:
      "Hidratación inteligente con sodio, potasio y magnesio y cítricos naturales. Ligera, fresca y sin azúcar.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/life-hydrate.jpg"],
  },
};

export default function Page() {
  return <DivisionContent division="hydrate" />;
}
