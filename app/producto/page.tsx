import type { Metadata } from "next";
import "../product.css";
import ProductContent from "@/components/pages/ProductContent";

export const metadata: Metadata = {
  title: "Recovery Mix | Stride",
  description:
    "Recovery Mix para corredores: 20 g de proteína, 30 g de carbohidratos y Cluster Dextrin para recuperar glucógeno sin indigestión. Hecho en México.",
  openGraph: {
    title: "Recovery Mix | Stride",
    description:
      "Recovery Mix para corredores: 20 g de proteína, 30 g de carbohidratos y Cluster Dextrin para recuperar glucógeno sin indigestión.",
    siteName: "Stride",
    locale: "es_MX",
    type: "website",
    images: ["/img/recovery-front.png"],
  },
};

export default function Page() {
  return <ProductContent />;
}
