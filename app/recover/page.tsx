import type { Metadata } from "next";
import "../division.css";
import DivisionContent from "@/components/pages/DivisionContent";

export const metadata: Metadata = {
  title: "Recovery Mix — Stride",
  description:
    "Recovery Mix: carbohidratos y proteína 3:2 para recuperar glucógeno, reparar músculo y volver más fuerte tras tu entrenamiento.",
  openGraph: {
    title: "Recovery Mix — Stride",
    description:
      "Recovery Mix: carbohidratos y proteína 3:2 para recuperar glucógeno, reparar músculo y volver más fuerte tras tu entrenamiento.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/recovery-front.png"],
  },
};

export default function Page() {
  return <DivisionContent division="recover" />;
}
