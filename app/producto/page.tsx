import type { Metadata } from "next";
import "../product.css";
import ProductContent from "@/components/pages/ProductContent";

export const metadata: Metadata = {
  title: "Recovery Mix — Stride",
  description:
    "Recovery Mix: mezcla post-entrenamiento con proporción 3:2 de carbohidratos y proteína. 20 g de proteína, sin azúcar añadido. Hecho en México.",
  openGraph: {
    title: "Recovery Mix — Stride",
    description:
      "Mezcla post-entrenamiento con proporción 3:2 de carbohidratos y proteína. 20 g de proteína, sin azúcar añadido. Hecho en México.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/recovery-front.jpg"],
  },
};

export default function Page() {
  return <ProductContent />;
}
