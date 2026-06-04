import type { Metadata } from "next";
import "../product.css";
import ProductContent from "@/components/pages/ProductContent";

export const metadata: Metadata = {
  title: "Recovery Mix — Stride",
  description:
    "Recovery Mix: mezcla post-entrenamiento con proporción 3:2 de carbohidratos y proteína. 20 g de proteína, sin azúcar añadido. Hecho en México.",
};

export default function Page() {
  return <ProductContent />;
}
